Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshotDir = Join-Path $root "assets\screenshots\generated"
$outputDir = Join-Path $root "assets\ad-campaign"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function New-Bitmap($width, $height) {
    $bitmap = New-Object System.Drawing.Bitmap $width, $height
    $bitmap.SetResolution(96, 96)
    return $bitmap
}

function Save-Png($bitmap, $path) {
    $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
}

function Brush($hex) {
    return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function Pen($hex, $width = 1) {
    return New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $width
}

function Font($size, $style = [System.Drawing.FontStyle]::Regular) {
    return New-Object System.Drawing.Font("Segoe UI", ([single]$size), $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function Setup-Graphics($bitmap) {
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    return $g
}

function Draw-RoundedRect($g, $x, $y, $w, $h, $radius, $brush) {
    if ($radius -le 0) {
        $g.FillRectangle($brush, $x, $y, $w, $h)
        return
    }

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $radius * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    $g.FillPath($brush, $path)
    $path.Dispose()
}

function Draw-RoundedImage($g, $imagePath, $x, $y, $w, $h, $radius) {
    $image = [System.Drawing.Image]::FromFile($imagePath)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $radius * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()

    $state = $g.Save()
    $g.SetClip($path)

    $scale = [Math]::Max($w / $image.Width, $h / $image.Height)
    $drawW = [int]($image.Width * $scale)
    $drawH = [int]($image.Height * $scale)
    $drawX = [int]($x + (($w - $drawW) / 2))
    $drawY = [int]($y + (($h - $drawH) / 2))
    $g.DrawImage($image, $drawX, $drawY, $drawW, $drawH)

    $g.Restore($state)
    $path.Dispose()
    $image.Dispose()
}

function Draw-TextBox($g, $text, $font, $brush, $x, $y, $w, $h, $align = "Near") {
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::$align
    $format.LineAlignment = [System.Drawing.StringAlignment]::Near
    $format.Trimming = [System.Drawing.StringTrimming]::Word
    $g.DrawString($text, $font, $brush, (New-Object System.Drawing.RectangleF $x, $y, $w, $h), $format)
    $format.Dispose()
}

function Draw-CenteredText($g, $text, $font, $brush, $x, $y, $w, $h) {
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString($text, $font, $brush, (New-Object System.Drawing.RectangleF $x, $y, $w, $h), $format)
    $format.Dispose()
}

function Draw-GradientBackground($g, $width, $height, $top, $bottom) {
    $rect = New-Object System.Drawing.Rectangle 0, 0, $width, $height
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        [System.Drawing.ColorTranslator]::FromHtml($top),
        [System.Drawing.ColorTranslator]::FromHtml($bottom),
        [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    )
    $g.FillRectangle($brush, $rect)
    $brush.Dispose()
}

function Draw-Brand($g, $x, $y, $scale = 1) {
    $green = Brush "#1B5E20"
    $yellow = Brush "#F9C74F"
    $dark = Brush "#243018"
    Draw-RoundedRect $g $x $y ([int](76 * $scale)) ([int](76 * $scale)) ([int](20 * $scale)) (Brush "#FCE9B0")
    Draw-CenteredText $g "N" (Font ([int](40 * $scale)) ([System.Drawing.FontStyle]::Bold)) $green $x ($y + [int](4 * $scale)) ([int](76 * $scale)) ([int](58 * $scale))
    Draw-CenteredText $g "NENO SAFARI" (Font ([int](28 * $scale)) ([System.Drawing.FontStyle]::Bold)) $yellow ($x + [int](92 * $scale)) ($y + [int](8 * $scale)) ([int](300 * $scale)) ([int](34 * $scale))
    Draw-CenteredText $g "Swahili word search" (Font ([int](18 * $scale))) $dark ($x + [int](92 * $scale)) ($y + [int](42 * $scale)) ([int](300 * $scale)) ([int](28 * $scale))
}

function Draw-CTA($g, $x, $y, $w, $h, $text) {
    Draw-RoundedRect $g $x $y $w $h 22 (Brush "#F9C74F")
    Draw-CenteredText $g $text (Font 31 ([System.Drawing.FontStyle]::Bold)) (Brush "#1B5E20") $x $y $w $h
}

function New-SquareCreative($name, $headline, $subhead, $screen, $accent, $backgroundTop, $backgroundBottom) {
    $bitmap = New-Bitmap 1080 1080
    $g = Setup-Graphics $bitmap
    Draw-GradientBackground $g 1080 1080 $backgroundTop $backgroundBottom

    Draw-RoundedRect $g 0 810 1080 360 0 (Brush "#153B21")
    Draw-Brand $g 70 58 1
    Draw-TextBox $g $headline (Font 62 ([System.Drawing.FontStyle]::Bold)) (Brush "#FFFFFF") 70 180 570 230
    Draw-TextBox $g $subhead (Font 31) (Brush "#F3F6E8") 72 430 560 110
    Draw-CTA $g 72 580 410 78 "Play free"
    Draw-CenteredText $g "play.google.com/store/apps/details?id=com.nenosafari" (Font 19) (Brush "#E8F5E9") 70 676 570 40

    Draw-RoundedRect $g 610 110 370 820 48 (Brush "#102715")
    Draw-RoundedImage $g (Join-Path $screenshotDir $screen) 634 134 322 772 32
    Draw-RoundedRect $g 678 966 232 10 5 (Brush $accent)

    $g.Dispose()
    Save-Png $bitmap (Join-Path $outputDir $name)
}

function New-StoryCreative($name, $headline, $subhead, $screen, $accent, $backgroundTop, $backgroundBottom) {
    $bitmap = New-Bitmap 1080 1920
    $g = Setup-Graphics $bitmap
    Draw-GradientBackground $g 1080 1920 $backgroundTop $backgroundBottom

    Draw-Brand $g 72 72 1.1
    Draw-TextBox $g $headline (Font 78 ([System.Drawing.FontStyle]::Bold)) (Brush "#FFFFFF") 72 210 936 260
    Draw-TextBox $g $subhead (Font 38) (Brush "#F7F5DF") 76 494 880 130

    Draw-RoundedRect $g 206 665 668 1048 56 (Brush "#102715")
    Draw-RoundedImage $g (Join-Path $screenshotDir $screen) 236 695 608 988 40
    Draw-RoundedRect $g 330 1748 420 88 26 (Brush "#F9C74F")
    Draw-CenteredText $g "Google Play" (Font 34 ([System.Drawing.FontStyle]::Bold)) (Brush "#1B5E20") 330 1748 420 88
    Draw-CenteredText $g "Free Swahili word search game" (Font 24) (Brush "#F7F5DF") 160 1848 760 38
    Draw-RoundedRect $g 86 642 18 600 9 (Brush $accent)

    $g.Dispose()
    Save-Png $bitmap (Join-Path $outputDir $name)
}

New-SquareCreative `
    "feed-01-learn-swahili-1080x1080.png" `
    "Learn Swahili through quick word-search puzzles" `
    "Find Kiswahili words, then learn meanings and pronunciation." `
    "android-04-learn.png" "#F9C74F" "#1F6B3A" "#8D6E3F"

New-SquareCreative `
    "feed-02-find-words-1080x1080.png" `
    "Can you find the hidden Kiswahili words?" `
    "A calm daily puzzle game inspired by Tanzania." `
    "android-03-puzzle.png" "#2F80ED" "#1565C0" "#2E7D32"

New-SquareCreative `
    "feed-03-free-offline-1080x1080.png" `
    "Free, offline-friendly, and made for Swahili practice" `
    "No ads in the current release. Just puzzles and learning." `
    "android-01-home.png" "#34A853" "#6D5A35" "#1B5E20"

New-SquareCreative `
    "feed-04-tanzania-travel-1080x1080.png" `
    "Useful words for Tanzania travel and everyday life" `
    "Food, greetings, markets, transport, culture, and more." `
    "android-02-categories.png" "#F9C74F" "#7B5A2E" "#0277BD"

New-StoryCreative `
    "story-01-start-safari-1080x1920.png" `
    "Start your Neno Safari" `
    "A free Swahili vocabulary game inspired by Tanzania." `
    "android-01-home.png" "#F9C74F" "#1B5E20" "#6D5A35"

New-StoryCreative `
    "story-02-word-challenge-1080x1920.png" `
    "Find the word. Learn the meaning." `
    "Quick word-search puzzles for Kiswahili practice." `
    "android-03-puzzle.png" "#2F80ED" "#1565C0" "#234D20"

New-StoryCreative `
    "story-03-pronunciation-1080x1920.png" `
    "Hear and remember new Swahili words" `
    "Meanings, pronunciation, example sentences, and notes." `
    "android-04-learn.png" "#F9C74F" "#2E7D32" "#8D6E3F"

New-StoryCreative `
    "story-04-daily-progress-1080x1920.png" `
    "Practice a little Swahili every day" `
    "Daily puzzles, progress, rewards, and saved words." `
    "android-05-progress.png" "#34A853" "#0277BD" "#1B5E20"

Write-Host "Ad campaign assets written to $outputDir"

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $root "assets\play-store"
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

function Draw-CenteredText($g, $text, $font, $brush, $x, $y, $w, $h) {
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString($text, $font, $brush, (New-Object System.Drawing.RectangleF $x, $y, $w, $h), $format)
    $format.Dispose()
}

function Draw-RoundedRect($g, $x, $y, $w, $h, $radius, $brush) {
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

function Setup-Graphics($bitmap) {
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    return $g
}

function Make-Icon {
    $bitmap = New-Bitmap 512 512
    $g = Setup-Graphics $bitmap
    $green = Brush "#1B5E20"
    $yellow = Brush "#F9A825"
    $black = Brush "#212121"
    $blue = Brush "#1565C0"
    $light = Brush "#FDD835"
    $white = Brush "#FFFFFF"

    Draw-RoundedRect $g 0 0 512 512 96 $green
    $points1 = [System.Drawing.Point[]]@((New-Object System.Drawing.Point 0,338),(New-Object System.Drawing.Point 512,174),(New-Object System.Drawing.Point 512,248),(New-Object System.Drawing.Point 0,412))
    $points2 = [System.Drawing.Point[]]@((New-Object System.Drawing.Point 0,390),(New-Object System.Drawing.Point 512,226),(New-Object System.Drawing.Point 512,280),(New-Object System.Drawing.Point 0,444))
    $points3 = [System.Drawing.Point[]]@((New-Object System.Drawing.Point 0,432),(New-Object System.Drawing.Point 512,268),(New-Object System.Drawing.Point 512,512),(New-Object System.Drawing.Point 0,512))
    $g.FillPolygon($yellow, $points1)
    $g.FillPolygon($black, $points2)
    $g.FillPolygon($blue, $points3)
    $g.FillEllipse($light, 146, 104, 220, 220)
    $g.FillEllipse($green, 182, 140, 148, 148)
    Draw-CenteredText $g "N" (Font 120 ([System.Drawing.FontStyle]::Bold)) $white 0 118 512 180

    $g.Dispose()
    Save-Png $bitmap (Join-Path $outputDir "icon-512.png")
}

function Make-FeatureGraphic {
    $bitmap = New-Bitmap 1024 500
    $g = Setup-Graphics $bitmap
    $green = Brush "#1B5E20"
    $yellow = Brush "#F9A825"
    $blue = Brush "#1565C0"
    $white = Brush "#FFFFFF"
    $soft = Brush "#E8F5E9"
    $dark = Brush "#123C1D"

    $g.Clear([System.Drawing.ColorTranslator]::FromHtml("#E8F5E9"))
    $g.FillRectangle($green, 0, 0, 1024, 500)
    $g.FillRectangle($blue, 0, 350, 1024, 150)
    $g.FillPolygon($yellow, [System.Drawing.Point[]]@((New-Object System.Drawing.Point 0,330),(New-Object System.Drawing.Point 1024,190),(New-Object System.Drawing.Point 1024,245),(New-Object System.Drawing.Point 0,385)))

    Draw-CenteredText $g "NENO SAFARI" (Font 72 ([System.Drawing.FontStyle]::Bold)) $white 72 76 540 90
    Draw-CenteredText $g "Learn Tanzanian Swahili with word search puzzles" (Font 30) $soft 72 170 560 90
    Draw-RoundedRect $g 90 300 360 70 20 $yellow
    Draw-CenteredText $g "Find words. Learn Swahili." (Font 28 ([System.Drawing.FontStyle]::Bold)) $dark 90 300 360 70

    Draw-RoundedRect $g 690 68 230 330 32 $white
    Draw-RoundedRect $g 716 112 178 178 12 $soft
    $letters = @("U G A L I","P I L A U","S I M B A","S A F A R I","K A R I B U")
    for ($i = 0; $i -lt $letters.Count; $i++) {
        Draw-CenteredText $g $letters[$i] (Font 24 ([System.Drawing.FontStyle]::Bold)) $green 720 (125 + ($i * 30)) 170 30
    }
    Draw-CenteredText $g "Karibu Tanzania" (Font 24 ([System.Drawing.FontStyle]::Bold)) $blue 704 310 200 34
    Draw-CenteredText $g "Swahili vocabulary" (Font 18) $dark 704 346 200 28

    $g.Dispose()
    Save-Png $bitmap (Join-Path $outputDir "feature-graphic-1024x500.png")
}

function Draw-PhoneBase($g, $title, $subtitle, $background) {
    $g.Clear([System.Drawing.ColorTranslator]::FromHtml($background))
    $white = Brush "#FFFFFF"
    $green = Brush "#1B5E20"
    $yellow = Brush "#F9A825"
    $blue = Brush "#1565C0"
    Draw-CenteredText $g $title (Font 66 ([System.Drawing.FontStyle]::Bold)) $white 80 96 920 90
    Draw-CenteredText $g $subtitle (Font 32) $white 100 184 880 80
    Draw-RoundedRect $g 88 308 904 1280 42 $white
    Draw-RoundedRect $g 88 1548 904 178 32 $yellow
    Draw-CenteredText $g "Neno Safari" (Font 42 ([System.Drawing.FontStyle]::Bold)) $green 110 1578 860 58
    Draw-CenteredText $g "Made by NECUVA GROUP LIMITED" (Font 25) $blue 110 1638 860 44
}

function Make-ScreenshotHome {
    $bitmap = New-Bitmap 1080 1920
    $g = Setup-Graphics $bitmap
    $green = Brush "#1B5E20"
    $yellow = Brush "#F9A825"
    $blue = Brush "#1565C0"
    $dark = Brush "#212121"
    Draw-PhoneBase $g "Learn Swahili" "Tanzania-themed word search puzzles" "#1B5E20"
    Draw-CenteredText $g "NENO SAFARI" (Font 70 ([System.Drawing.FontStyle]::Bold)) $green 130 390 820 92
    Draw-CenteredText $g "Jifunze Kiswahili kwa kucheza" (Font 32) $dark 130 490 820 60
    Draw-RoundedRect $g 220 650 640 96 24 $yellow
    Draw-CenteredText $g "Cheza Sasa" (Font 38 ([System.Drawing.FontStyle]::Bold)) $green 220 650 640 96
    Draw-RoundedRect $g 220 790 640 96 24 $blue
    Draw-CenteredText $g "Fumbo la Leo" (Font 38 ([System.Drawing.FontStyle]::Bold)) (Brush "#FFFFFF") 220 790 640 96
    Draw-RoundedRect $g 220 930 640 96 24 (Brush "#E8F5E9")
    Draw-CenteredText $g "Chagua Mada" (Font 36 ([System.Drawing.FontStyle]::Bold)) $green 220 930 640 96
    $g.Dispose()
    Save-Png $bitmap (Join-Path $outputDir "phone-01-home.png")
}

function Make-ScreenshotPuzzle {
    $bitmap = New-Bitmap 1080 1920
    $g = Setup-Graphics $bitmap
    $green = Brush "#1B5E20"
    $blue = Brush "#1565C0"
    $yellow = Brush "#F9A825"
    $dark = Brush "#212121"
    Draw-PhoneBase $g "Find Hidden Words" "Food, animals, cities, greetings, and more" "#1565C0"
    Draw-CenteredText $g "Vyakula vya Tanzania" (Font 46 ([System.Drawing.FontStyle]::Bold)) $green 120 368 840 70
    Draw-RoundedRect $g 170 500 740 740 18 (Brush "#F1F8E9")
    $rows = @("U G A L I S M A","P I L A U N D I","S A M A K I Z I","M C H I C H A K","W A L I B E I A","N D I Z I P O A","K A R I B U S O","S O K O T E M B O")
    for ($i = 0; $i -lt $rows.Count; $i++) {
        Draw-CenteredText $g $rows[$i] (Font 36 ([System.Drawing.FontStyle]::Bold)) $dark 200 (540 + ($i * 76)) 680 58
    }
    Draw-RoundedRect $g 210 1300 660 74 18 $yellow
    Draw-CenteredText $g "UGALI found - Maize meal" (Font 30 ([System.Drawing.FontStyle]::Bold)) $green 210 1300 660 74
    $g.Dispose()
    Save-Png $bitmap (Join-Path $outputDir "phone-02-puzzle.png")
}

function Make-ScreenshotLearn {
    $bitmap = New-Bitmap 1080 1920
    $g = Setup-Graphics $bitmap
    $green = Brush "#1B5E20"
    $blue = Brush "#1565C0"
    $yellow = Brush "#F9A825"
    $dark = Brush "#212121"
    Draw-PhoneBase $g "Learn Each Word" "Meanings, examples, and pronunciation" "#2E7D32"
    Draw-RoundedRect $g 170 430 740 760 30 (Brush "#F1F8E9")
    Draw-CenteredText $g "SIMBA" (Font 84 ([System.Drawing.FontStyle]::Bold)) $green 190 520 700 110
    Draw-CenteredText $g "Lion" (Font 48 ([System.Drawing.FontStyle]::Bold)) $blue 190 650 700 80
    Draw-CenteredText $g "Simba anaishi mbugani." (Font 36) $dark 210 780 660 90
    Draw-RoundedRect $g 260 930 560 88 24 $yellow
    Draw-CenteredText $g "Hear Pronunciation" (Font 32 ([System.Drawing.FontStyle]::Bold)) $green 260 930 560 88
    Draw-CenteredText $g "Save difficult words for revision" (Font 30) $dark 190 1070 700 70
    $g.Dispose()
    Save-Png $bitmap (Join-Path $outputDir "phone-03-learn.png")
}

function Make-ScreenshotProgress {
    $bitmap = New-Bitmap 1080 1920
    $g = Setup-Graphics $bitmap
    $green = Brush "#1B5E20"
    $blue = Brush "#1565C0"
    $yellow = Brush "#F9A825"
    $dark = Brush "#212121"
    Draw-PhoneBase $g "Track Progress" "Daily streaks, rewards, and categories" "#0277BD"
    Draw-CenteredText $g "Maendeleo" (Font 54 ([System.Drawing.FontStyle]::Bold)) $green 130 390 820 80
    $x = 210
    $bars = @(170, 260, 360, 230, 420)
    for ($i = 0; $i -lt $bars.Count; $i++) {
        $barX = $x + ($i * 130)
        $barH = $bars[$i]
        Draw-RoundedRect $g $barX (1060 - $barH) 74 $barH 12 @($yellow,$green,$blue,$yellow,$green)[$i]
    }
    Draw-CenteredText $g "Recommended next: Salamu na mazungumzo" (Font 31 ([System.Drawing.FontStyle]::Bold)) $dark 150 1130 780 80
    Draw-RoundedRect $g 210 1260 660 80 20 $yellow
    Draw-CenteredText $g "Earn coins and badges" (Font 32 ([System.Drawing.FontStyle]::Bold)) $green 210 1260 660 80
    $g.Dispose()
    Save-Png $bitmap (Join-Path $outputDir "phone-04-progress.png")
}

Make-Icon
Make-FeatureGraphic
Make-ScreenshotHome
Make-ScreenshotPuzzle
Make-ScreenshotLearn
Make-ScreenshotProgress

Write-Host "Play listing assets written to $outputDir"

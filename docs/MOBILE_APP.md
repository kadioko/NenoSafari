# Mobile App Path

> Current Android release configuration: version 2.13.0, build 38, target API 36.

Neno Safari should ship first as the current PWA wrapped with Capacitor. This keeps one codebase for Android, future iOS, and web/PC.

## Current Direction

1. Keep improving the live Android app with small, safe content and UX updates.
2. Use Capacitor to sync the same PWA shell into Android builds.
3. Refresh Android icons, screenshots, privacy notes, and Play Store listing copy when behavior changes.
4. Keep testing release builds before every Play Console upload.
5. Add iOS through Capacitor on macOS/Xcode after Android is stable.
6. Keep the same app available as a web/PC PWA.

Public Android listing: `https://play.google.com/store/apps/details?id=com.nenosafari`

Use `docs/ANDROID_RELEASE_BUILD.md` as the authoritative Android sync, build, verification, and Google Play upload guide.

## Local Commands

Install dependencies:

```powershell
npm install
```

Run tests:

```powershell
npm test
npm run test:browser
npm run test:phone
npm run audio:check
```

Build the web files that Capacitor packages:

```powershell
npm run mobile:build
```

The mobile build copies only runtime assets. Advertising artwork, store graphics, and generated screenshot files are intentionally excluded from the installed app.

Create the Android project once:

```powershell
npm run android:add
```

Sync web changes into Android after future app updates:

```powershell
npm run cap:sync
```

Open Android Studio:

```powershell
npm run android:open
```

## Android Requirements

- Android Studio installed
- Android SDK installed through Android Studio
- Java/JDK supported by the installed Android Gradle plugin
- A real Android phone with USB debugging or an Android emulator
- Local release signing setup before uploading to Google Play

## Android Testing Flow

1. Run `npm test`.
2. Run `npm run test:browser` and `npm run test:phone`.
3. Run `npm run audio:check`.
4. Run `npm run cap:sync`.
5. Open Android Studio with `npm run android:open`.
6. Build and run on a phone or emulator.
7. Test these flows:
   - First launch
   - Language switch between Swahili and English
   - Puzzle selection and word dragging
   - Learning modal and audio button
   - Saved words and quiz
   - Quick Learn saving and due-only review sprint completion
   - Again, Hard, and Got It review scheduling
   - Memory strength and once-daily review reward behavior
   - Daily Puzzle
   - Offline restart after airplane mode
   - High contrast and reduced motion settings
   - Touch feedback enabled and disabled
   - Automatic pronunciation enabled and disabled
   - Time Challenge pause/resume after backgrounding the app

For live content-only updates, also confirm:

- Daily Puzzle opens correctly.
- Word of the Day copy displays cleanly.
- New long words fit on small screens and target puzzle sizes.
- The service worker cache version was bumped when cached files changed.

## Production Build Defaults

- `compileSdkVersion` is set to 36 for the installed Android 16 SDK toolchain.
- `targetSdkVersion` is set to 36 for the August 2026 Google Play requirement.
- The current production identity is `com.nenosafari`, version `2.13.0`, version code `38`.
- Native touch feedback uses the Capacitor Haptics plugin and remains optional in Settings.
- Release builds enable minification and resource shrinking.
- Release signing reads from local `android/keystore.properties` or `NENO_SAFARI_UPLOAD_*` environment variables.
- Keystores and signing passwords must never be committed.

## iOS Path

iOS should be added later on a Mac with Xcode:

```powershell
npm run ios:add
npm run ios:open
```

The app shell should remain the same. iOS-specific work will mainly be screenshots, icons, privacy labels, and device testing.

## Store Assets Needed

- Android adaptive icon and launcher icon set
- Splash screen background and foreground branding
- Google Play feature graphic
- Real Android phone screenshots
- Short description and full description
- Privacy policy URL
- Support email
- Data Safety answers
- Content rating questionnaire
- Internal testing track notes
- Staged production rollout notes

## Release Gate

Do not upload a new public build until:

- A Tanzanian Swahili speaker has reviewed new vocabulary and examples.
- Final screenshots are current real Android/emulator captures rather than legacy SVG planning assets.
- Privacy policy reflects the real app behavior.
- Offline play has been tested on device.
- Audio works without exposing API keys in the app.
- The Android build has passed a local device or internal test check.
- Play Console staged rollout notes match the actual user-facing changes.

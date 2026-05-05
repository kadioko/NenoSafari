# Mobile App Path

Neno Safari should ship first as the current PWA wrapped with Capacitor. This keeps one codebase for Android, future iOS, and web/PC.

## Current Direction

1. Keep improving the PWA until the word search, learning modal, rewards, offline behavior, and audio feel good on phones.
2. Use Capacitor for Android testing.
3. Prepare Android icons, splash screens, privacy notes, screenshots, and Play Store listing copy.
4. Release an Android internal test or beta.
5. Add iOS through Capacitor on macOS/Xcode after Android is stable.
6. Keep the same app available as a web/PC PWA.

## Local Commands

Install dependencies:

```powershell
npm install
```

Run tests:

```powershell
npm test
npm run audio:check
```

Build the web files that Capacitor packages:

```powershell
npm run mobile:build
```

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

## Android Testing Flow

1. Run `npm test`.
2. Run `npm run audio:check`.
3. Run `npm run cap:sync`.
4. Open Android Studio with `npm run android:open`.
5. Build and run on a phone or emulator.
6. Test these flows:
   - First launch
   - Language switch between Swahili and English
   - Puzzle selection and word dragging
   - Learning modal and audio button
   - Saved words and quiz
   - Daily Puzzle
   - Offline restart after airplane mode
   - High contrast and reduced motion settings

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

## Release Gate

Do not submit to a public store until:

- A Tanzanian Swahili speaker has reviewed the vocabulary and examples.
- Final screenshots replace placeholder planning assets.
- Privacy policy reflects the real app behavior.
- Offline play has been tested on device.
- Audio works without exposing API keys in the app.
- The Android build has passed an internal test track.

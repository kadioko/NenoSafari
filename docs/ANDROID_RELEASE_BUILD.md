# Android Release Build

> Authoritative release-build guide for Neno Safari 2.13.0, Android build 38, target API 36.

Use this guide whenever creating an Android App Bundle for Google Play. The package name must remain `com.nenosafari` so existing users can upgrade.

## Current Release Metadata

- App name: Neno Safari
- Package: `com.nenosafari`
- Version name: `2.13.0`
- Version code: `38`
- Compile SDK: `36`
- Target SDK: `36`
- Service-worker cache: `neno-safari-v58`
- Expected upload format: signed Android App Bundle (`.aab`)

Version configuration lives in `android/app/build.gradle` and `android/variables.gradle`.

## Prerequisites

- Node.js and npm
- Android Studio with Android SDK 36
- A compatible JDK configured through `JAVA_HOME`
- Project dependencies installed with `npm install`
- Local release signing configured
- All pronunciation MP3 files present in `audio/`

Never commit a keystore, signing password, API key, or `android/keystore.properties`. Follow `docs/ANDROID_SIGNING.md` for signing setup.

## Preflight Checks

From the project root:

```powershell
npm test
npm run test:browser
npm run test:phone
npm run audio:check
npm audit --omit=dev
```

Expected current results:

- Content validation: 399 entries
- Audio coverage: 432/432 MP3 files
- Production dependency vulnerabilities: 0
- App boot, storage, puzzle, review scheduler, haptics, offline pack, and browser flow tests: passing

Confirm release values:

```powershell
Select-String -Path android\app\build.gradle -Pattern 'versionCode|versionName'
Select-String -Path android\variables.gradle -Pattern 'compileSdkVersion|targetSdkVersion'
```

Every Play Console upload needs a version code greater than every version code previously uploaded. Confirm build `38` is unused before uploading it.

## Sync Web Assets

```powershell
npm run cap:sync
```

This builds `www/`, copies the current web app and audio into Android assets, and updates Capacitor plugins.

Confirm packaged version and cache values:

```powershell
Select-String -Path android\app\src\main\assets\public\index.html -Pattern "APP_VERSION = '2.13.0'"
Select-String -Path android\app\src\main\assets\public\service-worker.js -Pattern 'neno-safari-v58'
```

## Build AAB And Tester APK

```powershell
cd android
.\gradlew.bat bundleRelease assembleDebug
cd ..
```

Expected outputs:

- Google Play upload: `android/app/build/outputs/bundle/release/app-release.aab`
- Tester install: `android/app/build/outputs/apk/debug/app-debug.apk`

For build 38, create this clearly named upload copy after the Gradle build succeeds:

```powershell
Copy-Item -LiteralPath android\app\build\outputs\bundle\release\app-release.aab `
  -Destination android\app\build\outputs\bundle\release\NenoSafari-2.13.0-build38.aab
```

Upload the `.aab` to Google Play. Do not upload the debug APK as a production release.

## Verify The Build

Check file hashes:

```powershell
Get-FileHash -Algorithm SHA256 android\app\build\outputs\bundle\release\NenoSafari-2.13.0-build38.aab
Get-FileHash -Algorithm SHA256 android\app\build\outputs\apk\debug\app-debug.apk
```

Build 38 hashes and signing evidence are recorded in `docs/RELEASE_NOTES_2.13.0_BUILD38.md`. Historical build 31 evidence remains in `docs/RELEASE_NOTES_2.6.0_BUILD31.md`.

Verify the AAB signature:

```powershell
& "$env:JAVA_HOME\bin\jarsigner.exe" -verify android\app\build\outputs\bundle\release\NenoSafari-2.13.0-build38.aab
```

The command must report `jar verified`.

Verify package and SDK metadata from the generated debug APK using the newest installed Android build-tools `aapt.exe`:

```powershell
$sdk = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } else { Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
$aapt = Get-ChildItem (Join-Path $sdk 'build-tools') -Recurse -Filter aapt.exe |
  Sort-Object FullName -Descending |
  Select-Object -First 1 -ExpandProperty FullName
& $aapt dump badging android\app\build\outputs\apk\debug\app-debug.apk |
  Select-String -Pattern 'package:|targetSdkVersion'
```

Expected metadata:

```text
package: name='com.nenosafari' versionCode='38' versionName='2.13.0'
targetSdkVersion:'36'
```

## Google Play Upload

1. Open Google Play Console and select Neno Safari.
2. Open the intended testing or production track.
3. Create a new release.
4. Upload `NenoSafari-2.13.0-build38.aab`.
5. Confirm package, version name, and version code shown by Play Console.
6. Paste the current notes from `docs/PLAY_STORE_LISTING.md`.
7. Resolve blocking Play Console declarations or policy tasks.
8. Save, review, and roll out to the chosen track.
9. Use staged rollout for production and monitor crashes, ANRs, reviews, and installs.

## Release Notes

```text
More reliable progress and rewards:
- Daily and Weekly replay rewards are now granted only once
- Resumed games restore found words and highlighted letters
- Daily streak rewards and Weekly Challenges rotate accurately
- Damaged save fields no longer erase healthy progress
```

The current player-facing notes are maintained in `docs/PLAY_STORE_LISTING.md`.

## Common Upload Problems

### Existing Users Cannot Upgrade

- Confirm the package is exactly `com.nenosafari`.
- Confirm the new version code is higher than every previously uploaded bundle.
- Do not reuse build 38 after Play Console has accepted it; increment the version code again.

### Release Does Not Add A Bundle

- Remove an unchanged draft release and create a fresh release, or upload a bundle with a new version code.
- Confirm the `.aab` finished uploading and appears under App Bundles.

### Release Signing Fails

- Confirm `android/keystore.properties` exists locally or all `NENO_SAFARI_UPLOAD_*` variables are set.
- Confirm the keystore path and alias match `docs/ANDROID_SIGNING.md`.
- Never replace the established upload key unless Play Console's upload-key reset process requires it.

### Target API Warning

- Confirm `targetSdkVersion = 36` in `android/variables.gradle`.
- Confirm Android SDK 36 is installed in Android Studio.
- Re-run `npm run cap:sync` and rebuild after changing SDK values.

## Post-Upload Checklist

- Confirm internal testers can install or upgrade.
- Test launch, language switching, word dragging, pronunciation, saved-word review, Daily Puzzle, offline restart, Android back navigation, and haptics.
- Confirm the privacy policy URL works publicly.
- Confirm release notes match the uploaded build.
- Monitor Play Console pre-launch, crash, and ANR reports before expanding rollout.

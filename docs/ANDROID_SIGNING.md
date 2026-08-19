# Android Release Signing

> Signing workflow for Neno Safari 2.13.0, Android build 38.

Neno Safari supports release signing without committing secrets.

## Live Release Reminder

The app is live on Google Play, so keep the upload key safe and do not rotate signing settings unless Play Console requires it. Before every live build, run the release checklist in `docs/ANDROID_BETA.md`.

After signing is configured, follow `docs/ANDROID_RELEASE_BUILD.md` for the complete sync, build, verification, and Play Console upload workflow.

## Local File Option

Create this file locally:

```text
android/keystore.properties
```

Use this format:

```properties
storeFile=release/neno-safari-upload-key.jks
storePassword=your-local-password
keyAlias=neno-safari
keyPassword=your-local-password
```

`android/keystore.properties` and `*.jks` files are ignored by Git.

## Environment Variable Option

You can also set:

```powershell
$env:NENO_SAFARI_UPLOAD_STORE_FILE="release/neno-safari-upload-key.jks"
$env:NENO_SAFARI_UPLOAD_STORE_PASSWORD="your-local-password"
$env:NENO_SAFARI_UPLOAD_KEY_ALIAS="neno-safari"
$env:NENO_SAFARI_UPLOAD_KEY_PASSWORD="your-local-password"
```

## Generate A Local Upload Key

Run this from the project root:

```powershell
New-Item -ItemType Directory -Force -Path android\release
& "$env:JAVA_HOME\bin\keytool.exe" -genkeypair -v -keystore android\release\neno-safari-upload-key.jks -alias neno-safari -keyalg RSA -keysize 2048 -validity 10000
```

Keep this key safe. If you lose it, you may need to reset the upload key in Play Console.

## Build Release

```powershell
npm run cap:sync
cd android
.\gradlew.bat bundleRelease
```

For the current release, verify that Play Console reports package `com.nenosafari`, version `2.13.0`, version code `38`, and target API `36` before rollout.

The release bundle is created at:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

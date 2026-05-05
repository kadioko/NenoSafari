# Android Release Signing

Neno Safari supports release signing without committing secrets.

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

The release bundle is created at:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

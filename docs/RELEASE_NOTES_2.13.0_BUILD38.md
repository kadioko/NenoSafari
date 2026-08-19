# Neno Safari 2.13.0 Release Notes

> Google Play upload build 38, prepared and verified August 19, 2026.

## Upload Artifact

- File: `android/app/build/outputs/bundle/release/NenoSafari-2.13.0-build38.aab`
- Package: `com.nenosafari`
- Version name: `2.13.0`
- Version code: `38`
- Minimum API: `24`
- Target API: `36`
- AAB size: `4,913,205` bytes
- SHA-256: `D36058E3C77A68DE6232CB3E852CC0A41BE5D4D6A24216892D3066E860CD4454`
- Signing verification: passed (`jar verified`)
- Upload certificate SHA-256: `41:8E:B7:13:7D:46:47:CA:93:17:E9:88:1B:86:24:37:3E:64:49:74:A1:F0:AF:9E:17:6C:75:80:17:36:96:D1`
- Certificate match: same upload certificate as verified build 31

## Tester APK

- File: `android/app/build/outputs/apk/debug/app-debug.apk`
- Size: `13,349,677` bytes
- SHA-256: `25F49CC3A997D70B7057E74F5406D8BFE83589F483C0C2B415051AB9452B2D76`

## Google Play Notes - English

```text
More reliable progress and rewards:
- Daily and Weekly replay rewards are now granted only once
- Resumed games restore found words and highlighted letters
- Daily streak rewards and Weekly Challenges rotate accurately
- Damaged save fields no longer erase healthy progress
```

## Google Play Notes - Kiswahili

```text
Maendeleo na zawadi za kuaminika zaidi:
- Zawadi za Daily na Weekly hutolewa mara moja tu
- Mchezo uliorudishwa huonyesha maneno na herufi ulizopata
- Streak na Weekly Challenge sasa hubadilika kwa usahihi
- Save moja iliyoharibika haifuti maendeleo mengine
```

## Verification Summary

- Unit, content, storage, review, haptics, offline-pack, and app-boot tests passed.
- Real browser gameplay and bilingual language-switching flow passed.
- Phone layout passed on 320x568, 360x640, 390x844, and 412x915 viewports in both languages.
- All 432 expected pronunciation MP3 files are present.
- Production dependency audit reports zero vulnerabilities.
- Android release lint, R8 minification, resource shrinking, bundle signing, and debug APK assembly passed.
- Marketing-only artwork and screenshots are excluded from the installed app, reducing the signed AAB to 4.91 MB while retaining all runtime assets.
- Packaged web assets report app version `2.13.0`, query revision `v57`, and service-worker cache `v58`.

Upload the named `.aab` file, not the debug APK, to Google Play Console.

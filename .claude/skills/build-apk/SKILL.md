---
name: build-apk
description: Demo için Android release APK'sını yerelde üretir (ön kontroller, sürüm artırma, imzalama, çıktı yolu). Android telefona/tablete kurulacak APK istendiğinde kullan.
disable-model-invocation: true
argument-hint: '[ek not]'
paths: 'apps/mobile/**'
---

# Android release APK

Ek not: $ARGUMENTS

1. **Ön kontroller** — biri hata verirse dur ve raporla:
   - `pnpm --filter @b2b/mobile lint`
   - `pnpm --filter @b2b/mobile typecheck`
   - `cd apps/mobile && npx expo-doctor`
2. **Ortam.** JDK (`java -version`, `JAVA_HOME`; Expo SDK'nın istediği sürüm) ve Android SDK (`ANDROID_HOME` ya da `~/Library/Android/sdk`) var mı kontrol et. Eksikse kurulum adımını kullanıcıya söyle, kendin kurma.
3. **Sürüm.** `apps/mobile/app.json` içinde `expo.android.versionCode` değerini 1 artır (yoksa `1` ile ekle); `expo.version` değişecekse kullanıcıya sor.
4. **İmzalama.** Release imzalama anahtarı (keystore) ve şifreleri **repoya girmez** (`general/security.md`): anahtar repo dışında tutulur, şifreler ortam değişkeni ya da `~/.gradle/gradle.properties` ile verilir. Anahtar yoksa kullanıcıya `keytool` ile nasıl üretileceğini söyle; anahtar dosyasını oluşturma veya stage'leme.
5. **Build** (birini seç, kullanıcıya hangisini kullandığını söyle):
   - `cd apps/mobile && npx expo prebuild -p android` ardından `cd android && ./gradlew assembleRelease`
   - ya da `cd apps/mobile && npx expo run:android --variant release` (bağlı cihaz/emülatör varsa kurar da)
6. **Çıktı.** APK yolunu (`apps/mobile/android/app/build/outputs/apk/release/app-release.apk`), boyutunu ve `versionCode`'u raporla. Cihaza kurulum için `adb install -r <yol>` öner.

## Kurallar

- `ios/` ve `android/` klasörleri `.gitignore`'dadır ve prebuild ile üretilir; **elle düzenlenmez**. Native ayar gerekiyorsa `app.json` / config plugin ile yapılır.
- Yalnızca `app.json` sürüm değişikliği commit'lenecek değişikliktir; commit'i kullanıcı ister (`/commit`).
- Build hatasında log'un ilgili kısmını göster; Gradle önbelleğini silmek gibi yıkıcı adımlardan önce sor.

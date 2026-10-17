---
name: run-demo
description: Mobil uygulamayı yerelde çalıştırır — Metro'yu arka planda başlatır, iOS simülatörünü ve Android emülatörünü açar, bundle tamamlanınca ekran görüntüsü alır. Uygulamayı açıp denemek, ekranı görmek veya /screen-review öncesi cihaz hazırlamak istendiğinde kullan.
argument-hint: '[ios|android|both] [açılacak ekran]'
paths: 'apps/mobile/**'
allowed-tools:
  - Bash(xcrun simctl *)
  - Bash(~/Library/Android/sdk/emulator/emulator *)
  - Bash(~/Library/Android/sdk/platform-tools/adb *)
---

# Demoyu çalıştır

İstek: $ARGUMENTS (varsayılan: `both`)

1. **Metro.** Zaten çalışan bir Metro var mı bak (`lsof -i :8081`); yoksa `apps/mobile` içinde `CI=1 npx expo start` komutunu **arka planda** başlat ve log dosyasını not et. `CI=1` etkileşimli soruları kapatır.
2. **iOS simülatörü.**
   - `xcrun simctl list devices booted` boşsa `xcrun simctl list devices available` ile bir iPhone (tablet istenirse iPad) seç, `xcrun simctl boot <udid>` ve `open -a Simulator`.
   - Uygulamayı Expo Go'da aç: `xcrun simctl openurl booted exp://127.0.0.1:8081`.
3. **Android emülatörü.**
   - `~/Library/Android/sdk/platform-tools/adb devices` boşsa `~/Library/Android/sdk/emulator/emulator -list-avds` ile AVD seç ve arka planda başlat (`emulator -avd <ad>`); `adb wait-for-device` ve `adb shell getprop sys.boot_completed` `1` olana kadar bekle.
   - Uygulamayı aç: `adb reverse tcp:8081 tcp:8081`, ardından `adb shell am start -a android.intent.action.VIEW -d exp://127.0.0.1:8081` (APK kuruluysa onun paket adıyla `adb shell monkey -p <paket> 1`).
4. **Bundle'ı bekle.** Metro log'unda `Bundled` satırını ya da hata (`Error`, `Unable to resolve`, kırmızı ekran) çıkana kadar izle. Hata varsa log'un ilgili kısmını kullanıcıya göster ve dur.
5. **Ekran görüntüsü.**
   - iOS: `xcrun simctl io booted screenshot "$TMPDIR/run-demo-ios.png"`
   - Android: `~/Library/Android/sdk/platform-tools/adb exec-out screencap -p > "$TMPDIR/run-demo-android.png"`
   - Görüntüleri Read ile oku ve kısaca ne göründüğünü söyle.
6. **Özet.** Hangi cihazların açık olduğunu, Metro'nun durumunu ve görüntü yollarını Türkçe raporla; ayrıntılı inceleme için `/screen-review` öner.

## Notlar

- Expo Go açık uygulamayı her zaman yenilemez. Değişiklik görünmüyorsa uygulamayı kapatıp yeniden aç: iOS'ta `xcrun simctl terminate booted host.exp.Exponent` + `openurl`; Android'de `adb shell am force-stop host.exp.exponent` + yeniden `am start`.
- Android'de dokunma `adb shell input tap <x> <y>`, yazı `adb shell input text '<metin>'` ile yapılabilir (koordinatları ekran görüntüsünden çıkar).
- Yatay yön denemesi: Android'de `adb shell settings put system user_rotation 1`, iOS'ta simülatör menüsünden döndürme (kullanıcıya söyle).
- Metro'yu kullanıcı istemeden kapatma; iş bitince açık bıraktığını belirt.

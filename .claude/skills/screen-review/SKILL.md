---
name: screen-review
description: Çalışan simülatörden/emülatörden ekran görüntüsü alıp mobil arayüzü görsel olarak inceler (hizalama, boşluk, Türkçe metin, taşma, tutarlılık, demo kalitesi). UI'ın nasıl göründüğü kontrol edilmek istendiğinde kullan.
argument-hint: '[ios|android] [incelenecek ekran]'
paths: 'apps/mobile/**'
allowed-tools:
  - Bash(xcrun simctl io booted screenshot *)
  - Bash(xcrun simctl list devices booted*)
  - Bash(~/Library/Android/sdk/platform-tools/adb devices*)
  - Bash(~/Library/Android/sdk/platform-tools/adb exec-out screencap *)
---

# Ekran incelemesi

İstek: $ARGUMENTS

1. **Görüntü al** (varsayılan iOS). Uygulamanın ilgili ekranda açık olduğunu kullanıcıya teyit ettir.
   - iOS: `xcrun simctl io booted screenshot "$TMPDIR/screen-review-ios.png"`
   - Android: `~/Library/Android/sdk/platform-tools/adb exec-out screencap -p > "$TMPDIR/screen-review-android.png"`
   - Açık cihaz yoksa (`xcrun simctl list devices booted` boş) kullanıcıya `pnpm mobile:ios` ile açmasını söyle.
2. **Görüntüyü oku** (Read aracıyla) ve ekranın kaynak dosyalarını (`src/app/`, `src/features/`) bul.
3. **İncele:**
   - Hizalama, boşluk tutarlılığı, görsel hiyerarşi (başlık, fiyat, aksiyon butonu öne çıkıyor mu?)
   - Metin: Türkçe mi, yazım hatası, kesilen/taşan metin, İngilizce kalıntı
   - Para/tarih biçimi (`1.234,56 ₺`, `17.10.2026`)
   - Boş, yükleniyor ve hata durumları (gerekirse kullanıcıdan o durumu açmasını iste)
   - Safe area (çentik, alt çubuk), dokunma alanı büyüklüğü, kontrast
   - Diğer ekranlarla tutarlılık (aynı bileşen, aynı renk, aynı başlık stili)
   - Demo izlenimi: kurumsal ve güven veren bir görünüm mü?
4. **Rapor:** Türkçe, önem sırasıyla; her madde için sorun + ilgili `dosya:satır` + önerilen düzeltme. Kullanıcı istemeden düzeltme yapma.
5. Birden çok ekran/cihaz istenirse her biri için tekrarla; iOS–Android farklarını ayrıca belirt.

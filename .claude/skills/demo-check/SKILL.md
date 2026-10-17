---
name: demo-check
description: Müşteri demosu öncesi mobil uygulamanın hazır olup olmadığını kontrol eder (lint, typecheck, expo-doctor, mock veri kalitesi, TR/EN metinler, boş/hata durumları, Expo Go + APK dağıtımı). Demo öncesi "hazır mıyız" sorulduğunda kullan.
disable-model-invocation: true
---

# Demo öncesi kontrol

Her maddeyi kontrol et, sonunda ✅ / ⚠️ / ❌ ile Türkçe bir liste ver; düzeltilmesi gerekenleri öncelik sırasıyla öner (kendiliğinden düzeltme, önce kullanıcıya sor).

## Otomatik

- `pnpm --filter @b2b/mobile lint`
- `pnpm --filter @b2b/mobile typecheck`
- `cd apps/mobile && npx expo-doctor`

## Kod taraması

- Ekranlardan `mocks/` klasörüne doğrudan import var mı?
- Bileşenlerde sözlük dışı sabit metin, "Lorem ipsum", "Test", "TODO" ya da boş metin kalmış mı? TR ve EN sözlükleri eşit mi (`/add-translation tara`)?
- Her veri ekranında yükleniyor / hata / boş durumu var mı?
- Sabit renk/boşluk değeri (tema dışı) ya da numaralı token (`bg-primary-500`) var mı?
- Expo Go'da bulunmayan native modül eklenmiş mi?
- `console.log` kalmış mı?
- Para tutarı `Intl.NumberFormat('tr-TR', ...)` dışında biçimlendirilmiş mi?

## Mock veri

- Kenar durumlar mevcut mu (indirimli/indirimsiz firma, USD firması, limite yaklaşmış firma, iptal sipariş, uzun desen adı, görselsiz ürün)?
- Ana demo akışı (giriş → ana sayfa → katalog → desen detayı → sepet → ödeme → siparişlerim → hesap/numune talepleri) hem alıcı hem satış temsilcisi rolüyle uçtan uca tutarlı mı?
- Hazır perde / özel ölçü ayarı kapalıyken gizli, açılınca çalışıyor mu?
- Görseller `assets/` altında, kaynak/lisans listesinde ve internetsiz yükleniyor mu?
- Stok, termin veya beden kalıntısı var mı?

## Hatırlatma

- Uygulama ikonu, açılış ekranı ve uygulama adı (`app.json`) CEKA TEKSTİL'e uygun mu? Koyu temada açık renkli logo kullanılıyor mu?
- Açık/koyu tema, TR/EN dil, telefon/tablet ve dikey/yatay yönde ana ekranlar denendi mi?
- iOS: demo telefonunda Expo Go kurulu ve Metro ile aynı ağda mı?
- Android: güncel release APK (`/build-apk`) üretildi, `versionCode` artırıldı ve telefon + tablete kuruldu mu?

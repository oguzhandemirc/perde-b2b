---
name: demo-check
description: Müşteri demosu öncesi mobil uygulamanın hazır olup olmadığını kontrol eder (lint, typecheck, expo-doctor, mock veri kalitesi, Türkçe metinler, boş/hata durumları). Demo öncesi "hazır mıyız" sorulduğunda kullan.
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
- Arayüzde İngilizce, "Lorem ipsum", "Test", "TODO" ya da boş metin kalmış mı?
- Her veri ekranında yükleniyor / hata / boş durumu var mı?
- Sabit renk/boşluk değeri (theme dışı) var mı?
- `console.log` kalmış mı?
- Para tutarı `Intl.NumberFormat('tr-TR', ...)` dışında biçimlendirilmiş mi?

## Mock veri

- Kenar durumlar mevcut mu (stoksuz ürün, limit aşımı, iptal sipariş, görselsiz ürün)?
- Ana demo akışı (giriş → ürün → sepet → sipariş → sipariş geçmişi/cari) uçtan uca tutarlı mı?

## Hatırlatma

- Uygulama ikonu, açılış ekranı ve uygulama adı (`app.json`) müşteriye uygun mu?
- Demo cihazında Expo Go kurulu ve aynı ağda mı?

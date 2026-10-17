---
paths:
  - 'apps/mobile/src/services/**'
  - 'apps/mobile/src/mocks/**'
  - 'apps/web/src/services/**'
  - 'apps/web/src/mocks/**'
  - 'packages/**'
---

# Mock data ve veri katmanı kuralları

Demo aşamasında backend yoktur; ancak kod, backend geldiğinde **yalnızca servis katmanı değişecek** şekilde yazılır.

## Servis katmanı

- Her domain için bir servis: `services/productService.ts`, `orderService.ts`, `accountService.ts`...
- Servis fonksiyonları her zaman `async`'tir ve gerçek API'nin döneceği şekli döner (bkz. `docs/api/`). Mock olsa bile senkron veri dönülmez.
- Mock modunda gerçekçi gecikme eklenir (200–600 ms) ki yükleniyor durumları demoda görünsün.
- Veri kaynağı tek bir yerden seçilir: `EXPO_PUBLIC_DATA_SOURCE=mock|api` (varsayılan `mock`).
- Ekranlar ve bileşenler `mocks/` klasörünü **asla** doğrudan import etmez.
- Sayfalama, arama ve filtre parametreleri servis imzasında baştan yer alır (mock'ta bellekte uygulanır).

## Mock veri

- Tipler `types/` altındaki domain tipleriyle birebir uyumludur; mock için ayrı tip tanımlanmaz.
- Veri gerçekçi ve Türkçedir: CEKA TEKSTİL'in brode perde kataloğuna uygun desenler (`patternCode` ör. `BRD-2041`), gerçekçi firma adları, Türkiye ve ihracat adresleri. "Lorem ipsum", "Test Ürün 1", "asdf" kullanılmaz.
- Perde gerçekliği: her desenin renkleri ve boyları (ör. 280 / 300 / 320 cm) vardır; fiyat varyant bazında metre fiyatıdır. Uzunluk santimetre, para kuruş cinsinden tam sayıdır. Stok, stok durumu, termin, beden ve asorti verisi **üretilmez** (kapsam dışı, bkz. `domain/business-rules.md`).
- Platform ayarları (`PlatformSettings`) mock'ta tutulur; hazır perde ve özel ölçü kapalı başlar, açılınca akış çalışır.
- Kimlikler sabit ve okunabilir: `prd_001`, `ord_1042`, `cmp_003`, `smp_007` — her açılışta değişen rastgele id üretilmez.
- Kenar durumlar da veride bulunur:
  - indirim tanımlı firma ve hiç indirimi olmayan firma
  - USD (ihracat) firması — KDV satırı gösterilmez
  - kredi limitine yaklaşmış firma
  - iptal edilmiş sipariş
  - uzun desen adı
  - görseli olmayan ürün
  - satış temsilcisine atanmış birden çok firma
- Mock'ta yapılan değişiklikler (sepete ekleme, sipariş verme, numune talebi) uygulama açıkken bellekte tutulur; demo sırasında akış tutarlı olmalıdır. Oturum ve sepet ayrıca kalıcıdır (Zustand persist).
- Gerçek müşteri verisi mock'a kopyalanmaz (bkz. `general/security.md`).

## Görseller

- Ürün görselleri internetten bulunan **telifsiz** (Unsplash / Pexels lisanslı) brode perde / tül fotoğraflarıdır; uzak URL kullanılmaz, dosyalar `apps/mobile/assets/` altına gömülür ki demo internetsiz çalışsın.
- Her görselin kaynak URL'si, yazarı ve lisansı bir listede tutulur (ör. `apps/mobile/assets/products/SOURCES.md`). Listede olmayan görsel eklenmez.
- Görseller makul boyuta küçültülür (uygulama boyutu ve APK için).

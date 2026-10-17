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
- Veri gerçekçi ve Türkçedir: gerçekçi firma/ürün adları, Türkiye adresleri, ₺ fiyatlar. "Lorem ipsum", "Test Ürün 1", "asdf" kullanılmaz.
- Kimlikler sabit ve okunabilir: `prd_001`, `ord_1042`, `cmp_003` — her açılışta değişen rastgele id üretilmez.
- Kenar durumlar da veride bulunur: stokta olmayan ürün, kredi limitine yaklaşmış firma, iptal edilmiş sipariş, uzun ürün adı, görseli olmayan ürün.
- Mock'ta yapılan değişiklikler (sepete ekleme, sipariş verme) uygulama açıkken bellekte tutulur; demo sırasında akış tutarlı olmalıdır.
- Gerçek müşteri verisi mock'a kopyalanmaz (bkz. `general/security.md`).

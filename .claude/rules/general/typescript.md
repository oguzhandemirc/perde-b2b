---
paths:
  - '**/*.{ts,tsx}'
---

# TypeScript / JavaScript kuralları

- Her yerde TypeScript, `strict: true`. Yeni `.js` dosyası yalnızca yapılandırma dosyaları için.
- `any` kullanılmaz; bilinmeyen veri `unknown` alınır ve daraltılır. `as` ile tip zorlaması son çaredir, `!` (non-null assertion) kullanılmaz.
- Nesne şekilleri için `type`; genişletilmesi beklenen sözleşmeler için `interface`. Bir dosyada tutarlı olunur.
- `enum` yerine string literal union + `as const` nesne: `type OrderStatus = 'draft' | 'submitted' | ...`.
- Fonksiyon parametreleri ve dönüş tipleri dışa açık (export edilen) fonksiyonlarda açıkça yazılır.
- `null` ve `undefined` karıştırılmaz: "değer yok" için `undefined`, API'den gelen boş alan için `null`.
- Asenkron kodda `async/await`; `.then` zinciri kurulmaz. Yakalanan hata kullanıcıya anlamlı bir mesaja çevrilir, sessizce yutulmaz.
- Import sırası: harici paketler → workspace paketleri (`@b2b/*`) → göreli import'lar. Kullanılmayan import bırakılmaz.
- Varsayılan export yerine isimli export (Expo Router rota dosyaları hariç; onlar `default export` ister).
- İş bitmeden önce: `pnpm lint` ve `pnpm typecheck` hatasız olmalı.

## Para ve sayılar

- Para tutarları **asla** `number` ile hesaplanmaz (kayan nokta hatası). Kuruş cinsinden tam sayı (`amountMinor: 12345` = 123,45 ₺) tutulur; gösterimde biçimlendirilir.
- Para tipi her zaman para birimiyle birlikte taşınır: `{ amountMinor: number; currency: 'TRY' | 'USD' | 'EUR' }`.
- Biçimlendirme `Intl.NumberFormat('tr-TR', { style: 'currency', currency })` ile; elle string birleştirilmez.
- Tarih gösterimi `tr-TR` biçiminde (`17.10.2026`); saklama/aktarım ISO 8601.

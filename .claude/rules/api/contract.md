---
paths:
  - 'docs/api/**'
  - 'apps/backend/**'
  - 'apps/*/src/services/**'
  - 'apps/*/src/types/**'
  - 'packages/**'
---

# API sözleşmesi kuralları

Frontend (Oğuzhan) ile backend (Yusuf) arasındaki sözleşme `docs/api/` altında tutulur. Bu sözleşme iki tarafın da dayandığı ortak kaynaktır.

- Bir uç, alan adı veya veri şekli değişiyorsa önce `docs/api/` güncellenir; kod sonra.
- Değişiklik önce `docs/api/`'ye yazılır; karşı taraf PR açıklamasında etiketlenip bilgilendirilir (onay beklenmez). PR şablonundaki "API sözleşmesi" kutusu işaretlenir.
- Kırıcı (breaking) değişiklik **önceden** karşı tarafla konuşulur.
- Mock servisler sözleşmedeki şekli döner; mock'a sözleşmede olmayan alan eklenmez. Demo için yeni alan gerekiyorsa sözleşmeye "öneri" olarak eklenir.
- Alan adları `camelCase`, isimler `glossary.md` ile aynı.
- Kırıcı (breaking) değişiklik eski istemcileri bozacaksa sürümleme veya geçiş planı yazılır.

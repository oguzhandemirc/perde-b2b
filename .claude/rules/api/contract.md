---
paths:
  - 'docs/api/**'
  - 'apps/backend/**'
  - 'apps/*/src/services/**'
  - 'apps/*/src/types/**'
  - 'packages/**'
---

# API sözleşmesi kuralları

Frontend (Oğuzhan) ile backend (Yusuf) arasındaki sözleşme `docs/api/` altında tutulur. Bu sözleşme **ortak karardır**.

- Bir uç, alan adı veya veri şekli değişiyorsa önce `docs/api/` güncellenir; kod sonra.
- Sözleşme değişikliği tek taraflı yapılmaz: kullanıcıya diğer tarafın onayının gerektiğini belirt. PR şablonundaki "API sözleşmesi" kutusu işaretlenir.
- Mock servisler sözleşmedeki şekli döner; mock'a sözleşmede olmayan alan eklenmez. Demo için yeni alan gerekiyorsa sözleşmeye "öneri" olarak eklenir.
- Alan adları `camelCase`, isimler `glossary.md` ile aynı.
- Kırıcı (breaking) değişiklik eski istemcileri bozacaksa sürümleme veya geçiş planı yazılır.

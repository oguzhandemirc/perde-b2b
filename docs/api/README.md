# API sözleşmesi

Frontend (mobil, web) ile backend arasındaki ortak sözleşme. Değişiklikler iki tarafın onayıyla yapılır (bkz. `.claude/rules/api/contract.md`).

> Henüz uç tanımlanmadı. Demo sırasında mock servislerin ihtiyaç duyduğu uçlar buraya **öneri** olarak eklenir; backend başlarken Yusuf'la birlikte kesinleştirilir. Format (OpenAPI dosyası mı, markdown mı) backend teknolojisiyle birlikte seçilecek.

## Genel kurallar (öneri)

- JSON, alan adları `camelCase`, isimler `.claude/rules/domain/glossary.md` ile aynı.
- Tarihler ISO 8601 (UTC).
- Para: `{ "amountMinor": 12345, "currency": "TRY" }`.
- Liste yanıtı: `{ "items": [...], "page": 1, "pageSize": 20, "total": 134 }`.
- Hata yanıtı: `{ "error": { "code": "CREDIT_LIMIT_EXCEEDED", "message": "Kullanıcıya gösterilebilir Türkçe mesaj", "details": {} } }`.

## Uçlar

| Uç  | Durum | Açıklama |
| --- | ----- | -------- |
| —   | —     | —        |

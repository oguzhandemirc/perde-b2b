---
paths:
  - 'apps/backend/**'
---

# Backend kuralları

> Backend Yusuf'un alanıdır. Teknoloji seçimi yapılmadı; seçim yapılınca bu dosya Yusuf'la birlikte doldurulur ve karar `docs/adr/` altına yazılır.

- Bu klasörde değişiklik yapmadan önce kullanıcıya Yusuf'un alanı olduğunu hatırlat.
- Fiyat, iskonto, KDV, stok, kredi limiti hesapları ve tüm yetki kontrolleri backend'de yapılır; istemciden gelen fiyata güvenilmez.
- Para tutarları veritabanında ondalık (decimal) ya da kuruş cinsinden tam sayı olarak saklanır; float kullanılmaz.
- API sözleşmesi `docs/api/` altındadır; uçlar oradaki tanımla uyumlu olmalıdır.
- Hata yanıtları tek bir biçimde döner (bkz. `docs/api/README.md`).

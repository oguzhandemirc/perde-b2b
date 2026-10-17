---
name: api-proposal
description: Frontend'in (mobil/web) ihtiyaç duyduğu bir API ucu için docs/api altına sözleşme önerisi yazar ve backend'e (Yusuf) iletilecek kısa özet çıkarır. Yeni bir veri ihtiyacı, ekran veya mock servis backend'den veri bekleyeceği zaman kullan.
argument-hint: '<ihtiyaç: ör. ürün listesi filtreleme>'
---

# API sözleşmesi önerisi

İhtiyaç: $ARGUMENTS

1. `.claude/rules/api/contract.md`, `docs/api/README.md` ve `.claude/rules/domain/glossary.md` dosyalarını oku. Aynı ihtiyacı karşılayan bir uç zaten varsa onu genişletmeyi öner, yenisini açma.
2. İhtiyacı kullanan ekranı/servisi bul (`apps/*/src/services/`, `src/types/`); mevcut mock şekliyle tutarlı ol.
3. `docs/api/<kaynak>.md` dosyasına (ör. `products.md`, `orders.md`) şu başlıklarla yaz:
   - **Durum:** `Öneri` (Yusuf onaylayınca `Kabul edildi`)
   - **Uç:** metot + yol (`GET /products`), REST isimlendirme, çoğul kaynak adı
   - **Yetki:** hangi rol erişebilir
   - **İstek:** path/query parametreleri (sayfalama, arama, filtre, sıralama), gövde şeması
   - **Yanıt:** örnek JSON — `camelCase`, para `{ amountMinor, currency }`, tarih ISO 8601, liste `{ items, page, pageSize, total }`
   - **Hatalar:** olası `error.code` değerleri ve Türkçe mesaj örnekleri
   - **Notlar:** iş kuralı varsayımları (`business-rules.md`'ye referansla), açık sorular
4. `docs/api/README.md` içindeki "Uçlar" tablosuna satırı `Öneri` durumuyla ekle.
5. Frontend tipini (`src/types/`) ve mock servisi öneriyle uyumlu hale getir; uyumsuzluk varsa kullanıcıya söyle.
6. Sonunda Yusuf'a gönderilebilecek 3–5 maddelik Türkçe özet yaz (ne gerekiyor, neden, hangi ekran kullanıyor, açık sorular).

Kullanıcıya hatırlat: sözleşme ortak karardır; Yusuf onaylamadan `Kabul edildi` yazılmaz.

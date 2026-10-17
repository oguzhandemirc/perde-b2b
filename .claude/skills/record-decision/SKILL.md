---
name: record-decision
description: Konuşmada netleşen bir gereksinimi, iş kuralını veya teknik kararı proje dokümanlarına işler (docs/gereksinimler.md, business-rules.md, docs/adr). Kullanıcı bir kuralı/kararı netleştirdiğinde veya "bunu kaydet" dediğinde kullan.
argument-hint: '<karar veya gereksinim>'
---

# Karar / gereksinim kaydı

Kaydedilecek: $ARGUMENTS

Kararın türüne göre doğru yere yaz:

- **İş kuralı** (fiyat, sipariş, cari, rol, akış): `.claude/rules/domain/business-rules.md` içindeki ilgili maddeyi `[VARSAYIM]` → `[KARAR]` yap ya da yeni `[KARAR]` maddesi ekle; "Açık sorular"dan cevaplananı çıkar. Aynı kararı `docs/gereksinimler.md` dosyasına tarihle ekle.
- **Özellik / kapsam** (ilk sürümde ne var, ne yok): `docs/gereksinimler.md`.
- **Yeni domain terimi:** `.claude/rules/domain/glossary.md`.
- **Teknik karar** (kütüphane, mimari, araç): `docs/adr/NNNN-kisa-baslik.md` — `docs/adr/0000-sablon.md` şablonuyla, sıradaki numarayla.
- **API sözleşmesi:** `docs/api/` — kullanıcıya diğer tarafın onayının gerektiğini hatırlat.

Kurallar:

- Kullanıcının söylemediği bir şeyi karar diye yazma; belirsiz kalan kısmı "Açık sorular"a ekle.
- Tarih biçimi `YYYY-AA-GG`.
- Bitince neyi nereye yazdığını tek cümleyle söyle.

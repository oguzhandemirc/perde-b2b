---
name: mock-data
description: Demo için mock veri seti oluşturur veya genişletir (ürün, firma, sipariş, cari vb.). Mock veri eklenmesi, çoğaltılması ya da demo verisinin gerçekçi hale getirilmesi istendiğinde kullan.
argument-hint: '<domain> [adet / senaryo]'
---

# Mock veri

İstek: $ARGUMENTS

1. `.claude/rules/mobile/mock-data.md` ve `.claude/rules/domain/glossary.md` kurallarını uygula.
2. Mevcut mock dosyalarını ve tipleri oku; id biçimini ve dosya düzenini koru (`prd_001`, `cmp_003`...).
3. Veriler birbirine tutarlı bağlansın: siparişteki ürünler ürün listesinde, firmanın fiyat listesi tanımlı, cari bakiye hareketlerin toplamıyla uyumlu.
4. Her sette demo için şu kenar durumları bulunsun: stoksuz ürün, düşük stok, kredi limitine yaklaşmış/aşmış firma, iptal edilmiş ve teslim edilmiş sipariş, uzun isim, görselsiz ürün.
5. Fiyatlar kuruş cinsinden tam sayı (`amountMinor`), KDV oranı ürün bazında (%1, %10, %20).
6. Müşterinin sektörü `business-rules.md` içinde netleşmişse ürünler o sektöre uygun olsun; netleşmemişse kullanıcıya sor.
7. Bitince typecheck çalıştır ve eklenen veriyi (kaç kayıt, hangi senaryolar) kısaca özetle.

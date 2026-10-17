---
name: mock-data
description: Demo için mock veri seti oluşturur veya genişletir (desen/ürün, firma, sipariş, numune talebi, cari vb.). Mock veri eklenmesi, çoğaltılması ya da demo verisinin gerçekçi hale getirilmesi istendiğinde kullan.
argument-hint: '<domain> [adet / senaryo]'
---

# Mock veri

İstek: $ARGUMENTS

1. `.claude/rules/mobile/mock-data.md` ve `.claude/rules/domain/glossary.md` kurallarını uygula.
2. Mevcut mock dosyalarını ve tipleri oku; id biçimini ve dosya düzenini koru (`prd_001`, `cmp_003`, `smp_007`...).
3. Veriler birbirine tutarlı bağlansın: siparişteki varyantlar (desen + renk + boy) ürün listesinde, firmanın para birimine uygun fiyat listesi tanımlı, indirimler var olan firma + ürün çiftlerinde, cari bakiye hareketlerin toplamıyla uyumlu.
4. Her sette demo için şu kenar durumları bulunsun: indirimli ve indirimsiz firma, USD (ihracat) firması, kredi limitine yaklaşmış firma, iptal edilmiş ve teslim edilmiş sipariş, uzun desen adı, görselsiz ürün. Stok, termin, beden, asorti verisi üretme (kapsam dışı).
5. Fiyatlar varyant bazında metre fiyatı, kuruş cinsinden tam sayı (`amountMinor`); uzunluklar santimetre (`lengthCm`, `rollLengthCm`). KDV oranı ürün bazında. Görseller telifsiz, `assets/` altında ve kaynak/lisans listesinde.
6. Ürünler `business-rules.md`'deki brode perde gerçekliğine uygun olsun (kumaş türü, koleksiyon, boy); orada olmayan bir kural gerekirse kullanıcıya sor.
7. Bitince typecheck çalıştır ve eklenen veriyi (kaç kayıt, hangi senaryolar) kısaca özetle.

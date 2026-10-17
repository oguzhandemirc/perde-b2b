# İş kuralları

> **Durum: TASLAK.** Müşteriyle henüz doğrulanmadı. `[VARSAYIM]` ile işaretli maddeler, demo için kabul edilen tipik B2B davranışlarıdır. Kesinleşen kural `[KARAR]` olarak işaretlenir ve `docs/gereksinimler.md` dosyasına da yazılır.
> Claude: Burada olmayan bir iş kuralına ihtiyaç duyarsan uydurma, kullanıcıya sor. Demo için mecburen varsayım yaparsan kodda `// ASSUMPTION:` yorumuyla işaretle ve kullanıcıya bildir.

## Müşteri ve iş modeli

- [KARAR] Müşteri bir **tekstil fabrikası**; kendi ürettiği ürünleri satar.
- [KARAR] Fabrika ürünlerini sisteme ekler; alıcı firmalar (müşteriler) uygulamadan sipariş verir ve **ödeme yapar**.
- [VARSAYIM] Ürün yapısı: model → renk → beden. Her renk/beden kombinasyonu bir varyanttır (`ProductVariant`, kendi `sku`'su).
- [VARSAYIM] Toptan satış **asorti (seri)** ile yapılır: bir seri, sabit beden dağılımıdır (ör. S:1 M:2 L:2 XL:1 = 6 adet). Müşteri renk başına seri adedi seçer.
- [VARSAYIM] Ürün bilgileri: model kodu, ad, kategori, sezon/koleksiyon, kumaş içeriği (ör. %95 pamuk %5 elastan), gramaj, görseller, renkler, beden aralığı, seri dağılımı, fiyat.

## Kullanıcılar

- [VARSAYIM] Platform kapalı devredir: yalnızca onaylı firma kullanıcıları giriş yapar, fiyatlar girişten sonra görünür.
- [VARSAYIM] Bir firmanın birden çok kullanıcısı olabilir; her kullanıcının rolü vardır.
- [VARSAYIM] Satış temsilcisi, atandığı firmalar adına sipariş oluşturabilir.

## Ürün ve fiyat

- [VARSAYIM] Her firmanın bir fiyat listesi vardır; fiyat = liste fiyatı → firma iskontoları (kademeli) → net fiyat → + KDV.
- [VARSAYIM] Fiyatlar KDV hariç gösterilir, KDV sepette/özette ayrı satırda gösterilir.
- [VARSAYIM] Fiyat model bazında birim (adet) fiyattır; seri fiyatı = birim fiyat × seri adedi. Bedene göre fiyat farkı **açık soru**.
- [VARSAYIM] Minimum sipariş: model başına en az 1 seri.
- [VARSAYIM] Stok miktarı yerine stok durumu gösterilir: `in_stock`, `low_stock`, `out_of_stock`.

## Sipariş

- [VARSAYIM] Sipariş durumları: `draft` → `submitted` → `approved` → `preparing` → `shipped` → `delivered`; yan durumlar: `rejected`, `cancelled`.
- [VARSAYIM] Sipariş, firmanın kredi limitini aşıyorsa uyarı verilir (engellenip engellenmeyeceği **açık soru**).
- [VARSAYIM] Geçmiş siparişten "tekrar sipariş ver" ile sepet oluşturulabilir.

## Cari ve ödeme

- [VARSAYIM] Firma cari bakiyesini, kredi limitini, vadesi geçmiş tutarı ve hareketlerini görebilir.
- [KARAR] Uygulama içinden ödeme yapılabilir.
- [VARSAYIM] Ödeme yöntemleri: kredi kartı (sanal POS), havale/EFT ve açık hesap (cari). Demoda kart ödemesi sahte (mock) bir akışla gösterilir.

## Açık sorular (müşteriye sorulacak)

1. Ürün sayısı, alıcı firma sayısı yaklaşık kaç? Alıcılar kim: mağazalar, toptancılar, yurt dışı alıcılar?
2. Satış her zaman asorti/seri ile mi, tek beden adet satışı da var mı? Seri dağılımı model bazında mı sabit?
3. Stoktan satış mı, üretime sipariş mi (termin tarihli), ikisi birden mi?
4. Fiyatlandırma: tüm alıcılara aynı mı, firma/grup bazlı mı? İskonto kademeleri? Döviz (USD/EUR) fiyat var mı? Bedene göre fiyat farkı?
5. Ödeme yöntemleri hangileri; hangi sanal POS / ödeme kuruluşu? Peşin ödemede iskonto var mı?
6. Kredi limiti aşımında sipariş engellenir mi, onaya mı düşer?
7. Sipariş onay süreci var mı (fabrika onayı)?
8. Fabrika ürünleri nereden ekleyecek: web yönetim paneli mi, mobil mi? ERP'den aktarım var mı (Logo, Mikro, Netsis, SAP...)?
9. Numune talebi, kampanya, iade süreçleri ilk sürümde var mı?

# İş kuralları

> **Durum: TASLAK.** Müşteriyle henüz tam doğrulanmadı. `[VARSAYIM]` ile işaretli maddeler, demo için kabul edilen davranışlardır. Kesinleşen kural `[KARAR]` olarak işaretlenir ve `docs/gereksinimler.md` dosyasına da yazılır.
> Claude: Burada olmayan bir iş kuralına ihtiyaç duyarsan uydurma, kullanıcıya sor. Demo için mecburen varsayım yaparsan kodda `// ASSUMPTION:` yorumuyla işaretle ve kullanıcıya bildir.

## Müşteri ve iş modeli

- [KARAR] Müşteri **CEKA TEKSTİL**, bir **brode perde fabrikası**; kendi ürettiği perdeleri satar. Giyim değildir: beden, asorti/seri, gramaj gibi kavramlar kullanılmaz.
- [KARAR] Fabrika ürünlerini sisteme ekler; alıcı firmalar uygulamadan sipariş verir ve **ödeme yapar**.
- [KARAR] Alıcılar: perdeci mağazalar, toptancılar, ihracat alıcıları, proje müşterileri (iç mimar, otel).
- [KARAR] **Stok ve üretim kapsam dışıdır.** Stok durumu, stok miktarı ve termin gösterilmez; fabrikada stok yoksa üretilir.

## Ürün yapısı

- [KARAR] Varyant yapısı: **desen → renk → boy**. Ürün = desen (`patternCode`, ör. `BRD-2041`). Boy, kumaş eni olan perde yüksekliğidir (ör. 280 / 300 / 320 cm).
- [KARAR] Her desen + renk + boy kombinasyonu bir varyanttır ve kendi stok kodu (`sku`) vardır.
- [KARAR] Satış birimleri: metre (toptan kesim), bütün top, hazır (dikili) perde, özel ölçü (siparişe dikim).
- [KARAR] Metre ve bütün top varsayılan olarak açıktır. Hazır perde ve özel ölçü **tüm platform için tek bir ayarla** (fabrika ayarı) açılır/kapanır. Demoda kapalı başlar; açık hâli de gösterilebilir olmalıdır.
- [VARSAYIM] Metre siparişinde minimum 1 m, artış 0,5 m; top uzunluğu 50 m. Bu değerler ürün bazlı alanlarda tutulur (`minOrderLengthCm`, `orderStepLengthCm`, `rollLengthCm`).
- [KARAR] Uzunluk ve tutar hesabında kayan nokta kullanılmaz: uzunluk santimetre, para kuruş (minor unit) cinsinden tam sayıdır.
- [VARSAYIM] Kumaş türleri: tül, vual, keten görünümlü, şifon, organze. Gerçek liste müşteriden gelecek.

## Kullanıcılar ve roller

- [VARSAYIM] Platform kapalı devredir: yalnızca onaylı firma kullanıcıları giriş yapar, fiyatlar girişten sonra görünür.
- [KARAR] Satıcı (fabrika) ve alıcı aynı uygulamayı kullanır; sekmeler role göre değişir.
- [KARAR] Satıcı rolleri:
  - `sales_rep` (satış temsilcisi): yalnızca atandığı firmaları görür; sahada tahsilat girer.
  - `accounting` (muhasebe/finans): tüm firmalar; limit ve vade yönetir.
  - `manager` (yönetici/patron): tüm firmalar + yönetici özet paneli.
- [KARAR] Alıcı rolleri: `owner` (sahip), `finance` (finans), `buyer` (satın almacı). Cariyi yalnızca `owner` ve `finance` görür; `buyer` yalnızca sipariş verir.
- [KARAR] Satış temsilcisi giriş yapınca atandığı firmalardan birini seçer; ardından o firmanın fiyat ve indirimleriyle aynı sipariş akışını kullanır. Seçili firma üst çubukta görünür.
- [VARSAYIM] Limit aşan siparişi onaylama/reddetme yetkisi `accounting` ve `manager` rollerindedir; `sales_rep` onaylayamaz.

## Fiyat

- [KARAR] Para birimi firmaya göredir: yurt içi firma TRY, ihracat firması USD veya EUR. Bir sepette tek para birimi bulunur.
- [KARAR] Fiyat **varyant** (desen + renk + boy) düzeyinde, metre başına birim fiyattır; boya göre değişir.
- [KARAR] Metre ve top aynı birim fiyattır: top fiyatı = metre fiyatı × top uzunluğu.
- [KARAR] Varsayılan olarak herkes **liste fiyatını** görür. Bir firmaya bir üründe indirim tanımlanmışsa o firma o üründe liste fiyatını ve indirimi birlikte görür; indirim fark edilir şekilde gösterilir. İndirim ürün bazındadır, tüm ürünlerde olmak zorunda değildir.
- [VARSAYIM] Fiyatlar KDV hariç gösterilir; KDV sepet ve özette ayrı satırdadır. İhracat (USD/EUR) firmalarında KDV satırı gösterilmez. KDV oranı ürün bazında tutulur. (Müşteriye teyit ettirilecek.)
- [VARSAYIM] Liste fiyatları para birimi başına ayrı tutulur (TRY, USD, EUR fiyat listeleri); döviz çevirisi yapılmaz.

## Sipariş

- [KARAR] Demo akışı: giriş (rol seçmeli mock giriş: alıcı firma kullanıcısı, satış temsilcisi; önceden doldurulmuş demo hesaplar) → ana sayfa (yeni koleksiyon, öne çıkanlar, indirimli ürünler) → katalog (desen grid'i; kumaş türü, koleksiyon, boy, renk filtresi) → desen detayı (renk, boy, metre/top, miktar, numune/kartela iste) → sepet → ödeme → siparişlerim → hesap (cari, numune taleplerim).
- [VARSAYIM] Sipariş durumları: `draft` → `submitted` → `approved` → `preparing` → `shipped` → `delivered`; yan durumlar: `pending_credit_approval`, `rejected`, `cancelled`.
- [KARAR] Kredi limitini aşan sipariş engellenmez, **onaya düşer**: alıcı uyarıyı görür ama gönderebilir; sipariş `pending_credit_approval` ("limit onayı bekliyor") durumuna geçer; muhasebe/yönetici onaylarsa `approved`, reddederse `rejected` olur.
- [VARSAYIM] Limit kontrolü: açık bakiye (tüm alt hesapların TL karşılığı) + yeni sipariş tutarı > `creditLimit`.
- [VARSAYIM] Geçmiş siparişten "tekrar sipariş ver" ile sepet oluşturulabilir.
- [KARAR] Teklif (`Quote`) akışı sonraki sürümdedir; demoda yoktur.

## Numune ve kartela

- [KARAR] Demoda basit numune / kartela talebi vardır: desen detayında "Numune iste" / "Kartela iste", hesapta talepler listesi ve durumu.
- [VARSAYIM] Talep durumları: `preparing` (hazırlanıyor) → `shipped` (kargoda) → `delivered` (teslim edildi).

## Cari hesap

- [KARAR] Cari kayıtlarını **bu sistem tutar** (ERP'den okunmaz). Backend kapsamını büyütür; Yusuf'la ayrıca konuşulacak.
- [KARAR] Satıcı tarafı müşterilerin carisini, alıcı firma (`owner`, `finance`) kendi carisini izler.
- [KARAR] Hareket tipleri: satış/sevk kaydı (borç), iade (alacak), havale/EFT, kredi kartı, çek, senet, nakit, kur farkı, açılış/devir.
- [KARAR] Borç kaydı = teslim edilen satış. Resmi fatura sonradan kesilebilir; kayıtta fatura durumu (faturalandı / faturalanacak) ve fatura no tutulur.
- [KARAR] Kayıt dışı / faturasız satış için ayrı defter **tasarlanmaz** (yasal yükümlülük).
- [KARAR] Firma başına **TL ve döviz ayrı alt hesaplar** tutulur. Döviz bakiyenin TL karşılığı TCMB döviz satış kuruyla gösterilir (demoda sabit mock kurlar). Kur farkı kaydını muhasebe elle girer.
- [KARAR] **Her borç kaydının kendi vadesi** vardır: kayıt tarihi + firmanın `paymentTermDays`'i.
- [KARAR] Ödemeler en eski borçtan başlayarak kapatılır (FIFO). Vadesi geçen tutar, gecikme günü ve ortalama vade hesaplanır.
- [VARSAYIM] Ortalama vade, kalan tutarlarla ağırlıklı ortalama vade tarihidir.
- [KARAR] Mutabakat şimdilik yok (satıcı ve alıcı tarafında).

### Satıcı aksiyonları

- [KARAR] Tahsilat girişi (nakit, çek, senet, havale): numaralı PDF makbuz oluşur, paylaşılabilir (WhatsApp / e-posta) ve alıcının carisinde anında görünür.
- [KARAR] Ödeme hatırlatma: demoda uygulama içi bildirim (Android Expo Go'da push yok).
- [KARAR] Limit / vade düzenleme (`accounting`); her değişikliğin geçmişi tutulur.
- [KARAR] Çek/senet portföyü (basit): vade tarihi, banka/keşideci, tutar, durum (portföyde / tahsil edildi / karşılıksız-protestolu).
- [KARAR] Firma listesi: sıralama riske göre (varsayılan), alfabetik, bakiyeye göre. Satırda bakiye, vadesi geçen tutar ve limit kullanım çubuğu; arama ve filtre (temsilci, para birimi, durum).
- [VARSAYIM] Risk sıralaması: önce vadesi geçen tutarın TL karşılığı, eşitlikte limit kullanım oranı.
- [KARAR] Yönetici özet paneli: toplam alacak ve vadesi geçen (TL ve döviz ayrı; yaşlandırma 0–30 / 31–60 / 61–90 / 90+ gün), en riskli firmalar, temsilci bazlı tahsilat, onay bekleyen siparişler (tek dokunuşla onay/ret), satış göstergeleri.
- [VARSAYIM] Satış göstergeleri: bu ay satış tutarı ve metresi (önceki aya göre değişimle), son 6 ay satış trendi, en çok satan desenler, en çok alım yapan firmalar.

### Alıcı aksiyonları

- [KARAR] Online borç ödeme: vadesi gelen/geçen kayıtları seçerek ya da serbest tutarla; kart ödemesi demoda mock.
- [KARAR] PDF ekstre oluşturma ve paylaşma (`expo-print` + `expo-sharing`).
- [KARAR] Fatura / borç kaydı detayı ve PDF'i.
- [KARAR] Kendi verdiği çek/senetleri ve durumlarını görür.
- [VARSAYIM] Seçilen kayıtlarla yapılan ödeme yine FIFO ile değil, seçilen kayıtlara eşlenir; serbest tutarlı ödeme FIFO ile kapatılır.

## Ödeme

- [KARAR] Uygulama içinden ödeme yapılabilir.
- [VARSAYIM] Sipariş ödeme yöntemleri: kredi kartı (sanal POS), havale/EFT ve açık hesap (cari). Demoda kart ödemesi sahte (mock) bir akışla gösterilir.

## Açık sorular (müşteriye sorulacak)

1. Ürün (desen) sayısı ve alıcı firma sayısı yaklaşık kaç?
2. Fiyatlandırma: döviz (USD/EUR) liste fiyatları ayrı mı tutuluyor, kurdan mı hesaplanıyor?
3. Firma bazlı indirim nasıl tanımlanıyor (yüzde / tutar, süreli mi)?
4. KDV oranları ve gösterimi; ihracatta KDV.
5. Metre minimum/artış ve top uzunluğunun gerçek değerleri; desene göre değişiyor mu?
6. Hazır perde ve özel ölçü satışı açılırsa ölçü, pile ve dikiş kuralları neler?
7. Numune/kartela talebi ücretli mi, limit var mı?
8. Ödeme yöntemleri hangileri; hangi sanal POS / ödeme kuruluşu? Peşin ödemede indirim var mı?
9. Sipariş onay süreci var mı (fabrika onayı)?
10. Web uygulamasını kim kullanacak (alıcı portalı / fabrika yönetim paneli / ikisi)?
11. Fabrika ürünleri nereden ekleyecek: web yönetim paneli mi, mobil mi? ERP'den aktarım var mı (Logo, Mikro, Netsis, SAP...)?
12. Kampanya ve iade süreçleri ilk sürümde var mı?
13. Kumaş türleri ve nakış tekniklerinin gerçek listesi.
14. Yüksek çözünürlüklü / vektör logo ve kurumsal renk kodları.
15. Ödemenin FIFO dışında belirli bir borç kaydına eşlenmesi gerekiyor mu (ör. alıcı belirli faturaları seçerek ödediğinde)?
16. Gecikme faizi / vade farkı uygulanıyor mu; uygulanıyorsa oranı ve hesap yöntemi?
17. Yaşlandırma aralıkları (0–30 / 31–60 / 61–90 / 90+) fabrikanın kullandığıyla aynı mı?
18. TL karşılığı için TCMB'nin hangi kuru kullanılacak (döviz satış / efektif satış), hangi tarihin kuru (işlem günü / bir önceki iş günü)?
19. Kredi limiti hangi para biriminde tanımlanıyor; döviz alt hesaplar limite TL karşılığıyla mı dahil?
20. Risk sıralamasının ölçütü ne olmalı?

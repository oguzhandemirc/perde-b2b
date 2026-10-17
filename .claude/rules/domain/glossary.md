# Domain sözlüğü (Türkçe iş terimi → kod adı)

Aynı kavram her yerde (mobil, web, backend, API, veritabanı) aynı İngilizce adla anılır. Listede olmayan bir kavram gerekirse önce buraya eklenir.

Müşteri bir **brode perde fabrikasıdır** (bkz. `business-rules.md`). Perdeye özgü terimler aşağıda "Perde terimleri" bölümündedir.

| Türkçe (UI / iş dili)  | Kod adı                       | Not                                                                                                             |
| ---------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Firma / Müşteri firma  | `Company`                     | Platformdan alım yapan kurumsal müşteri; para birimi `Company.currency`                                         |
| Bayi                   | `Dealer`                      | Müşteri firmanın bayisi ise `Company` alt türü olarak mı ayrı mı tutulacağı **açık soru**                       |
| Kullanıcı              | `User`                        | Bir `Company`'ye bağlı kişi                                                                                     |
| Rol                    | `Role`                        | `SellerRole` \| `BuyerRole`; bkz. "Cari terimleri"                                                              |
| Satış temsilcisi       | `SalesRep`                    | Atandığı firmalar adına sipariş girebilen satıcı personeli                                                      |
| Seçili firma           | `activeCompanyId`             | Satış temsilcisinin o an adına işlem yaptığı firma                                                              |
| Ürün / Desen           | `Product`                     | Perdede ürün = desen; bkz. "Perde terimleri"                                                                    |
| Ürün varyantı          | `ProductVariant`              | Desen + renk + boy kombinasyonu                                                                                 |
| Kategori               | `Category`                    |                                                                                                                 |
| Marka                  | `Brand`                       |                                                                                                                 |
| Stok kodu              | `sku`                         | Varyant başına bir tane                                                                                         |
| Barkod                 | `barcode`                     |                                                                                                                 |
| Fiyat listesi          | `PriceList`                   | Para birimi başına liste fiyatları (TRY, USD, EUR)                                                              |
| Liste fiyatı           | `listPrice`                   | İndirimsiz, metre başına birim fiyat (varyant düzeyinde)                                                        |
| Net fiyat              | `netPrice`                    | İndirim sonrası, KDV hariç                                                                                      |
| İndirim / İskonto      | `Discount`                    | Firmaya ve ürüne özel (`companyId` + `productId`); bkz. "Perde terimleri"                                       |
| KDV                    | `vat` / `vatRate`             | Oran ürün bazında                                                                                               |
| Para birimi            | `currency`                    | `TRY`, `USD`, `EUR`                                                                                             |
| Döviz kuru             | `ExchangeRate`                |                                                                                                                 |
| Sepet                  | `Cart`                        | Tek para birimi                                                                                                 |
| Sepet satırı           | `CartItem`                    |                                                                                                                 |
| Sipariş                | `Order`                       |                                                                                                                 |
| Sipariş satırı         | `OrderLine`                   |                                                                                                                 |
| Sipariş durumu         | `OrderStatus`                 | bkz. `business-rules.md`                                                                                        |
| Teklif                 | `Quote`                       | Sonraki sürüm; demoda yok                                                                                       |
| Cari hesap             | `Account`                     | Firmanın borç/alacak hesabı; para birimi başına `SubAccount`'lardan oluşur                                      |
| Cari hareket           | `AccountTransaction`          | Borç/alacak kaydı; tipi `AccountTransactionType`                                                                |
| Bakiye                 | `balance`                     | `SubAccount` düzeyinde, kendi para biriminde                                                                    |
| Kredi limiti           | `creditLimit`                 | Firma düzeyinde                                                                                                 |
| Vade                   | `paymentTermDays` / `dueDate` | Firmanın vade süresi gün cinsinden `paymentTermDays`; her borç kaydının kendi `dueDate`'i                       |
| Fatura                 | `Invoice`                     | Resmi fatura; borç kaydına `invoiceNumber` ile bağlanır                                                         |
| İrsaliye               | `DeliveryNote`                |                                                                                                                 |
| Ödeme / Tahsilat       | `Payment`                     | Alıcının online ödemesi ve satıcının girdiği tahsilat aynı kavramdır (`Collection` koleksiyon için ayrılmıştır) |
| Ödeme yöntemi          | `PaymentMethod`               | `credit_card`, `bank_transfer`, `open_account`                                                                  |
| Teslimat adresi        | `ShippingAddress`             |                                                                                                                 |
| Fatura adresi          | `BillingAddress`              |                                                                                                                 |
| Vergi dairesi / no     | `taxOffice` / `taxNumber`     |                                                                                                                 |
| Kampanya               | `Campaign`                    |                                                                                                                 |
| Favori / Sık alınanlar | `Favorite`                    |                                                                                                                 |

## Perde terimleri

| Türkçe (UI / iş dili)      | Kod adı                                | Not                                                                                   |
| -------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- |
| Desen                      | `Product`                              | Fabrikanın ürettiği tasarım; `patternCode` ile tanımlanır                             |
| Desen kodu                 | `patternCode`                          | ör. `BRD-2041`                                                                        |
| Renk                       | `Color`                                | Varyant özelliği; `name` + `hex`                                                      |
| Boy                        | `heightCm`                             | Perde yüksekliği = kumaş eni; cm cinsinden tam sayı (280, 300, 320)                   |
| Varyant                    | `ProductVariant`                       | `productId` + `colorId` + `heightCm`; kendi `sku`'su ve `listPrice`'ı vardır          |
| Kumaş türü                 | `FabricType`                           | `tulle` (tül), `voile` (vual), `linen_look` (keten görünümlü), `chiffon`, `organza`   |
| Brode / Nakış              | `embroideryType`                       | Nakış tekniği; değer listesi müşteriden gelecek                                       |
| Koleksiyon                 | `Collection`                           |                                                                                       |
| Satış birimi               | `SaleUnit`                             | `meter` \| `roll` \| `ready_made` \| `custom_size`                                    |
| Metre (toptan kesim)       | `meter`                                | `SaleUnit` değeri; miktar `lengthCm` ile tutulur                                      |
| Top (bütün top)            | `roll`                                 | `SaleUnit` değeri; miktar `quantity` (top adedi)                                      |
| Top uzunluğu               | `rollLengthCm`                         | Ürün bazında; `5000` = 50 m                                                           |
| Metre miktarı              | `lengthCm`                             | Santimetre cinsinden tam sayı; `150` = 1,5 m. Kayan nokta kullanılmaz                 |
| Adet                       | `quantity`                             | Sayılabilir birimler için (top, hazır perde, özel ölçü)                               |
| Minimum sipariş uzunluğu   | `minOrderLengthCm`                     | Ürün bazında; `100` = 1 m                                                             |
| Sipariş artışı             | `orderStepLengthCm`                    | Ürün bazında; `50` = 0,5 m                                                            |
| Hazır (dikili) perde       | `ready_made`                           | `SaleUnit` değeri; global ayarla açılır/kapanır                                       |
| Özel ölçü / Siparişe dikim | `custom_size` / `CustomSize`           | `SaleUnit` değeri; ölçü `CustomSize { widthCm, heightCm, pleatRatioPercent }`         |
| En (perde eni)             | `widthCm`                              | cm cinsinden tam sayı                                                                 |
| Pile oranı                 | `pleatRatioPercent`                    | Tam sayı yüzde; `250` = 1:2,5. Kayan nokta kullanılmaz                                |
| Firmaya özel ürün indirimi | `Discount`                             | `companyId` + `productId` + değer; tür (yüzde/tutar, süreli mi) **açık soru**         |
| Numune talebi              | `SampleRequest`                        | `type: 'sample'`                                                                      |
| Kartela                    | `SwatchBook`                           | Renk/desen kartelası; talebi `SampleRequest` ile, `type: 'swatch_book'`               |
| Talep türü                 | `SampleRequestType`                    | `sample` \| `swatch_book`                                                             |
| Numune talep durumu        | `SampleRequestStatus`                  | `preparing` \| `shipped` \| `delivered` (taslak)                                      |
| Platform ayarları          | `PlatformSettings`                     | Tüm platform için fabrika ayarı                                                       |
| Hazır perde açık mı        | `PlatformSettings.isReadyMadeEnabled`  | Demoda `false` başlar                                                                 |
| Özel ölçü açık mı          | `PlatformSettings.isCustomSizeEnabled` | Demoda `false` başlar                                                                 |
| Firma para birimi          | `Company.currency`                     | Firmaya sabit: yurt içi `TRY`, ihracat `USD` / `EUR`; fiyat listesi buna göre seçilir |

## Cari terimleri

| Türkçe (UI / iş dili)           | Kod adı                                        | Not                                                                                                                                   |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Alt hesap                       | `SubAccount`                                   | Firma başına para birimi başına bir tane (TL + döviz ayrı); `accountId`, `currency`, `balance`                                        |
| Hareket tipi                    | `AccountTransactionType`                       | `sale`, `return`, `bank_transfer`, `credit_card`, `cheque`, `promissory_note`, `cash`, `exchange_difference`, `opening_balance`       |
| Borç / alacak yönü              | `direction`                                    | `debit` (borç) \| `credit` (alacak)                                                                                                   |
| Satış / sevk kaydı (borç)       | `AccountTransaction` + `type: 'sale'`          | Teslim edilen satış; `orderId`, `dueDate` taşır                                                                                       |
| Fatura durumu                   | `invoiceStatus`                                | `invoiced` (faturalandı) \| `to_be_invoiced` (faturalanacak); faturalandıysa `invoiceNumber`                                          |
| Açılış / devir                  | `opening_balance`                              | `AccountTransactionType` değeri                                                                                                       |
| Kur farkı                       | `exchange_difference`                          | `AccountTransactionType` değeri; muhasebe elle girer                                                                                  |
| TL karşılığı                    | `tryEquivalent`                                | Döviz tutarın TCMB döviz satış kuruyla TL karşılığı (`Money`, `currency: 'TRY'`)                                                      |
| Kur türü                        | `ExchangeRate.rateType`                        | `forex_selling` (TCMB döviz satış)                                                                                                    |
| Kalan tutar                     | `remainingAmount`                              | Borç kaydının ödemelerle kapatılmamış kısmı                                                                                           |
| Ödeme eşlemesi / kapatma        | `PaymentAllocation`                            | Ödemenin borç kaydına eşlenmesi: `paymentId`, `transactionId`, `amount`                                                               |
| FIFO kapatma                    | `allocationMethod: 'fifo'`                     | Ödeme en eski borçtan başlayarak kapatılır                                                                                            |
| Vadesi geçen tutar              | `overdueAmount`                                |                                                                                                                                       |
| Gecikme günü                    | `daysOverdue`                                  | Borç kaydı başına; bugün − `dueDate`                                                                                                  |
| Ortalama vade                   | `averageDueDate`                               | Kalan tutarlarla ağırlıklı ortalama vade tarihi                                                                                       |
| Yaşlandırma                     | `AgingBucket`                                  | `days_0_30` \| `days_31_60` \| `days_61_90` \| `days_90_plus`                                                                         |
| Limit kullanımı                 | `creditUsagePercent`                           | Bakiye / kredi limiti, tam sayı yüzde                                                                                                 |
| Çek / senet                     | `NegotiableInstrument`                         | `type: 'cheque' \| 'promissory_note'`, `dueDate`, `bankName`, `drawerName` (keşideci), `amount`                                       |
| Çek / senet durumu              | `InstrumentStatus`                             | `in_portfolio` (portföyde) \| `collected` (tahsil edildi) \| `bounced` (karşılıksız / protestolu)                                     |
| Makbuz                          | `Receipt`                                      | Tahsilat başına numaralı PDF makbuz; `receiptNumber`                                                                                  |
| Ekstre                          | `AccountStatement`                             | Tarih aralığına göre PDF hesap ekstresi                                                                                               |
| Limit onayı bekliyor            | `OrderStatus` değeri `pending_credit_approval` | Limit aşan sipariş; muhasebe/yönetici onaylar ya da reddeder                                                                          |
| Ödeme hatırlatması              | `PaymentReminder`                              | Satıcının alıcıya gönderdiği hatırlatma; demoda uygulama içi bildirim                                                                 |
| Uygulama içi bildirim           | `Notification`                                 | Push yerine demoda kullanılır                                                                                                         |
| Limit / vade değişiklik geçmişi | `CreditTermsChange`                            | `field: 'creditLimit' \| 'paymentTermDays'`, `oldValue`, `newValue`, `changedByUserId`, `changedAt`                                   |
| Atanmış temsilci                | `assignedSalesRepId`                           | Firmanın satış temsilcisi                                                                                                             |
| Satıcı rolleri                  | `SellerRole`                                   | `sales_rep` (atandığı firmalar), `accounting` (muhasebe/finans, tüm firmalar), `manager` (yönetici/patron, tüm firmalar + özet panel) |
| Alıcı rolleri                   | `BuyerRole`                                    | `owner` (sahip), `finance` (finans), `buyer` (satın almacı; cariyi görmez)                                                            |
| Yönetici özet paneli            | `ManagerDashboard`                             |                                                                                                                                       |

## Kullanılmayan terimler

Aşağıdaki kavramlar bu projede **kullanılmaz**; koda, tiplere ve mock veriye eklenmez.

| Terim                                                   | Neden                                                          |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| Stok, stok durumu, stok miktarı (`stock`, `StockLevel`) | Stok ve üretim yazılımın kapsamı dışında (2026-10-18 kararı)   |
| Termin (`deliveryDate`, `leadTimeDays`)                 | Üretim kapsam dışı; termin gösterilmez                         |
| Beden, beden aralığı, asorti/seri, gramaj, sezon        | Giyime özgü; müşteri perde fabrikası                           |
| Birim / koli içi adet (`Unit`, `packSize`)              | Yerine `SaleUnit` ve `rollLengthCm` kullanılır                 |
| Kayıt dışı / faturasız satış defteri                    | Tasarlanmaz (yasal yükümlülük, 2026-10-18 kararı)              |
| Mutabakat                                               | Şimdilik yok                                                   |
| Minimum sipariş miktarı (`minOrderQuantity`)            | Metre için `minOrderLengthCm` + `orderStepLengthCm` kullanılır |

# Domain sözlüğü (Türkçe iş terimi → kod adı)

Aynı kavram her yerde (mobil, web, backend, API, veritabanı) aynı İngilizce adla anılır. Listede olmayan bir kavram gerekirse önce buraya eklenir.

| Türkçe (UI / iş dili)   | Kod adı                   | Not                                                                                       |
| ----------------------- | ------------------------- | ----------------------------------------------------------------------------------------- |
| Firma / Müşteri firma   | `Company`                 | Platformdan alım yapan kurumsal müşteri                                                   |
| Bayi                    | `Dealer`                  | Müşteri firmanın bayisi ise `Company` alt türü olarak mı ayrı mı tutulacağı **açık soru** |
| Kullanıcı               | `User`                    | Bir `Company`'ye bağlı kişi                                                               |
| Rol                     | `Role`                    | ör. `owner`, `buyer`, `viewer`, `sales_rep`, `admin` (taslak)                             |
| Satış temsilcisi        | `SalesRep`                | Müşteri adına sipariş girebilen satıcı personeli                                          |
| Ürün                    | `Product`                 |                                                                                           |
| Ürün varyantı           | `ProductVariant`          | Renk/beden/ambalaj farkı varsa                                                            |
| Kategori                | `Category`                |                                                                                           |
| Marka                   | `Brand`                   |                                                                                           |
| Stok kodu               | `sku`                     |                                                                                           |
| Barkod                  | `barcode`                 |                                                                                           |
| Birim                   | `Unit`                    | adet, koli, paket, kg...                                                                  |
| Koli içi adet           | `packSize`                |                                                                                           |
| Minimum sipariş miktarı | `minOrderQuantity`        |                                                                                           |
| Stok                    | `stock` / `StockLevel`    |                                                                                           |
| Fiyat listesi           | `PriceList`               | Firmaya/gruba özel fiyatlar                                                               |
| Liste fiyatı            | `listPrice`               | İskontosuz fiyat                                                                          |
| Net fiyat               | `netPrice`                | İskonto sonrası, KDV hariç                                                                |
| İskonto                 | `Discount`                | Kademeli olabilir (iskonto 1, 2, 3)                                                       |
| KDV                     | `vat` / `vatRate`         | Oran ürün bazında                                                                         |
| Para birimi             | `currency`                | `TRY`, `USD`, `EUR`                                                                       |
| Döviz kuru              | `ExchangeRate`            |                                                                                           |
| Sepet                   | `Cart`                    |                                                                                           |
| Sepet satırı            | `CartItem`                |                                                                                           |
| Sipariş                 | `Order`                   |                                                                                           |
| Sipariş satırı          | `OrderLine`               |                                                                                           |
| Sipariş durumu          | `OrderStatus`             | bkz. `business-rules.md`                                                                  |
| Teklif                  | `Quote`                   | Fiyat teklifi akışı varsa                                                                 |
| Cari hesap              | `Account`                 | Firmanın borç/alacak hesabı                                                               |
| Cari hareket            | `AccountTransaction`      | Fatura, ödeme, iade kayıtları                                                             |
| Bakiye                  | `balance`                 |                                                                                           |
| Kredi limiti            | `creditLimit`             |                                                                                           |
| Vade                    | `paymentTerm` / `dueDate` | Gün cinsinden vade: `paymentTermDays`                                                     |
| Fatura                  | `Invoice`                 |                                                                                           |
| İrsaliye                | `DeliveryNote`            |                                                                                           |
| Ödeme                   | `Payment`                 |                                                                                           |
| Teslimat adresi         | `ShippingAddress`         |                                                                                           |
| Fatura adresi           | `BillingAddress`          |                                                                                           |
| Vergi dairesi / no      | `taxOffice` / `taxNumber` |                                                                                           |
| Kampanya                | `Campaign`                |                                                                                           |
| Favori / Sık alınanlar  | `Favorite`                |                                                                                           |

## Tekstil terimleri

| Türkçe (UI / iş dili) | Kod adı                         | Not                                                     |
| --------------------- | ------------------------------- | ------------------------------------------------------- |
| Model                 | `Product`                       | Fabrikanın ürettiği tasarım; `modelCode` ile tanımlanır |
| Model kodu            | `modelCode`                     |                                                         |
| Renk                  | `Color`                         | Varyant özelliği; `name` + `hex`                        |
| Beden                 | `Size`                          | XS, S, M, L, XL... ya da 36, 38, 40...                  |
| Beden aralığı         | `sizeRange`                     |                                                         |
| Asorti / Seri         | `Assortment`                    | Sabit beden dağılımı, ör. S:1 M:2 L:2 XL:1              |
| Seri adedi            | `assortmentQuantity`            | Siparişte seçilen seri sayısı                           |
| Seri içi adet         | `assortmentSize`                | Bir serideki toplam ürün adedi                          |
| Kumaş                 | `Fabric`                        |                                                         |
| Kumaş içeriği         | `composition`                   | ör. `[{ material: 'cotton', percent: 95 }, ...]`        |
| Gramaj                | `fabricWeightGsm`               | g/m²                                                    |
| Sezon                 | `Season`                        | ör. 2027 İlkbahar-Yaz                                   |
| Koleksiyon            | `Collection`                    |                                                         |
| Termin                | `deliveryDate` / `leadTimeDays` | Üretime sipariş için teslim tarihi                      |
| Numune                | `Sample`                        |                                                         |

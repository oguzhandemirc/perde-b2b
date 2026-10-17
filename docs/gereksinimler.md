# Gereksinimler

Müşteriyle netleşen kapsam ve kararlar. Taslak iş kuralları ve açık sorular: `.claude/rules/domain/business-rules.md`.

## Proje

- **Müşteri:** CEKA TEKSTİL — brode perde fabrikası; kendi ürettiği perdeleri alıcı firmalara satar.
- **Alıcılar:** perdeci mağazalar, toptancılar, ihracat alıcıları, proje müşterileri (iç mimar, otel).
- **Tür:** B2B platformu — web (React), mobil (React Native / Expo), backend.
- **Temel akış:** Fabrika ürünlerini (desenleri) ekler → alıcı firmalar sipariş verir → ödeme yapar.
- **Kapsam dışı:** Stok ve üretim takibi; stok durumu, stok miktarı ve termin gösterilmez.
- **Ekip:** Oğuzhan (mobil + web), Yusuf (backend).

## Aşama 1 — Müşteri demosu (mobil, mock data)

- **Amaç:** Müşteriye uygulamanın akışını ve görünümünü göstermek.
- **Akış:** Giriş (rol seçmeli mock giriş: alıcı firma kullanıcısı, satış temsilcisi) → ana sayfa (yeni koleksiyon, öne çıkanlar, indirimli ürünler) → katalog (desen grid'i; kumaş türü, koleksiyon, boy, renk filtresi) → desen detayı (renk, boy, metre/top, miktar, numune/kartela iste) → sepet → ödeme (kart mock / havale / açık hesap) → siparişlerim → hesap (cari, numune taleplerim).
- **Ürün:** desen → renk → boy varyantları; satış metre ve bütün top ile. Hazır perde ve özel ölçü global ayarla açılır, demoda kapalı başlar.
- **Fiyat:** firmaya göre para birimi (TRY / USD / EUR); varyant bazında metre fiyatı; firmaya özel ürün indirimi.
- **Var:** numune / kartela talebi (basit), satış temsilcisinin firma seçmesi.
- **Roller:** aynı uygulama, role göre sekmeler. Satıcı: satış temsilcisi, muhasebe/finans, yönetici. Alıcı: sahip, finans, satın almacı (cariyi yalnızca sahip + finans görür).
- **Cari (satıcı):** yönetici özet paneli (toplam alacak, vadesi geçen, yaşlandırma, riskli firmalar, temsilci bazlı tahsilat, onay bekleyen siparişler, satış göstergeleri), firma listesi (risk / alfabetik / bakiye sıralaması, limit kullanım çubuğu), tahsilat girişi ve numaralı PDF makbuz, çek/senet portföyü, ödeme hatırlatma (uygulama içi bildirim), limit/vade düzenleme ve geçmişi.
- **Cari (alıcı):** bakiye, vadesi geçen ve hareketler (TL ve döviz alt hesaplar), online borç ödeme (kart mock), PDF ekstre oluşturma/paylaşma, fatura/borç kaydı detayı ve PDF, kendi çek/senetleri.
- **Sipariş:** limit aşan sipariş "limit onayı bekliyor" durumuna düşer, muhasebe/yönetici onaylar ya da reddeder.
- **Yok:** teklif (`Quote`) akışı, stok, termin, mutabakat, push bildirim, kayıt dışı satış defteri, otomatik test.
- **Cihaz ve dağıtım:** telefon + tablet, serbest ekran yönü; Android'e yerel build APK, iOS'ta Expo Go (bkz. ADR-0003).
- **Dil:** Türkçe (varsayılan) + İngilizce arayüz.
- **Veri:** Mock data, backend yok; görseller telifsiz ve uygulamaya gömülü (internetsiz çalışır).

## Web

- Web'in kullanıcısı belli değil (alıcı portalı / fabrika yönetim paneli / ikisi); müşteriye sorulacak. Yığın kararı o zaman verilir. O zamana kadar paylaşılabilir kod `packages/shared`'a taşınmaya uygun yazılır.

## Karar günlüğü

| Tarih      | Karar                                                                                                                                                                                            | Kaynak            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| 2026-10-17 | Monorepo: pnpm workspaces; mobil Expo (TypeScript)                                                                                                                                               | ADR-0001          |
| 2026-10-17 | İlk iş: mock data ile mobil demo                                                                                                                                                                 | Toplantı / sohbet |
| 2026-10-17 | Müşteri: tekstil fabrikası; alıcılar uygulamadan sipariş verir ve ödeme yapar                                                                                                                    | Sohbet            |
| 2026-10-17 | Mobil yığın: Expo Router, NativeWind, gluestack-ui v5, TanStack Query, Zustand                                                                                                                   | ADR-0002          |
| 2026-10-18 | Müşteri CEKA TEKSTİL, brode perde fabrikası (giyim değil); beden/asorti/gramaj varsayımları kaldırıldı                                                                                           | Sohbet            |
| 2026-10-18 | Varyant: desen → renk → boy; her kombinasyon kendi `sku`'suna sahip                                                                                                                              | Sohbet            |
| 2026-10-18 | Satış birimleri: metre ve bütün top açık; hazır perde ve özel ölçü global ayarla açılır, demoda kapalı                                                                                           | Sohbet            |
| 2026-10-18 | Stok ve üretim kapsam dışı; stok ve termin gösterilmez                                                                                                                                           | Sohbet            |
| 2026-10-18 | Para birimi firmaya göre (TRY / USD / EUR), sepette tek para birimi                                                                                                                              | Sohbet            |
| 2026-10-18 | Fiyat varyant bazında metre fiyatı; top fiyatı = metre fiyatı × top uzunluğu                                                                                                                     | Sohbet            |
| 2026-10-18 | Herkes liste fiyatını görür; firmaya özel ürün bazlı indirim varsa liste fiyatıyla birlikte, belirgin gösterilir                                                                                 | Sohbet            |
| 2026-10-18 | Numune / kartela talebi demoda var (basit); teklif akışı sonraki sürümde                                                                                                                         | Sohbet            |
| 2026-10-18 | Satış temsilcisi atandığı firmayı seçer, o firmanın fiyatlarıyla aynı akışı kullanır                                                                                                             | Sohbet            |
| 2026-10-18 | Demo akışı: giriş → ana sayfa → katalog → desen detayı → sepet → ödeme → siparişlerim → hesap                                                                                                    | Sohbet            |
| 2026-10-18 | Web'in kullanıcısı ve yığını müşteriye sorulduktan sonra belirlenecek                                                                                                                            | Sohbet            |
| 2026-10-18 | NativeWind v5 RC + gluestack-ui v5; koyu tema yalnızca `prefers-color-scheme` ile                                                                                                                | ADR-0002          |
| 2026-10-18 | Demo kütüphaneleri ve dağıtım: lucide, FlashList, RHF + zod, i18next TR/EN, Inter, Zustand persist; telefon + tablet; Android APK, iOS Expo Go                                                   | ADR-0003          |
| 2026-10-18 | Marka: CEKA TEKSTİL; logo renkleri antrasit ≈ #1F1E1C, kırmızı ≈ #E91C24; primary antrasit, kırmızı yalnızca vurgu; koyu temada açık renkli logo                                                 | Sohbet            |
| 2026-10-18 | Yeni skill'ler: `/run-demo`, `/build-apk`, `/add-translation`, `/add-ui`; reviewer her özellik/ekran bitince otomatik çalışır                                                                    | Sohbet            |
| 2026-10-18 | Cari kayıtlarını bu sistem tutar (ERP'den okunmaz); backend kapsamı büyür, Yusuf'la konuşulacak                                                                                                  | Sohbet            |
| 2026-10-18 | Cari iki taraflı: satıcı müşterilerin, alıcı kendi carisini izler; aynı uygulama, role göre sekmeler                                                                                             | Sohbet            |
| 2026-10-18 | Roller: satıcı `sales_rep` / `accounting` / `manager`; alıcı `owner` / `finance` / `buyer` (cariyi sahip + finans görür)                                                                         | Sohbet            |
| 2026-10-18 | Hareket tipleri: satış/sevk (borç), iade, havale/EFT, kart, çek, senet, nakit, kur farkı, açılış/devir; borç kaydında fatura durumu ve no                                                        | Sohbet            |
| 2026-10-18 | Kayıt dışı / faturasız satış için ayrı defter tasarlanmaz                                                                                                                                        | Sohbet            |
| 2026-10-18 | Firma başına TL + döviz ayrı alt hesaplar; TL karşılığı TCMB döviz satış kuru (demoda mock); kur farkı elle                                                                                      | Sohbet            |
| 2026-10-18 | Her borç kaydının kendi vadesi (kayıt tarihi + `paymentTermDays`); ödemeler FIFO kapatılır                                                                                                       | Sohbet            |
| 2026-10-18 | Limit aşan sipariş onaya düşer (`pending_credit_approval`); muhasebe/yönetici onaylar ya da reddeder                                                                                             | Sohbet            |
| 2026-10-18 | Satıcı: tahsilat + numaralı PDF makbuz, ödeme hatırlatma (uygulama içi), limit/vade düzenleme geçmişi, çek/senet portföyü                                                                        | Sohbet            |
| 2026-10-18 | Alıcı: online borç ödeme (kart mock), PDF ekstre paylaşma, fatura/borç kaydı PDF'i; mutabakat şimdilik yok                                                                                       | Sohbet            |
| 2026-10-18 | Yönetici özet paneli ve satıcı firma listesi (risk / alfabetik / bakiye sıralaması) demoda var                                                                                                   | Sohbet            |
| 2026-10-18 | PDF için `expo-print` + `expo-sharing`                                                                                                                                                           | ADR-0003          |
| 2026-10-18 | PR'lar karşı tarafın onayına düşmez: CI geçince açan kişi birleştirir; CODEOWNERS kaldırıldı. Ortak alana dokunan PR'da karşı taraf bilgilendirme için etiketlenir; alan sahipliği aynen geçerli | Oğuzhan           |

---
paths:
  - 'apps/mobile/**'
---

# Mobil (React Native / Expo) kuralları

`apps/mobile/AGENTS.md` (Expo'nun resmi yönergeleri) de geçerlidir; Expo API'lerinde hafızaya değil, sürüme uygun dokümana güvenilir.

## Teknoloji yığını (ADR-0002, ADR-0003)

| İş              | Araç                                                  |
| --------------- | ----------------------------------------------------- |
| Navigasyon      | Expo Router (alt sekmeler `<Tabs>`, detaylar stack)   |
| Stil            | NativeWind v5 RC (Tailwind), tam sürümle sabitli      |
| UI bileşenleri  | gluestack-ui v5 (`src/components/ui`)                 |
| Sunucu verisi   | TanStack Query                                        |
| Uygulama durumu | Zustand (+ `persist` / AsyncStorage: oturum ve sepet) |
| Görsel          | expo-image                                            |
| İkonlar         | lucide-react-native                                   |
| Listeler        | FlashList (`@shopify/flash-list`)                     |
| Formlar         | react-hook-form + zod                                 |
| Çok dillilik    | i18next + react-i18next + expo-localization (TR + EN) |
| Font            | Inter (expo-font + @expo-google-fonts/inter)          |
| Güvenli saklama | expo-secure-store (token)                             |
| PDF / paylaşım  | expo-print + expo-sharing (ekstre, makbuz)            |

Bu listede olmayan bir kütüphane eklenmeden önce kullanıcıya sorulur.

## Expo Go kısıtı

- iOS demosu **Expo Go** ile, Android demosu yerel build APK ile gösterilir (ADR-0003). Expo Go'da bulunmayan native modül kullanılamaz.
- Yeni paket eklemeden önce saf JS olup olmadığı ya da native modülünün Expo Go'ya dahil olduğu (sürüme uygun Expo SDK dokümanı) kontrol edilir; değilse eklenmez, kullanıcıya sorulur.

## Klasör yapısı (`apps/mobile/src`)

```
app/                 Expo Router rotaları (yalnızca ekran dosyaları ve _layout.tsx)
features/<ad>/       Özelliğe ait bileşenler, hook'lar, yardımcılar (ör. features/cart)
components/ui/       gluestack-ui bileşenleri (CLI ile eklenir, /add-ui)
components/          Birden çok özelliğin kullandığı, ui/ üzerine kurulu bileşenler
services/            Veri katmanı — ekranlar veriye sadece buradan erişir
queries/             TanStack Query hook'ları ve query key'leri
stores/              Zustand store'ları (sepet, oturum)
mocks/               Demo verisi (yalnızca services/ tarafından import edilir)
i18n/                i18next kurulumu ve sözlükler (locales/tr.json, en.json)
lib/                 Biçimlendirme (para, tarih), genel yardımcılar
types/               Domain tipleri (ileride packages/shared'a taşınabilir)
```

## UI bileşenleri (gluestack-ui)

- Önce gluestack-ui'de karşılığı aranır; varsa o kullanılır, sıfırdan bileşen yazılmaz. Yeni bileşen CLI ile `apps/mobile/src/components/ui/` altına eklenir (`/add-ui`).
- `components/ui/` altındaki dosyalar kütüphane kodudur: tema/varyant düzenlemesi dışında içleri değiştirilmez, iş mantığı konmaz.
- Domain bileşenleri (renk seçici, boy seçici, metre/top miktar girişi, desen kartı, sipariş durum rozeti) `components/` veya `features/` altında, gluestack bileşenleri üzerine kurulur.
- Bileşenleri kullanmadan önce sürüme uygun gluestack-ui dokümanına bakılır; API hafızadan yazılmaz.

## Stil

- Stil NativeWind `className` ile. `StyleSheet.create` yalnızca NativeWind'in karşılayamadığı durumlarda (animasyon değerleri vb.).
- Renk, boşluk, yazı tipi yalnızca tema token'larından (`bg-primary`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`, `p-4`); sabit değer (`'#333'`, `p-[13px]`) yazılmaz.
- gluestack v5 token adları shadcn tarzıdır; numaralı adlar (`bg-primary-500`, `text-typography-900`) **yoktur** ve hata vermeden boş kalır.
- Marka renkleri tek yerde (gluestack tema yapılandırması) tanımlanır: primary logo antrasiti, logo kırmızısı yalnızca vurgu (indirim rozeti, sepet adedi, öne çıkanlar).

## Tema (açık / koyu)

- Açık ve koyu tema sisteme göre seçilir (`userInterfaceStyle: automatic`, GluestackUIProvider `mode="system"`).
- NativeWind v5 RC `:root.dark` / `.light` seçicilerini desteklemez; koyu tema token'ları yalnızca `@media (prefers-color-scheme: dark)` içinde tanımlanır.
- Her ekran iki temada da denenir; koyu temada logonun açık renkli sürümü kullanılır.

## Çok dillilik (i18n)

- Arayüz metni bileşende sabit yazılmaz; `useTranslation()` ile sözlükten gelir (`apps/mobile/src/i18n/locales/tr.json`, `en.json`; kesin yol mobil kurulumla netleşir). Varsayılan dil Türkçe.
- Her anahtar TR ve EN sözlüklerinin ikisine birden eklenir (`/add-translation`). Anahtar biçimi `<ekran|özellik>.<öğe>`: `cart.checkoutButton`.
- Domain verisi (desen adları, firma adları vb.) çevrilmez.

## Cihaz ve düzen

- Hedef telefon + tablet (`supportsTablet`); ekran yönü her yerde serbest (dikey + yatay).
- Düzenler duyarlıdır: genişlik `useWindowDimensions` ya da NativeWind kırılım noktalarıyla (`md:`, `lg:`) okunur; sabit genişlik/yükseklik yazılmaz.
- Grid listelerde sütun sayısı genişliğe göre değişir (ör. telefon 2, tablet 3–4).
- Telefon ve tablette, iki yönde denenmeden "bitti" denmez.

## Ekranlar ve bileşenler

- Rota dosyası incedir: veriyi hook ile alır, görünümü `features/` içindeki bileşene verir.
- Yalnızca fonksiyon bileşenleri ve hook'lar. Bileşen başına bir dosya.
- Listeler **FlashList** ile çizilir; `ScrollView` + `map` ile uzun liste çizilmez; `keyExtractor` id kullanır. Grid'de `numColumns` genişliğe göre hesaplanır.
- Her veri çeken ekranda üç durum ele alınır: yükleniyor, hata (tekrar dene butonuyla), boş durum.
- Dokunma hedefleri en az 44×44; `SafeAreaView`/safe area insets kullanılır.
- Erişilebilirlik: etkileşimli öğelerde `accessibilityLabel` (sözlükten), `accessibilityRole`.
- Formlar **react-hook-form + zod** ile: şema `zod` ile tanımlanır, `zodResolver` (`@hookform/resolvers`) bağlanır, alanlar gluestack `FormControl` ile hata mesajını gösterir. Doğrulama mesajları sözlükten gelir.
- Klavye açılan formlarda `KeyboardAvoidingView` veya eşdeğeri.
- Hem iOS hem Android'de denenmeden "bitti" denmez; platform farkı varsa `Platform.select` ile.

## Durum yönetimi

- Sunucu verisi (ürün, sipariş, cari) **yalnızca TanStack Query** ile: `queries/` altındaki hook'lar `services/` fonksiyonlarını çağırır. Ekranda `useEffect` + `fetch`/servis çağrısı yazılmaz.
- Query key'leri tek bir fabrikadan üretilir (`queries/keys.ts`); elle string dizisi yazılmaz.
- Veri değiştiren işlemler (sepete ekle, sipariş ver) `useMutation` ile; başarıda ilgili query'ler invalidate edilir.
- Uygulama durumu (sepet, oturum, ayarlar) **Zustand** store'larında (`stores/`). Sunucu verisi Zustand'a kopyalanmaz.
- Kalıcı olan yalnızca oturum ve sepettir (`persist` + AsyncStorage); token AsyncStorage'a değil `expo-secure-store`'a yazılır.
- Ekrana özel geçici durum (`useState`) global store'a taşınmaz.

## Performans

- Liste satırları `React.memo` ile; satır içinde inline fonksiyon/nesne üretimi minimumda.
- Görseller `expo-image` ile.

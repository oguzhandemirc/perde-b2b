---
paths:
  - 'apps/mobile/**'
---

# Mobil (React Native / Expo) kuralları

`apps/mobile/AGENTS.md` (Expo'nun resmi yönergeleri) de geçerlidir; Expo API'lerinde hafızaya değil, sürüme uygun dokümana güvenilir.

## Teknoloji yığını (ADR-0002)

| İş              | Araç                  |
| --------------- | --------------------- |
| Navigasyon      | Expo Router           |
| Stil            | NativeWind (Tailwind) |
| UI bileşenleri  | gluestack-ui v5       |
| Sunucu verisi   | TanStack Query        |
| Uygulama durumu | Zustand               |
| Görsel          | expo-image            |

Bu listede olmayan bir kütüphane eklenmeden önce kullanıcıya sorulur.

## Klasör yapısı (`apps/mobile/src`)

```
app/                 Expo Router rotaları (yalnızca ekran dosyaları ve _layout.tsx)
features/<ad>/       Özelliğe ait bileşenler, hook'lar, yardımcılar (ör. features/cart)
components/ui/       gluestack-ui bileşenleri (CLI ile eklenir)
components/          Birden çok özelliğin kullandığı, ui/ üzerine kurulu bileşenler
services/            Veri katmanı — ekranlar veriye sadece buradan erişir
queries/             TanStack Query hook'ları ve query key'leri
stores/              Zustand store'ları (sepet, oturum)
mocks/               Demo verisi (yalnızca services/ tarafından import edilir)
lib/                 Biçimlendirme (para, tarih), genel yardımcılar
types/               Domain tipleri (ileride packages/shared'a taşınabilir)
```

## UI bileşenleri (gluestack-ui)

- Önce gluestack-ui'de karşılığı aranır; varsa o kullanılır, sıfırdan bileşen yazılmaz. Yeni bileşen CLI ile `components/ui/` altına eklenir.
- `components/ui/` altındaki dosyalar kütüphane kodudur: tema/varyant düzenlemesi dışında içleri değiştirilmez, iş mantığı konmaz.
- Domain bileşenleri (renk seçici, beden/asorti matrisi, ürün kartı, sipariş durum rozeti) `components/` veya `features/` altında, gluestack bileşenleri üzerine kurulur.
- Bileşenleri kullanmadan önce sürüme uygun gluestack-ui dokümanına bakılır; API hafızadan yazılmaz.

## Stil

- Stil NativeWind `className` ile. `StyleSheet.create` yalnızca NativeWind'in karşılayamadığı durumlarda (animasyon değerleri vb.).
- Renk, boşluk, yazı tipi yalnızca tema token'larından (`bg-primary-500`, `p-4`); sabit değer (`'#333'`, `p-[13px]`) yazılmaz.
- Marka renkleri tek yerde (gluestack tema yapılandırması) tanımlanır.

## Ekranlar ve bileşenler

- Rota dosyası incedir: veriyi hook ile alır, görünümü `features/` içindeki bileşene verir.
- Yalnızca fonksiyon bileşenleri ve hook'lar. Bileşen başına bir dosya.
- Her listede `FlatList`/`FlashList` kullanılır, `ScrollView` + `map` ile uzun liste çizilmez; `keyExtractor` id kullanır.
- Her veri çeken ekranda üç durum ele alınır: yükleniyor, hata (tekrar dene butonuyla), boş durum.
- Dokunma hedefleri en az 44×44; `SafeAreaView`/safe area insets kullanılır.
- Erişilebilirlik: etkileşimli öğelerde `accessibilityLabel` (Türkçe), `accessibilityRole`.
- Klavye açılan formlarda `KeyboardAvoidingView` veya eşdeğeri.
- Hem iOS hem Android'de denenmeden "bitti" denmez; platform farkı varsa `Platform.select` ile.

## Durum yönetimi

- Sunucu verisi (ürün, sipariş, cari) **yalnızca TanStack Query** ile: `queries/` altındaki hook'lar `services/` fonksiyonlarını çağırır. Ekranda `useEffect` + `fetch`/servis çağrısı yazılmaz.
- Query key'leri tek bir fabrikadan üretilir (`queries/keys.ts`); elle string dizisi yazılmaz.
- Veri değiştiren işlemler (sepete ekle, sipariş ver) `useMutation` ile; başarıda ilgili query'ler invalidate edilir.
- Uygulama durumu (sepet, oturum, ayarlar) **Zustand** store'larında (`stores/`). Sunucu verisi Zustand'a kopyalanmaz.
- Ekrana özel geçici durum (`useState`) global store'a taşınmaz.

## Performans

- Liste satırları `React.memo` ile; satır içinde inline fonksiyon/nesne üretimi minimumda.
- Görseller `expo-image` ile.

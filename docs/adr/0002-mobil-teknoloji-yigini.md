# ADR-0002: Mobil teknoloji yığını

- **Tarih:** 2026-10-17
- **Durum:** Kabul edildi
- **Karar verenler:** Oğuzhan

## Bağlam

Tekstil fabrikası için B2B mobil uygulama: ürün kataloğu, renk/beden/asorti seçimi, sepet, sipariş, ödeme, cari. İlk hedef mock data ile müşteri demosu; hızlı ve cilalı UI gerekiyor, backend sonra bağlanacak.

## Karar

| İş              | Seçim                 |
| --------------- | --------------------- |
| Navigasyon      | Expo Router           |
| Stil            | NativeWind (Tailwind) |
| UI bileşenleri  | gluestack-ui v5       |
| Sunucu verisi   | TanStack Query        |
| Uygulama durumu | Zustand               |

## Değerlendirilen alternatifler

- **Stil:** StyleSheet + token (çok kod, web ile paylaşım zayıf), Tamagui (öğrenme maliyeti), Unistyles.
- **UI kit:** React Native Reusables (shadcn portu; toast/bottom sheet için ek kütüphane gerekir), HeroUI Native (beta, Uniwind tabanlı), React Native Paper (Material görünüm, NativeWind ile uyumsuz). gluestack-ui v5; Expo odaklı stable sürümü ve e-ticaret için en eksiksiz bileşen seti (Actionsheet, Select, FormControl, Toast, Skeleton, Badge) nedeniyle seçildi.
- **Sunucu verisi:** Custom hook'lar — backend gelince yeniden yazım gerektirir.
- **Uygulama durumu:** React Context (sepet gibi sık güncellenen veride gereksiz render), Redux Toolkit (bu ölçek için ağır).

## Sonuçlar

- Renk seçici, beden/asorti matrisi gibi tekstile özel bileşenler gluestack bileşenleri üzerine bizim tarafımızdan yazılacak.
- gluestack bileşenleri repoya kopyalanır (`components/ui/`); güncellemeler CLI ile yapılır.
- Kurulumda Expo SDK 58 ile NativeWind / gluestack-ui sürüm uyumu doğrulanmalı.

# ADR-0002: Mobil teknoloji yığını

- **Tarih:** 2026-10-17 (güncelleme: 2026-10-18)
- **Durum:** Kabul edildi
- **Karar verenler:** Oğuzhan

## Bağlam

Brode perde fabrikası (CEKA TEKSTİL) için B2B mobil uygulama: desen kataloğu, renk/boy ve metre/top seçimi, sepet, sipariş, ödeme, cari, numune talebi. İlk hedef mock data ile müşteri demosu; hızlı ve cilalı UI gerekiyor, backend sonra bağlanacak. Expo SDK 58 kullanılıyor.

## Karar

| İş              | Seçim                                                              |
| --------------- | ------------------------------------------------------------------ |
| Navigasyon      | Expo Router                                                        |
| Stil            | NativeWind **v5 RC** (`5.0.0-rc.0`, `react-native-css@3.1.0-rc.0`) |
| UI bileşenleri  | gluestack-ui v5                                                    |
| Sunucu verisi   | TanStack Query                                                     |
| Uygulama durumu | Zustand                                                            |

### NativeWind v5 RC (2026-10-18)

- **Gerekçe:** gluestack-ui v5 yalnızca NativeWind v5 veya UniWind'i destekliyor; NativeWind v4 ile çalışmıyor. NativeWind v5 henüz yalnızca RC sürümünde.
- **Sürüm sabitleme:** `nativewind` ve `react-native-css` tam sürümle (`^`/`~` olmadan) sabitlenir; güncelleme bilinçli yapılır.
- **Risk:** RC sürüm; Expo SDK 58 için resmi doğrulama yok. Kurulumda iOS ve Android'de smoke test geçti. Production öncesi stable sürüme geçilecek.
- **Kısıt:** `:root.dark` seçicisi desteklenmiyor; koyu tema token'ları yalnızca `@media (prefers-color-scheme: dark)` ile tanımlanır.
- **Token adları:** gluestack v5 / shadcn tarzı (`bg-primary`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`). Numaralı adlar (`bg-primary-500`) yoktur ve sessizce boş kalır.

### Expo Go kısıtı

- iOS'ta demo Expo Go ile gösterilir (bkz. ADR-0003). Bu nedenle Expo Go'da bulunmayan native modül kullanılamaz; yeni paket eklenmeden önce Expo Go'da olup olmadığı kontrol edilir.

## Değerlendirilen alternatifler

- **Stil:** StyleSheet + token (çok kod, web ile paylaşım zayıf), Tamagui (öğrenme maliyeti), Unistyles. NativeWind v4 + gluestack v4 (eski sürüm, gluestack'in yeni bileşen setinden yararlanılamaz), UniWind (gluestack v5 destekliyor ama ekosistemi ve dokümanı daha yeni).
- **UI kit:** React Native Reusables (shadcn portu; toast/bottom sheet için ek kütüphane gerekir), HeroUI Native (beta, Uniwind tabanlı), React Native Paper (Material görünüm, NativeWind ile uyumsuz). gluestack-ui v5; Expo odaklı ve e-ticaret için en eksiksiz bileşen seti (Actionsheet, Select, FormControl, Toast, Skeleton, Badge) nedeniyle seçildi.
- **Sunucu verisi:** Custom hook'lar — backend gelince yeniden yazım gerektirir.
- **Uygulama durumu:** React Context (sepet gibi sık güncellenen veride gereksiz render), Redux Toolkit (bu ölçek için ağır).

## Sonuçlar

- Renk seçici, boy seçici, metre/top miktar girişi gibi perdeye özel bileşenler gluestack bileşenleri üzerine bizim tarafımızdan yazılacak.
- gluestack bileşenleri repoya kopyalanır (`apps/mobile/src/components/ui/`); ekleme ve güncelleme CLI ile yapılır (`/add-ui`).
- RC sürüm nedeniyle NativeWind/gluestack güncellemeleri ayrı branch'te, iOS + Android smoke testiyle yapılır.
- Production öncesi NativeWind stable sürümüne geçiş bir iş kalemi olarak takip edilir.

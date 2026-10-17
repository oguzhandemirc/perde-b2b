# ADR-0003: Demo için mobil kütüphaneler ve dağıtım

- **Tarih:** 2026-10-18
- **Durum:** Kabul edildi
- **Karar verenler:** Oğuzhan

## Bağlam

Müşteri demosu Android telefon ve tablette, ayrıca iOS telefonda gösterilecek. Uygulama telefon ve tablette, dikey ve yatay yönde düzgün görünmeli; Türkçe ve İngilizce arayüz, açık ve koyu tema desteklemeli; demo internetsiz çalışabilmeli. ADR-0002'deki çekirdek yığının (Expo Router, NativeWind v5 RC, gluestack-ui v5, TanStack Query, Zustand) üzerine ek kütüphaneler gerekiyor.

## Karar

| İş              | Seçim                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| İkonlar         | `lucide-react-native`                                                                                       |
| Listeler        | FlashList (`@shopify/flash-list`)                                                                           |
| Formlar         | `react-hook-form` + `zod`                                                                                   |
| Çok dillilik    | `i18next` + `react-i18next` + `expo-localization`; TR (varsayılan) + EN                                     |
| Font            | Inter (`expo-font` + `@expo-google-fonts/inter`)                                                            |
| Kalıcılık       | Zustand `persist` + `@react-native-async-storage/async-storage` (oturum + sepet)                            |
| Token saklama   | `expo-secure-store` (AsyncStorage'a token yazılmaz)                                                         |
| Tema            | Açık + koyu, sisteme göre (`userInterfaceStyle: automatic`, GluestackUIProvider `mode="system"`)            |
| Cihaz           | Telefon + tablet (`supportsTablet`), ekran yönü serbest (dikey + yatay), duyarlı düzen                      |
| Navigasyon      | Alt sekme çubuğu (expo-router `<Tabs>`, 5 sekme), detaylar stack, giriş `Stack.Protected`                   |
| PDF ve paylaşım | `expo-print` (PDF ekstre / makbuz) + `expo-sharing` (WhatsApp / e-posta paylaşımı); ikisi de Expo Go'da var |
| Dağıtım         | Android: yerelde build edilen release APK; iOS: Expo Go                                                     |

- Mock siparişler bellekte kalır; yalnızca oturum ve sepet kalıcıdır.
- Mock görseller telifsiz (Unsplash/Pexels lisanslı) fotoğraflardır, `assets/` altına gömülür; kaynak ve lisans listesi tutulur.
- Otomatik test şimdilik yok; kontrol lint + typecheck + `/screen-review`.

## Değerlendirilen alternatifler

- **İkonlar:** `@expo/vector-icons` (çok sayıda karışık set, tutarsız görünüm). lucide, gluestack v5'in kendi ikon yaklaşımıyla uyumlu ve tek tip çizgi ikon seti sunuyor.
- **Listeler:** `FlatList` (uzun desen grid'lerinde ve tablette çok sütunda daha yavaş). FlashList hücre geri dönüşümüyle daha akıcı.
- **Formlar:** Kontrollü `useState` formları (doğrulama ve hata mesajı kodu tekrar eder), Formik (daha fazla render, daha az aktif bakım). RHF + zod, şemayı web ile paylaşmaya da uygun.
- **Çok dillilik:** Yalnızca Türkçe sabit metin (ihracat alıcıları için İngilizce sonradan eklenince bütün ekranlar elden geçer), `expo-localization` + elle sözlük (çoğul, değişken, yedek dil desteği yok). i18next olgun ve web'de de kullanılabilir.
- **Font:** Sistem fontu (iOS/Android arasında tutarsız görünüm). Inter, Türkçe karakter desteği iyi ve kurumsal görünümlü.
- **Kalıcılık:** MMKV (Expo Go'da yok, native modül gerektirir), kalıcılık yok (demo sırasında uygulama kapanırsa sepet kaybolur).
- **PDF:** `react-native-html-to-pdf` (native modül, Expo Go'da yok), sunucuda PDF üretimi (demoda backend yok). `expo-print` HTML şablondan PDF üretir, `expo-sharing` sistem paylaşım menüsünü açar.
- **Dağıtım:** EAS Build (bulut kuyruğu, hesap ve kota gerektirir), iOS development build / TestFlight (Apple geliştirici hesabı ve imzalama gerektirir). Android'de yerel APK hızlı ve ücretsiz; iOS'ta Expo Go kurulum gerektirmez.

## Sonuçlar

- **Expo Go'da bulunmayan native modül kullanılamaz;** yeni paket eklenmeden önce Expo Go uyumluluğu kontrol edilir. Gerekirse iOS için development build'e geçiş ayrı bir ADR ile değerlendirilir.
- Android APK yerelde üretilir (`/build-apk`); imzalama anahtarı repoya girmez, `ios/` ve `android/` klasörleri gitignore'dadır ve elle düzenlenmez.
- Arayüz metinleri sözlük dosyalarından gelir (`/add-translation`); domain verisi (desen adları vb.) çevrilmez.
- Düzenler telefon ve tablette, iki yönde denenmeden "bitti" denmez.
- Koyu tema token'ları yalnızca `prefers-color-scheme` ile tanımlanabilir (ADR-0002).

# Güvenlik kuralları

- Gizli bilgi (API anahtarı, şifre, token, sertifika) koda ve git'e girmez. `.env` dosyaları commit'lenmez; örnek değerler `.env.example` içinde tutulur.
- Mobil ve web uygulamasına giden her değer herkese açık sayılır: `EXPO_PUBLIC_*` değişkenlerine gizli bilgi konmaz.
- Müşteriye ait gerçek veri (bayi adları, fiyatlar, cari bakiyeler) mock data'ya kopyalanmaz; demo verisi uydurma ama gerçekçi olur.
- Kullanıcı girdisi her katmanda doğrulanır; frontend doğrulaması yalnızca kullanıcı deneyimi içindir, güvenlik backend'de sağlanır.
- Fiyat, indirim, KDV ve kredi limiti hesapları **backend'in** sorumluluğudur; frontend yalnızca gösterir. Demo aşamasındaki mock hesaplar bu kuralın geçici istisnasıdır ve `src/services` katmanında kalır.
- Token'lar mobilde `expo-secure-store` ile saklanır; `AsyncStorage`'a token yazılmaz.
- Loglarda kişisel veri ve token yazdırılmaz.

---
name: ui-component
description: Mobil uygulama için gluestack-ui üzerine kurulu yeniden kullanılabilir bir domain bileşeni oluşturur (ör. renk seçici, boy seçici, metre/top miktar girişi, desen kartı, indirimli fiyat gösterimi, sipariş durum rozeti). Yeni bir UI bileşeni gerektiğinde kullan.
argument-hint: '<bileşen adı ve amacı>'
paths: 'apps/mobile/**'
---

# Yeni UI bileşeni

İstenen bileşen: $ARGUMENTS

1. **Önce ara.** İhtiyaç gluestack-ui'nin hazır bir bileşeniyle karşılanıyor mu? `apps/mobile/src/components/ui/` altına bak; yoksa sürüme uygun gluestack-ui dokümanından kontrol et. Hazır bileşen yetiyorsa yeni bileşen yazma; gerekiyorsa `/add-ui` akışıyla CLI üzerinden ekle ve kullanıcıya bunu söyle.
2. **Var olanı ara.** `src/components/` ve `src/features/` altında benzer bir bileşen var mı? Varsa onu genişlet, kopyasını yazma.
3. **Konum.** Birden çok özellikte kullanılacaksa `src/components/<BileşenAdı>.tsx`, tek özelliğe aitse `src/features/<özellik>/components/`.
4. **Yaz.**
   - gluestack bileşenleri ve NativeWind `className` ile; yalnızca tema token'ları (`bg-primary`, `text-foreground`; numaralı adlar yok, sabit renk/boşluk yok). Açık ve koyu temada denenir.
   - Props tipi dışa açık ve belgelenmiş; domain tipleri `src/types/` altından (`glossary.md` adlarıyla).
   - Kontrollü bileşen: değer `value` + `onChange` ile dışarıdan yönetilir; iş mantığı ve veri çekme içermez.
   - Durumlar: devre dışı (disabled), seçili, hata, indirimli gibi görsel durumlar varyant/prop ile.
   - Metinler sözlükten (`useTranslation`, `/add-translation`); bileşende sabit metin yok.
   - Erişilebilirlik: `accessibilityLabel` (sözlükten), `accessibilityRole`, en az 44×44 dokunma alanı.
   - Uzun desen adı, boş liste ve çok sayıda seçenek (ör. 20 renk, 6 boy) durumlarında; telefon ve tablette, dikey ve yatay yönde taşma olmamalı.
   - Uzunluk santimetre, para kuruş cinsinden tam sayı alınır; gösterimde biçimlendirilir (`1,5 m`, `1.234,56 ₺`).
5. **Kontrol.** `pnpm --filter @b2b/mobile lint` ve `typecheck`.
6. **Özet.** Bileşenin kullanım örneğini (kısa JSX) ve varsayımları Türkçe yaz.

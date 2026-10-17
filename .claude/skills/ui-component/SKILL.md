---
name: ui-component
description: Mobil uygulama için gluestack-ui üzerine kurulu yeniden kullanılabilir bir domain bileşeni oluşturur (ör. renk seçici, beden/asorti matrisi, ürün kartı, sipariş durum rozeti, fiyat gösterimi). Yeni bir UI bileşeni gerektiğinde kullan.
argument-hint: '<bileşen adı ve amacı>'
paths: 'apps/mobile/**'
---

# Yeni UI bileşeni

İstenen bileşen: $ARGUMENTS

1. **Önce ara.** İhtiyaç gluestack-ui'nin hazır bir bileşeniyle karşılanıyor mu? `apps/mobile/src/components/ui/` altına bak; yoksa sürüme uygun gluestack-ui dokümanından kontrol et. Hazır bileşen yetiyorsa yeni bileşen yazma; gerekiyorsa CLI ile ekle (`npx gluestack-ui add <bileşen>`) ve kullanıcıya bunu söyle.
2. **Var olanı ara.** `src/components/` ve `src/features/` altında benzer bir bileşen var mı? Varsa onu genişlet, kopyasını yazma.
3. **Konum.** Birden çok özellikte kullanılacaksa `src/components/<BileşenAdı>.tsx`, tek özelliğe aitse `src/features/<özellik>/components/`.
4. **Yaz.**
   - gluestack bileşenleri ve NativeWind `className` ile; yalnızca tema token'ları (sabit renk/boşluk yok).
   - Props tipi dışa açık ve belgelenmiş; domain tipleri `src/types/` altından (`glossary.md` adlarıyla).
   - Kontrollü bileşen: değer `value` + `onChange` ile dışarıdan yönetilir; iş mantığı ve veri çekme içermez.
   - Durumlar: devre dışı (disabled), seçili, hata, stoksuz gibi görsel durumlar varyant/prop ile.
   - Erişilebilirlik: `accessibilityLabel` (Türkçe), `accessibilityRole`, en az 44×44 dokunma alanı.
   - Uzun metin, boş liste ve çok sayıda seçenek (ör. 12 beden, 20 renk) durumlarında taşma olmamalı.
5. **Kontrol.** `pnpm --filter @b2b/mobile lint` ve `typecheck`.
6. **Özet.** Bileşenin kullanım örneğini (kısa JSX) ve varsayımları Türkçe yaz.

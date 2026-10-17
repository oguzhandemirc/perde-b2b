---
name: new-screen
description: Mobil uygulamaya (apps/mobile) yeni bir ekran ekler — Expo Router rotası, feature bileşeni, servis fonksiyonu ve mock verisiyle birlikte. Yeni ekran, sayfa veya akış istendiğinde kullan.
argument-hint: '<ekran adı ve amacı>'
paths: 'apps/mobile/**'
---

# Yeni mobil ekran

İstenen ekran: $ARGUMENTS

## Adımlar

1. **Netleştir.** Ekranın amacı, hangi veriyi gösterdiği, hangi aksiyonları içerdiği ve hangi ekranlara geçtiği belli değilse kullanıcıya kısaca sor. İş kuralı gerekiyorsa `.claude/rules/domain/business-rules.md` dosyasına bak; yoksa sor.
2. **Tip.** Gerekli domain tipleri `src/types/` altında var mı bak; yoksa `glossary.md` adlarıyla ekle.
3. **Sözleşme.** Veri için gereken uç `docs/api/` altında tanımlı mı bak; değilse `/api-proposal` akışıyla öneri olarak ekle ve kullanıcıya backend'le konuşulması gerektiğini söyle.
4. **Mock + servis + query.** `src/mocks/` altına gerçekçi Türkçe veri (kenar durumlar dahil), `src/services/` altına async servis fonksiyonu (bkz. `mobile/mock-data.md`), `src/queries/` altına TanStack Query hook'u ekle.
5. **Feature bileşeni.** `src/features/<özellik>/` altında görünüm bileşeni; gluestack-ui bileşenleri ve NativeWind tema token'larıyla. Yükleniyor (Skeleton) / hata (tekrar dene) / boş durumları dahil. Yeni yeniden kullanılabilir bileşen gerekiyorsa `/ui-component` akışını izle.
6. **Rota.** `src/app/` altında ince rota dosyası; başlık ve navigasyon `_layout.tsx` ile uyumlu.
7. **Kontrol.** `pnpm --filter @b2b/mobile lint` ve `pnpm --filter @b2b/mobile typecheck` çalıştır, hataları düzelt.
8. **Görsel kontrol.** Simülatör açıksa `/screen-review` ile ekranı incelemeyi öner.
9. **Özet.** Kullanıcıya eklenen dosyaları, yapılan varsayımları (`// ASSUMPTION:`) ve ekranın nasıl açılacağını Türkçe özetle.

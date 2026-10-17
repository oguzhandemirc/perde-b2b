---
paths:
  - 'apps/web/**'
---

# Web (React) kuralları

> Web uygulaması henüz kurulmadı. Kurulduğunda araç seçimleri (Vite/Next.js, UI kütüphanesi, router) `docs/adr/` altına yazılır ve bu dosya güncellenir.

- Mobil ile aynı domain tipleri, servis katmanı yaklaşımı ve mock data kuralları geçerlidir (`mobile/mock-data.md`).
- Klasör yapısı mobile paralel tutulur: `features/`, `components/`, `services/`, `mocks/`, `lib/`, `types/`.
- Web ile mobil arasında paylaşılabilecek kod (tipler, para/tarih biçimlendirme, doğrulama şemaları) `packages/shared` altına taşınır; UI bileşenleri paylaşılmaz.
- Her sayfa yükleniyor, hata ve boş durumlarını ele alır.
- Erişilebilirlik: anlamlı HTML öğeleri, form alanlarında `label`, klavye ile gezilebilirlik.

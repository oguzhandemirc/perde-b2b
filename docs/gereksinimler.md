# Gereksinimler

Müşteriyle netleşen kapsam ve kararlar. Taslak iş kuralları ve açık sorular: `.claude/rules/domain/business-rules.md`.

## Proje

- **Müşteri:** Tekstil fabrikası; kendi ürettiği ürünleri alıcı firmalara satar.
- **Tür:** B2B platformu — web (React), mobil (React Native / Expo), backend.
- **Temel akış:** Fabrika ürünlerini ekler → alıcı firmalar sipariş verir → ödeme yapar.
- **Ekip:** Oğuzhan (mobil + web), Yusuf (backend).

## Aşama 1 — Müşteri demosu (mobil, mock data)

- **Amaç:** Müşteriye uygulamanın akışını ve görünümünü göstermek.
- **Kapsam:** Henüz netleşmedi. Önerilen demo akışı: giriş → ana sayfa → ürün listesi/arama → ürün detayı → sepet → sipariş onayı → sipariş geçmişi → cari hesap özeti.
- **Veri:** Mock data, backend yok.

## Karar günlüğü

| Tarih      | Karar                                                                          | Kaynak            |
| ---------- | ------------------------------------------------------------------------------ | ----------------- |
| 2026-10-17 | Monorepo: pnpm workspaces; mobil Expo (TypeScript)                             | ADR-0001          |
| 2026-10-17 | İlk iş: mock data ile mobil demo                                               | Toplantı / sohbet |
| 2026-10-17 | Müşteri: tekstil fabrikası; alıcılar uygulamadan sipariş verir ve ödeme yapar  | Sohbet            |
| 2026-10-17 | Mobil yığın: Expo Router, NativeWind, gluestack-ui v5, TanStack Query, Zustand | ADR-0002          |

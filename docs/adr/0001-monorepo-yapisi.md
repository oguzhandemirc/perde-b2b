# ADR-0001: Monorepo yapısı ve araçlar

- **Tarih:** 2026-10-17
- **Durum:** Kabul edildi
- **Karar verenler:** Oğuzhan

## Bağlam

Web, mobil ve backend aynı depoda geliştirilecek; iki kişi farklı alanlarda çalışacak. İlk teslim, müşteriye mock data ile mobil demo.

## Karar

- Tek repo, `apps/{mobile,web,backend}` + `packages/*`.
- Paket yöneticisi **pnpm** (workspaces), `nodeLinker: hoisted` — React Native / Metro symlink'li yapıyla sorun çıkarabildiği için.
- Mobil: **Expo** (TypeScript). Demo Expo Go ile cihazda gösterilebilir; native klasörler (ios/android) üretilir, elle düzenlenmez.
- Kod kalitesi: ESLint (eslint-config-expo), Prettier, Husky + lint-staged, commitlint (Conventional Commits, scope zorunlu).
- Web ve backend teknolojisi ayrı ADR ile seçilecek.

## Değerlendirilen alternatifler

- npm/yarn workspaces — pnpm daha hızlı ve disk dostu; ekip tercihi pnpm.
- Turborepo/Nx — iki uygulama ve iki kişi için şimdilik gereksiz; build süreleri artarsa tekrar değerlendirilir.
- Bare React Native CLI — Expo, demo ve cihazda test hızını artırıyor; gerekirse development build ile native modül eklenebilir.

## Sonuçlar

- Backend Node.js seçilirse workspace'e otomatik dahil olur; başka dil seçilirse pnpm dışında kalır.

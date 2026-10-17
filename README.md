# B2B

Monorepo: web (React), mobil (React Native / Expo) ve backend.

| Klasör         | İçerik                                               | Sorumlu |
| -------------- | ---------------------------------------------------- | ------- |
| `apps/mobile`  | React Native (Expo, TypeScript)                      | Oğuzhan |
| `apps/web`     | React web uygulaması (kurulmadı)                     | Oğuzhan |
| `apps/backend` | API (teknoloji seçilmedi)                            | Yusuf   |
| `packages/`    | Ortak kod (tipler, yardımcılar)                      | —       |
| `docs/`        | Gereksinimler, teknik kararlar (ADR), API sözleşmesi | Ortak   |

## Gereksinimler

- Node.js (sürüm `.nvmrc` dosyasında)
- pnpm (`brew install pnpm`)
- iOS için Xcode, Android için Android Studio / SDK
- Telefonda deneme için **Expo Go** uygulaması

## Başlangıç

```bash
pnpm install         # kökte; tüm workspace bağımlılıklarını kurar ve git hook'larını etkinleştirir
pnpm mobile          # Expo geliştirme sunucusunu başlatır (QR kodu Expo Go ile okutun)
pnpm mobile:ios      # iOS simülatöründe açar
pnpm mobile:android  # Android emülatöründe açar
```

## Kalite

```bash
pnpm lint
pnpm typecheck
pnpm format
```

Commit mesajları [Conventional Commits](https://www.conventionalcommits.org/) biçimindedir ve scope zorunludur: `feat(mobile): add product list screen`. Kurallar: `.claude/rules/general/git.md`.

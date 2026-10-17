---
name: add-ui
description: gluestack-ui CLI ile mobil uygulamaya hazır bir UI bileşeni ekler (apps/mobile/src/components/ui), ardından CLI'ın bozduğu yapılandırmayı düzeltir ve diff'i özetler. Bir gluestack bileşeni (button, select, actionsheet...) gerektiğinde kullan.
argument-hint: '<bileşen adı(ları)>'
paths: 'apps/mobile/**'
---

# gluestack bileşeni ekle

İstenen bileşen(ler): $ARGUMENTS

1. **Önce bak.** Bileşen `apps/mobile/src/components/ui/` altında zaten var mı? Varsa ekleme, kullanıcıya söyle. Adı sürüme uygun gluestack-ui v5 dokümanından doğrula.
2. **Ekle.** `apps/mobile` içinde: `npx gluestack-ui@latest add <bileşen> --use-pnpm -y`. Bağımlı bileşenler de eklenebilir; listesini not et. Yeni paket kurduysa Expo Go'da bulunduğunu kontrol et (`mobile/react-native.md`).
3. **CLI'ın bilinen sorunlarını düzelt** (`git diff` ile her birine bak):
   - `tsconfig.json` `paths`'e `./*` eklediyse geri al: `@/*` yalnızca `./src/*`'yı gösterir.
   - `babel.config.js`'e `module-resolver` eklediyse kaldır (alias'ı tsconfig + Metro çözer).
   - `apps/mobile/package.json`'a `pnpm` / `resolutions` / `overrides` alanı eklediyse kaldır; override'lar kökteki `pnpm-workspace.yaml`'dadır.
   - `global.css`'e `:root.dark` / `.light` blokları eklediyse kaldır; koyu tema yalnızca `@media (prefers-color-scheme: dark)` ile (NativeWind v5 RC kısıtı).
   - Bileşen dosyalarında numaralı token (`bg-primary-500`) varsa kullanıcıya bildir.
4. **Biçim ve kontrol.** `npx prettier --write` (değişen dosyalar), `pnpm --filter @b2b/mobile lint`, `pnpm --filter @b2b/mobile typecheck`.
5. **Özet.** `git diff --stat` ile eklenen/değişen dosyaları, eklenen paketleri ve geri aldığın CLI değişikliklerini Türkçe kısa bir listeyle raporla.

## Kurallar

- `components/ui/` kütüphane kodudur: içine iş mantığı, veri çekme veya domain tipi konmaz; yalnızca tema/varyant düzenlemesi yapılır. Domain bileşeni gerekiyorsa `/ui-component`.
- Kök `pnpm-lock.yaml` dışında kilit dosyası (`package-lock.json`, `yarn.lock`) oluştuysa sil.

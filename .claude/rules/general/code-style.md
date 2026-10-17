# Genel kod kuralları

## Dil

- Kod (değişken, fonksiyon, tip, dosya adı), commit mesajı ve kod yorumu **İngilizce**.
- Kullanıcının gördüğü metin (UI, hata mesajı, bildirim) **Türkçe**.
- Dokümantasyon (`docs/`, README, kurallar) **Türkçe**.
- Türkçe iş terimlerinin koddaki İngilizce karşılıkları `.claude/rules/domain/glossary.md` dosyasındadır; aynı kavram için farklı isim uydurulmaz.

## İsimlendirme

- Değişken/fonksiyon: `camelCase`; tip/arayüz/bileşen: `PascalCase`; sabit: `UPPER_SNAKE_CASE`.
- Dosya: bileşenler `PascalCase.tsx`, diğerleri `camelCase.ts`; Expo Router rotaları `kebab-case.tsx`.
- Boolean'lar `is/has/can/should` ile başlar: `isLoading`, `hasDiscount`.
- Kısaltma kullanılmaz (`qty` değil `quantity`), yaygın olanlar hariç (`id`, `url`, `api`).

## Yapı

- Bir fonksiyon tek iş yapar; ~50 satırı geçiyorsa bölünür.
- Erken dönüş (early return) iç içe `if`'e tercih edilir.
- Kopyala-yapıştır yerine ortak fonksiyon; ama tek kullanım için soyutlama yapılmaz.
- Ölü kod, yorum satırına alınmış kod ve `console.log` commit'lenmez.

## Yorumlar

- Yorum "ne" değil "neden" anlatır. Kod kendini açıklıyorsa yorum yazılmaz.
- `TODO:` yorumları kısa bir açıklama içerir: `// TODO: replace with API call when /orders is ready`.

## Bağımlılıklar

- Yeni paket eklemeden önce mevcut bağımlılıklarla çözülüp çözülmediğine bakılır.
- Mobil pakette `npx expo install <paket>` kullanılır (SDK uyumlu sürüm seçer); diğer workspace'lerde `pnpm --filter <paket> add`.
- Paket yöneticisi yalnızca **pnpm**; `npm install` / `yarn` çalıştırılmaz, `package-lock.json` oluşturulmaz.

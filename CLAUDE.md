# B2B Projesi

Müşteri için geliştirilen B2B platformu. Monorepo: web (React), mobil (React Native / Expo), backend.

## Yapı

```
apps/
  mobile/    React Native (Expo, TypeScript) — sorumlu: Oğuzhan
  web/       React — sorumlu: Oğuzhan (henüz kurulmadı)
  backend/   API — sorumlu: Yusuf (teknoloji seçilmedi)
packages/    web ve mobilin ortak kodu (tipler, biçimlendirme) — ihtiyaç olunca
docs/
  gereksinimler.md   netleşen kapsam ve karar günlüğü
  adr/               teknik kararlar (Architecture Decision Records)
  api/               frontend ↔ backend API sözleşmesi
.claude/
  rules/     kurallar — general/ ve domain/ her zaman, diğerleri ilgili klasörde yüklenir
  skills/    /new-screen, /ui-component, /mock-data, /api-proposal, /screen-review,
             /record-decision, /commit, /pr, /demo-check
  agents/    reviewer — değişiklikleri kurallara göre inceler
```

## Komutlar

- Claude Code her zaman **repo kökünden** başlatılır (kurallar ve skill'ler kökteki `.claude/` altında).
- Paket yöneticisi **pnpm** (workspaces). Kurulum: `pnpm install` (kökte).
- `pnpm mobile` — Expo geliştirme sunucusu; `pnpm mobile:ios` / `pnpm mobile:android`.
- `pnpm lint`, `pnpm typecheck`, `pnpm format` — tüm workspace'lerde.
- Bir iş "bitti" denmeden önce lint ve typecheck temiz olmalı.

## Ekip ve sınırlar

- Oğuzhan: `apps/mobile`, `apps/web`, frontend tarafı `packages/*`.
- Yusuf: `apps/backend`.
- Bir kişinin alanındaki dosyalar o kişiyle konuşulmadan değiştirilmez. API sözleşmesi (`docs/api/`) ortak karardır.

## Mevcut aşama: müşteri demosu

- Mobil uygulama, müşteriye gösterilecek demo için **mock data** ile geliştiriliyor; backend henüz yok.
- Veri yalnızca servis katmanından okunur; backend gelince sadece o katman değişir.
- İş kuralları henüz taslak (`.claude/rules/domain/business-rules.md`). Netleşmemiş bir kural gerekirse uydurulmaz, sorulur; netleşen karar `/record-decision` ile kaydedilir.

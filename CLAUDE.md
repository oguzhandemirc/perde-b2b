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
  skills/    /new-screen, /ui-component, /add-ui, /add-translation, /mock-data,
             /api-proposal, /screen-review, /run-demo, /build-apk, /demo-check,
             /record-decision, /commit, /pr
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
- Bir kişinin alanındaki dosyalar o kişiyle konuşulmadan değiştirilmez.
- PR'lar onaya düşmez: her PR CI geçince açan kişi tarafından birleştirilir. Ortak alanlara (`docs/api/`, `packages/`, `.github/`, kök yapılandırma) dokunan PR'da karşı taraf bilgilendirme amacıyla etiketlenir (bkz. `.claude/rules/general/git.md`).
- API sözleşmesi (`docs/api/`) önce yazılır, sonra kodlanır; kırıcı değişiklik önceden konuşulur.

## İnceleme

- Her özellik/ekran bitince `reviewer` ajanı kullanıcı istemeden otomatik çalıştırılır; bulgular düzeltilir, sonra kullanıcıya rapor edilir.

## Mevcut aşama: müşteri demosu

- Müşteri **CEKA TEKSTİL**, bir **brode perde fabrikası** (giyim değil: beden/asorti yok; stok ve termin kapsam dışı). Domain: `.claude/rules/domain/`.
- Mobil uygulama, müşteriye gösterilecek demo için **mock data** ile geliştiriliyor; backend henüz yok.
- Veri yalnızca servis katmanından okunur; backend gelince sadece o katman değişir.
- İş kuralları henüz taslak (`.claude/rules/domain/business-rules.md`). Netleşmemiş bir kural gerekirse uydurulmaz, sorulur; netleşen karar `/record-decision` ile kaydedilir.

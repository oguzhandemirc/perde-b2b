# Git kuralları

## Akış: main + kısa ömürlü branch

- `main` her zaman çalışır durumdadır; doğrudan push yapılmaz, her değişiklik PR ile girer. (Tek istisna: deponun ilk kurulum commit'i.)
- Her iş için `main`'den yeni branch açılır; branch birkaç günden uzun yaşamaz, `main` ile düzenli güncellenir (`git pull --rebase origin main`).
- Branch adı: `<tip>/<alan>-<kısa-açıklama>` — örnek: `feat/mobile-urun-listesi`, `fix/backend-siparis-toplami`, `chore/repo-eslint`.
- Bir branch tek bir konuya odaklanır; mobil ve backend değişiklikleri aynı PR'da karışmaz (API sözleşmesi değişikliği hariç).

## Commit

- Conventional Commits, İngilizce: `<type>(<scope>): <özet>` — örnek: `feat(mobile): add product list screen`.
- `type`: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `perf`, `build`, `ci`.
- `scope` zorunludur (commitlint denetler): `mobile`, `web`, `backend`, `shared`, `api`, `repo`, `deps`, `docs`, `claude`.
- Özet emir kipinde, küçük harfle başlar, sonda nokta yok, ~72 karakteri geçmez.
- Bir commit tek bir mantıksal değişiklik içerir; "wip", "fix", "update" gibi anlamsız mesajlar yazılmaz.
- `.husky` hook'ları (lint-staged, commitlint) `--no-verify` ile atlanmaz.

## Pull request

- PR'lar **squash merge** ile birleştirilir; PR başlığı main'deki commit mesajı olacağı için conventional commit biçiminde yazılır.
- CI (lint, typecheck, format) geçmeden PR birleştirilmez.
- Onay kuralı:
  - Kendi alanındaki PR'ı (Oğuzhan: `apps/mobile`, `apps/web`; Yusuf: `apps/backend`) CI geçince sahibi birleştirebilir.
  - Ortak alanlar — `docs/api/`, `packages/`, `.claude/`, kök yapılandırma dosyaları — **diğer kişinin onayını** ister (CODEOWNERS).
- PR açıklaması `.github/pull_request_template.md` şablonuyla doldurulur.
- Birleşen branch silinir.

## Claude için

- Kullanıcı açıkça istemeden commit atma, push etme, branch silme, PR birleştirme.
- `main` üzerindeyken commit gerekiyorsa önce yeni branch aç.
- Diğer kişinin alanına veya ortak alanlara dokunan değişiklikleri commit'lemeden önce kullanıcıya belirt.
- Gizli bilgi içeren dosyaları (`.env`, anahtar, sertifika) asla stage'leme.

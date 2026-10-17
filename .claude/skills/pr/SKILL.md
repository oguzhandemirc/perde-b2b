---
name: pr
description: Mevcut branch'i push edip proje şablonuna göre GitHub pull request açar; başlığı squash merge için conventional commit biçiminde yazar ve ortak alan değişikliklerini işaretler.
disable-model-invocation: true
argument-hint: '[ek not]'
allowed-tools:
  - Bash(git status *)
  - Bash(git diff *)
  - Bash(git log *)
  - Bash(git branch *)
  - Bash(git fetch *)
  - Bash(gh pr view *)
  - Bash(gh pr list *)
---

# Pull request aç

1. **Ön kontrol**
   - `main` üzerindeysen dur: PR için branch gerekir.
   - Commit'lenmemiş değişiklik varsa kullanıcıya sor (önce `/commit`).
   - `pnpm lint`, `pnpm typecheck`, `pnpm format:check` çalıştır; hata varsa PR açmadan bildir.
   - `git fetch origin` ve `git log origin/main..HEAD` ile PR'a girecek commit'leri listele; `main` gerideyse rebase öner.
   - Bu branch için açık PR var mı bak (`gh pr list --head <branch>`); varsa yeni açma, güncelle.
2. **Kapsamı belirle:** `git diff origin/main...HEAD --stat`. Değişen alanları tespit et:
   - Ortak alan (`docs/api/`, `packages/`, `.github/`, kök yapılandırma) → karşı taraf açıklamada `@` ile etiketlenir; bilgilendirmedir, onay beklenmez (bkz. `general/git.md`).
   - Diğer kişinin alanı → kullanıcıya özellikle hatırlat.
3. **Başlık:** squash sonrası main'e commit mesajı olarak gider → `<type>(<scope>): <özet>` (İngilizce, `.claude/rules/general/git.md`).
4. **Açıklama:** `.github/pull_request_template.md` şablonunu Türkçe doldur: ne değişti, neden (ilgili karar/gereksinim), nasıl test edildi, ortak alan ve API sözleşmesi kutuları. Ekran değişikliği varsa ekran görüntüsü eklenmesini öner. Ek not: $ARGUMENTS
5. **Onay al:** Başlığı ve açıklamayı kullanıcıya göster; onay gelince `git push -u origin <branch>` ve `gh pr create --title ... --body-file ...` çalıştır.
6. PR bağlantısını paylaş. Birleştirme yapma; CI geçince squash merge'ü PR'ı açan kullanıcı yapar.

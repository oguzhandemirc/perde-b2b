---
name: commit
description: Değişiklikleri proje git kurallarına göre (Conventional Commits, scope zorunlu) gruplayıp commit'ler.
disable-model-invocation: true
argument-hint: '[ek not]'
allowed-tools:
  - Bash(git status *)
  - Bash(git diff *)
  - Bash(git log *)
  - Bash(git add *)
  - Bash(git commit *)
  - Bash(git switch *)
  - Bash(git branch *)
---

# Commit

1. `git status` ve `git diff` ile değişiklikleri incele. `.env`, anahtar veya gizli bilgi içeren dosya varsa durdur ve kullanıcıya söyle.
2. `main` üzerindeysen `.claude/rules/general/git.md` kuralına uygun bir branch adı öner ve oluştur.
3. Değişiklikleri mantıksal gruplara ayır (ör. mobil ekran ayrı, kural dosyası ayrı). Diğer kişinin alanına dokunan değişiklik varsa kullanıcıya belirt.
4. Her grup için `<type>(<scope>): <özet>` biçiminde İngilizce mesaj yaz; geçerli scope'lar `commitlint.config.js` içindedir.
5. Hook'ları (`--no-verify`) atlama. Hook hata verirse sorunu düzelt, yeni commit at.
6. Push etme. Sonunda atılan commit'leri listele.

Ek not: $ARGUMENTS

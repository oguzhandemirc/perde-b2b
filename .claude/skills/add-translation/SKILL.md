---
name: add-translation
description: Mobil arayüz metinlerini TR + EN sözlüklerine anahtar kuralıyla ekler ve sözlüklerde eksik/fazla anahtar tarar. Yeni ekran/bileşen metni eklenirken, bileşende sabit metin bulunduğunda veya çeviri kontrolü istendiğinde kullan.
argument-hint: '<anahtar ve Türkçe metin | "tara">'
paths: 'apps/mobile/**'
---

# Çeviri ekle / tara

İstek: $ARGUMENTS

Sözlükler: `apps/mobile/src/i18n/locales/tr.json` ve `apps/mobile/src/i18n/locales/en.json` (kurulumda yol farklıysa `src/i18n/` altını bul ve onu kullan; kullanıcıya söyle).

## Ekleme

1. Anahtar biçimi `<ekran|özellik>.<öğe>`, `camelCase`: `catalog.filterTitle`, `cart.checkoutButton`, `common.retry`. Birden çok ekranın kullandığı metinler `common.*` altına.
2. Aynı anlamda bir anahtar zaten var mı bak; varsa onu kullan, kopya açma.
3. Anahtarı **iki sözlüğe birden** ekle; iç içe nesne yapısını ve alfabetik sırayı koru. Türkçe metin doğal ve kurumsal; İngilizce karşılığı anlamca aynı. Domain terimleri `domain/glossary.md` ile tutarlı (ör. "desen" → "pattern", "kartela" → "swatch book").
4. Değişken ve çoğul için i18next sözdizimi: `"{{count}} desen"`, `_one` / `_other` ekleri. Para/tarih metne gömülmez, `Intl` ile biçimlendirilip değişkenle verilir.
5. Domain verisi (desen adları, firma adları) sözlüğe eklenmez.
6. Bileşende `t('<anahtar>')` kullanıldığını kontrol et.

## Tarama

1. İki sözlüğün anahtar kümelerini karşılaştır: birinde olup diğerinde olmayan anahtarları listele.
2. Kodda (`apps/mobile/src/**/*.tsx`) kullanılan `t('...')` anahtarlarını çıkar: sözlükte olmayanları (eksik) ve sözlükte olup hiç kullanılmayanları (fazla) listele.
3. Bileşenlerde sabit yazılmış arayüz metni (JSX içinde çıplak Türkçe/İngilizce metin, `accessibilityLabel="..."`, `placeholder="..."`) ara.
4. Boş değer, TR sözlükte İngilizce ya da EN sözlükte Türkçe kalmış metinleri işaretle.

Sonunda `npx prettier --write` ile sözlükleri biçimle, `pnpm --filter @b2b/mobile typecheck` çalıştır ve eklenen/eksik/fazla anahtarları Türkçe kısa bir listeyle raporla. Fazla anahtarları kullanıcı onayı olmadan silme.

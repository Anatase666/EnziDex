# Развёртывание

Сайт статический: `npm run build` кладёт в `out/` готовый HTML, который
раздаётся любым веб-сервером. Серверной части нет вовсе — отсюда и главное
следствие: **заголовки безопасности задаются на хостинге, а не в коде**
(в Next.js `headers()` при `output: 'export'` не работает).

## Переменные окружения

Скопировать `.env.example` в `.env.local` и заполнить.

| Переменная | Назначение |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Канонический адрес. Влияет на `canonical`, `sitemap.xml`, `robots.txt`, абсолютные ссылки на OG-изображение |
| `NEXT_PUBLIC_BASE_PATH` | Подкаталог публикации. Пусто для корня домена, `/имя-репозитория` для GitHub Pages |

Всё, что начинается с `NEXT_PUBLIC_`, попадает в клиентский бандл и **видно
любому посетителю**. Секретов здесь нет и быть не должно: сайт информационный
и ни к одному внешнему сервису не обращается.

## Сборка

```bash
npm ci
npm run build
```

`prebuild` печатает список незаполненных мест, `postbuild` раскладывает
OG-изображение и создаёт `.nojekyll`.

Перед сдачей — строгий режим, он падает при любом оставшемся `TODO_CONTENT`:

```bash
CONTENT_STRICT=1 npm run build
```

Локальный просмотр собранного результата:

```bash
npx serve out
```

## Заголовки безопасности (ТЗ 8.5)

Про CSP честно: сайт не грузит ни одного стороннего скрипта, шрифты лежат
на своём домене, аналитики нет. Единственное послабление — `'unsafe-inline'`
для `script-src`: Next.js выводит четыре инлайновых скрипта гидратации,
а выдать им nonce при статическом экспорте некому, потому что нет сервера.
Риск при этом минимален: пользовательского ввода, который попадал бы в
разметку, на сайте нет — тексты приходят из типизированных файлов и
вставляются как текстовые узлы, а не через `innerHTML`.

Если хостинг умеет считать хеши инлайновых скриптов, `'unsafe-inline'`
стоит заменить на список `'sha256-...'`.

`connect-src 'self'` достаточно: страницы не выполняют ни одного сетевого
запроса к сторонним доменам. Единственные внешние адреса на сайте — ссылки
на doi.org в списке источников, и они открываются по действию пользователя,
а не запрашиваются кодом.

### nginx

```nginx
server {
    listen 443 ssl http2;
    server_name enzidex.ru;
    root /var/www/enzidex/out;

    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "DENY" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Хеши в именах файлов — можно кэшировать навсегда
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    error_page 404 /404.html;
}

server {
    listen 80;
    server_name enzidex.ru;
    return 301 https://$host$request_uri;
}
```

### Netlify

Файл `out/_headers` (создаётся вручную или добавляется в `postbuild`):

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

### Vercel

`vercel.json` в корне:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

### GitHub Pages

Заголовки безопасности задать нельзя — платформа этого не позволяет.
Для «отчётного» размещения это приемлемо, для боевого — нет: пункт
ТЗ 8.5 о заголовках на GitHub Pages не выполняется в принципе.
Если сайт должен пройти приёмку по 8.5 полностью, нужен VPS с nginx,
Netlify или Cloudflare Pages.

Что учесть:

1. `NEXT_PUBLIC_BASE_PATH=/имя-репозитория`, иначе стили и картинки отвалятся.
2. `.nojekyll` создаётся автоматически на шаге `postbuild` — без него Jekyll
   выбрасывает каталог `_next/`, и сайт открывается голым HTML.
3. `out/404.html` Pages подхватывает сам.

## Проверка после выкладки

- [ ] HTTPS, редирект с HTTP работает, сертификат валиден
- [ ] Нет mixed content (консоль браузера чиста)
- [ ] Заголовки на месте: `curl -sI https://enzidex.ru | grep -i -E 'content-security|x-content-type|referrer|frame'`
- [ ] `/sitemap.xml` и `/robots.txt` открываются, адреса в них с правильным доменом
- [ ] Превью ссылки: прогнать через отладчик OG любой соцсети — картинка `og/enzidex-og.png` должна отдаваться как `image/png`
- [ ] Несуществующий адрес отдаёт 404, а не 200 с пустой страницей
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95

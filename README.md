# petr.hollan.cz

Osobní portfolio a brand hub. Postaveno na Next.js 14, nasazeno na Vercel, obsah spravován přes Sanity CMS.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + vlastní CSS (grain texture, reveal animace)
- **CMS:** Sanity (blog, inspirace)
- **i18n:** next-intl (cs/en)
- **Email:** Resend (petr@send.hollan.cz)
- **Notifikace:** Discord webhooks
- **Ochrana formulářů:** Cloudflare Turnstile
- **Databáze:** Supabase (plánovač akcí)
- **Deployment:** Vercel → petr.hollan.cz
- **Ikony:** Phosphor Icons
- **Fonty:** Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono

## Stránky

| Route | Popis |
|-------|-------|
| `/` | Homepage s bento gridem |
| `/work` | Projekty, závěrečné práce, služby |
| `/about` | Životní timeline |
| `/free-time` | Sport, šachy, cestování |
| `/hustle` | Side quests — koučování, organizace akcí |
| `/cv` | Životopis |
| `/blog` | Blog (Sanity) |
| `/inspiration` | Inspirace od návštěvníků |
| `/schedule-time` | Rezervace času |
| `/planovac` | Interní plánovač akcí s RSVP (chráněno basic auth) |

## Lokální vývoj

npm install a spuštění dev serveru:

    git clone https://github.com/petrhollan22/petr-portfolio
    cd petr-portfolio
    npm install
    cp .env.example .env.local
    npm run dev

## Environment variables

    NEXT_PUBLIC_SANITY_PROJECT_ID=
    NEXT_PUBLIC_SANITY_DATASET=
    SANITY_API_TOKEN=
    RESEND_API_KEY=
    NEXT_PUBLIC_BASE_URL=
    DISCORD_WEBHOOK_URL=
    DISCORD_WEBHOOK_WEEKLY=
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=
    TURNSTILE_SECRET_KEY=
    SUPABASE_URL=
    SUPABASE_SECRET_KEY=
    SEND_SECRET=
    BOOKING_SECRET=
    TIP_SECRET=
    BASIC_AUTH_USER=
    BASIC_AUTH_PASS=

## Deployment

Produkční větev je main. Každý push spustí automatický deploy na Vercel.

    git add -A && git commit -m "popis změny" && git push

Pokud se změny neprojeví kvůli cache:

    git commit --allow-empty -m "Force redeploy" && git push

## Struktura projektu

    app/
    ├── [locale]/          # Lokalizované stránky (cs/en)
    ├── planovac/          # Interní plánovač (bez i18n)
    ├── api/               # API routes
    └── studio/            # Sanity Studio
    components/            # Sdílené komponenty
    data/                  # Statická data (timeline, sports, services...)
    messages/              # Překlady (cs.json, en.json)
    lib/                   # Utility funkce
    public/                # Statické soubory
    sanity/                # Sanity schema

## Licence

© 2026 Petr Hollan. All rights reserved.

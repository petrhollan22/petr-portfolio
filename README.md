# Petr Hollan — Portfolio Website

Next.js aplikace s kontaktem, rezervacemi, sportovními aktivitami a pracovními projekty.

## ✨ Funkce

- **Work** — projekty, akademické práce, pracovní služby
- **Free time** — sporty, úspěchy, galerie fotek
- **Schedule time** — rezervace času (Google Calendar integration ready)
- **Hustle** — koučování šachu, organizování eventů, dobrovolnictví
- **Contact form** — odesílá zprávy na Discord
- **Responsive design** — Tailwind CSS, mobilní optimalizace

## 🚀 Quick Start

### 1. Klonuj projekt a nainstaluj závislosti

```bash
git clone <repo-url>
cd petr-portfolio
npm install
```

### 2. Nastav Discord Webhook

Discord webhook slouží k odesílání kontaktů a rezervací. Nastavení:

#### A) Vytvoř Discord server (nebo použij existující)
Pokud nemáš, vytvoř server na [Discord](https://discord.com)

#### B) Vytvoř webhook
1. Přejdi na **Server Settings** (ozubené kolo)
2. Jdi do **Integrations** → **Webhooks**
3. Klikni **New Webhook**
4. Nastavte:
   - Name: `Portfolio Bot`
   - Channel: vyber kanál (např. #notifications)
   - Zkopíruj **Webhook URL**

#### C) Přidej URL do .env.local
```bash
cp .env.example .env.local
```

V `.env.local`:
```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
```

### 3. Spusť dev server

```bash
npm run dev
```

Otevři http://localhost:3000

## 📁 Projekt struktura

```
app/
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── work/page.tsx        # Projekty a služby
├── free-time/page.tsx   # Sporty a aktivity
├── schedule-time/page.tsx  # Rezervace
├── hustle/page.tsx      # Koučování, eventy
└── api/
    ├── contact/route.ts # Kontakt na Discord
    └── booking/route.ts # Rezervace na Discord

components/
├── Navbar.tsx           # Navigace
├── Footer.tsx           # Footer
└── ContactForm.tsx      # Kontaktní formulář

data/
├── projects.ts          # Akademické práce
├── services.ts          # Pracovní služby
├── sports.ts            # Sporty a úspěchy
└── hustle.ts            # Hustle projekty
```

## 🎨 Personalizace

### 1. Změní data v `data/` složce

#### `data/projects.ts`
```typescript
export const projects: Project[] = [
  {
    id: "project-id",
    title: "Název projektu",
    description: "Popis...",
    url: "link",
    tags: ["tag1", "tag2"],
    year: "2024",
  },
  // Přidej další...
];
```

#### `data/sports.ts`
```typescript
export const sports: Sport[] = [
  {
    id: "sport-id",
    name: "Běh",
    description: "Popis tvého sportu...",
    achievements: ["Maraton sub 4:20", "Half marathon sub 1:45"],
    link: "https://ratings.fide.com/...", // optional
  },
];
```

#### `data/hustle.ts`
Přidej své koučovací projekty, eventy, dobrovolnictví

### 2. Přidej fotky
Vytvoř `public/images/` složku a přidej fotky:
```
public/images/
├── sports/
│   ├── running.jpg
│   └── chess.jpg
├── projects/
├── hustle/
└── gallery/
```

V komponentách pak odkazuj:
```tsx
<img src="/images/sports/running.jpg" alt="Running" />
```

### 3. Změň barvy a styling
Tailwind config je v `tailwind.config.ts`.

Update v `components/Navbar.tsx`, `app/globals.css` atd.

## 🌐 Deployment na Vercel

### 1. Push na GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy na Vercel

Přejdi na [vercel.com](https://vercel.com):
1. Klikni **Import Project**
2. Vyber svůj GitHub repo
3. V **Environment Variables** přidej:
   ```
   DISCORD_WEBHOOK_URL = https://discord.com/api/webhooks/...
   ```
4. Klikni **Deploy**

Tvoje stránka bude live za < 1 minutu!

## 🔗 Vlastní doména

Po deployu na Vercel:
1. Přejdi na **Domains** v Vercel project settings
2. Přidej svou doménu (např. petr-hollan.com)
3. Aktualizuj DNS records (instrukce v Vercel)

Nebo kup doménu na [Namecheap](https://namecheap.com), [GoDaddy](https://godaddy.com), [Wedos](https://wedos.cz)

## 📅 Google Calendar Integration (Future)

Google Calendar booking bude připraveno později. Prozatím si rezervace odesílají přes Discord.

Setup Google Calendar:
1. Vytvoř Google Cloud project
2. Enable Google Calendar API
3. Vytvoř OAuth 2.0 credentials
4. Přidej `GOOGLE_CALENDAR_API_KEY` do `.env.local`

## 🐛 Troubleshooting

### Discord zprávy se neposílají
- ✅ Zkontroluj `DISCORD_WEBHOOK_URL` v `.env.local`
- ✅ Webhook musí být pro správný kanál
- ✅ Restartuj dev server (`npm run dev`)

### Fotky se nenačítají
- ✅ Zkontroluj cesty v `public/images/`
- ✅ Soubory musí být `.jpg`, `.png`, `.webp`

### Stránka se nenačítá po deployu
- ✅ Zkontroluj Vercel build logs
- ✅ Zkontroluj `next.config.js`

## 📞 Support

Máš dotazy? Kontaktuj mě:
- 💼 Work: petr@example.com
- 📱 Discord: [link na Discord server]
- 🔗 LinkedIn: linkedin.com/in/petrhollan

## 📝 License

© 2025 Petr Hollan. All rights reserved.

---

**Příští kroky:**
1. ✅ Spusť `npm install` a `npm run dev`
2. ✅ Nastav Discord webhook
3. ✅ Personalizuj data v `data/` složce
4. ✅ Přidej fotky do `public/images/`
5. ✅ Deploy na Vercel a kup doménu

Hotovo! 🚀

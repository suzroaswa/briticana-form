# Briticana Internship Application Form

Redesigned to match [briticana.us](https://www.briticana.us) brand colours (primary purple `#7a4dfc`, navy hero, light/dark mode).

## What’s included

| File | Purpose |
|------|---------|
| `public/index.html` | Production form (purple theme, logo, validation, progress bar) |
| `public/logo.webp` | Official Briticana logo |
| `google-apps-script.js` | Free backend → Google Sheets + Drive (dashboard) |
| `api/submit.js` | Optional Vercel serverless receiver |
| `vercel.json` | Static + API routing |

## Free data storage + live dashboard (Google Sheets)

Google Drive free tier ≈ **15 GB**. Perfect for applications + resumes.

### 5-minute setup

1. Open https://sheets.new → name it **Briticana Applications**
2. **Extensions → Apps Script**
3. Paste the entire contents of `google-apps-script.js`
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the **Web App URL**
6. In `public/index.html` set:
   ```js
   const WEBHOOK_URL = "https://script.google.com/macros/s/XXXX/exec";
   ```
7. Redeploy (or open the HTML file). Every submission lands in the Sheet as a new row. Resumes under 4 MB are saved to a Drive folder **Briticana Resumes**.

The Google Sheet **is** your backend dashboard — filter by domain, export CSV, share with the team.

## Deploy to Vercel (subdomain)

### Option A – Vercel dashboard (recommended)

1. Zip this folder (or push to GitHub)
2. vercel.com → **Add New Project** → Import / Upload
3. Root directory = project root
4. Framework = Other (static)
5. After deploy: **Settings → Domains** → add `apply.briticana.us` (or any subdomain) and point DNS CNAME to `cname.vercel-dns.com`

### Option B – CLI

```bash
npm i -g vercel
cd briticana-form
vercel --prod
```

### Option C – Already deployed via tool

If you used the automated deploy, open the production URL and then attach the custom subdomain in the Vercel project settings.

## Colour system (matches briticana.us)

- Primary CTA / accents: `#7a4dfc`
- Hover: `#6435e0`
- Hero / navy: `#1a1a2e` → `#2d2b55`
- Background: soft lavender-grey
- Light + dark mode toggle (top-right)

## Local test

Open `public/index.html` in a browser. Without `WEBHOOK_URL` the form still validates and shows the success screen; payload is logged to the console.

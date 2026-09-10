# Briticana Internship Application Form

Redesigned to match [briticana.us](https://www.briticana.us) (primary purple `#7a4dfc`).

## Project structure (ready for Vercel)

```
briticana-form/
├── index.html              ← form (frontend)
├── logo.webp               ← logo
├── api/
│   └── submit.js           ← optional Vercel API
├── vercel.json
├── google-apps-script.js   ← paste into Google Apps Script (not deployed to Vercel)
└── README.md
```

## 1. Google Sheets backend (do this first)

1. Open https://sheets.new → name it **Briticana Applications**
2. **Extensions → Apps Script**
3. Paste the entire contents of `google-apps-script.js`
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorise when asked
6. Copy the **Web App URL** (ends with `/exec`)

## 2. Connect the form to Google Sheets

Open `index.html` and set:

```js
const WEBHOOK_URL = "https://script.google.com/macros/s/XXXX/exec";
```

Save the file.

## 3. Deploy to Vercel (correct way)

### Recommended: Upload folder

1. Go to https://vercel.com → **Add New → Project**
2. Choose **Upload**
3. Upload the **entire `briticana-form` folder**
4. Settings:
   - Framework Preset: **Other**
   - Leave Build Command and Output Directory **empty**
5. Click **Deploy**

### Or use CLI

```bash
npm i -g vercel
cd briticana-form
vercel login
vercel --prod
```

## 4. Make the site public

After deploy:

1. Project → **Settings → Deployment Protection**
2. Turn **OFF** Vercel Authentication / Deployment Protection for Production

Otherwise you will see a login wall instead of the form.

## 5. (Optional) Custom subdomain

1. Project → **Settings → Domains** → add `apply.briticana.us`
2. In your DNS create a **CNAME**:
   - Name: `apply`
   - Value: `cname.vercel-dns.com`

## Why you got 404 before

The old config put files inside a `public/` folder and used outdated `builds` + routes that broke the root path `/`.

Current layout puts `index.html` at the **root** of the project. Vercel serves it automatically at `/`.

## Quick test after deploy

1. Open the Vercel URL
2. Fill and submit the form
3. Check the Google Sheet — a new row should appear
4. Check Google Drive → folder **Briticana Resumes** (for uploaded CVs under 4 MB)

If the form still 404s after re-upload, delete the old Vercel project and create a fresh one with the new zip.

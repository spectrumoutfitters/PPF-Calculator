Here’s an updated **CLAUDE.md** you can drop in. It keeps your current single-file/CDN approach, adds clear **local testing** steps (so clipboard works), and gives you **two production publish paths** (Vercel or Cloudflare Pages) plus **DNS + embed** instructions.

---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Paint Protection Film (PPF) pricing calculator for Spectrum Outfitters, built as a **standalone React application** embedded in a single HTML file.

## Architecture

* **Single-file app:** `Calculator.html` contains the entire React component and UI
* **No build system:** Direct React development using **ES modules** from CDNs
* **Styling:** Tailwind CSS via CDN (`cdn.tailwindcss.com`)
* **Icons:** `lucide-react` via ESM CDN (e.g., `https://esm.sh/lucide-react`)
* **Clipboard:** Uses `navigator.clipboard.writeText` (requires HTTPS or `http://localhost`)

> If you ever move to a multi-file or production bundling setup, prefer **Vite**. For now, keep it single-file and CDN-based.

## Core Business Logic (Immutable)

The calculator implements a fixed 3-tier pricing structure:

1. **Baseline:** `baseline = cost ÷ 0.70` (enforces 30% minimum margin)
2. **Retail:** `retail = baseline × 1.30` (+30% markup)
3. **Dealer:** `dealer = retail × 0.85` (−15% discount)
4. **Final Price:** `final = max(candidate, baseline)` (never go under 30% margin)
5. **Rounding:** always **round UP** to protect margin
6. **Daily overhead:** fixed at **\$300/day**

**Constants (keep stable):**

```js
BASELINE_MARGIN = 0.30
RETAIL_MARKUP   = 0.30
DEALER_DISCOUNT = 0.15
DAILY_OVERHEAD  = 300
```

## Key Components (Reference)

* **Vehicle estimates:** predefined rolls/days per vehicle type
* **Cost calculation:** materials + labor + daily overhead
* **Price enforcement:** baseline floor prevents sub-30% margins
* **Rounding:** rounds UP to \$25/\$50/\$100 (configurable)
* **Quote export:** “Copy Quote” copies client-ready summary

---

## Local Development & Testing

> **Why a local server?** Clipboard APIs and ES modules behave best on `http://localhost` or HTTPS. Opening the file via `file://` may block clipboard or module imports.

### 1) Project layout

```
/
├─ Calculator.html
└─ (optional) /assets (images/logo, etc.)
```

### 2) Run a simple static server (pick one)

**Python (built-in on macOS):**

```bash
cd /path/to/your/project
python3 -m http.server 5173
# Visit: http://localhost:5173/Calculator.html
```

**Node (npx serve):**

```bash
cd /path/to/your/project
npx serve -p 5173
# Visit: http://localhost:5173/Calculator.html
```

**VS Code Live Server:** Right-click `Calculator.html` → “Open with Live Server”.

> Ensure the page loads, the **Copy Quote** button works, and all numbers format correctly.

### 3) CDN imports (pin versions)

In `Calculator.html`, use **pinned** versions to avoid surprises:

```html
<!-- Tailwind (runtime CDN) -->
<script src="https://cdn.tailwindcss.com@3.4.10"></script>

<!-- React / ReactDOM via ESM CDN -->
<script type="module">
  import React from "https://esm.sh/react@18.3.1";
  import ReactDOM from "https://esm.sh/react-dom@18.3.1/client";
  import * as Lucide from "https://esm.sh/lucide-react@0.462.0";

  // ... mount your PricingCalculator to #root
</script>
```

> Keep imports absolute (https URLs). Do **not** use bare imports (like `import React from 'react'`) without a bundler.

### 4) Clipboard in iframes

When embedding on another site, include `allow="clipboard-write"` on the `<iframe>` so “Copy Quote” keeps working:

```html
<iframe src="https://quote.spectrumoutfitters.com"
        allow="clipboard-write"
        style="width:100%;height:90vh;border:0;border-radius:12px"></iframe>
```

---

## Production Publishing

Pick **one** host. Both work great for a single static HTML file.

### Option A — Vercel (simple + fast)

1. **Create repo & push**

```bash
git init
git add Calculator.html
git commit -m "initial calculator"
git branch -M main
git remote add origin https://github.com/<you>/ppf-calculator.git
git push -u origin main
```

2. **Deploy**

* Go to **vercel.com → New Project → Import** your repo
* Framework preset: **Other** (static)
* Output directory: `/` (root)
* Deploy → you’ll get a URL like `https://ppf-calculator.vercel.app/`

3. **Custom subdomain**

* In Vercel dashboard → **Settings → Domains** → add:

  * `quote.spectrumoutfitters.com`
* **NameBright DNS:** add a **CNAME** record for `quote` → the target Vercel gives you (usually `cname.vercel-dns.com`)
* Wait for SSL to issue (\~minutes)

### Option B — Cloudflare Pages (also great)

1. **Create new project** in **Cloudflare Pages**

* Connect your GitHub repo
* **Build command:** *(leave empty)*
* **Build output directory:** `/` (root)
* Deploy → you’ll get `https://<project>.pages.dev`

2. **Custom subdomain**

* In Cloudflare Pages → **Custom Domains** → add `quote.spectrumoutfitters.com`
* In **NameBright**, set **CNAME** for `quote` to the provided `pages.dev` target
* Wait for SSL

---

## Embedding in your main website

Once deployed, embed anywhere (WordPress, Webflow, Next.js, Shopify, Urable site pages):

```html
<div style="max-width:1100px;margin:0 auto;">
  <iframe
    src="https://quote.spectrumoutfitters.com"
    title="PPF Calculator"
    loading="lazy"
    allow="clipboard-write"
    style="width:100%;height:90vh;border:0;border-radius:12px;overflow:hidden">
  </iframe>
</div>
```

**(Optional) Auto-resize iframe**
Add this to the **host page**:

```html
<script>
  window.addEventListener("message", (e) => {
    if (!e.origin.includes("quote.spectrumoutfitters.com")) return;
    const { type, height } = e.data || {};
    if (type === "RESIZE_IFRAME" && height) {
      document.querySelector('iframe[title="PPF Calculator"]').style.height = height + "px";
    }
  });
</script>
```

In `Calculator.html`, post height on resize:

```html
<script type="module">
  // after React mounts:
  const sendHeight = () => {
    const h = document.documentElement.scrollHeight;
    window.parent?.postMessage({ type: "RESIZE_IFRAME", height: h }, "*");
  };
  new ResizeObserver(sendHeight).observe(document.body);
  sendHeight();
</script>
```

---

## What Claude Should/Shouldn’t Change

**Claude SHOULD:**

* Keep all **pricing formulas and constants** exactly as defined (immutable).
* Ensure rounding is **upwards** only.
* Maintain **clipboard** export (client-ready, no internal diagnostics).
* Keep UI minimalist (final price prominent; details collapsible).
* Pin CDN versions in `Calculator.html`.
* Guard against `NaN` and negative input; format all money via `toLocaleString`.

**Claude SHOULD NOT:**

* Introduce a bundler or split files unless requested.
* Change pricing constants, tier rules, or the margin floor.
* Remove the baseline floor (`max(candidate, baseline)`).
* Add experimental CDNs without pinning versions.

---

## Troubleshooting

* **Clipboard not working:** Use `http://localhost` or HTTPS. If embedded, add `allow="clipboard-write"` to the iframe.
* **Icons not rendering:** Ensure `lucide-react` is imported from a CDN (e.g., `https://esm.sh/lucide-react@VERSION`) and used within React.
* **CORS/import errors:** Always use absolute ESM URLs in `<script type="module">`.
* **Tailwind not applying:** Confirm `https://cdn.tailwindcss.com` is loaded **before** your component code; avoid CSP that blocks inline scripts unless configured.

---

## Future Upgrade (optional)

If you later want faster loads, SEO routing, or CMS pages, migrate to **Next.js on Vercel** and embed this calculator via iframe at `quote.spectrumoutfitters.com` (keeps it isolated and reusable across sites).

---

**End of CLAUDE.md**

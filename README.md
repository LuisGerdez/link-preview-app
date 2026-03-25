# Link Preview Studio

A web tool that fetches any URL, extracts its Open Graph and Twitter Card meta tags, and renders real-time preview cards for **Facebook**, **Twitter/X**, and **Slack** - helping developers and marketers verify how their links will appear when shared on social platforms.

**Live Demo:** https://link-preview-app-ten.vercel.app/

---

## Prerequisites

| Requirement | Version           |
| ----------- | ----------------- |
| **Node.js** | **≥ 18.18.0**     |
| **npm**     | **≥ 9** (bundled) |

Verify with:--

```bash
node -v   # e.g. v20.x or v22.x
npm -v    # e.g. 10.x
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open **http://localhost:3000** - paste any URL and see the preview cards instantly.

> No environment variables, API keys, or database setup required.

---

## Tech Stack

| Technology          | Version  | Purpose                                 |
| ------------------- | -------- | --------------------------------------- |
| Next.js (App Router) | 16.2.1  | React framework with server-side API routes |
| React               | 19.2.4   | UI library                              |
| TypeScript           | 5.x     | Type safety                             |
| Tailwind CSS         | 4.x     | Utility-first styling                   |
| node-html-parser     | 7.x     | Server-side HTML parsing & meta extraction |
| next-themes          | 0.4.6   | Dark / light mode switching             |
| sonner               | 2.x     | Toast notifications                     |

---

## Features

### Core

- **URL fetching & meta extraction** - Server-side `POST /api/preview` route fetches the target URL, parses HTML, and extracts Open Graph + Twitter Card meta tags.
- **Platform preview cards** - Pixel-accurate preview cards for Facebook, Twitter/X (summary & summary_large_image), and Slack (unfurl style).
- **Meta tag completeness panel** - Visual checklist of all relevant tags with green ✓ / red ✗ indicators and one-click copy to clipboard.
- **Image error handling** - Graceful fallback when `og:image` or `twitter:image` URLs fail to load.

### Bonus

- **Dark mode** - Toggle between light and dark themes.
- **Recent URLs** - Last 10 searched URLs stored in `localStorage` for quick re-access.
- **Mobile responsive** - Fully responsive layout across all breakpoints.
- **Smooth animations** - Fade and slide transitions for preview cards and content areas.

---

## Why localStorage?

URL history is stored in `localStorage` for simplicity. In a production app, you would usually use something like a database. For this project, though, localStorage avoids unnecessary complexity while still allowing data to persist in the browser without adding extra dependencies.

---

## Error Handling

The API route (`POST /api/preview`) handles edge cases gracefully:

| Scenario                  | Status | Message                          |
| ------------------------- | ------ | -------------------------------- |
| Malformed URL             | 400    | The provided URL is not valid    |
| Non-HTTP(S) protocol      | 400    | Only HTTP and HTTPS are allowed  |
| Private IP / localhost    | 400    | Only public IPs and domains      |
| Non-200 response          | 400    | Received status code {code}      |
| Request timeout (>5s)     | 408    | The request took too long        |
| Non-HTML content          | 422    | Received content type {type}     |
| Unknown error             | 500    | Error message                    |

---

## Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start development server           |
| `npm run build` | Create optimized production build  |
| `npm run start` | Start production server            |
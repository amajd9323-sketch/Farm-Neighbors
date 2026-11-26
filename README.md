# Farm Neighbors — Mobile Farming PWA

Mobile-first farming game PWA for iPhone, Android and desktop.

## Project files

- [FarmNeighbors-Web-MVP.zip](./FarmNeighbors-Web-MVP.zip) — complete web MVP + Supabase SQL migrations.
- [Arabic setup guide](./README_AR.md).

## Run locally

Extract the ZIP. From its `FarmNeighbors_Web_Project/web/` folder:

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

## Online setup

1. Create a Supabase project.
2. Run SQL migrations in `FarmNeighbors_Web_Project/Backend/supabase/migrations/`.
3. Add the Supabase Project URL and public anon/publishable key to `web/config.js`.
4. Never place a service-role or secret key in browser code.

## Publish with GitHub Pages

This repository is private. To make source code public, use GitHub:
**Settings → General → Danger Zone → Change visibility → Make public**.

Then enable Pages:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

After Pages is enabled, the workflow in `.github/workflows/deploy-pwa.yml` deploys the PWA automatically on the next matching push or manual workflow run.

## Install

- iPhone: open HTTPS site in Safari → Share → Add to Home Screen → Open as Web App.
- Android: open HTTPS site in Chrome → Install app / Add to Home screen.

## Current scope

Early MVP, not a finished online multiplayer game. Farming and local preview are available. Supabase auth, account persistence, server-validated economy and neighbor presence require configuration and two-device testing. Real-time shared character movement, chat, direct trading, animals, factories, events and seasons remain future work.

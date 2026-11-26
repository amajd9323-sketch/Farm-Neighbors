# Farm Neighbors — Mobile Farming PWA

**Farm Neighbors** is a mobile-first Progressive Web App for Android, iPhone and desktop.

## Download and run

1. Download [FarmNeighbors-Web-MVP.zip](./FarmNeighbors-Web-MVP.zip).
2. Extract the ZIP.
3. Open the extracted project folder in your editor.
4. Start a local HTTP server from the `web/` directory:

```bash
python -m http.server 8080
```

5. Open `http://localhost:8080`.

Arabic instructions: [README_AR.md](./README_AR.md).

## Features in this MVP

- Responsive touch-first 4x4 farm.
- Plant, water, grow and harvest wheat, carrots, tomatoes and corn.
- Coins, seeds, inventory, sales, XP and levels.
- Arabic RTL and English LTR localization.
- Installable PWA manifest, service worker and app icons.
- Local preview mode saved on the current device.
- Supabase Auth, PostgreSQL RPC economy, friend invites and neighbor presence when configured.

## Online setup

1. Create a Supabase project.
2. Run both SQL migrations in `Backend/supabase/migrations/`.
3. Set the Supabase Project URL and public anon/publishable key in `web/config.js`.
4. Host the contents of `web/` over HTTPS.
5. Test accounts and neighbor invites on two real devices.

Never put a Supabase service-role or secret key in browser code.

## Install on phones

- **iPhone:** Open the HTTPS URL in Safari → Share → Add to Home Screen → enable Open as Web App → Add.
- **Android:** Open the HTTPS URL in Chrome → Install app (or browser menu → Add to Home screen).

## Current scope

This is an early playable MVP, not a finished online multiplayer title. Preview mode is single-device only. Online auth, per-player persistence, neighbor invites and presence depend on Supabase setup. Two-device acceptance testing, shared live character movement, chat, direct trading, animals, crafting, fishing, mining, seasons and push notifications remain outstanding.

## GitHub Pages

A deployment workflow is included. It extracts the committed ZIP and publishes the PWA. GitHub Pages must be available and enabled for this repository. The repository is currently private; public hosting may require changing repository visibility or using another HTTPS host. Repository visibility is not changed automatically.

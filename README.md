# Farm Neighbors — Mobile Farming PWA

**Live game:** https://amajd9323-sketch.github.io/Farm-Neighbors/

Mobile-first farming PWA for iPhone, Android and desktop. Install from browser; no app-store account required.

## Project download

[Download FarmNeighbors-Web-MVP.zip](./FarmNeighbors-Web-MVP.zip)

Arabic guide: [README_AR.md](./README_AR.md)

## Play

Open the live HTTPS link above. The local preview lets you plant, water, grow and harvest crops on your own device. Local preview is single-device only.

For shared accounts and neighbor presence, configure Supabase as documented in the ZIP's README.

## Install

- iPhone: open in Safari → Share → Add to Home Screen → Open as Web App.
- Android: open in Chrome → Install app / Add to Home screen.

## Supabase setup

1. Create a Supabase project.
2. Run both SQL migrations under `FarmNeighbors_Web_Project/Backend/supabase/migrations/`.
3. Put Project URL and public anon/publishable key into `web/config.js`.
4. Never put service-role/secret keys in browser code.

## Current scope

Early MVP, not a finished online multiplayer title. Local farming is playable. Shared auth, persisted farms, server-validated economy and neighbor presence require Supabase configuration. Real-time character movement, chat, direct trade, two-device acceptance testing and remaining gameplay systems are still outstanding.

## Deployment

GitHub Actions extracts the PWA from the ZIP and publishes the `web/` folder to GitHub Pages whenever the archive or deployment workflow changes.

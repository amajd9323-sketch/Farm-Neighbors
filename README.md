# Farm Neighbors

Mobile farming game MVP built for Unity 6.3.

## Download

Download [FarmNeighbors_MVP.zip](./FarmNeighbors_MVP.zip), then extract it and open the extracted folder with Unity Hub.

Arabic guide: [README_AR.md](./README_AR.md)

## Current MVP

- 4x4 farm grid
- Planting, watering, growth and harvesting
- Four starter crops
- Coins, XP, levels, inventory, buying and selling
- Local save support
- Supabase Auth and PostgreSQL backend integration
- Server-validated economy functions
- Neighbor invitation foundation
- Arabic and English localization files
- Unity editor scene/bootstrap builder
- Static validation workflow

## Requirements

- Unity 6.3 (Unity 6.3 LTS recommended)
- Android Build Support for Android builds
- Supabase project for cloud authentication and persistence

## Quick start

1. Extract `FarmNeighbors_MVP.zip`.
2. Open the extracted folder from Unity Hub.
3. Run **Farm Neighbors → Build MVP Scene** from Unity menu.
4. Press Play.
5. For cloud features, apply the SQL migration in `Backend/supabase/migrations` and configure the Supabase URL and publishable key in the Unity project.

See [README_AR.md](./README_AR.md) for Arabic setup steps.

## Important status

This is an MVP foundation, not a finished commercial multiplayer game. Full real-time character synchronization, in-game chat, direct player trading, and two-device acceptance testing remain future implementation tasks. Unity compilation and Android/iOS builds must be run in Unity Editor on a machine with the relevant platform modules installed.

Do not commit Supabase secret/service-role keys. Only use the project's public publishable/anon key in client configuration, with database RLS and server-side validation enabled.

## Validation

Run:

```bash
python tools/validate_project.py
```

The GitHub Actions workflow runs the static project checks on pushes and pull requests.

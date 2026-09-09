# TradeStart

Job board for young tradespeople (16-24). Candidates build profiles; employers browse and message. Reverse of a normal job board.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Neon Postgres + Drizzle ORM
- NextAuth.js (email/password + Google)
- Vercel

## Setup

1. Copy `.env.example` to `.env.local` (demo values work out of the box).
2. `npm install`
3. `npm run dev`

Demo sign-in (no database needed):
- `employer@demo.local` / `password123` - browse 12 fake candidates
- `candidate@demo.local` / `password123` - candidate dashboard

To use a real Neon database later, set `DATABASE_URL` and `DEMO_MODE=false`.

## Scripts

- `npm run dev` - local server
- `npm run build` - production build
- `npm run db:generate` - Drizzle migrations
- `npm run db:push` - push schema to Neon
- `npm run db:studio` - Drizzle Studio

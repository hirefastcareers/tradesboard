# TradeStart

Job board for young tradespeople (16–24). Candidates build profiles; employers browse and message. Reverse of a normal job board.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Neon Postgres + Drizzle ORM
- NextAuth.js (email/password + Google)
- Vercel

## Setup

1. Copy `.env.example` to `.env.local` and fill in values.
2. `npm install`
3. `npm run db:push` (requires `DATABASE_URL`)
4. `npm run dev`

## Scripts

- `npm run dev` — local server
- `npm run build` — production build
- `npm run db:generate` — Drizzle migrations
- `npm run db:push` — push schema to Neon
- `npm run db:studio` — Drizzle Studio

# BookNook

**Live site:** [Add your deployed Vercel URL here — e.g. `https://booknook.vercel.app`](https://vercel.com)

BookNook is a small online library where readers browse community books, add new titles, borrow copies for seven days, and return them from a personal dashboard.

## Features

- Responsive home page with Swiper hero, dynamic new arrivals, and guided borrowing sections
- Email/password and Google sign-in powered by BetterAuth with MongoDB
- Full book catalog with categories, detail pages, and copy availability tracking
- Private dashboards to add, edit, and delete your books with imgbb image uploads
- Borrow and return flow with JWT-protected Express APIs and duplicate-loan prevention
- Dark/light theme toggle, toast notifications, custom 404, and per-route page titles

## Tech stack

- Next.js App Router, TypeScript, Tailwind CSS, Shadcn-style UI
- BetterAuth + MongoDB adapter (frontend)
- Express + MongoDB API ([`../backend`](../backend))

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local`:

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Same database as API and BetterAuth |
| `BETTER_AUTH_SECRET` | Session signing (32+ chars) |
| `BETTER_AUTH_URL` | App URL (`http://localhost:3000` or Vercel URL) |
| `JWT_SECRET` | **Must match backend** — API bearer tokens |
| `NEXT_PUBLIC_API_URL` | Express base URL (`http://localhost:5000` or Render URL) |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Book image uploads |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional social login |

See [DEPLOYMENT.md](../DEPLOYMENT.md) for production wiring.

## Local development

1. Start MongoDB (Atlas or local).
2. Start the API from [`../backend`](../backend): `npm run dev`.
3. In this folder: `npm install` && `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

## Deployment

- **Frontend:** Vercel — set root directory to `frontend`.
- **API:** Render — see [backend README](../backend/README.md).
- After deploy, update the **Live site** link at the top of this file.

## API connection

The browser calls Express at `NEXT_PUBLIC_API_URL`. Protected actions use a JWT from [`/api/token`](src/app/api/token/route.ts) after BetterAuth login. The server signs tokens with `JWT_SECRET` shared with the Express API.

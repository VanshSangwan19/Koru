# Koru — Project Context (read this first)

Full-stack freelance web agency platform. Owner: Vansh Sangwan (learning web dev, AI-assisted).

## What this is
- Brand: KORU — "Websites that make businesses look better, work smarter, and grow."
- Public site + hidden admin panel (same SPA, admin lives at `/admin`)
- Content is database-driven (projects, services, testimonials, pricing, site info) — editable via admin, NO hardcoded copy

## Tech stack
- Frontend: `client/` — React 18, Vite 5, Tailwind 3, Framer Motion, Lucide, React Router 6
- Backend: `server/` — Express 4, Mongoose 8, bcrypt + JWT (httpOnly cookie AND Bearer token support)
- Monorepo via npm workspaces (root package.json)

## Commands (Windows PowerShell)
- IMPORTANT: every shell command is a fresh process. Prepend: `$env:Path = "C:\Program Files\nodejs;" + $env:Path`
- For git add `"C:\Program Files\Git\bin;"` too
- Dev all: `npm run dev` (client :5173 proxies /api -> :5000)
- Seed DB: `npm run seed`
- Build client: `npm run build --workspace client`

## Deployment (LIVE since Aug 2026)
| Piece | URL | Host |
|---|---|---|
| Website | https://koru-client.vercel.app | Vercel (project koru-client, root dir `client`) |
| Admin | https://koru-client.vercel.app/admin | same SPA |
| API | https://koru-api-1mgp.onrender.com | Render free tier (root dir `server`, start `node src/index.js`) |
| Database | MongoDB Atlas M0 cluster `koru` | connection string in `server/.env` |
| Code | https://github.com/VanshSangwan19/Koru | branch `main`, push = auto-deploy both platforms |

- Env vars for Render are set in its dashboard (NODE_ENV, MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, CLIENT_URL). Local dev uses `server/.env` (gitignored).
- Admin login: see `server/.env` (ADMIN_EMAIL / ADMIN_PASSWORD).

## Architecture notes
- Auth: token returned in login response; client stores `koru_token` in localStorage and sends `Authorization: Bearer`. Server also sets cookie only when NODE_ENV=production (sameSite none/secure).
- CORS: allowed origins come from CLIENT_URL env (comma-separated supported); `server/src/config/index.js` normalizes trailing slashes/spaces — keep that behavior.
- SEO.jsx per-page meta; sitemap.xml/robots.txt in client/public.
- CI: .github/workflows/ci.yml runs backend syntax check + frontend build on push to main.

## Conventions & rules
- NO fake testimonials anywhere (empty state instead). Portfolio items labeled "Concept Project".
- Conventional commits (feat/fix/chore/docs), clean history matters to owner.
- No comments in code unless asked.
- Never commit `.env`, `node_modules`, `dist`.

## Known quirks / gotchas
- Render free tier cold-starts (~50s first request after idle) — expected, not a bug.
- Local MongoDB runs as Windows service "MongoDB" (auto-start). Legacy local port 5000 process may need killing if EADDRINUSE.
- Atlas Network Access allows 0.0.0.0/0 (required for Render).
- Direct downloads from fastdl.mongodb.org 403 on this network — use winget.

## Status
- Fully deployed and verified end-to-end (health, public data, admin login, CORS all green).
- Next ideas discussed: custom domain (Vercel -> Settings -> Domains), guided codebase walkthrough for learning purposes.

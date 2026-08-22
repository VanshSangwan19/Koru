<div align="center">

# KORU

**Websites that make businesses look better, work smarter, and grow.**

A production-ready, full-stack freelance web development platform —
dark-first premium UI, REST API, admin dashboard, and CMS-driven content.

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node_18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_4-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

[![CI](https://github.com/VanshSangwan19/koru/actions/workflows/ci.yml/badge.svg)](https://github.com/VanshSangwan19/koru/actions/workflows/ci.yml)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

</div>

---

## ✨ Features

**Public site**
- Conversion-focused home page with hero, services, process, portfolio, pricing, FAQ
- Dynamic case-study pages (`/work/:slug`) served from the database
- Contact form with validation, rate limiting and spam protection
- SEO-ready: per-page meta, Open Graph, canonical URLs, sitemap & robots.txt
- Fully responsive — 320px phones to large desktops
- Subtle Framer Motion animations with `prefers-reduced-motion` support

**Admin dashboard** (`/admin`, JWT-protected)
- Full CRUD for projects, services and testimonials
- Approve / unapprove testimonials before they go public
- Inbox for contact requests with status workflow (new → read → replied → archived)
- Live editing of pricing packages and site info (navbar, footer, socials)

**Engineering**
- 🔐 bcrypt password hashing + JWT (httpOnly cookie *and* Bearer token support)
- 🛡️ Helmet, CORS allow-list, express-rate-limit, input validation & sanitization
- 📦 Centralized error handling with proper HTTP status codes
- ⚡ Code-split builds, lazy images, skeleton loaders
- 🌱 Seed script with clearly-labeled concept projects (no fake testimonials)

## 🧱 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion · Lucide Icons · React Router 6 |
| Backend | Node.js · Express 4 · Mongoose 8 |
| Auth | bcryptjs · JWT |
| Security | Helmet · CORS · express-rate-limit · express-validator |
| Tooling | npm workspaces · ESLint · GitHub Actions CI |

## 🚀 Quick Start

> Requires **Node.js 18+** and **MongoDB** (local or Atlas).

```bash
# 1 — install dependencies (root + client + server workspaces)
npm install

# 2 — configure environment
cp server/.env.example server/.env
#    then edit MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 3 — seed the database (admin user, 6 concept projects, services, settings)
npm run seed

# 4 — run frontend + backend together
npm run dev
```

| URL | What |
|---|---|
| `http://localhost:5173` | Website |
| `http://localhost:5173/admin` | Admin dashboard |
| `http://localhost:5000/api/health` | API health check |

## 📂 Project Structure

```
koru/
├── client/                  # React + Vite frontend
│   ├── public/              # favicon, robots.txt, sitemap, OG image
│   └── src/
│       ├── components/      # layout, sections, reusable ui/
│       ├── context/         # auth, settings, toast providers
│       ├── hooks/           # useApi — loading/error/success states
│       ├── lib/             # api client, constants, defaults
│       └── pages/           # public pages + admin dashboard
├── server/                  # Express + MongoDB backend
│   └── src/
│       ├── config/          # env config, DB connection
│       ├── controllers/     # request handlers
│       ├── middleware/      # auth, validation, rate limiting, errors
│       ├── models/          # Mongoose schemas
│       ├── routes/          # REST endpoints
│       ├── seed/            # initial data loader
│       └── utils/           # helpers
└── render.yaml              # Render deploy blueprint
```

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/projects` | — | List published projects |
| `GET` | `/api/projects/:slug` | — | Single project by slug |
| `POST` `PUT` `DELETE` | `/api/projects(/:id)` | admin | Manage projects |
| `GET` | `/api/services` | — | List services |
| `POST` `PUT` `DELETE` | `/api/services(/:id)` | admin | Manage services |
| `GET` | `/api/testimonials` | — | List testimonials (`?public=true` = approved only) |
| `POST` `PUT` `DELETE` | `/api/testimonials(/:id)` | admin | Manage testimonials |
| `POST` | `/api/contact` | — | Submit project request |
| `GET` `PUT` `DELETE` | `/api/contact(/:id)` | admin | Manage inbox |
| `POST` | `/api/auth/login` | — | Admin login |
| `POST` | `/api/auth/logout` | — | Logout |
| `GET` | `/api/auth/me` | admin | Current session |
| `GET` `PUT` | `/api/settings` | PUT: admin | Site settings & pricing |

## ☁️ Deployment

| Piece | Service | Notes |
|---|---|---|
| Frontend | Vercel / Netlify | Set `VITE_API_URL` to your backend URL |
| Backend | Render | Blueprint included (`render.yaml`) · set env vars from `.env.example` |
| Database | MongoDB Atlas | Free M0 cluster |

Full step-by-step instructions in [`README` setup section](#-quick-start) and [`.env.example`](server/.env.example).

## 📄 License

Released under the [MIT License](LICENSE) — © 2026 Vansh Sangwan.

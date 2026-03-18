# OptiVoic Home Services Website

AI-enhanced, conversion-optimized website for home service businesses.
Built with **Vite + React + Node.js + Supabase**.

---

## Project Structure

```
optivoic-site/
├── client/          # Vite + React frontend (port 5173)
│   └── src/
│       ├── components/   Header, Hero, Platform, AIDemo, Results, Pricing, WhyUs, Footer
│       ├── hooks/        useChat.js, useAppointments.js
│       ├── lib/          supabaseClient.js
│       ├── pages/        AppointmentsPage.jsx
│       └── styles/       index.css
├── server/          # Express API (port 3001)
│   ├── routes/       chat.js, appointments.js, leads.js
│   └── lib/          supabaseAdmin.js
├── supabase/
│   └── migrations/   001_initial_schema.sql
└── .env.example
```

---

## Quick Start

### 1. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** and run `supabase/migrations/001_initial_schema.sql`
3. Copy your **Project URL**, **anon key**, and **service_role key**

### 2. Environment Variables
```bash
cp .env.example client/.env
cp .env.example server/.env
# Fill in your Supabase keys
```

### 3. Install & Run

```bash
# Terminal 1 — API server
cd server
npm install
npm run dev   # runs on :3001

# Terminal 2 — Vite dev server
cd client
npm install
npm run dev   # runs on :5173
```

Open **http://localhost:5173**

---

## AI Chat

The `/api/chat` endpoint uses rule-based intent detection by default.
To upgrade to GPT-4o-mini, uncomment the OpenAI block in `server/routes/chat.js`
and add `OPENAI_API_KEY` to your server `.env`.

## Routes

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| POST   | /api/chat                   | AI chatbot reply        |
| GET    | /api/appointments           | List appointments       |
| POST   | /api/appointments           | Create appointment      |
| PATCH  | /api/appointments/:id/status| Update status           |
| GET    | /api/leads                  | List leads              |
| POST   | /api/leads                  | Create lead             |
| GET    | /api/health                 | Server health check     |

## Deployment

- **Client**: `npm run build` → deploy `dist/` to Vercel / Netlify
- **Server**: Deploy to Railway / Render / Fly.io
- Set `CLIENT_ORIGIN` on server to your production frontend URL

-- ============================================================
-- OptiVoic Home Services — Supabase Schema
-- Run in Supabase SQL Editor or via supabase db push
-- ============================================================

-- 1. Appointments ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id             UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT      NOT NULL,
  email          TEXT,
  phone          TEXT      NOT NULL,
  service_type   TEXT      NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  notes          TEXT,
  is_emergency   BOOLEAN   DEFAULT FALSE,
  status         TEXT      DEFAULT 'pending'
                 CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Leads ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id               UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT,
  email            TEXT,
  phone            TEXT,
  service_interest TEXT,
  message          TEXT,
  source           TEXT  DEFAULT 'website',
  status           TEXT  DEFAULT 'new'
                   CHECK (status IN ('new','contacted','qualified','closed')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Chat Sessions ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_sessions (
  id                 UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id         TEXT  NOT NULL UNIQUE,
  messages           JSONB DEFAULT '[]',
  lead_captured      BOOLEAN DEFAULT FALSE,
  appointment_booked BOOLEAN DEFAULT FALSE,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_appt_status      ON appointments (status);
CREATE INDEX IF NOT EXISTS idx_appt_created     ON appointments (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status     ON leads (status);
CREATE INDEX IF NOT EXISTS idx_chat_session_id  ON chat_sessions (session_id);

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE appointments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Public: anyone can INSERT an appointment (via anon key)
CREATE POLICY "allow_insert_appointments" ON appointments
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Public: anyone can INSERT a lead
CREATE POLICY "allow_insert_leads" ON leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Public: anyone can INSERT or UPDATE their own chat session
CREATE POLICY "allow_chat_sessions" ON chat_sessions
  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Service role (server/admin) can SELECT/UPDATE everything — no additional policy needed
-- when using the service_role key (bypasses RLS).

-- ── Auto-update updated_at ────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

CREATE TRIGGER trg_appt_updated BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_chat_updated BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

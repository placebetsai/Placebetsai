-- Run this once in Supabase dashboard → SQL Editor
-- Creates the school_ratings table for Rate My School submissions

CREATE TABLE IF NOT EXISTS school_ratings (
  id bigserial PRIMARY KEY,
  school text NOT NULL,
  city text,
  state text,
  debt_score int NOT NULL DEFAULT 5,
  mental_health_score int NOT NULL DEFAULT 5,
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Allow anonymous inserts (Rate My School is public/anonymous)
ALTER TABLE school_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert" ON school_ratings FOR INSERT WITH CHECK (true);
CREATE POLICY "service role can read all" ON school_ratings FOR SELECT USING (auth.role() = 'service_role');

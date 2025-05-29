-- Create the quiz schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Quiz definitions table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Answer options table
CREATE TABLE IF NOT EXISTS answer_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  value TEXT NOT NULL,
  order_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz results table (complete submissions only)
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id),
  session_id TEXT NOT NULL, -- To identify unique sessions
  linkedin_id TEXT NULL, -- Store LinkedIn ID for personalization
  linkedin_url TEXT NULL, -- Store LinkedIn profile URL
  linkedin_data JSONB NULL, -- Store additional LinkedIn data from API
  result_category TEXT NOT NULL, -- A, B, C or custom categories
  score NUMERIC NOT NULL,
  answers JSONB NOT NULL, -- Store all answers in a JSON structure
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_quiz_results_linkedin ON quiz_results(linkedin_id);
CREATE INDEX idx_quiz_results_category ON quiz_results(result_category);
CREATE INDEX idx_quiz_results_session ON quiz_results(session_id);

-- Initial quiz data
INSERT INTO quizzes (id, title, description)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'AI Forward Recruiter',
  'Discover your AI adoption level compared to over 100 industry peers'
)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Anyone can insert quiz results
CREATE POLICY "Anyone can insert quiz results" 
ON quiz_results FOR INSERT TO anon, authenticated 
WITH CHECK (true);

-- Anyone can read quiz results (we're not using auth)
CREATE POLICY "Anyone can read quiz results" 
ON quiz_results FOR SELECT TO anon, authenticated 
USING (true); 
-- Create linkedin_waitlist table mirroring waitlist schema
CREATE TABLE
IF NOT EXISTS linkedin_waitlist
(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid
(),
  email TEXT NOT NULL UNIQUE,
  linkedin_url TEXT,
  cohort_number INTEGER DEFAULT 2,
  status TEXT DEFAULT 'pending' CHECK
(status IN
('pending', 'invited', 'joined')),
  created_at TIMESTAMP
WITH TIME ZONE DEFAULT timezone
('utc'::text, now
()) NOT NULL,
  updated_at TIMESTAMP
WITH TIME ZONE DEFAULT timezone
('utc'::text, now
()) NOT NULL
);

-- Indexes
CREATE INDEX
IF NOT EXISTS idx_linkedin_waitlist_email ON linkedin_waitlist
(email);
CREATE INDEX
IF NOT EXISTS idx_linkedin_waitlist_created_at ON linkedin_waitlist
(created_at);
CREATE INDEX
IF NOT EXISTS idx_linkedin_waitlist_cohort_number ON linkedin_waitlist
(cohort_number);
CREATE INDEX
IF NOT EXISTS idx_linkedin_waitlist_status ON linkedin_waitlist
(status);

-- RLS
ALTER TABLE linkedin_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage linkedin_waitlist" ON linkedin_waitlist
  FOR ALL USING
(auth.role
() = 'service_role');

-- Trigger to auto-update updated_at timestamp
CREATE TRIGGER update_linkedin_waitlist_updated_at
  BEFORE
UPDATE ON linkedin_waitlist
  FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column
();



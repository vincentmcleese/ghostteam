-- Create waitlist table for cohort 2 signups
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  linkedin_url TEXT NOT NULL,
  cohort_number INTEGER DEFAULT 2,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'joined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_cohort_number ON waitlist(cohort_number);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);

-- Enable RLS (Row Level Security)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to access all data
CREATE POLICY "Service role can manage waitlist" ON waitlist
  FOR ALL USING (auth.role() = 'service_role');

-- Trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at 
  BEFORE UPDATE ON waitlist
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
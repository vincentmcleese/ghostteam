-- Supabase schema for community_applicants table
-- Run this SQL in your Supabase SQL editor to create the table

CREATE TABLE IF NOT EXISTS community_applicants (
  id BIGSERIAL PRIMARY KEY,
  
  -- Business Information
  business_type VARCHAR(255) NOT NULL,
  business_description TEXT NOT NULL,
  monthly_revenue VARCHAR(255) NOT NULL,
  
  -- AI Experience and Goals
  ai_experience VARCHAR(255) NOT NULL,
  community_goals TEXT[] NOT NULL, -- Array of selected goals
  ai_challenge TEXT NOT NULL,
  
  -- Online Presence
  website_url VARCHAR(500) NOT NULL,
  linkedin_url VARCHAR(500) NOT NULL,
  
  -- Contact Information
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  
  -- How they heard about us
  hear_about_us VARCHAR(255) NOT NULL,
  hear_about_us_other VARCHAR(255), -- Only filled if hear_about_us = 'other'
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_community_applicants_email ON community_applicants(email);
CREATE INDEX IF NOT EXISTS idx_community_applicants_created_at ON community_applicants(created_at);
CREATE INDEX IF NOT EXISTS idx_community_applicants_business_type ON community_applicants(business_type);
CREATE INDEX IF NOT EXISTS idx_community_applicants_ai_experience ON community_applicants(ai_experience);

-- Add RLS (Row Level Security) if needed
-- ALTER TABLE community_applicants ENABLE ROW LEVEL SECURITY;

-- Create trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_community_applicants_updated_at
    BEFORE UPDATE ON community_applicants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Example query to view all applications:
-- SELECT * FROM community_applicants ORDER BY created_at DESC;

-- Example query to filter by business type:
-- SELECT * FROM community_applicants WHERE business_type = 'coaching' ORDER BY created_at DESC;

-- Example query to view community goals (since it's an array):
-- SELECT first_name, last_name, email, community_goals FROM community_applicants WHERE 'learn-ai-automation' = ANY(community_goals);
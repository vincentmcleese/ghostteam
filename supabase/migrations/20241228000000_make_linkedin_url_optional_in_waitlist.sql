-- Make linkedin_url optional in the waitlist table
ALTER TABLE waitlist ALTER COLUMN linkedin_url SET DEFAULT NULL;
ALTER TABLE waitlist ALTER COLUMN linkedin_url DROP NOT NULL; 
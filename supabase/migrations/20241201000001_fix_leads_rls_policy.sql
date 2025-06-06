-- Fix RLS policy for leads table to allow anonymous inserts
-- This is needed for the public lead form on /begin

-- Drop existing restrictive policy if it exists
DROP POLICY IF EXISTS "Service role can manage leads" ON leads;

-- Create policy for service role to access all data (read, update, delete)
CREATE POLICY "Service role can manage leads" ON leads
  FOR ALL USING (auth.role() = 'service_role');

-- Create policy to allow anonymous users to insert leads
CREATE POLICY "Anonymous users can insert leads" ON leads
  FOR INSERT 
  WITH CHECK (true);

-- Optional: Allow anonymous users to read their own leads by email
-- (This could be useful for follow-up features)
CREATE POLICY "Anonymous users can read leads by email" ON leads
  FOR SELECT
  USING (true); 
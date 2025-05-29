-- Add LinkedIn URL field to quiz_results table if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quiz_results' AND column_name = 'linkedin_url'
  ) THEN
    ALTER TABLE quiz_results ADD COLUMN linkedin_url TEXT NULL;
  END IF;
END $$; 
# Supabase Setup and Deployment

This project uses Supabase for database and backend services. This document explains how to set up and use Supabase for local development and how to deploy to production.

## Local Development

### Prerequisites

- Node.js 16+
- Docker (required for local Supabase)
- Supabase CLI

### Initial Setup

1. Install Supabase CLI:

   ```bash
   npm install -g supabase
   ```

2. Start local Supabase:

   ```bash
   npx supabase start
   ```

3. Run migrations:

   ```bash
   npx supabase db reset
   ```

### Database Migrations

The database schema is defined in migration files in the `supabase/migrations` directory. When you make changes to the database schema:

1. Create a new migration file with a timestamp prefix in `supabase/migrations` directory:

   ```bash
   touch supabase/migrations/$(date +%Y%m%d%H%M%S)_your_migration_name.sql
   ```

2. Edit the migration file with your SQL commands.

3. Apply the migration to your local database:
   ```bash
   npx supabase db reset
   ```

### Seed Data

The seed data is defined in `supabase/seed.sql`. This file is executed after migrations when you run `npx supabase db reset`.

## Using Supabase in the Application

The Supabase client is configured in `src/lib/supabase.ts`. Import this client in your components or API routes to interact with the database:

```typescript
import { supabase } from "@/lib/supabase";

// Example: Fetch quiz questions
async function fetchQuizQuestions(quizId: string) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_id", quizId)
    .order("order_number");

  if (error) throw error;
  return data;
}
```

## Production Deployment

### Initial Setup

1. Create a Supabase project at https://supabase.com/dashboard
2. Get your project reference ID from the URL
3. Link your local project:

   ```bash
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

4. Push your local database to production:

   ```bash
   npx supabase db push
   ```

### CI/CD Setup

1. Generate a Supabase access token at https://supabase.com/dashboard/account/tokens
2. Add the following secrets to your GitHub repository:

   - `SUPABASE_ACCESS_TOKEN`: Your Supabase access token
   - `SUPABASE_PROJECT_REF`: Your project reference ID
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - Add deployment platform secrets (Vercel, Netlify, etc.)

3. The GitHub Actions workflows will:
   - Deploy database changes when files in `supabase/` are modified
   - Deploy the Next.js app when other files are modified

### Manual Deployment

If you need to manually push database changes:

```bash
npx supabase db push
```

## Testing Production Connection

To verify your app is connected to the production Supabase instance:

1. Check the quiz functionality
2. Verify data is being saved to the production database
3. Check the Database > Tables section in your Supabase dashboard

## Troubleshooting

If you encounter issues with your local Supabase setup:

1. Check Docker is running
2. Try restarting Supabase:
   ```bash
   npx supabase stop
   npx supabase start
   ```
3. Reset the database:
   ```bash
   npx supabase db reset
   ```
4. Check for errors in the migrations:
   ```bash
   npx supabase db reset --debug
   ```

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Documentation](https://supabase.com/docs/reference/cli)
- [NextJS with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

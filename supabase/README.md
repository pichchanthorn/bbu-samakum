# Supabase setup

This project uses [Supabase](https://supabase.com) (Postgres + Auth) as its
backend. Follow these steps to get a project running locally.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up / log in.
2. Click **New project**.
3. Pick an organization, give the project a name (e.g. `bbu-samakum`), set a
   database password (save it somewhere safe), and choose a region close to
   you.
4. Wait a minute or two for the project to finish provisioning.

## 2. Run the migration

The schema lives in [`migrations/0001_init.sql`](./migrations/0001_init.sql)
as plain SQL, so it's version-controlled instead of living only in the
dashboard's visual table editor. The simplest way to run it, with no CLI
install required:

1. In your Supabase project dashboard, open the **SQL Editor** (left
   sidebar).
2. Click **New query**.
3. Open `supabase/migrations/0001_init.sql` in this repo, copy its full
   contents, and paste them into the SQL Editor.
4. Click **Run**.

You should see tables `profiles`, `posts`, `likes`, and `comments` appear
under **Table Editor**, each with Row Level Security enabled.

The migration is written to be safe to re-run (it uses
`create table if not exists`, `drop policy if exists`, etc.), so if you make
a mistake you can just paste and run it again.

### (Optional) Seed data

[`seed.sql`](./seed.sql) inserts the app's existing mock content (from
`lib/mock-data.js`) as real rows, so you have realistic data to develop
against instead of an empty database. Run it the same way: paste its
contents into a new SQL Editor query and click **Run**, after the migration
has been applied.

This seed data uses placeholder accounts (fake `auth.users` rows) that
aren't meant to be signed into — real accounts will be created through the
sign-up flow in a later phase. Skip the seed if you'd rather start empty.

### (Alternative) Supabase CLI

If you're comfortable with a CLI, you can instead use the
[Supabase CLI](https://supabase.com/docs/guides/local-development) to link
this repo to your project and run:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

This applies everything in `supabase/migrations/` in order. The SQL Editor
approach above is simpler if you've never used Supabase before, so it's the
recommended path.

## 3. Get your API keys

1. In the dashboard, go to **Project Settings → API**.
2. Copy the **Project URL** and the **`anon` public** key.

## 4. Fill in `.env.local`

Copy `.env.local.example` to `.env.local` (already gitignored) if you
haven't already, and fill in the two values from the previous step:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Restart `npm run dev` after editing this file so Next.js picks up the new
environment variables.

## What's here

- `migrations/0001_init.sql` — the full schema: `profiles`, `posts`,
  `likes`, `comments`, and their Row Level Security policies.
- `seed.sql` — optional sample data mirrored from `lib/mock-data.js`.
- `../lib/supabase/client.js` — Supabase client for use in Client
  Components.
- `../lib/supabase/server.js` — Supabase client for use in Server
  Components / Route Handlers.

## Manual steps before Phase 2

Phase 1 only sets up schema and client wiring — nothing in the app queries
Supabase yet. Before Phase 2 (auth flow) can start, make sure you've done
the manual steps above:

- [ ] Created the Supabase project
- [ ] Run `migrations/0001_init.sql`
- [ ] (Optional) Run `seed.sql`
- [ ] Filled in `.env.local` with your project URL and anon key

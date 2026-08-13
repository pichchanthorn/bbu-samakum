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

## 2. Run the migrations

The schema lives in [`migrations/`](./migrations) as plain SQL, so it's
version-controlled instead of living only in the dashboard's visual table
editor. The simplest way to run it, with no CLI install required:

1. In your Supabase project dashboard, open the **SQL Editor** (left
   sidebar).
2. Click **New query**.
3. Open `supabase/migrations/0001_init.sql` in this repo, copy its full
   contents, paste them into the SQL Editor, and click **Run**.
4. Repeat step 3 for `0002_domain_restriction.sql`, then
   `0003_profile_on_signup.sql` — **run them in that numeric order**, since
   each one builds on the last.

You should see tables `profiles`, `posts`, `likes`, and `comments` appear
under **Table Editor**, each with Row Level Security enabled, plus two new
functions (`hook_restrict_email_domain`, `handle_verified_user`) under
**Database → Functions**.

Every migration is written to be safe to re-run (it uses
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
2. Copy the **Project URL** and the **`publishable`** key (Supabase's
   current name for the public client-side key, shown under **API Keys**).

## 4. Fill in `.env.local`

Copy `.env.local.example` to `.env.local` (already gitignored) if you
haven't already, and fill in the two values from the previous step:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Restart `npm run dev` after editing this file so Next.js picks up the new
environment variables.

## 5. Phase 2: Auth configuration

Real email OTP sign-in is now wired up (`components/SignInForm.js`), and
sign-up is restricted server-side to `@pp.bbu.edu.kh` addresses via the
`hook_restrict_email_domain` function in `0002_domain_restriction.sql`. That
migration only creates the function — you still need to tell Supabase to
actually call it, and to configure a few other Authentication settings.
Everything below happens in the dashboard, under **Authentication** in the
left sidebar.

1. **Providers → Email**
   - Open **Authentication → Providers**, click **Email**.
   - Make sure **Email** is enabled.
   - Under this project's email settings, confirm **"Confirm email"** is
     on (it should be, by default) — this is what makes `verifyOtp` require
     a real code instead of auto-confirming.
   - If you don't want any other sign-in method available yet, disable
     every other provider on this page (Phone, OAuth providers, etc.) —
     this app only supports email OTP, per the current design.

2. **Email template — free tier can't customize this, and that's fine**
   - Supabase's built-in email sender (no custom SMTP configured) locks the
     **Source** tab on **Authentication → Emails**, so the template can't be
     switched to print a bare `{{ .Token }}` code — it only sends
     `{{ .ConfirmationURL }}`, a clickable link.
   - That's handled: the link points at Supabase's own hosted verify
     endpoint, which redirects back to `app/auth/confirm/route.js` in this
     app (see `emailRedirectTo` in `SignInForm.js`), and that route
     exchanges it for a session automatically — clicking the link alone is
     enough to sign in, no template changes needed.
   - Whether the manual 6-digit code entry in step 2 of the sign-in form
     still applies depends on whether your actual email also shows a plain
     numeric code somewhere alongside the link — check your inbox to
     confirm either way.

3. **OTP expiry**
   - Open **Authentication → Sign In / Providers → Email**, find **"OTP
     Expiration"** (sometimes listed under rate limits / security
     settings), and set it to something reasonable — **600 seconds (10
     minutes)** matches what users are told implicitly by the UI.

4. **Site URL & Redirect URLs (needed for local dev)**
   - Open **Authentication → URL Configuration**.
   - Set **Site URL** to `http://localhost:3000` for local development
     (update this to your real domain once deployed).
   - Add `http://localhost:3000/**` to **Redirect URLs** so Supabase
     accepts requests originating from your local dev server. Add your
     production URL here too once you deploy.

5. **Enable the "Before User Created" Auth Hook — this is the actual
   security boundary**
   - Open **Authentication → Hooks**.
   - Find **"Before User Created"** and enable it.
   - Set its type to **Postgres Function** and select
     `public.hook_restrict_email_domain` from the dropdown (this only
     appears after you've run `0002_domain_restriction.sql` in step 2
     above).
   - Save. From this point on, any sign-up/OTP request for a non-BBU email
     is rejected by Supabase itself — before a user row is ever created —
     regardless of what the client sends.

6. **Rate limits (optional, recommended)**
   - Open **Authentication → Rate Limits** and confirm the default OTP
     request limit is in place, so the sign-in form can't be used to spam
     an inbox. The defaults are reasonable for a small community site; no
     changes required unless you want to tighten them.

## What's here

- `migrations/0001_init.sql` — the full schema: `profiles`, `posts`,
  `likes`, `comments`, and their Row Level Security policies.
- `migrations/0002_domain_restriction.sql` — the `hook_restrict_email_domain`
  Postgres function used by the "Before User Created" Auth Hook to reject
  non-`@pp.bbu.edu.kh` sign-ups server-side.
- `migrations/0003_profile_on_signup.sql` — auto-creates a `profiles` row
  the moment a user completes OTP verification.
- `seed.sql` — optional sample data mirrored from `lib/mock-data.js`.
- `../lib/supabase/client.js` — Supabase client for use in Client
  Components.
- `../lib/supabase/server.js` — Supabase client for use in Server
  Components / Route Handlers.
- `../app/auth/confirm/route.js` — Route Handler that exchanges the code
  from the emailed confirmation link for a real session, then redirects
  home (or to `/sign-in?error=...` if the link is invalid/expired).

## Manual steps checklist

**Phase 1 — schema & client setup:**

- [ ] Created the Supabase project
- [ ] Run `migrations/0001_init.sql`
- [ ] (Optional) Run `seed.sql`
- [ ] Filled in `.env.local` with your project URL and publishable key

**Phase 2 — real auth, domain-restricted:**

- [ ] Run `migrations/0002_domain_restriction.sql`
- [ ] Run `migrations/0003_profile_on_signup.sql`
- [ ] Authentication → Providers → Email is enabled, "Confirm email" is on,
      other providers disabled
- [ ] OTP expiration set to 10 minutes
- [ ] Site URL set to `http://localhost:3000`, and
      `http://localhost:3000/**` added to Redirect URLs
- [ ] Authentication → Hooks → "Before User Created" is enabled and points
      at `public.hook_restrict_email_domain`
- [ ] Test sign-in with your own `@pp.bbu.edu.kh` address end to end

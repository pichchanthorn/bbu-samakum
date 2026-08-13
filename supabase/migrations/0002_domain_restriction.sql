-- Phase 2: server-side enforcement of the @pp.bbu.edu.kh domain restriction.
--
-- Why this can't just be a client-side check:
-- SignInForm.js validates the email domain before calling signInWithOtp(),
-- but that check only runs inside our own browser bundle. Anyone can call
-- Supabase's REST/GoTrue endpoints directly (curl, Postman, another
-- frontend) with any email address and completely skip our React code.
-- The only place a check can't be bypassed is inside Supabase itself, on
-- the request that actually creates the user. That's what this migration
-- does.
--
-- Mechanism: Supabase's "Before User Created" Auth Hook
-- (https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook).
-- This hook runs, inside Supabase Auth (GoTrue), for every new-user
-- creation path — including the implicit sign-up that happens the first
-- time someone calls signInWithOtp() with an email that doesn't have an
-- account yet. If the hook function returns an `error`, GoTrue rejects the
-- request and never creates the auth.users row, and the client gets back a
-- structured error instead of a generic failure.
--
-- This was chosen over a raw `before insert on auth.users` trigger because:
--   1. It's the officially supported extension point for this exact use
--      case — auth.users is an internal Supabase-managed table, and a
--      trigger on it is not a guaranteed-stable integration surface.
--   2. It returns a clean, structured error (with a real message and HTTP
--      status) to the calling client, instead of a raw Postgres exception
--      that would surface as an opaque 500.
--
-- IMPORTANT — this hook function does nothing on its own. It must also be
-- enabled in the Supabase dashboard (Authentication -> Hooks). See the
-- "Phase 2: Auth configuration" checklist in supabase/README.md.

create or replace function public.hook_restrict_email_domain(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  user_email text;
begin
  user_email := lower(event -> 'user' ->> 'email');

  if user_email is null or user_email !~ '^[^@]+@pp\.bbu\.edu\.kh$' then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message', 'Only @pp.bbu.edu.kh university email addresses can join BBU Samakum.'
      )
    );
  end if;

  -- No `decision` key means "allow" — GoTrue proceeds with user creation.
  return jsonb_build_object();
end;
$$;

-- Only the Auth service (supabase_auth_admin) is allowed to call this
-- function — it must never be reachable from the app's anon/authenticated
-- roles, since it's a security boundary, not a general-purpose RPC.
grant execute on function public.hook_restrict_email_domain(jsonb) to supabase_auth_admin;
revoke execute on function public.hook_restrict_email_domain(jsonb) from authenticated, anon, public;

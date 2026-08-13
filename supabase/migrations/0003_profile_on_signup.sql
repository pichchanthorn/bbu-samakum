-- Phase 2: auto-create a `profiles` row once a user finishes email OTP
-- verification, so every verified member has a directory entry without
-- needing profile-editing UI yet (that's a later phase).
--
-- Schema note: `profiles.name` was `not null` in 0001_init.sql. That worked
-- when profiles were only ever seeded by hand, but this trigger creates a
-- profile the moment someone verifies, before they've had any chance to
-- fill in a name — so `name` has to be allowed to start out null. Everything
-- else the trigger could fill in (department, batch, id_number, role,
-- verified_at) is already nullable / defaulted in 0001, so this is the only
-- shape change needed.
alter table public.profiles alter column name drop not null;

-- We intentionally do NOT store the user's email on `profiles`: that table
-- is readable by every authenticated member (it's the public directory —
-- see the profiles_select_authenticated policy in 0001_init.sql), and the
-- current UI never exposes members' email addresses. The signed-in user's
-- own email is already available client-side via their Supabase Auth
-- session whenever it's needed, so duplicating it into a world-readable
-- table isn't necessary and would leak every member's university email to
-- every other member.
create or replace function public.handle_verified_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Fire once, right when email_confirmed_at transitions to non-null —
  -- i.e. the moment verifyOtp() succeeds — not at the earlier signInWithOtp
  -- request, which creates an *unconfirmed* auth.users row before the code
  -- is ever entered.
  if new.email_confirmed_at is not null
     and (tg_op = 'INSERT' or old.email_confirmed_at is null) then
    insert into public.profiles (id)
    values (new.id)
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_verified on auth.users;
create trigger on_auth_user_verified
  after insert or update on auth.users
  for each row execute function public.handle_verified_user();

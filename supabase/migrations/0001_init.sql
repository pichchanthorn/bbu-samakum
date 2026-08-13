-- Phase 1: initial schema for bbu-samakum, mirroring the shapes in lib/mock-data.js
-- Safe to re-run: every statement is guarded with IF NOT EXISTS / OR REPLACE.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles
-- One row per verified user, linked 1:1 to auth.users. Covers the fields used
-- by `idCardMember` and `members` in lib/mock-data.js.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  initials text,
  department text,
  batch text,
  id_number text unique,
  role text not null default 'student' check (role in ('student', 'lecturer')),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

-- Auto-derive `initials` from `name` (e.g. "Sok Dara" -> "SD") when the
-- caller doesn't supply one explicitly.
create or replace function public.derive_profile_initials()
returns trigger
language plpgsql
as $$
begin
  -- Every profile auto-created by handle_verified_user() (see
  -- 0003_profile_on_signup.sql) starts with name = null, since there's no
  -- profile-editing UI yet to have collected one. Leave initials null too
  -- in that case, rather than coercing it to an empty string.
  if new.name is null then
    return new;
  end if;

  if new.initials is null or length(trim(new.initials)) = 0 then
    new.initials := upper(
      coalesce(substring(new.name from '^\S+' for 1), '') ||
      coalesce(substring(new.name from '\s(\S)' for 1), '')
    );
  end if;
  return new;
end;
$$;

drop trigger if exists trg_derive_profile_initials on public.profiles;
create trigger trg_derive_profile_initials
  before insert or update on public.profiles
  for each row execute function public.derive_profile_initials();

-- ---------------------------------------------------------------------------
-- posts
-- `feedPosts` and `showcaseItems` in mock-data.js share almost every field
-- (author, title, excerpt, likes/comments/views counters). The only real
-- differences are: feed posts have `cover`/`icon` (a background + icon
-- token for the card) and a relative `meta` string, while showcase items
-- have `tags` and a `category` filter. Rather than duplicate the shared
-- columns across two tables, this uses one `posts` table with a `type`
-- discriminator ('feed' | 'showcase') plus the few columns that only apply
-- to one type (nullable when not applicable).
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  type text not null check (type in ('feed', 'showcase')),
  title text not null,
  excerpt text,
  cover text,
  icon text,
  category text,
  tags text[] not null default '{}',
  views integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_type_idx on public.posts (type);
create index if not exists posts_created_at_idx on public.posts (created_at desc);

-- ---------------------------------------------------------------------------
-- likes
-- Join table so like counts are real and a user can't like the same post
-- twice.
-- ---------------------------------------------------------------------------
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);

create index if not exists likes_post_id_idx on public.likes (post_id);
create index if not exists likes_user_id_idx on public.likes (user_id);

-- ---------------------------------------------------------------------------
-- comments
-- UI comes in a later phase; this just models the data.
-- ---------------------------------------------------------------------------
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_post_id_idx on public.comments (post_id);
create index if not exists comments_author_id_idx on public.comments (author_id);

-- ---------------------------------------------------------------------------
-- Table-level grants
-- ---------------------------------------------------------------------------
-- RLS only filters *rows* a role is otherwise allowed to touch — it doesn't
-- grant table access on its own. Supabase's own convention (and the reason
-- it auto-provisions this for tables made through the dashboard UI) is to
-- grant anon/authenticated broad table access and let RLS be the single
-- source of truth for what's actually visible: a blocked read then comes
-- back as a clean empty result, not an opaque permission error that's
-- indistinguishable from a real bug — exactly the ambiguity that made this
-- migration's missing grant hard to diagnose from a table created via the
-- SQL Editor instead. Match that convention explicitly rather than relying
-- on dashboard-managed default-privilege state this file can't see.
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.profiles, public.posts, public.likes, public.comments
  to authenticated;
grant select on public.profiles, public.posts, public.likes, public.comments to anon;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;

-- profiles: member directory, readable by any authenticated user; a user
-- may only insert/update their own row.
drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- posts: readable by any authenticated user; only the author may
-- insert/update/delete their own rows.
drop policy if exists "posts_select_authenticated" on public.posts;
create policy "posts_select_authenticated"
  on public.posts for select
  to authenticated
  using (true);

drop policy if exists "posts_insert_own" on public.posts;
create policy "posts_insert_own"
  on public.posts for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "posts_update_own" on public.posts;
create policy "posts_update_own"
  on public.posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "posts_delete_own" on public.posts;
create policy "posts_delete_own"
  on public.posts for delete
  to authenticated
  using (auth.uid() = author_id);

-- comments: readable by any authenticated user; only the author may
-- insert/update/delete their own rows.
drop policy if exists "comments_select_authenticated" on public.comments;
create policy "comments_select_authenticated"
  on public.comments for select
  to authenticated
  using (true);

drop policy if exists "comments_insert_own" on public.comments;
create policy "comments_insert_own"
  on public.comments for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "comments_update_own" on public.comments;
create policy "comments_update_own"
  on public.comments for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "comments_delete_own" on public.comments;
create policy "comments_delete_own"
  on public.comments for delete
  to authenticated
  using (auth.uid() = author_id);

-- likes: readable by any authenticated user; a user may insert/delete only
-- their own like rows (no update — you either like something or you don't).
drop policy if exists "likes_select_authenticated" on public.likes;
create policy "likes_select_authenticated"
  on public.likes for select
  to authenticated
  using (true);

drop policy if exists "likes_insert_own" on public.likes;
create policy "likes_insert_own"
  on public.likes for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "likes_delete_own" on public.likes;
create policy "likes_delete_own"
  on public.likes for delete
  to authenticated
  using (auth.uid() = user_id);

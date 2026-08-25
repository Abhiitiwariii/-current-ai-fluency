-- Current — v3.2 backend schema (feedback + email capture).
-- Run this in the Supabase SQL editor once, on a fresh project.
-- Google-login users are captured automatically in Supabase's built-in
-- auth.users table, so they are NOT duplicated here.

-- Product feedback ("what do you like / what would you change").
create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  user_id    text,                    -- anonymous analytics id (not an auth uuid)
  likes      text,
  dislikes   text,
  email      text,
  created_at timestamptz not null default now()
);

-- Typed emails from the (non-Google) account prompt + feedback form.
create table if not exists public.signups (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  name       text,
  source     text,                    -- 'account' | 'feedback'
  created_at timestamptz not null default now()
);

-- Row-level security: the public site uses the anon key and may only INSERT.
-- No SELECT/UPDATE/DELETE for anon, so one visitor can never read another's data.
alter table public.feedback enable row level security;
alter table public.signups  enable row level security;

create policy "anon can insert feedback"
  on public.feedback for insert to anon with check (true);

create policy "anon can insert signups"
  on public.signups for insert to anon with check (true);

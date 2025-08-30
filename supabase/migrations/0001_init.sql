-- Schema for APCH: tours + contacts with RLS locked down

create extension if not exists pgcrypto; -- for gen_random_uuid()

create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text,
  last_name text,
  email text,
  phone text,
  tour_type text,
  location text,
  preferred_date date,
  preferred_time text,
  relationship text,
  current_situation text,
  timeline text,
  special_needs text,
  hear_about_us text,
  marketing_consent boolean default false,
  raw jsonb
);

alter table public.tours enable row level security;
-- No public inserts; use service role via Edge Function

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  phone text,
  message text,
  raw jsonb
);

alter table public.contacts enable row level security;
-- No public inserts; use service role via Edge Function


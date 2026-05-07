-- Pro-Interior: realizace (admin-managed)

create table if not exists public.pi_realizace (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  description text,
  cover_image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pi_realizace_images (
  id uuid primary key default gen_random_uuid(),
  realizace_id uuid not null references public.pi_realizace(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- NOTE: RLS policies will be added after auth/admin model is finalized.

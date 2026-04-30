create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.orders (
  id text primary key,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  customer_email text not null,
  customer_name text not null,
  birth_date text,
  birth_time text,
  birth_place text,
  partner_name text,
  partner_birth_date text,
  partner_birth_time text,
  partner_birth_place text,
  product_key text not null check (product_key in ('daily', 'weekly', 'monthly', 'partner')),
  product_name text not null,
  amount integer not null,
  currency text not null default 'eur',
  country text,
  country_code text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'refunded', 'failed')),
  horoscope_pdf_path text,
  horoscope_pdf_url text,
  horoscope_content text,
  lang text not null default 'en',
  email_sent_at timestamptz,
  refunded_at timestamptz,
  refund_reason text,
  stripe_refund_id text
);

create index if not exists idx_orders_created_at on public.orders (created_at desc);
create index if not exists idx_orders_customer_email on public.orders (customer_email);

create table if not exists public.email_subscribers (
  email text primary key,
  source text not null default 'website',
  lang text not null default 'en',
  gdpr_consent boolean not null default false,
  subscribed_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_email_subscribers_subscribed_at
  on public.email_subscribers (subscribed_at desc);

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists set_email_subscribers_updated_at on public.email_subscribers;
create trigger set_email_subscribers_updated_at
before update on public.email_subscribers
for each row execute function public.set_updated_at();

alter table public.orders enable row level security;
alter table public.email_subscribers enable row level security;

drop policy if exists "Block public access to orders" on public.orders;
create policy "Block public access to orders"
on public.orders
for all
using (false)
with check (false);

drop policy if exists "Block public access to email_subscribers" on public.email_subscribers;
create policy "Block public access to email_subscribers"
on public.email_subscribers
for all
using (false)
with check (false);

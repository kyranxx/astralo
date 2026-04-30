create extension if not exists pgcrypto;

create table if not exists public.email_followups (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    lang text not null default 'en',
    step_key text not null,
    step_number integer not null,
    product_key text not null,
    scheduled_for timestamptz not null,
    sent_at timestamptz,
    last_error text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint email_followups_email_step_key_unique unique (email, step_key)
);

create index if not exists email_followups_pending_idx
    on public.email_followups (scheduled_for)
    where sent_at is null;

alter table public.email_followups enable row level security;

drop policy if exists "Block public access to email_followups" on public.email_followups;
create policy "Block public access to email_followups"
on public.email_followups
for all
using (false)
with check (false);

create or replace function public.touch_email_followups_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists email_followups_touch_updated_at on public.email_followups;

create trigger email_followups_touch_updated_at
before update on public.email_followups
for each row
execute function public.touch_email_followups_updated_at();

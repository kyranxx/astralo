do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select con.conname
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
    join pg_namespace nsp on nsp.oid = rel.relnamespace
    where nsp.nspname = 'public'
      and rel.relname = 'orders'
      and con.contype = 'c'
      and pg_get_constraintdef(con.oid) ilike '%product_key%'
  loop
    execute format('alter table public.orders drop constraint %I', constraint_name);
  end loop;
end $$;

alter table public.orders
  add constraint orders_product_key_check
  check (product_key in ('daily', 'weekly', 'monthly', 'partner', 'lifetime'));

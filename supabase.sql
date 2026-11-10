-- Ejecutar en Supabase > SQL Editor
create table if not exists public.prestadores (
 id bigint generated always as identity primary key,
 nombre text not null check (char_length(trim(nombre)) between 2 and 70),
 oficio text not null check (char_length(trim(oficio)) between 2 and 90),
 telefono text not null check (char_length(regexp_replace(telefono,'[^0-9]','','g')) between 8 and 15),
 created_at timestamptz not null default now()
);
alter table public.prestadores enable row level security;
drop policy if exists "Contactos visibles para todos" on public.prestadores;
create policy "Contactos visibles para todos" on public.prestadores for select to anon using (true);
drop policy if exists "Cualquiera puede publicar un contacto" on public.prestadores;
create policy "Cualquiera puede publicar un contacto" on public.prestadores for insert to anon with check (
 char_length(trim(nombre)) between 2 and 70 and char_length(trim(oficio)) between 2 and 90 and
 char_length(regexp_replace(telefono,'[^0-9]','','g')) between 8 and 15
);
grant select,insert on public.prestadores to anon;
grant usage,select on sequence public.prestadores_id_seq to anon;

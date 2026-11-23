-- ========== TABELA usuarios (perfil ligado ao Supabase Auth) ==========
create table public.usuarios (
  id        uuid primary key references auth.users(id) on delete cascade,
  nome      text not null,
  email     text not null unique,
  criado_em timestamptz not null default now()
);

-- ========== TABELA projetos ==========
create table public.projetos (
  id         bigint generated always as identity primary key,
  usuario_id uuid not null default auth.uid()
             references public.usuarios(id) on delete cascade,
  titulo     text not null check (char_length(titulo) between 1 and 120),
  descricao  text check (char_length(descricao) <= 1000),
  link       text,
  criado_em  timestamptz not null default now()
);

create index projetos_usuario_idx on public.projetos(usuario_id);

-- ========== RLS ==========
alter table public.usuarios enable row level security;
alter table public.projetos enable row level security;

-- usuarios: cada pessoa só enxerga e edita o próprio perfil
create policy "usuarios_select_proprio" on public.usuarios
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "usuarios_update_proprio" on public.usuarios
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- projetos: leitura pública (para o portfolio.html mostrar) ...
create policy "projetos_select_publico" on public.projetos
  for select to anon, authenticated
  using (true);

-- ... mas só o dono cria, edita e apaga
create policy "projetos_insert_dono" on public.projetos
  for insert to authenticated
  with check ((select auth.uid()) = usuario_id);

create policy "projetos_update_dono" on public.projetos
  for update to authenticated
  using ((select auth.uid()) = usuario_id)
  with check ((select auth.uid()) = usuario_id);

create policy "projetos_delete_dono" on public.projetos
  for delete to authenticated
  using ((select auth.uid()) = usuario_id);

-- ========== Cria o perfil automaticamente quando um usuário é criado ==========
create or replace function public.criar_perfil()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.usuarios (id, nome, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nome', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.criar_perfil();

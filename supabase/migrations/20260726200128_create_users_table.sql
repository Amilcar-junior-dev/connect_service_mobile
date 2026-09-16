-- 1. Criar a tabela de usuários públicos no esquema 'public'
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  company_name text,
  logo_url text,
  cover_url text,
  booking_color text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar o Row Level Security (RLS) para garantir segurança
alter table public.users enable row level security;

-- 3. Criar as políticas de segurança (Políticas RLS)
create policy "Usuários podem ler seus próprios dados"
  on public.users for select
  using ( auth.uid() = id );

create policy "Usuários podem atualizar seus próprios dados"
  on public.users for update
  using ( auth.uid() = id );

-- 4. Criar a função que será executada automaticamente após um novo cadastro
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (
    new.id,
    new.email,
    split_part(new.email, '@', 1) -- Define o nome inicial como o prefixo do e-mail
  );
  return new;
end;
$$ language plpgsql security definer;

-- 5. Criar o Gatilho (Trigger) que escuta a tabela interna de cadastros e dispara a função acima
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

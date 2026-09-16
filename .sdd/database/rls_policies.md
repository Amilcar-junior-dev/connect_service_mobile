# Catálogo de Segurança & RLS (Row Level Security)

Este documento centraliza todas as políticas de segurança a nível de linha (RLS) do Supabase para garantir que um estabelecimento nunca acesse ou modifique os dados de outro estabelecimento.

---

## 🛡️ Habilitação de RLS em Todas as Tabelas

```sql
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
```

---

## 📜 Políticas de Acesso

### 1. Tabela `companies`
- **Dono do Estabelecimento:**
  ```sql
  CREATE POLICY "Dono gerencia sua empresa" ON public.companies
    FOR ALL USING (auth.uid() = owner_id);
  ```
- **Leitura Pública para Agendamentos Online (Slugs):**
  ```sql
  CREATE POLICY "Leitura pública da empresa por slug" ON public.companies
    FOR SELECT USING (true);
  ```

---

### 2. Tabelas de Domínio (`services`, `employees`, `clients`, `appointments`)
- **Acesso Restrito ao Dono do Estabelecimento:**
  ```sql
  CREATE POLICY "Acesso restrito ao dono do estabelecimento" ON public.services
    FOR ALL USING (
      company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid())
    );

  CREATE POLICY "Acesso restrito ao dono do estabelecimento" ON public.employees
    FOR ALL USING (
      company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid())
    );

  CREATE POLICY "Acesso restrito ao dono do estabelecimento" ON public.clients
    FOR ALL USING (
      company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid())
    );

  CREATE POLICY "Acesso restrito ao dono do estabelecimento" ON public.appointments
    FOR ALL USING (
      company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid())
    );
  ```

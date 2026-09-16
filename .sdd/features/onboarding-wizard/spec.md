# Especificação da Feature: Onboarding Wizard & Setup da Empresa (`OnboardingWizard`)

## 📌 Objetivo do Produto
Proporcionar um fluxo de boas-vindas rápido, moderno e sem atrito para que novos donos de estabelecimentos configurem seu perfil de negócio logo após o cadastro inicial (E-mail/Senha).

---

## 🗺️ Fluxo de UX (Jornada do Usuário)

```
[ 1. Tela de Cadastro (Register) ] ──(E-mail e Senha)──> [ 2. Supabase Auth (Cria user_id) ]
                                                                      │
                                                                      ▼
                                                       [ 3. Redireciona para /onboarding ]
                                                                      │
            ┌─────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────┐
            ▼                                                         ▼                                                         ▼
  [ Passo 1: Dados do Negócio ]                             [ Passo 2: Segmento & Equipe ]                            [ Passo 3: Endereço & Tipo ]
  • Nome da Empresa                                         • Categoria (Barbearia, Salão, etc)                       • Local Fixo / A Domicílio / Ambos
  • Slug automático (link)                                  • Porte (Solo, 2-5, 6-15, 15+)                            • CEP, Cidade, Estado, Endereço
            │                                                         │                                                         │
            └─────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────┘
                                                                      │
                                                                      ▼
                                                       [ 4. Salva no Supabase (companies) ]
                                                       onboarding_completed = true
                                                                      │
                                                                      ▼
                                                       [ 5. Redireciona para Home / (tabs) ]
```

---

## 🎨 Design System & Componentes de UI (Wizard de 3 Passos)

- **Header com Barra de Progresso:** Pílula superior indicando progresso (`33%` -> `66%` -> `100%`).
- **Cards Selecionáveis de Segmento:** Cards grandes com borda destacada e ícone vetorial (em vez de dropdowns pequenos):
  - 💇‍♂️ **Barbearia** (`barbershop`)
  - 💇‍♀️ **Salão de Beleza / Cabeleireiro** (`salon`)
  - 💅 **Esmalteria / Manicure** (`nailing`)
  - 💄 **Estética / Sobrancelhas / Cílios** (`aesthetic`)
  - 💆‍♀️ **Spa & Massagem** (`spa`)
  - 🩺 **Outros Serviços com Hora Marcada** (`others`)
- **Cards Selecionáveis de Porte da Equipe:**
  - 👤 **Apenas eu** (*Profissional Solo*)
  - 👥 **2 a 5 colaboradores** (*Pequeno time*)
  - 👥 **6 a 15 colaboradores** (*Médio porte*)
  - 🏢 **Mais de 15 colaboradores** (*Grande porte*)

---

## 🗄️ Modelo de Dados no Supabase (`companies`)

```sql
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  segment TEXT NOT NULL,
  team_size TEXT NOT NULL,
  service_type TEXT NOT NULL,
  zip_code TEXT,
  city TEXT,
  state TEXT,
  address TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## ⚖️ Regras de Negócio
1. **Recuperação de Estado:** Se o usuário fechar o app no meio das perguntas e reabrir depois, a verificação no Supabase (`onboarding_completed === false`) o leva direto para a rota `/onboarding` para concluir.
2. **Geração Automática de Slug:** O nome *"Barbearia do Silva"* gera o slug `barbearia-do-silva`.
3. **Persistência Incremental:** As respostas de cada passo são armazenadas na store `useOnboardingStore` (com MMKV) até a submissão final ao Supabase.

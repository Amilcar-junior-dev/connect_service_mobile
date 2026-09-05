# Guia de Mapeamento, Integração e Regras de Negócio (V1 App)

Este guia serve como a **Fonte Única da Verdade (SSOT)** para a transição das funcionalidades do estado atual (layout/mock local) para a **versão de produção integrada ao Supabase, com regras de negócio blindadas e testes unitários**.

---

## 🗺️ Visão Geral do Mapeamento das Funcionalidades Existentes

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   FUNCIONALIDADES DO APLICATIVO                                  │
├───────────────────┬───────────────────┬───────────────────┬───────────────────┬──────────────────┤
│ 1. Autenticação   │ 2. Serviços       │ 3. Colaboradores  │ 4. Clientes       │ 5. Horários &    │
│    & Segurança    │    (Catálogo)     │    (Equipe)       │    (Cadastro)     │    Configurações │
├───────────────────┴───────────────────┴───────────────────┴───────────────────┴──────────────────┤
│                                  6. Agendamentos & Calendário                                    │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Mapeamento Detalhado por Funcionalidade

### 1. Autenticação & Segurança (`Auth`)
- **O que já temos (Layout/Base):** Telas `LoginView`, `RegisterView`, `ResetPasswordView`, Modal `ModalRecoverPassword`.
- **Regras de Negócio Existentes:** Validações de e-mail e senha com Zod, login/cadastro e redefinição via Supabase Auth + DeepLink.
- **Regras que Faltam (Gaps):**
  - Manutenção e renovação automática de sessão (`onAuthStateChange`).
  - Criação automática do registro do estabelecimento na tabela `companies`/`profiles` do Supabase no 1º cadastro.
- **Integrações Necessárias:** Supabase Auth + RLS (Row Level Security).
- **Testes Unitários:** Suíte em `useLoginViewModel.test.ts`, `useRegisterViewModel.test.ts` e `resetPassword.viewModel.test.ts`.

---

### 2. Catálogo de Serviços (`Services`)
- **O que já temos (Layout/Base):** `service.view.tsx`, `ModalNewService`, `ResearchBar`, `CategoryServiceContainer`.
- **Regras de Negócio Existentes:** Filtro de busca local, agrupamento por categoria, seleção de cores do serviço, cópia do link público.
- **Regras que Faltam (Gaps):**
  - CRUD real no Supabase (tabelas `services` e `service_categories`).
  - Upload da imagem de capa do serviço no Supabase Storage.
  - Impossibilidade de excluir serviço que possui agendamentos ativos/pendentes.
- **Integrações Necessárias:** Supabase Database (`services`) + Supabase Storage (`service-covers`).
- **Testes Unitários:** Criar `serviceScreen.viewModel.test.ts`.

---

### 3. Gestão de Equipe & Colaboradores (`Employees`)
- **O que já temos (Layout/Base):** `ModalNewEmployee`, listagem de funcionários na tela `more.view.tsx` com `ResearchBar`.
- **Regras de Negócio Existentes:** Cadastro de funcionário com foto (`CircularImageInput`).
- **Regras que Faltam (Gaps):**
  - CRUD real no Supabase (tabela `employees`).
  - Upload da foto do colaborador no Supabase Storage.
  - Vínculo M:N entre colaborador e quais serviços ele está habilitado a executar (`employee_services`).
- **Integrações Necessárias:** Supabase Database (`employees`, `employee_services`) + Supabase Storage (`avatars`).
- **Testes Unitários:** Criar `modalNewEmployee.viewModel.test.ts`.

---

### 4. Gestão de Clientes (`Clients`)
- **O que já temos (Layout/Base):** `ModalNewClient`, `CustomTextInput` de telefone/nome.
- **Regras de Negócio Existentes:** Cadastro de cliente durante o fluxo de agendamento ou pelas modais.
- **Regras que Faltam (Gaps):**
  - CRUD real no Supabase (tabela `clients`).
  - Evitar cadastro duplicado por telefone/e-mail no mesmo estabelecimento.
  - Exibição do histórico de agendamentos passados do cliente.
- **Integrações Necessárias:** Supabase Database (`clients`).
- **Testes Unitários:** Criar `modalNewClient.viewModel.test.ts`.

---

### 5. Horários de Atendimento & Configurações da Empresa (`Operating Hours`)
- **O que já temos (Layout/Base):** Acordeão de configurações em `more.view.tsx` (Toggles por dia da semana, TimePicker em intervalos de 15 min, botão "Copiar para outros dias", imagens de capa/logo, cor do tema).
- **Regras de Negócio Existentes:** Estado local no ViewModel para alterar horários de segunda a domingo.
- **Regras que Faltam (Gaps):**
  - Persistência real no Supabase (tabelas `company_settings` e `operating_hours`).
  - Upload da capa e logo da empresa no Supabase Storage.
  - Validação para impedir horário de início maior ou igual ao horário de término.
- **Integrações Necessárias:** Supabase Database (`operating_hours`) + Supabase Storage (`company-assets`).
- **Testes Unitários:** Criar `moreScreen.viewModel.test.ts`.

---

### 6. Agendamentos & Calendário (`Appointments & Calendar`)
- **O que já temos (Layout/Base):** `HomeView`, `TopSheet` animado, `ExpandableCalendarScreen`, `appointments.view.tsx`, `ModalSelectDateTime`.
- **Regras de Negócio Existentes:** Seleção de cliente, serviços, data e hora; cálculo automático de duração total e preço final; gravação na store local.
- **Regras que Faltam (Gaps):**
  - Integração real com a tabela `appointments` do Supabase.
  - **Bloqueio de Choque de Horários:** Bloquear horários já agendados para o mesmo colaborador.
  - **Validação de Expediente:** Bloquear agendamentos fora do horário de atendimento configurado para o dia da semana.
  - Transição de status do agendamento (`PENDING` -> `CONFIRMED` -> `COMPLETED` / `CANCELLED`).
- **Integrações Necessárias:** Supabase Database (`appointments`) com queries por intervalo de datas.
- **Testes Unitários:** Criar `appointmentsViewModel.test.ts`.

---

## 🎯 Roteiro de Execução Passo a Passo (Harness SDD)

Avançaremos **uma funcionalidade por vez** seguindo este ciclo:

```
[ 1. Alinhamento & Detalhamento ] ──> [ 2. Criar Schemas & Services Supabase ] ──> [ 3. Atualizar ViewModel & View ] ──> [ 4. Testes Unitários (yarn test) ]
```

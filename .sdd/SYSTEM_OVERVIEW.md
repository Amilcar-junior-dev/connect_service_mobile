# Visão Geral do Sistema e Arquitetura (connect_service_mobile)

O `connect_service_mobile` é um aplicativo móvel completo para gestão de agendamentos, prestadores de serviços, clientes e colaboradores de barbearias e salões de beleza, integrado com **Supabase** (Backend as a Service).

---

## 🛠️ Stack Tecnológica e Bibliotecas Principais

- **Framework Móvel:** React Native 0.81.5 + Expo SDK 54 (com **Nova Arquitetura / New Architecture** habilitada).
- **Roteamento:** Expo Router v6 (File-based Routing).
- **Estilização:** NativeWind v4 (Tailwind CSS adaptado para React Native).
- **Backend & Auth:** Supabase (Autenticação, Banco PostgreSQL com RLS, Storage).
- **Gerenciamento de Estado:** Zustand v5 + MMKV Storage (`react-native-mmkv`) para persistência de alta performance.
- **Formulários & Validação:** `react-hook-form` + `zod` / `yup`.
- **Módulos Nativos / TurboModules:**
  - `NativeBiometrics`: TurboModule In-App escrito em **Kotlin (Android)** e **Swift (iOS)** com comunicação via **JSI (JavaScript Interface)**.

---

## 🏛️ Padrão Arquitetural Estrito (MVVM)

Cada funcionalidade do sistema segue obrigatoriamente a estrutura **Model-View-ViewModel**:

```
src/screens/<featureView>/
  ├── <feature>.view.tsx             # VIEW: Apenas estrutura de UI e renderização (NativeWind).
  ├── use<Feature>ViewModel.ts      # VIEWMODEL: Hook com lógica de negócio, estados e handlers.
  ├── <feature>.scheme.ts           # MODEL: Schemas Zod/Yup e contratos de validação.
  └── use<Feature>ViewModel.test.ts # TESTES: Testes unitários com Jest e React Native Testing Library.
```

---

## 🧩 Domínios Principais da Aplicação (V1)

1. **Autenticação & Segurança (`Auth`)**:
   - Login por E-mail/Senha com Supabase.
   - Recuperação de senha via DeepLink (`connectservice://reset-password`).
   - Autenticação Biométrica Nativa (Face ID / Impressão Digital) via TurboModule com Auto-Disparo.
2. **Agendamentos (`Appointments`)**:
   - Calendário interativo (`react-native-calendars`), seleção de data/hora, serviços e colaboradores.
3. **Serviços (`Services`)**:
   - Gestão de catálogo de serviços (preço, duração, categoria, imagem).
4. **Clientes (`Clients`)**:
   - Cadastro e histórico de atendimentos do cliente.
5. **Colaboradores / Equipe (`Employees`)**:
   - Gestão de equipe, cargos e especialidades.

---

## 🛡️ Diretrizes Anti-Alucinação para Agentes de IA

1. **Consultar o Catálogo de UI:** Antes de criar qualquer nova tela, a IA DEVE consultar `.sdd/COMPONENTS_CATALOG.md` para reaproveitar componentes visuais já existentes.
2. **Respeitar os Contratos de Dados:** Nunca inventar colunas ou tipos do Supabase; sempre validar contra os esquemas `.scheme.ts`.
3. **Execução de Testes:** Sempre rodar `yarn test` ao concluir refatorações ou novas ViewModels.

# PROGRESS - Estado de Contexto e Progresso do Projeto

Este arquivo serve como memória persistente para as sessões de desenvolvimento do projeto `connect_service_mobile`. Ele deve ser lido no início de cada sessão e atualizado no fim.

---

## 1. Resumo das Decisões Arquitetônicas

- **Metodologia SDD (Spec-Driven Development)**: Criada a pasta `.sdd/` contendo `spec.md`, `agents.md` e `task.md`. Eles servem como a única fonte de verdade para o desenvolvimento do aplicativo orientado a agentes de IA.
- **Padrão MVVM (Model-View-ViewModel)**: Todas as telas principais (como Login e Serviços) estão estruturadas separando a visualização (Views no formato `.view.tsx`) da lógica de negócios e estado local (ViewModels no formato de Custom Hooks baseados em `use...ViewModel`).
- **Navegação**: Expo Router com estrutura modular. Grupos públicos e privados (`(private)`) com sub-pastas organizando as guias (`(tabs)`).
- **Estilização**: Tailwind CSS via NativeWind v4 estruturado com variáveis de tema centralizadas em `src/styles/colors.ts`.
- **Sintaxe Restritiva**:
  - Uso estrito de TypeScript sem `any`.
  - Sintaxe de template string \`\` em `className`.
  - Operador de encadeamento opcional `?.` em absolutamente qualquer acesso com ponto (`.`).

---

## 2. Bibliotecas Principais Instaladas

- **Core**: `react` (19.1.0), `react-native` (0.81.4), `expo` (~54.0.13), `expo-router` (~6.0.12).
- **Estilização**: `nativewind` (^4.2.1), `tailwindcss` (^3.4.17).
- **Animações e Gestos**: `react-native-reanimated` (~4.1.1), `react-native-gesture-handler` (~2.28.0).
- **Componentes de UI**: `react-native-calendars` (^1.1314.0).
- **Formulários e Validação**: `react-hook-form` (^7.72.1), `@hookform/resolvers` (^5.2.2), `yup` (^1.7.1), `zod` (^4.3.6).

---

## 3. Bugs e Desafios Contornados na Sessão

- **Inconformidade de Agentes de IA nos Novos Chats**:
  - **Identificado**: O arquivo `.cursorrules` possuía erros de formatação (crases nas bordas do arquivo que quebravam o interpretador de regras da IDE).
  - **Identificado**: O arquivo `.antigravityrules` não possuía a instrução para responder em Português do Brasil (pt-br).
  - **Identificado**: As novas versões do Cursor utilizam o formato `.cursor/rules/*.mdc` com metadados `globs` e `alwaysApply`. A pasta `.cursor/` estava vazia, impossibilitando a leitura automática das diretrizes do projeto em novos chats abertos no Cursor.
  - **Identificado**: Não existia um padrão e diretório explícito para as decisões técnicas (`.sdd/decisions/`), o que dificultava o direcionamento dos agentes sobre onde registrar/consultar essas decisões.
  - **Solução**:
    - Corrigido o `.cursorrules` removendo as crases extras e adicionando explicitamente as regras de estilização/idioma.
    - Atualizado o `.antigravityrules` com as mesmas diretrizes críticas.
    - Criada a regra global `.cursor/rules/global.mdc` para compatibilidade total com as versões modernas do Cursor.
    - Criado o diretório `.sdd/decisions/` com um arquivo `README.md` e a primeira ADR (`0001-arquitetura-base-mvvm.md`) servindo de modelo de histórico e decisões para novas instâncias de IAs.

---

## 4. Próximos Passos Lógicos (Handover)

1. Implementar o ViewModel da aba de agendamentos (`src/screens/appointments/useAppointmentsViewModel.ts`) para alimentar a View `appointments.view.tsx`.
2. Completar o fluxo de cadastro e listagem na tela de Serviços (`src/screens/services/`).
3. Criar a estrutura MVVM para a aba de Controle Financeiro (`financial`).
4. Criar a estrutura MVVM para a aba de Perfil (`more`).

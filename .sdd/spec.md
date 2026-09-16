# Spec: Connect Service Mobile

## 1. Visão Geral do Projeto
O **Connect Service Mobile** é um aplicativo mobile desenvolvido em React Native (Expo) voltado para a gestão de serviços, agendamentos e controle financeiro de profissionais ou prestadores de serviços. O aplicativo conta com um dashboard intuitivo, calendário dinâmico, controle financeiro detalhado e navegação baseada em guias (tabs).

---

## 2. Stack Tecnológica
- **Framework**: Expo (React Native SDK 54) com suporte a TypeScript.
- **Navegação**: Expo Router (Navegação baseada em arquivos - *file-based routing*).
- **Estilização**: NativeWind v4 (Tailwind CSS adaptado para React Native).
- **Gerenciamento de Estado**: Zustand (para estados globais) e React Hooks locais.
- **Animações**: React Native Reanimated v3.
- **Validação de Formulários**: React Hook Form em conjunto com zod e zodResolver
- **Manipulação de Datas**: Day.js.
- **Banco de Dados/Persistência**: MMKV ou Zustand persistido.
- **Componentes Gráficos/UI**: `react-native-calendars` para o calendário de agendamentos, `expo-linear-gradient` para fundos customizados e `react-native-svg` para ícones/vetores.


---

## 3. Arquitetura e Estrutura de Rotas

O projeto utiliza **Expo Router v6** com a seguinte organização de arquivos dentro do diretório `src/app`:

- **`src/app/index.tsx`**: Ponto de entrada que realiza o redirecionamento baseado na presença de um token de autenticação:
  - Se autenticado: Redireciona para `/(private)/(tabs)/home`.
  - Se não autenticado: Redireciona para `/login` (ou `/home` público dependendo do fluxo).
- **`src/app/login.tsx`**: Tela de autenticação que conecta a View (`LoginView`) ao ViewModel (`useLoginViewModel`).
- **`src/app/(private)/`**: Grupo de rotas privadas protegidas por autenticação.
  - **`_layout.tsx`**: Gerencia a navegação e o contexto das telas privadas.
  - **`(tabs)/`**: Navegação em abas (Bottom Tabs):
    - **`home.tsx`**: Dashboard principal.
    - **`appointment.tsx`**: Gestão e visualização de agendamentos.
    - **`financial.tsx`**: Controle financeiro (receitas, despesas, faturamento).
    - **`services.tsx`**: Lista e cadastro de serviços prestados.
    - **`more.tsx`**: Opções adicionais (perfil, configurações, sair).

---

## 4. Telas e Lógica de Negócio (MVVM)

### 4.1 Login (`src/screens/loginView/`)
- **Model / Schema (`login.scheme.ts`)**: Define a tipagem `LoginFormData` e o schema de validação com zod.
- **View (`login.view.tsx`)**: Interface do usuário que exibe campos de entrada e botões. Consome os dados e handlers do ViewModel.
- **ViewModel (`useLoginViewModel.ts`)**: Custom hook que gerencia as propriedades de formulário, manipula o fluxo de submissão do login (`onSubmit`) e interage com o roteador para direcionar o usuário logado para a área privada.

### 4.2 Home (`src/screens/home/`)
- **View (`home.view.tsx`)**: Tela principal privada estruturada com fundo gradiente (`LinearGradient`), contendo:
  - **`TopSheet`**: Painel animado que se expande a partir do topo para exibir informações do perfil do usuário e dados rápidos.
  - **`ExpandableCalendarScreen`**: Calendário expansível que gerencia as datas e eventos de agendamento selecionados.
  - **`FloatingMenu`**: Menu flutuante inferior para ações rápidas de criação (ex: agendar, criar serviço).
- **ViewModel**: Gerencia o estado de transição/altura da `TopSheet` (`translateY` via shared values do Reanimated) e a sincronia com a data do calendário.

### 4.3 Demais Telas (`appointments`, `financial`, `services`, `more`)
- Seguem a mesma convenção MVVM com lógica isolada em ViewModels (`use...ViewModel`) e interfaces limpas baseadas em NativeWind.

---

## 5. UI/UX Design System
- **Temas Dinâmicos**: O projeto utiliza um sistema de tema claro/escuro injetado na raiz das Views via variáveis CSS (`activeTheme.vars` importado de `~/styles/colors.ts`) e o hook `useColorScheme()` do NativeWind.
- **Layout Responsivo**: Utiliza a estrutura de Grid e Flexbox do Tailwind CSS através do NativeWind, com tratamento de notch pelo `SafeAreaView`.
- **Animações**: Transições suaves baseadas em `react-native-reanimated` para menus, aberturas de sheets e interações táteis.

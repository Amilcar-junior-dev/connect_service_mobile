# Checklist de Implementação: Connect Service Mobile

Este checklist acompanha o progresso de desenvolvimento do aplicativo com base nas especificações do Spec-Driven Development (SDD).

## 1. Infraestrutura e Configuração Base
- [x] Configuração inicial do projeto React Native Expo (SDK 54) com TypeScript
- [x] Roteamento estruturado com Expo Router (`src/app`)
- [x] Configuração do NativeWind v4 (Tailwind CSS) e variáveis de tema em `src/styles`
- [x] Definição de alias de caminhos (`~/`) no `tsconfig.json`

## 2. Fluxo de Autenticação e Login
- [x] Criação do Schema de Validação de Login (`login.scheme.ts`)
- [x] Implementação do ViewModel de Login (`useLoginViewModel.ts`)
- [x] Implementação da View de Login (`login.view.tsx`) com NativeWind
- [x] Redirecionamento condicional de sessão em `src/app/index.tsx`

## 3. Tela Home e Dashboard (`src/screens/home`)
- [x] Criação do componente base `HomeView`
- [x] Implementação do `TopSheet` animado (Reanimated) para perfil de usuário
- [x] Integração do calendário expansível (`ExpandableCalendarScreen`)
- [x] Implementação do Menu Flutuante (`FloatingMenu`)

## 4. Agendamentos (`src/screens/appointments`)
- [x] Criação do componente de View (`appointments.view.tsx`)
- [ ] Criação do ViewModel associado para gerenciamento de agendamentos
- [ ] Integração com serviço de calendário e persistência

## 5. Serviços (`src/screens/services`)
- [x] Criação do Schema de Validação de Serviços (`serviceScreen.scheme.ts`)
- [x] Implementação do ViewModel de Serviços (`serviceScreen.viewModel.ts`)
- [x] Implementação da View de Serviços (`service.view.tsx`)
- [ ] Fluxo completo de cadastro, edição e exclusão de serviços

## 6. Controle Financeiro e Estatísticas (`financial`)
- [ ] Criação da View financeira (`financial.view.tsx`)
- [ ] Criação do ViewModel de finanças para cálculo de receitas e despesas
- [ ] Exibição de gráficos e extrato financeiro

## 7. Mais / Configurações (`more`)
- [ ] Criação da View de Perfil e Configurações (`more.view.tsx`)
- [ ] Implementação de edição de dados cadastrais
- [ ] Função de logout da aplicação

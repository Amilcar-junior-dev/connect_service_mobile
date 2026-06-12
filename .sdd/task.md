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

## 8. Modal Novo Serviço (`src/components/modals/modalsServices/newService/ModalNewService.view.tsx`) 
- [x] Adicionar novo select input de Categorias
  - [x] Utilizar o componente `src/components/inputs/selectInput/CustomSelectDropdown.view.tsx` como `radioButton` para demonstrar as opções de categorias
  - [x] Ao clicar e selecionar a opção ela deve ficar selecionada no dropdown
  - [x] O dropdown não deve ter o ícone `leftIcon`
- [x] Certificar de que o novo campo componha o objteto final de dados de um serviço
- [x] Habilitar o botão `rightActionIcon` para adicionar uma nova categoria caso não exista nas opções iniciais;
  - [x] O botão deve utilizar o ícone `src/assets/svg/Category.svg` 
    - [x] O brackground do botão e o ícone deve ter a cor padrão disponível no `CustomSelectDropdown`
  - [x] Clicando no `rightActionIcon` deve abrir uma modal do tipo Alert ( componente do react native)
    - [x] A modal Alert deve conter um input de texto utilizando o componente `src/components/inputs/textInput/CustomTextInput.view.tsx`
    - [x] Abaixo deve haver um botão com o nome `Criar categoria` que utiliza o componente `TouchableOpacity` do react-native
    - [x] Clicar em `Criar categoria` deve adicionar uma nova opção ao dropdown de seleção de categoria
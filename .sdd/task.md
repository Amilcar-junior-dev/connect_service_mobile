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

## 9. Página de Serviços (`src/screens/services/service.view.tsx`)
  ### A. Cabeçalho
    - [x] Criar Cabeçalho da página com o nome `Meus Serviços`;
  ### B. Componente de pesquisa
    - [x] Criar componente de pesquisa;
      - [x] Componente de pesquisa deve ser adicionado a pasta `src/components/researchBar`;
      - [x] Background do componente deve ser na cor `divider`;
      - [x] Deve utilizar o ícone `src/assets/svg/Search.svg` na cor `muted` e posicionado no canto direito;
      - [x] Componente deve permitir receber uma propriedade `placeholder`opcional;
      - [x] Placeholder padrão do componente deve ser `Pesquisar`;
      - [x] O componente deve permitir receber uma lista de opções e devolvê-la de forma filtrada
  ### C. Botão de Novo Serviço
    - [x] Criar botão de novo Serviço o ícone `src/assets/svg/Plus.svg` na cor `muted`;
    - [x] Ao clicar no botão a modal de novo serviço deve aparecer `src/components/modals/modalsServices/newService/ModalNewService.view.tsx`
  ### D. Criar botão de compartilhamento de página de agendamento
    - [x] Criar botão utilizando o ícone `src/assets/svg/PageAgendLink.svg` na cor `muted`
    - [x] Clicando no botão o link deve ser copiado para a área de transferência
  ### E. Criação de container de serviços
    - [x] Container deve receber os cards de serviços que tiverem a prop `category` como o nome da categoria. EX: Container de serviços Estética deve conter os cards de serviços que estiverem com a prop `category` marcada como `Estética`;
    - [x] O Container deverá possuir o nome da categoria e a quantidade ( length ) de serviços cadastrados nela.
    - [x] Container deve abrir e fechar com uma animação suave de crescimento assim como acontece no componente `src/components/inputs/selectInput/CustomSelectDropdown.view.tsx`;
      - [x] Quando estiver fechado deve usar o ícone `src/assets/svg/FolderClose.svg` na cor `ink`;
      - [x] Quando estiver aberto deve usar o ícone `src/assets/svg/FolderOpen.svg` na cor `ink`;
      - [x] As seta utilizada deverá ser a `src/assets/svg/ArrowDown.svg` e seguir o mesmo padrão de abertura e fechamento do componente `src/components/inputs/selectInput/CustomSelectDropdown.view.tsx` mudando a posição quando estiver aberta e fechada
## 10. Página More `src/app/(private)/(tabs)/more.tsx`
  ### A. Criação da Screen More 
    - [x] Criar a pasta e arquivo dentro de Screen e referencia-la em  src/app/(private)/(tabs)/more.tsx;
  ### B. Criação de dropdown para o menu da página
    - [x] O dropdown deve permitir componentes filhos que serão responsáveis pelas opções da página more e deve seguir as seguintes regras;
      - [x] Abrir com uma animação de altura assim como ocorre no componente `src/components/inputs/selectInput/CustomSelectDropdown.view.tsx`
      - [x] Quando aberto o container deve ficar selecionado com a cor `stone`;
      - [x] Apenas 1 dropdown deve ficar aberto na página ( estando um aberto, ao clicar no próximo o atual deve fechar)
    - [x] As opções da página com o dropdown inicialmente são as seguintes:
      - [x] Título: `Página de agendamentos` ; Ícone: `src/assets/svg/LogoConnect.svg`
      - [x] Título: `Horário de Atendimento`; Ícone: `src/assets/svg/Clock.svg`;
      - [x] Título: `Funcionários`; Ícone: `src/assets/svg/Peoples.svg`;
      - [x] Título: `Integrações`; Ícone: `src/assets/svg/Integrations.svg`;
      - [x] Título: `Compartilhar App`; Ícone: `src/assets/svg/Heart.svg`;
      - [x] Título: `Sair`; Ícone: `src/assets/svg/Exit.svg`
  ### C. Criação dos componentes do dropdown de Página de agendamentos
    - [x] Criação do componente de input de imagem de capa;
      - [x] Deve utilizar o ícone  src/assets/svg/WithoutImage.svg
      - [x] Deve utilizar Hook existente de captura de imagem `src/hooks/useImagePicker.ts`
    - [x] Utilização do componente de imagem para adicionar o logotipo da empresa, utilizar o componente de captura de imagem já utilizado na modal de criação de novo cliente ( modalNewClient)
    - [x] Criação de campos de input utilizando o componente padrão `src/components/inputs/textInput/CustomTextInput.view.tsx`;
    - [x] Criação de componente reutilizável de seleção de cores;
      - [x] Atualmente o componente se encontra de forma estática em `src/components/modals/modalsServices/newService/ModalNewService.view.tsx (120)`, 
  ### D. Criação dos componentes do dropdown de Horários de atendimento
    - [x] Cria componente toogle reutilizável para habilitar e desabilitar os horários de atendimento da semana;
      - [x] O componente deve realizar uma animação de transição horizontal mudando o tragedo da 'bolinha interna' e da cor de fundo
      - [x] Quando desabilitado o container do toogle deve ficar com a cor `stone` e o circulo interno na cor `tabbar`
      - [x] Quando habilitado o container do toogle deve ficar com a cor `success`e o círuclo com a cor `stone`;
    - [x] As opções do dias devem contemplar de segunda a domingo
    - [x] Os inputs de horários devem demonstrar a visualização do horário e a tag AM / PM para especificar o período do dia;
    - [x] Quando o input de hoário estiver selecionado ele deve ficar com a borda na cor `accent`
    - [x] Ao clicar no input uma modal central deve aparecer para a seleção do horário
      - [x] IMPORTANTE: os horários de minuto devem seguir o intervalo de 15 em 15 minutos por padrão, podendo ser configurável de acordo com a necessidade
      - [x] Para construir a modal utilizar o componente de seleção de horários já utilizado no componente src/components/inputs/timeSelect/TimeSelectDropdown.view.tsx. Caso necessário crie um componente próprio com o seletor de horários para aproveitá-lo tanto no TImeSelectDropdown quanto em outros locais como na nossa tela more;
    - [x] Criação de botão `Copiar para outros dias` com TouchableOpacity sendo que ao clicar nele todos os outros inputs de horários devem receber o mesmo horário do input que foi selecionado ( Hora de inicio e término) e utilizar o ícone `src/assets/svg/Copy.svg`
  ### E. Criação dos componentes do dropdown de Funcionarios
    - [ ] Deve utilizar o componente de pesquisa src/components/researchBar/ResearchBar.view.tsx
    - [ ] Deve criar botão com o ícone src/assets/svg/Plus.svg e o  nome `Adicionar Funcionário`, ao clicar no botão deve-se abrir uma modal de criação de Funcionário
    - [ ] Modal de criação de funcionario deve ter o CicrularPicker para adicionar a foto ( utilizar o componente src/components/inputs/circularImageInput/CircularImageInput.view.tsx)
    - [ ] Dropdown deve listar card de funcioários ( utilizar o mesmo componente da listagem de pacientes)
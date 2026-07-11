# 📱 Connect Service Mobile

> Uma solução completa e de alta performance para a gestão de serviços, controle de clientes e agendamentos inteligentes. Desenvolvido para autônomos, prestadores de serviços e pequenos negócios.

---

[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?logo=expo&logoColor=white&style=for-the-badge)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/NativeWind_v4-Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://nativewind.dev)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.12-443e38?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![MMKV](https://img.shields.io/badge/React_Native_MMKV-4.3.2-E6007A?logo=redis&logoColor=white&style=for-the-badge)](https://github.com/mrousavy/react-native-mmkv)

---

## 🚧 Status do Projeto

*   **Fase atual**: **Construção de UI & Prototipagem Local** 🎨
*   **Descrição**: A interface do usuário (UI) e as transições de navegação foram inteiramente construídas. O fluxo de dados foi prototipado de forma *offline-first* utilizando persistência local síncrona de alta performance para simular o comportamento final do back-end.

---

## 📋 Sobre o Projeto

O **Connect Service Mobile** resolve os gargalos diários enfrentados por prestadores de serviços (beleza, estética, tecnologia, consultorias) no gerenciamento de seu fluxo de trabalho. 

O app reúne em uma única plataforma a administração do catálogo de serviços, controle de clientes (CRM), configuração da equipe (funcionários), horários de funcionamento personalizados, e um calendário de agendamento interativo com prevenção de colisão de horários.

### 🌟 Funcionalidades Principais

*   📅 **Agenda Dinâmica e Inteligente**: Calendário expansível com listagem diária em formato de acordeão. Previne de forma automática o choque de horários e calcula de forma inteligente o horário previsto de término de acordo com a duração acumulada dos serviços selecionados.
*   💼 **Catálogo de Serviços Customizado**: Cadastro de serviços com imagem de capa, tag de cor, tempo estimado (horas/minutos), descrição, valor em BRL e categorização dinâmica.
*   👥 **CRM Local (Gestão de Clientes)**: Cadastro rápido de clientes com upload de foto de perfil (seletor local) e integração direta com o formulário de reserva.
*   👥 **Controle de Equipe**: Módulo completo de adição de colaboradores com foto e e-mail no menu de configurações.
*   🔐 **Sessão Persistida (Auth)**: Tela de login e cadastro de usuários integrada a uma store síncrona que preserva o token de acesso do usuário entre as reinicializações do app.

---

## 🏗️ Arquitetura do Software

O projeto segue a arquitetura **MVVM (Model-View-ViewModel)** para promover a separação de responsabilidades, facilidade de manutenção e legibilidade de código.

### Detalhes das Camadas:
1.  **Views (`*.view.tsx`)**: Responsável unicamente pela renderização da interface e estilização via Tailwind CSS (NativeWind). Consome métodos e estados expostos pelo ViewModel.
2.  **ViewModels (`use*ViewModel.ts`)**: Custom hooks que encapsulam toda a lógica de negócio, estado interno do formulário (via `react-hook-form` e `zod`), manipulação de efeitos colaterais e navegação.
3.  **Models (`*.model.ts`)**: Define as interfaces TypeScript das entidades de negócio (`Client`, `Service`, `Appointment`, `Employee`), garantindo tipagem forte em todo o fluxo de dados do app.
4.  **Stores (`use*Store.ts`)**: Gerenciamento de estado global com Zustand conectado ao MMKV, proporcionando leitura e escrita síncrona no disco com performance em nível C++.

---

## 📂 Estrutura de Pastas

```text
├── assets/                  # Imagens e fontes estáticas do aplicativo
├── ios/                     # Projetos nativos iOS (CocoaPods)
├── android/                 # Projetos nativos Android
└── src/
    ├── app/                 # Rotas do Expo Router (File-based Routing)
    │   ├── index.tsx        # Gateway / Roteamento inicial
    │   ├── login.tsx        # Rota pública de Login
    │   └── (private)/       # Grupo privado protegido por Token
    │       └── (tabs)/      # Abas inferiores (home, appointment, financial, etc)
    ├── assets/              # Vetores (SVGs) e imagens dinâmicas
    ├── components/          # Componentes reutilizáveis de UI/Modais
    ├── hooks/               # Custom hooks globais (imagem, temas, formulários)
    ├── models/              # Interfaces formais de dados (Modelos de Domínio)
    ├── screens/             # Telas divididas por pastas (Views e ViewModels)
    ├── store/               # Zustand Stores e Adaptador de Storage MMKV
    ├── styles/              # Arquivo global CSS e variáveis do Tema (cores)
    └── utils/               # Funções auxiliares (formatação, estilos condicionais)
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
*   [Node.js](https://nodejs.org) (v18 ou superior recomendado)
*   [npm](https://www.npmjs.com) ou [Yarn](https://yarnpkg.com)
*   [Expo Go](https://expo.dev/client) instalado no celular **ou** simuladores iOS (Xcode) / Android (Android Studio) configurados.

### Passos de Instalação

1.  **Clonar o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/connect_service_mobile.git
    cd connect_service_mobile
    ```

2.  **Instalar as dependências**:
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Instalar dependências nativas (apenas se for rodar em simulador/dispositivo local)**:
    Como o projeto utiliza pacotes nativos compilados em C++ (Zustand + MMKV / NitroModules), é necessário instalar as dependências de pods do iOS:
    ```bash
    cd ios
    pod install
    cd ..
    ```

### Rodando o Aplicativo

*   **Para rodar no simulador iOS**:
    ```bash
    npx expo run:ios
    ```
*   **Para rodar no emulador Android**:
    ```bash
    npx expo run:android
    ```
*   **Para iniciar o servidor Metro**:
    ```bash
    npm run start
    ```

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas
*   **UI & Gestos**: `react-native-reanimated`, `react-native-gesture-handler`, `react-native-svg`
*   **Formulários**: `react-hook-form` + `@hookform/resolvers` + `zod`
*   **Datas**: `dayjs` (configurado em `pt-br`)
*   **Storage**: `react-native-mmkv` + `react-native-nitro-modules` (com adaptador Zustand persist)
*   **Componentes Customizados**: `react-native-modalize` (modais deslizáveis), `react-native-calendars` (calendário expansível)

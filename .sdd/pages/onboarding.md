# Contexto da Tela: Onboarding Wizard (`onboardingView`)

## 📌 Identificação e Rota
- **Rota no Expo Router:** `onboarding` (`src/app/onboarding.tsx`)
- **View (`.view.tsx`):** `src/screens/onboardingView/onboarding.view.tsx`
- **ViewModel (`use*ViewModel.ts`):** `src/screens/onboardingView/useOnboardingViewModel.ts`
- **Schema (`.scheme.ts`):** `src/screens/onboardingView/onboarding.scheme.ts`
- **Testes Unitários (`.test.ts`):** `src/screens/onboardingView/useOnboardingViewModel.test.ts`

---

## 🧩 Componentes Utilizados na Tela

### Componentes de UI (Redesign Benchmark 4 Passos + Ajustes Finos):
- **Header Limpo**: Seta para voltar passo anterior e barra de progresso fina (`25%` -> `50%` -> `75%` -> `90%` -> `100%` pós-sucesso). Botão "Ajuda" ocultado na UI.
- **Avatar Picker (`CircularImageInput`)**: Upload de foto de perfil/logo (opcional) centralizado na tela, com preview imediata via `imageUri` e propagação para o `TopSheet` da Home.
- **Input de Especialização Customizada**: Permite ao usuário buscar ou digitar uma área de atuação que não esteja listada.
- **Radio List de Especializações Padrão**: Seleção visual de especialidade (Cabeleireiro, Manicure, Barbeiro, Esteticista, etc.).
- **Formulário de Endereço**: Inputs de endereço inicializados vazios com autocompletar via ViaCEP.
- **Lista de Horários Semanais & TimePickerModal**: Toggles por dia da semana (Dom a Sáb) com badges clicáveis de horário inicial e final integrando o modal [TimePickerModal.view.tsx](file:///Users/junioroliveira/Documents/Junior/ProjetosSoftware/connect_service_mobile/src/components/modals/timePicker/TimePickerModal.view.tsx).
- **Botão Fixo no Rodapé**: Botão de ação ("Continuar" / "Concluir") mantido fixado na parte inferior da tela, visível independente de scroll.

---

## ⚖️ Regras de Negócio e Comportamentos da Tela

1. **Validação e Fluxo em 4 Passos:**
   - **Passo 1 (Nome & Foto):** Nome obrigatório (mínimo 2 caracteres). Sobrenome e foto de perfil opcionais. Foto de perfil centralizada com preview.
   - **Passo 2 (Especialização):** Título personalizado *"{Nome}, informe sua especialização"*. Exige a seleção ou digitação de 1 especialidade.
   - **Passo 3 (Local de Trabalho):** Inputs vazios para nome do espaço e endereço.
   - **Passo 4 (Horários):** Configuração interativa de expediente com `TimePickerModal`. Texto do botão renomeado para "Concluir".
   - **Barra de Progresso:** Atinge `100%` **apenas após o clique bem-sucedido no botão "Concluir"**.

2. **Propagação para o TopSheet:**
   - A foto de perfil (`avatar_url`) e o nome do local ou profissional salvos no Onboarding alimentam dinamicamente a marca e avatar exibidos no painel superior `TopSheet.view.tsx` na Dashboard.

---

## 📜 Histórico de Atualizações
- **2026-09-05**: Redesign completo do Onboarding Wizard em 4 passos idêntico ao benchmark de UI enviado, com propagação de imagem no TopSheet, fixação do botão no rodapé, edição interativa de horários com `TimePickerModal`, preview de imagem corrigido e sincronização de schema no Supabase (`first_name`, `last_name`, `avatar_url`, `specialization`, `operating_hours`).

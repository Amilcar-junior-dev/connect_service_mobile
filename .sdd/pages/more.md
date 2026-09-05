# Contexto da Tela: Mais / Configurações (`more`)

## 📌 Identificação e Rota
- **Rota no Expo Router:** `(private)/(tabs)/more`
- **View (`.view.tsx`):** `src/screens/more/more.view.tsx`
- **ViewModel (`use*ViewModel.ts`):** `src/screens/more/moreScreen.viewModel.ts`
- **Schema (`.scheme.ts`):** `src/screens/more/bookingPage.schema.ts`

---

## 🧩 Componentes Utilizados na Tela

### Componentes de UI:
- **Dropdowns Acordeão/Sanfonados**: Apenas um dropdown pode ficar aberto por vez (`activeDropdownKey`).
- **`TextInputComponent`**: Campos de configuração do estabelecimento (Nome, URL, Sobre, E-mail, Telefone, Endereço, Instagram, Facebook).
- **`CircularImageInput`**: Seleção e preview da imagem de perfil/logotipo da empresa.
- **`ResearchBar`**: Barra de pesquisa para filtrar colaboradores cadastrados.
- **Toggles Customizados de Horários**: Chaves animadas (Ativo/Inativo) para cada dia da semana.
- **Modal Central de TimePicker**: Seleção de horário em intervalos de 15 em 15 minutos.

### Modais Conectadas:
- **`EMPLOYEE`** (`ModalNewEmployee`): Disparada ao clicar no botão "Adicionar Funcionário".

### Recursos Vetoriais (SVGs):
- Ícones de menu: `LogoConnect.svg`, `Clock.svg`, `Peoples.svg`, `Integrations.svg`, `Heart.svg`, `Exit.svg`, `Copy.svg`.

---

## ⚖️ Regras de Negócio e Comportamentos da Tela

1. **Menu de Opções Acordeão (Sanfona Exclusiva):**
   - Exibe opções: *Página de Agendamentos*, *Horários de Atendimento*, *Funcionários*, *Integrações*, *Compartilhar App* e *Sair*.
   - Apenas 1 dropdown pode ficar aberto por vez. Se um novo for aberto, o anterior fecha automaticamente.

2. **Configuração da Página de Agendamentos (`bookingPage.schema.ts`):**
   - Permite personalizar imagem de capa, logotipo da empresa, cor primária do tema e dados de contato/redes sociais.

3. **Horários de Atendimento Semanal (Segunda a Domingo):**
   - Permite ativar/desativar o atendimento por dia da semana (`toggleDay`).
   - Botão **"Copiar para outros dias"**: Replica os horários de início e término do dia selecionado para todos os outros dias da semana (`copyTimesToAllDays`).
   - O TimePicker funciona em intervalos configurados de 15 minutos.

4. **Gestão de Funcionários:**
   - Lista os colaboradores do estabelecimento a partir da store `useEmployeeStore`.
   - Permite pesquisar colaboradores em tempo real com `ResearchBar` e abrir a modal `ModalNewEmployee`.

5. **Ações do Sistema:**
   - **Compartilhar App:** Copia o link de download para a área de transferência (`Clipboard.setString`).
   - **Sair (Logout):** Exibe alerta de confirmação nativo, limpa a sessão na `useAuthStore` / Supabase e redireciona para `/login`.

---

## 📜 Histórico de Atualizações
- **2026-08-23**: Mapeamento inicial da página de configurações.

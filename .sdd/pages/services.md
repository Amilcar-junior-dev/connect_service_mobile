# Contexto da Tela: Meus Serviços (`services`)

## 📌 Identificação e Rota
- **Rota no Expo Router:** `(private)/(tabs)/services`
- **View (`.view.tsx`):** `src/screens/services/service.view.tsx`
- **ViewModel (`use*ViewModel.ts`):** `src/screens/services/serviceScreen.viewModel.ts`
- **Schema (`.scheme.ts`):** `src/screens/services/serviceScreen.scheme.ts`

---

## 🧩 Componentes Utilizados na Tela

### Componentes de UI:
- **`ResearchBar`** (`~/components/researchBar/ResearchBar.view`): Barra de pesquisa dinâmica para filtrar os serviços cadastrados por nome/descrição.
- **`CategoryServiceContainer`**: Containers sanfonados organizados por categoria de serviços (ex: *Cabelo*, *Barba*, *Estética*), exibindo ícones `FolderOpen` / `FolderClose` e `ArrowDown`.

### Modais Conectadas:
- **`SERVICE`** (`ModalNewService`): Abertura ao clicar no botão "Novo Serviço" (`Plus.svg`) para cadastrar ou editar um serviço.

### Recursos Vetoriais e Ações:
- `Search.svg`: Ícone da barra de pesquisa.
- `Plus.svg`: Botão para adicionar novo serviço.
- `PageAgendLink.svg`: Botão para copiar o link público de agendamentos para a área de transferência.

---

## ⚖️ Regras de Negócio e Comportamentos da Tela

1. **Agrupamento Dinâmico por Categorias:**
   - Os serviços são carregados do estado global `useServiceStore`.
   - São agrupados dinamicamente em containers sanfonados pela propriedade `category`.
   - Exibe a contagem total de serviços cadastrados em cada categoria.

2. **Pesquisa em Tempo Real:**
   - A barra de pesquisa filtra instantaneamente a lista de serviços mantendo a estrutura de categorias visível.

3. **Compartilhamento de Link de Agendamento:**
   - Ao clicar no botão de link (`PageAgendLink`), o aplicativo copia a URL da página pública do estabelecimento para a área de transferência com feedback visual.

---

## 📜 Histórico de Atualizações
- **2026-08-23**: Mapeamento inicial da página de serviços.

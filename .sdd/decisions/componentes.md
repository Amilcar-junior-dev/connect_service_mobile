# Decisões de Componentes Reutilizáveis

Este arquivo registra as decisões arquiteturais relacionadas à implementação e evolução dos componentes de UI reutilizáveis no projeto.

---

## ADR 001: Tipagem Genérica no `CustomSelectDropdown`

* **Status**: Aprovado
* **Data**: 2026-06-12
* **Autor**: Antigravity

### Contexto
O componente [CustomSelectDropdown.view.tsx](file:///Users/junioroliveira/Documents/Junior/ProjetosSoftware/connect_service_mobile/src/components/inputs/selectInput/CustomSelectDropdown.view.tsx) foi projetado para renderizar listas de seleção de forma dinâmica. Originalmente, o componente aceitava apenas a interface rígida `CustomSelectOption` contendo propriedades como `price` e `duration`, acoplando o componente de formulário ao domínio de Serviços/Agendamentos.

Isso causava perda de type safety e autocomplete nos locais onde o dropdown era consumido (como na seleção de Clientes ou Categorias), pois propriedades customizadas não tipadas na interface dependiam de propriedades dinâmicas soltas ou de castings manuais e inseguros (e.g., `(item as Categoria).nome`).

### Alternativas Consideradas
1. **Criar múltiplos componentes de Dropdown especializados**: Um para seleção de clientes (`ClientDropdown`), outro para serviços (`ServiceDropdown`), etc.
2. **Utilizar tipagem genérica baseada em herança (`T extends BaseSelectOption`)**: Criar uma interface básica com os campos mínimos exigidos pelo componente para renderização e pesquisa (`id`, `label`, `img?`) e permitir que o componente aceite qualquer objeto que a estenda.
3. **Manter sem Generics usando tipagem aberta (`Record<string, any>`)**: Abandonar restrições estritas permitindo objetos livres, sem type safety.

### Decisão
Optou-se pela **Alternativa 2 (Utilizar tipagem genérica baseada em herança)**. 

O componente foi reescrito usando TypeScript Generics:
- **`BaseSelectOption`**: Define a estrutura mínima obrigatória para o funcionamento da listagem, busca e miniatura:
  ```typescript
  export interface BaseSelectOption {
      id: string | number;
      label: string;
      img?: string;
      [key: string]: any;
  }
  ```
- **`CustomSelectDropdownProps<T extends BaseSelectOption>`**: Define a tipagem genérica das propriedades do dropdown.

Com isso, o componente pai (consumidor) recupera o item selecionado mantendo a autocompletação e a segurança estática de tipo das suas propriedades originais sem castings redundantes.

### Consequências
* **DX Avançada**: Facilidade de uso com tipagem forte e autocompletação em todo o fluxo de formulários.
* **Flexibilidade**: O componente é 100% reutilizável e agnóstico de domínio.
* **Compatibilidade**: Telas legadas que já utilizam a antiga `CustomSelectOption` continuam compilando e funcionando sem alterações, pois `CustomSelectOption` herda diretamente de `BaseSelectOption`.

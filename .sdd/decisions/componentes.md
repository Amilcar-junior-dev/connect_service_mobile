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

---

## ADR 002: Flexibilização e Autonomia (Standalone) no `CustomTextInput`

* **Status**: Aprovado
* **Data**: 2026-06-22
* **Autor**: Antigravity

### Contexto
O componente [CustomTextInput.view.tsx](file:///Users/junioroliveira/Documents/Junior/ProjetosSoftware/connect_service_mobile/src/components/inputs/textInput/CustomTextInput.view.tsx) foi originalmente projetado com uma dependência acoplada e rígida do React Hook Form (executando `useFormContext()` obrigatoriamente). Isso impedia que o componente fosse usado em fluxos simples de busca, filtros de dados (como na barra de pesquisa `ResearchBar`) ou modais rápidas que não necessitam de um formulário completo, forçando o desenvolvedor a envolver esses elementos em instâncias complexas e desnecessárias de `FormProvider`.

### Alternativas Consideradas
1. **Criar dois componentes separados de input**: Um componente `ControlledTextInput` acoplado ao React Hook Form e outro `StandaloneTextInput` para uso puro.
2. **Abstrair e auto-detectar o contexto do formulário**: Estender o `CustomTextInput` existente para verificar em tempo de execução se há um `control` e um `name` disponíveis. Se presentes, renderizar utilizando o `<Controller>` do React Hook Form; caso contrário, comportar-se como um componente nativo controlado (`value` e `onChangeText` via props).

### Decisão
Optou-se pela **Alternativa 2 (Abstrair e auto-detectar o contexto do formulário)**. 

Essa decisão permite que a padronização visual e de comportamento do Design System (como as cores do tema ativo, indicação de obrigatoriedade, foco e máscaras) seja compartilhada por todos os inputs do aplicativo, independentemente de estarem ou não inseridos em um fluxo de formulário.

Em relação à estratégia de testes unitários:
- **Fluxos de telas:** Os testes de integração (como login ou cadastro) validam os inputs apenas sob o cenário controlado com `control`.
- **Testes do Componente de UI:** Os testes unitários focados na interface do `CustomTextInput` podem ser escritos puramente de forma simplificada (sem o contexto do formulário), facilitando a montagem e cobertura em ferramentas como Jest e Storybook.

### Consequências
* **Reuso Máximo**: O componente atende a 100% dos cenários do app de forma unificada (formulários, filtros, buscas, modais avulsas).
* **DX Simplicada**: Eliminação de código boilerplate (ex: criação de `useForm` ou `FormProvider` artificiais apenas para renderizar uma barra de pesquisa).
* **Manutenibilidade**: Qualquer alteração visual ou de acessibilidade reflete instantaneamente em todos os inputs do app.


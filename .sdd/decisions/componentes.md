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

---

## ADR 003: Habilitação de `renderItem` e Flexibilização de Ícones no `CustomSelectDropdown`

* **Status**: Aprovado
* **Data**: 2026-06-22
* **Autor**: Antigravity

### Contexto
O componente [CustomSelectDropdown.view.tsx](file:///Users/junioroliveira/Documents/Junior/ProjetosSoftware/connect_service_mobile/src/components/inputs/selectInput/CustomSelectDropdown.view.tsx) foi projetado para renderizar listas de seleção customizadas. No entanto, embora a propriedade `renderItem` estivesse definida na tipagem do componente, ela era ignorada na View, forçando um layout fixo composto apenas por `item.label` e um ícone pré-definido. Adicionalmente, as propriedades de ícones do componente (`leftIcon`, `cardIcon`, `rightActionIcon`) eram limitadas a strings fixas de um enum restrito.

### Alternativas Consideradas
1. **Manter o layout estático**: Forçar o desenvolvedor a usar o layout simples de label/ícone e criar outros componentes de dropdown caso precisasse exibir dados adicionais (como preço e tempo de serviço).
2. **Ativar `renderItem` e unificar a flexibilização de ícones**: Atualizar a View para renderizar a propriedade `renderItem` caso fornecida pelo desenvolvedor, e ajustar a tipagem para suportar tanto strings do enum pré-definido quanto componentes React/SVGs dinâmicos (`ReactNode`), estendendo o padrão implementado no input.

### Decisão
Optou-se pela **Alternativa 2 (Ativar `renderItem` e unificar a flexibilização de ícones)**.

Isso corrige o comportamento do componente e garante que o dropdown possa ser personalizado para exibir informações complexas (como detalhes de preços e tempos de serviço no formulário de agendamento) de forma limpa, mantendo o padrão estético global de animação e Z-index do dropdown.

### Consequências
* **Consistência Visual**: Todos os dropdowns mantêm a mesma animação de abertura e comportamento de busca, mas com total liberdade para renderizar o conteúdo interno de cada linha.
* **Extensibilidade**: Facilita a inserção de novos ícones dinâmicos ou SVGs externos nas props do seletor sem precisar alterar o mapeamento estático do componente compartilhado.

---

## ADR 004: Correção de Contraste e Inclusão de Legenda (Label) no `CustomToggle`

* **Status**: Aprovado
* **Data**: 2026-06-22
* **Autor**: Antigravity

### Contexto
O componente [CustomToggle.view.tsx](file:///Users/junioroliveira/Documents/Junior/ProjetosSoftware/connect_service_mobile/src/components/inputs/toggle/CustomToggle.view.tsx) foi avaliado com duas limitações:
1. **Falta de Legenda Integrada**: O componente renderizava apenas a chave visual do switch, obrigando o desenvolvedor a criar containers flex externos com legendas `<Text>` em cada tela de consumo.
2. **Contraste Inconsistente no Tema Escuro**: O estado ativo (ON) utilizava um tom de verde escuro fixado em fallback que apresentava baixíssimo contraste sobre o fundo escuro do aplicativo.

### Alternativas Consideradas
1. **Tratar layout e contraste de forma isolada em cada tela consumidora**: Mantendo o toggle básico puro e tratando as cores e legendas manualmente por fora.
2. **Evoluir o componente e o arquivo global de temas**: Adicionar as propriedades opcionais `label` e `labelClass` ao componente de Toggle, e atualizar as definições de cores globais no `colors.ts` ajustando o tom de verde ativo (`success`) do modo escuro para uma cor mais clara e brilhante (`rgb(74, 222, 128)`), melhorando o contraste e a acessibilidade.

### Decisão
Optou-se pela **Alternativa 2 (Evoluir o componente e o arquivo global de temas)**.

Essa evolução melhora a experiência de desenvolvimento (DX) ao encapsular a estrutura padrão de toggle com texto explicativo e garante que o design de cores siga as diretrizes de acessibilidade WCAG para contraste em modo escuro.

### Consequências
* **Acessibilidade Aprimorada**: A chave ativa do toggle agora possui excelente visibilidade e leitura em ambas as variações de temas.
* **Componentes mais Limpos**: Telas e modais reduzem códigos repetitivos de alinhamento de texto e botão.




# Registro de Decisões Arquitetônicas (ADR)

Este diretório contém os registros de decisões arquitetônicas (ADR) do projeto `connect_service_mobile`.

---

## ADR 001: Evolução do `CustomSelectDropdown` para Múltipla Seleção (`checkBox`)

* **Status**: Aprovado
* **Data**: 2026-06-06
* **Autor**: Antigravity

### Contexto
Na tela de agendamentos (`appointments`), surgiu a necessidade de selecionar múltiplos serviços para o mesmo agendamento. O design exigia:
1. Um dropdown de entrada ("Adicionar um Serviço") que exibe a lista de opções com checkboxes.
2. A alteração de itens no dropdown mantendo-o aberto para facilitar múltiplas seleções consecutivas.
3. Exibição da contagem de itens selecionados no placeholder do dropdown de forma gramaticalmente correta (ex: "1 serviço selecionado", "3 serviços selecionados").
4. A exibição dos cards de serviços e o cálculo de tempo e valor total agregados fora do dropdown, no corpo da página de agendamentos.

### Alternativas Consideradas
1. **Criar um componente exclusivo (`ServiceMultiSelect`):** Um componente especializado e acoplado que realizasse a seleção dos serviços, calculasse internamente os totais e renderizasse os cards de serviço.
2. **Estender o `CustomSelectDropdown` existente (Genérico):** Transformar o dropdown existente em um componente configurável que aceita um tipo (`typeDropdown?: 'select' | 'checkBox'`), suporta retorno de arrays de seleção e delega a renderização externa dos itens e os cálculos matemáticos para as telas consumidoras.

### Decisão
Optou-se pela **Alternativa 2 (Estender o componente genérico)**. 

O componente `CustomSelectDropdown` foi atualizado para aceitar as seguintes propriedades:
* `typeDropdown?: 'select' | 'checkBox'`: Define o comportamento de seleção única ou múltipla.
* `multiLabelSingular?: string` e `multiLabelPlural?: string`: Define os sufixos singular e plural do placeholder na seleção múltipla.
* `selectedValue`: Aceita `CustomSelectOption` (seleção única) ou `CustomSelectOption[]` (múltipla).

No ViewModel (`customSelectDropdown.viewModel.ts`), ao detectar o tipo `'checkBox'`, o item clicado é alternado no array e retornado sem fechar a caixa de opções. A renderização de cards e o somatório dos totais foram mantidos na página de agendamento (`appointments.view.tsx`), obedecendo ao padrão MVVM.

### Consequências
* **Prós:**
  * **Alto Reuso:** Qualquer outra tela que necessitar de múltipla seleção com checkbox (ex: colaboradores, dias de recorrência) poderá utilizar o mesmo componente.
  * **Separation of Concerns:** Componente de UI focado apenas em entrada de dados. Regras de negócio e cálculo de totais mantidas na tela correspondente.
  * **Consistência Visual:** Mesma base estética (animações, caixas, bordas) em todos os seletores do aplicativo.
* **Contras:**
  * Pequeno acréscimo de complexidade nas definições de tipos do dropdown (atenuado com tipagem explícita e interfaces TypeScript).

---

## ADR 002: Correção de VirtualizedLists Aninhadas em ScrollViews Verticais

* **Status**: Aprovado
* **Data**: 2026-06-06
* **Autor**: Antigravity

### Contexto
Ao acessar a página de agendamentos (`appointments`), o aplicativo gerou avisos de erro do React Native informando que `VirtualizedLists` (como `FlatList` e `SectionList`) não devem ser aninhadas dentro de `ScrollView`s comuns com a mesma orientação. A árvore de componentes da tela de agendamentos utiliza um `ScrollView` vertical externo para permitir que todo o formulário de cadastro role na tela, e dentro desse formulário estão os dropdowns `CustomSelectDropdown` (lista de clientes e lista de serviços) e `TimeSelectDropdown` (listas de horas e minutos), que utilizavam `FlatList` internamente.

### Problema
O aviso `VirtualizedLists should never be nested inside plain ScrollViews with the same orientation...` indica um conflito de arquitetura de renderização no React Native:
1. O `FlatList` calcula seu viewport dinamicamente e virtualiza a renderização (descartando itens fora da tela) para economizar memória e desempenho.
2. O `ScrollView` externo tenta medir a altura total dos filhos para expandir e habilitar o scroll vertical geral.
3. Ao aninhar `FlatList` dentro de um `ScrollView` vertical, a `FlatList` é forçada a renderizar **todos os seus itens de uma vez só** para que o `ScrollView` meça sua altura, quebrando a virtualização por completo. Isso acarreta gargalos de performance, vazamentos de memória e possíveis crashes.

### Alternativas Consideradas
1. **Silenciar o aviso via `LogBox.ignoreLogs`:** Apenas oculta o aviso no console, mas não resolve o problema de performance e a quebra da virtualização do React Native, além de prejudicar o fluxo de depuração.
2. **Utilizar um Modal/Portal para o Dropdown:** Renderiza as listas das opções dentro de um portal ou modal overlays flutuantes em outro nível da árvore de componentes do aplicativo (fora do `ScrollView`). Soluciona o aninhamento, mas exige cálculos de posicionamento absoluto (`measure`) e complexidade excessiva para seletores simples.
3. **Substituir FlatLists por ScrollView + Map nos dropdowns:** Como os dropdowns e seletores de tempo têm listas de tamanho pequeno/médio (24 horas, 60 minutos, e poucas dezenas de clientes/serviços), a virtualização automática da `FlatList` não é necessária. Substituir `FlatList` por um `ScrollView` nativo com mapeamento de itens resolve o erro de aninhamento (pois o React Native não se opõe ao aninhamento de `ScrollView`s com a mesma orientação) e preserva a integridade da rolagem e os recursos visuais de snapping.

### Decisão
Optou-se pela **Alternativa 3 (Substituir FlatLists por ScrollView + Map nos dropdowns)**.

As modificações efetuadas foram:
* Em [TimeSelectDropdown.view.tsx](file:///Users/junioroliveira/Documents/Junior/ProjetosSoftware/connect_service_mobile/src/components/inputs/timeSelect/TimeSelectDropdown.view.tsx), as listas de horas e minutos foram alteradas de `FlatList` para `ScrollView`, com mapeamento do array e a propriedade `contentOffset` para manter o comportamento de offset inicial (`initialScrollIndex`).
* Em [CustomSelectDropdown.view.tsx](file:///Users/junioroliveira/Documents/Junior/ProjetosSoftware/connect_service_mobile/src/components/inputs/selectInput/CustomSelectDropdown.view.tsx), o container de opções foi modificado de `FlatList` para `ScrollView`, tratando a lista de resultados vazios de forma declarativa e mapeando os itens com `.map`.
* Em ambos os componentes, mantivemos as propriedades de snapping e o mesmo design visual e funcional, sem alterar a interface de uso.

### Consequências
* **Prós:**
  * **Resolução Definitiva:** O aviso do console foi totalmente eliminado e o aplicativo não quebra mais ao abrir múltiplos dropdowns dentro do formulário.
  * **Integridade do Depurador:** Sem necessidade de usar `LogBox.ignoreLogs`, mantendo o log do desenvolvedor limpo e focado em bugs reais.
  * **Comportamento Idêntico:** O comportamento de snapping das horas e minutos e a paginação das opções mantiveram-se inalterados na experiência do usuário.
* **Contras:**
  * Para listas muito extensas (milhares de itens), a ausência de virtualização do `ScrollView` pode ser um fator relevante, porém, para o contexto de dropdowns de formulário local do app, o volume de dados é perfeitamente suportado.

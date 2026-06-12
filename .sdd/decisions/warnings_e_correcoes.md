# Decisões de Correções de Warnings e Bugs

Este arquivo registra as decisões arquiteturais relacionadas à resolução de warnings de console, otimizações de performance e correção de bugs no aplicativo.

---

## ADR 001: Correção de VirtualizedLists Aninhadas em ScrollViews Verticais

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

---

## ADR 002: Posicionamento do Input de Observações (Nota) no Formulário de Agendamento

* **Status**: Arquivado (Não Resolvido - Contornado por Layout)
* **Data**: 2026-06-07
* **Autor**: Antigravity

### Contexto
Na tela de Novo Agendamento (`src/screens/appointments/appointments.view.tsx`), há um formulário composto majoritariamente por seletores/dropdowns personalizados e um único campo de entrada de texto livre multiline no rodapé da página para inserção de observações ("Nota"). 

Ao focar nesse input de texto multiline, o teclado virtual do dispositivo (tanto iOS quanto Android) cobria o campo, impossibilitando que o usuário visualizasse o que estava digitando. 

### Problema
O comportamento de auto-scroll para focar em inputs de texto dentro de `ScrollView` no React Native apresenta limitações severas quando o input possui as propriedades `multiline={true}` e `maxLength` ativas:
1. **Comportamento Nativo do ScrollView**: O React Native desativa ou limita a rolagem automática em inputs multiline porque presume que o próprio input gerenciará a rolagem interna de seu conteúdo textual.
2. **Componente Customizado (`CustomTextInput`)**: O uso da biblioteca `react-native-mask-input` como base de todos os inputs inseria um invólucro extra na hierarquia de views. Mesmo para inputs não mascarados (como o de notas), a biblioteca interceptava eventos de foco, digitação e cursor, impedindo que as coordenadas de layout corretas fossem propagadas ao gerenciador de rolagem nativo do `ScrollView`.
3. **Incompatibilidade de KeyboardAvoidingView**: Tentativas de contornar o problema utilizando KeyboardAvoidingView no nível da tela introduziram problemas de layout ou barra de navegação com scroll duplo, sem resolver o problema de visibilidade do input de notas.

### Decisão e Contorno (Layout)
Como a tela de agendamento possui apenas um único campo de entrada de texto livre ("Nota") e o restante são seletores estruturados de clique, decidiu-se reposicionar o campo "Nota" para a parte superior do formulário, logo abaixo do seletor de "Cliente" (em vez de mantê-lo no rodapé abaixo de todos os outros dropdowns). 

Esta abordagem contorna o problema de usabilidade:
* **Garantia de Visibilidade**: Ao ficar no topo da tela, o input de texto está sempre visível na metade superior e nunca é coberto quando o teclado surge.
* **Layout Simplificado**: Elimina a necessidade de layouts complexos de `KeyboardAvoidingView` ou rolagem forçada programática na tela de agendamentos.
* **Fluxo do Usuário**: Facilita o preenchimento de notas ou detalhes adicionais sobre o cliente logo após a seleção deste.

### Ações Futuras
O bug original do teclado com `multiline` + `maxLength` + `react-native-mask-input` no rodapé da página foi marcado como **Não Resolvido**. Caso surja a necessidade futura de colocar inputs de texto livre multiline extensos na parte inferior de formulários com rolagem, os seguintes caminhos deverão ser analisados:
1. Refatorar o `CustomTextInput` para utilizar apenas a tag nativa `<TextInput>` do React Native para qualquer entrada não mascarada (já implementado nesta sessão).
2. Investigar se o comportamento persiste em formulários estruturados com a biblioteca `react-native-keyboard-aware-scroll-view` ou similares.


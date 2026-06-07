# Decisões de Arquitetura e Componentes

Este arquivo registra as decisões arquiteturais relacionadas à estrutura do projeto e design de componentes reutilizáveis.

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

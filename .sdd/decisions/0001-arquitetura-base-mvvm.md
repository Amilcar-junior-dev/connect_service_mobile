# 0001 - Arquitetura Base, TypeScript e Estilização

## Status
- **Aprovada**

## Contexto
O aplicativo **Connect Service Mobile** precisa de uma estrutura de código consistente, escalável, legível e de fácil manutenção por múltiplos agentes de IA e desenvolvedores. Foi observado que a mistura de lógica de UI com regras de negócio e o uso desordenado de estilizações prejudicam a legibilidade e aumentam a ocorrência de regressões e re-renderizações desnecessárias.

## Decisão
Adotamos os seguintes padrões de desenvolvimento e arquitetura como regras obrigatórias:

1. **Arquitetura MVVM (Model-View-ViewModel) por Feature**:
   - As telas devem ser divididas em:
     - **View** (`.view.tsx`): Contém apenas renderização visual e elementos do NativeWind.
     - **ViewModel** (`use...ViewModel.ts`): Custom hook que expõe estados, funções e handlers para a View.
     - **Model**: Schemas de validação (`.scheme.ts`), integrações (`services`) e definições de dados (`types`).
   
2. **TypeScript Estrito e Seguro**:
   - Todo acesso por ponto (`.`) deve utilizar o operador de encadeamento opcional (`?.`) para prevenir erros de propriedade indefinida em tempo de execução (ex: `objeto?.propriedade`, `funcao?.()`).
   - Tipagem explícita em retornos e parâmetros de funções (preferindo objetos para múltiplos parâmetros).

3. **Estilização com NativeWind**:
   - Toda propriedade `className` deve obrigatoriamente utilizar a sintaxe de template string: `className={``}` (crases envoltas em chaves) para padronizar estilos e evitar o uso de strings normais `""` ou `''`.

## Consequências
- Os agentes e desenvolvedores devem recusar ou refatorar códigos que infrinjam essas regras.
- Novas telas criadas devem obrigatoriamente seguir a divisão em View e ViewModel na pasta correspondente.

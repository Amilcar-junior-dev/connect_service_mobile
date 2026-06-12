# Decisões de Arquitetura e Produto (ADRs)

Este diretório contém os registros de decisões arquitetônicas, de design e de produto (Architectural Decision Records - ADRs) tomadas para o projeto **Connect Service Mobile**.

Todos os agentes de IA devem consultar este diretório ao iniciar e devem registrar novas decisões importantes aqui, seguindo os padrões estabelecidos.

## Como registrar novas decisões

Cada nova decisão deve ser criada como um arquivo Markdown individual e nomeada sequencialmente, por exemplo:
- `0001-arquitetura-base-mvvm.md`
- `0002-padrao-estilizacao-nativewind.md`

### Estrutura de um Documento de Decisão:

```markdown
# [ID] - [Título da Decisão]

## Status
- [Proposta | Aprovada | Rejeitada | Superada por ADR-XXXX]

## Contexto
Qual o problema ou desafio que motivou esta decisão? Quais eram as alternativas avaliadas?

## Decisão
Qual foi a solução escolhida e por quê?

## Consequências
O que muda a partir de agora? Quais são as novas diretrizes técnicas ou de design que os agentes devem respeitar?
```

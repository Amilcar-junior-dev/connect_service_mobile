# Regras de Desenvolvimento e Comportamento (SDD)

Este arquivo de regras é carregado automaticamente pela IDE Antigravity para guiar o comportamento de todos os agentes de IA neste workspace.

---

## 1. Diretrizes de Comunicação e Idioma

- **Idioma Obrigatório**: O agente deve falar e responder **sempre** em **Português do Brasil (pt-br)**. Nunca inicie chats ou responda em inglês, a menos que solicitado explicitamente pelo usuário.

---

## 2. Regras de Estilo e Sintaxe React Native

- **Sintaxe de className**: Em componentes ou estilos React Native (usando NativeWind), nos atributos `className`, você deve **sempre** usar a sintaxe de template strings (chaves envolvendo crases, ex: `className={ \`flex-1 bg-background\` }`) em vez de strings normais (`""` ou `''`).
- **Operador de Encadeamento Opcional (`?.`)**: Toda notação que utilizar ponto (`.`) deverá utilizar o operador de encadeamento opcional (`?.`) em todas as ocasiões possíveis (ex: `usuario?.nome`, `itens?.[0]`, `onSelect?.()`). Isso ajuda a prevenir exceções de runtime de propriedades nulas ou indefinidas.
- **Parâmetros de Função**: Funções que recebem múltiplos parâmetros devem receber um único objeto com propriedades nomeadas, em vez de parâmetros posicionais.

---

## 3. Alinhamento Obrigatório de Contexto (SDD)

Antes de propor alterações ou criar códigos:
1. **Leitura Silenciosa de Contexto**: Leia os arquivos em `.sdd/` para alinhar seu estado com o projeto:
   - `.sdd/spec.md` (requisitos do projeto, rotas, fluxo de telas).
   - `.sdd/agents.md` (diretrizes detalhadas do agente).
   - `.sdd/task.md` (checklist de tarefas).
2. **Histórico de Decisões**: Consulte o diretório `.sdd/decisions/` antes de sugerir soluções arquitetônicas, para evitar conflitos com decisões técnicas anteriores.
3. **Persistência de Progresso (PROGRESS.md)**: Você é **obrigado** a ler o arquivo `PROGRESS.md` na raiz do projeto no início de qualquer interação técnica e atualizá-lo ao final da sua sessão, preenchendo o log de progresso, bugs contornados e handover.

---

## 4. Arquitetura MVVM e Estrutura de Pastas

- Siga a arquitetura **MVVM por feature**:
  - **View**: Apenas renderização visual (`.view.tsx`).
  - **ViewModel**: Lógica de negócio e estado no custom hook (`use...ViewModel.ts`).
  - **Model**: Schemas de validação (`.scheme.ts`) e services de API.
- Código compartilhado em: `src/components/`, `src/hooks/`, `src/services/`, `src/utils/`, `src/theme/`.
- Estrutura por feature em: `src/features/feature-name/`.

---

## 5. Prevenção de Regressões e Verificação de Regras de Negócio

Toda vez que você realizar uma refatoração ou implementar uma nova funcionalidade, você é **obrigado** a:
1. **Comparar Alterações com a Branch Principal (`main` / `develop`)**:
   - Compare o código desenvolvido com o que está na branch principal para certificar-se de que nenhum fluxo ou comportamento pré-existente foi removido ou alterado involuntariamente.
2. **Validar Contra Especificações**:
   - Verifique se o código proposto está 100% alinhado com as regras de negócio e requisitos especificados em `.sdd/spec.md` e nas ADRs em `.sdd/decisions/`.
3. **Executar a Suíte de Testes**:
   - Execute o comando `yarn test` para comprovar que nenhuma lógica existente quebrou e que todos os testes passam com sucesso.


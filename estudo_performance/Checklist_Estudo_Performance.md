# Checklist de Estudo de Performance - React Native

Use este checklist para acompanhar seu progresso no aprendizado técnico de otimização de desempenho em React Native.

---

## 📅 Roteiro de Estudos

### 📂 Módulo 1: Memoização e Otimização de Renders (Concluído)
- [x] **Regra de Ouro**: Posicionamento de Componentes (Declarar fora do escopo do pai)
- [x] **React.memo**: Evitar re-renders de componentes filhos puros
- [x] **useCallback**: Estabilização de referências de funções
- [x] **useMemo**: Estabilização de objetos/arrays e cache de cálculos pesados
- [x] **React Compiler**: A revolução do React 19 / RN 0.76+ que automatiza a memoização sem necessidade de hooks manuais
- [x] **useEffect e o Hook use**: Por que o useEffect é frequentemente abusado, como evitar re-renderizações em cascata e como o novo hook `use` do React 19 atua na leitura de Promises e Contextos

### 📂 Módulo 2: Controle de Concorrência e Agendamento (Em Andamento)
- [ ] **InteractionManager**: Entender o funcionamento legado de agendamento pós-transição
- [ ] **requestIdleCallback**: A API moderna substituta do `InteractionManager` para agendar tarefas não urgentes em momentos de ócio
- [ ] **useTransition**: Diferenciar atualizações de estado urgentes de atualizações de baixa prioridade (transições)
- [ ] **useDeferredValue**: Adiar a atualização de valores secundários para priorizar a renderização da digitação e gestos

### 📂 Módulo 3: O Modelo de Threads no React Native
- [ ] **JS Thread vs. UI/Main Thread vs. Native Modules Thread**: Diferenças de papéis e comunicação
- [ ] **A Thread JS e Interatividade**: Por que um JS travado não para animações nativas (Reanimated), mas congela botões e cliques

### 📂 Módulo 4: A Nova Arquitetura
- [ ] **O Fim da Bridge**: Como a ponte serializada e assíncrona foi eliminada
- [ ] **JSI (JavaScript Interface)**: Comunicação síncrona e direta entre JS e C++
- [ ] **Turbo Modules**: Carregamento sob demanda e execução rápida de código nativo
- [ ] **Fabric Renderer**: Novo motor de renderização concorrente e integrado ao C++

### 📂 Módulo 5: Otimização de Recursos e Componentes Complexos
- [ ] **Otimização de Listas**: FlatList vs FlashList (Shopify) e o conceito de reciclagem de Views nativas
- [ ] **Dimensionamento e Cache de Imagens**: Evitar estouro de memória (OOM) adequando resolução e usando cache agressivo (`expo-image`)
- [ ] **Yoga Engine e Complexidade de Layout**: Evitar aninhamento excessivo e o custo de ler layout via `onLayout`

### 📂 Módulo 6: Multithreading no React Native
- [ ] **Worklets**: Rodar código JS em threads de suporte de forma síncrona
- [ ] **Nitro Modules**: O estado da arte na criação de módulos nativos extremamente rápidos

### 📂 Módulo 7: Hermes Engine e Coleta de Lixo
- [ ] **Bytecode AOT**: Compilação adiantada que reduz o tempo de carregamento inicial (TBT)
- [ ] **Garbage Collector (GC)**: Como monitorar e evitar picos de limpeza de memória que causam micro-travamentos (*jank*)

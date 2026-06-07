# Decisões de Modais e Overlays

Este arquivo registra as decisões arquiteturais relacionadas à interface, interações, animações e comportamento das caixas de diálogo e modais (overlays) no aplicativo.

---

## ADR 003: Configuração de Animação e Duração de Abertura de Modais

* **Status**: Aprovado
* **Data**: 2026-06-07
* **Autor**: Antigravity

### Contexto
No React Native, modais controladas imperativamente (como a biblioteca `react-native-modalize`) utilizam por padrão animações baseadas em física de mola (`Animated.spring`). 

Embora esse comportamento padrão funcione de forma fluida para modais leves, ele apresenta falhas graves de desempenho quando a modal monta componentes que exigem renderização pesada logo no primeiro render, como o `<Calendar />` de `react-native-calendars` em [ModalSelectDateTime.view.tsx](file:///Users/junioroliveira/Documents/Junior/ProjetosSoftware/connect_service_mobile/src/components/modals/modalSelectDateTime/ModalSelectDateTime.view.tsx). A renderização síncrona desses componentes na thread de JavaScript consome poder de processamento exatamente no momento em que a física da mola está calculando os frames iniciais da animação de abertura, resultando em perda de frames (jank) e no surgimento repentino da modal na tela (sem transição).

### Alternativas Consideradas
1. **Utilizar `Animated.spring` com delay de montagem (`setTimeout`)**: Adiciona um atraso síncrono antes de abrir a modal para dar tempo de renderizar o calendário. Embora resolva parcialmente em computadores rápidos, pode falhar em dispositivos reais mais lentos ou introduzir atrasos perceptíveis desnecessários.
2. **Definir animação por tempo (`timing`) com durações adaptativas**: Utilizar a propriedade `openAnimationConfig` com a transição baseada em tempo (`timing`). A transição de `timing` é mais fácil de calcular e é executada diretamente na thread nativa do sistema operacional (iOS/Android), rodando de forma independente do processamento do JavaScript. As durações devem ser adaptativas conforme o "peso" visual e computacional da modal.

### Decisão
Optou-se pela **Alternativa 2 (Animação por timing com durações adaptativas)**.

Adotamos a consistência do uso de `openAnimationConfig` com as seguintes durações iniciais recomendadas:
1. **Duração Padrão de 200ms para Modais Leves**:
   Para modais com formulários simples que não travam a thread JS (ex: `ModalNewClient`, `ModalNewService`), a duração padrão da animação deve ser configurada para **200ms**, provendo uma resposta rápida e ágil para o usuário.
   ```tsx
   openAnimationConfig={{
     timing: { duration: 200 },
   }}
   ```
2. **Duração Aumentada de 400ms para Modais Pesadas**:
   Para modais que carreguem componentes complexos ou de renderização massiva inicial (ex: `ModalSelectDateTime`), a duração deve ser estendida para **400ms**. Este tempo estendido dá a margem necessária para que a thread nativa conclua a animação fluida de subida da folha (slide-up) enquanto a thread de JavaScript inicializa e monta o componente complexo.
   ```tsx
   openAnimationConfig={{
     timing: { duration: 400 },
   }}
   ```

### Consequências
* **Garantia de Fluidez**: Animações de subida permanecem suaves independentemente de engasgos na thread JS de renderização.
* **Consistência de UX**: Toda modal no aplicativo segue o mesmo estilo linear/suave de transição, apenas ajustando o tempo de resposta à sua carga interna.
* **Orientação para o Desenvolvedor**: A decisão serve como regra para a criação de futuras modais. Inicialmente, adota-se 200ms, elevando para 400ms caso o componente seja pesado ou exiba lag na transição.

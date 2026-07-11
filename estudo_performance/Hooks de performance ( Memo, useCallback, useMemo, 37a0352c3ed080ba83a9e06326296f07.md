# Hooks de performance ( Memo, useCallback, useMemo, useTransition e useDeferedValue )

Status: Não iniciada
Anotação: Plano estratégico para Upgrade Profissional (https://app.notion.com/p/Plano-estrat-gico-para-Upgrade-Profissional-3160352c3ed080febfc2f23ae9ee0b28?pvs=21)
Subitem: Memo (https://app.notion.com/p/Memo-37b0352c3ed080758127ebb8ff6fdbbd?pvs=21), UseCallback (https://app.notion.com/p/UseCallback-37b0352c3ed08060bbd7e4ef630ca2d2?pvs=21), useMemo (https://app.notion.com/p/useMemo-37b0352c3ed080589b88fddc05ab2d00?pvs=21), useTransition (https://app.notion.com/p/useTransition-37b0352c3ed08089b565f6089ea7b25d?pvs=21), useDeferredValue (https://app.notion.com/p/useDeferredValue-37b0352c3ed0807984bbc48dee0d160e?pvs=21)
item principal: React Native Performance (https://app.notion.com/p/React-Native-Performance-37a0352c3ed080b6a859c59362b16565?pvs=21)

---

---

- Links úteis:
    
    https://app.eraser.io/dashboard/all
    

<aside>

# Resumo:

- `React.memo:` Utilizado para envolver componentes filhos e comparar se as propriedades passadas para ele mudaram, se não mudar não renderiza novamente.
- `useCallback:` Utilizado para guardar a referência de funções e evitar re-renderizar se s propriedades não mudarem;
- `useMemo:` Utilizado para executar a função e salva o **resultado do retorno** dela, evitando recalcular funções pesadas.
</aside>

# 📋 Checklist Definitivo de Memoização no React Native

Use este checklist como guia de consulta rápida durante o desenvolvimento de novos componentes ou refatorações de telas para decidir com precisão científica quando usar `React.memo`, `useMemo` ou `useCallback`.

---

## 1. 🛑 Regra de Ouro nº 1: O Posicionamento do Componente

Antes de qualquer otimização com hooks, verifique a declaração dos componentes:

- [ ]  **[ ]** **O componente filho está declarado FORA do escopo do pai?**
    - *Se sim*: Prossiga com o checklist.
    - *Se não (declarado dentro do render do pai)*: **Mova a função do componente para fora imediatamente** (ou crie um novo arquivo).

### Por que o `React.memo` NÃO funciona em componentes internos?

Quando você declara `const Filho = memo(...)` dentro de `Parent`:

1. A cada renderização do pai, o endereço de memória de `Filho` é recriado.
2. Para a árvore do React (reconciliation engine), a mudança de endereço de um tipo de componente sinaliza que a estrutura inteira mudou.
3. O React é obrigado a **desmontar (unmount)** o componente antigo da tela e **montar (mount)** o novo do zero.
4. O `React.memo` torna-se completamente inútil e você ganha um custo enorme de renderização nativa (recriação de views no Yoga).

---

## 2. 🛡️ Checklist: `React.memo` (Para Componentes Filhos)

Responda às seguintes perguntas sobre o componente filho:

- [ ]  **Ele é um "Componente Puro"?** (Dado as mesmas props, ele sempre renderiza o mesmo visual?)
- [ ]  **O componente pai dele re-renderiza com frequência?** (Devido a inputs, temporizadores, ou estados globais mudando?)
- [ ]  **Ele realiza renderização visual pesada ou complexa?** (Gráficos, listas longas, tabelas, imagens pesadas?)
- [ ]  **As props recebidas por ele mudam raramente?**

> **Decisão**: Se você marcou **SIM** para a maioria destas perguntas, envolva o componente com `React.memo()`.
> 
> 
> *Exceção*: Se o componente filho for extremamente simples (ex: apenas renderiza um `<Text>`), não use `memo`. O custo de comparar as props é maior que o tempo de renderizar o texto de novo.
> 

---

## 3. 💾 Checklist: `useCallback` (Para Referências de Funções)

Responda às seguintes perguntas sobre a função que você declarou no componente pai:

- [ ]  **Esta função é repassada como propriedade (`prop`) para um componente filho?**
- [ ]  **O componente filho que recebe a função está protegido com `React.memo`?**
- [ ]  **OU a função é usada como dependência no array de um `useEffect` ou outro hook?**

> **Decisão**: Se você marcou **SIM** para a primeira e segunda pergunta (ou para a terceira), envolva a função em `useCallback()`.
> 
> 
> *Exceção*: Se a função é repassada para elementos nativos básicos (ex: `<TouchableOpacity onPress={...} />`), **não use `useCallback`**. O elemento nativo vai re-renderizar de qualquer forma.
> 

---

## 4. 🗄️ Checklist: `useMemo` (Para Valores, Objetos e Cálculos)

Responda às seguintes perguntas sobre o cálculo, objeto ou array gerado no render:

- [ ]  **O cálculo é computacionalmente pesado e demora mais de 1ms?** (Filtros complexos, ordenação de grandes arrays, parsing de grandes strings?)
- [ ]  **OU o objeto/array dinâmico é passado como prop para um filho protegido com `React.memo`?**
- [ ]  **OU o objeto/array é dependência de outro hook (ex: `useEffect`)?**

> **Decisão**: Se você marcou **SIM** para qualquer uma das opções, envolva a geração do valor em `useMemo()`.
> 
> 
> *Exceção*: Se a operação for um cálculo simples (ex: `a + b`), **não use `useMemo`**. Se o objeto for estático e nunca mudar, declare-o **fora do componente** em vez de usar `useMemo`.
> 

---

## 🧠 Fluxo de Decisão Rápido (Se pergunte ao codar):

```
Declarou uma função ou objeto/array?
   │
   ├─► É passado para um componente filho?
   │      │
   │      ├─► O filho usa "React.memo"?
   │      │      │
   │      │      ├─► SIM: Use useCallback (para funções) ou useMemo (para objetos/arrays).
   │      │      └─► NÃO: NÃO use nada. Deixe o JS recriar.
   │      │
   │      └─► O objeto é estático (mock)? ──► Mova para fora do componente.
   │
   └─► É dependência de um useEffect/useMemo? ──► Use useCallback/useMemo.
```
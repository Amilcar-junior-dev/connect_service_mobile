# UseCallback

Status: Não iniciada
Anotação: Plano estratégico para Upgrade Profissional (https://app.notion.com/p/Plano-estrat-gico-para-Upgrade-Profissional-3160352c3ed080febfc2f23ae9ee0b28?pvs=21)
item principal: Hooks de performance ( Memo, useCallback, useMemo, useTransition e useDeferedValue ) (https://app.notion.com/p/Hooks-de-performance-Memo-useCallback-useMemo-useTransition-e-useDeferedValue-37a0352c3ed080ba83a9e06326296f07?pvs=21)

---

---

# 🧠 Guia Completo do `useCallback`

O hook `useCallback` é uma das ferramentas de memoização mais fundamentais do React. Este guia detalha seu funcionamento, cenários de uso, contraindicações e resolve as principais dúvidas sobre referências de memória no JavaScript.

---

## 1. O que é e Como Funciona?

O `useCallback` serve para **estabilizar a referência de memória de uma função** entre as renderizações de um componente.

### A Analogia da "Garrafa Térmica"

- **Sem `useCallback`**: Toda vez que o componente pai atualiza, ele descarta a função antiga e cria uma nova do zero na memória (como passar um café novo toda vez).
- **Com `useCallback`**: O React guarda a função em uma "garrafa térmica". Nas próximas renderizações, ele serve a mesma função física da memória (mesmo endereço de memória), a menos que as dependências declaradas no array mudem.

```jsx
const handlePress = useCallback(() => {
  console.log("Clicou!");
}, [dependencia1, dependencia2]); // Só recria a referência se estas dependências mudarem
```

---

## 2. Por que ele é necessário?

No JavaScript, funções são objetos (valores por referência). Dois objetos ou funções declarados de forma idêntica não são iguais na memória:

```jsx
const func1 = () => console.log("Olá");
const func2 = () => console.log("Olá");

console.log(func1 === func2); // Retorna FALSE! Ocupam endereços de memória diferentes.
```

Se você passar uma função declarada diretamente no pai para um componente filho protegido com `React.memo`, a comparação rasa do `React.memo` falhará a cada renderização do pai, porque a função sempre ganha um endereço de memória novo. O `useCallback` garante a mesma referência física.

---

## 3. Quando Usar? (Os Casos Reais)

O `useCallback` é útil em três cenários específicos:

### Cenário A: Prop de Componente Filho Protegido com `React.memo`

Impede que o filho re-renderize à toa porque a função mudou de endereço na memória.

```tsx
const renderItem = useCallback(({ item }) => {
  return <ListItem item={item} />;
}, []); // A referência do renderItem nunca muda
```

### Cenário B: Função como Dependência de Outro Hook (ex: `useEffect`)

Evita disparos em loop infinito de efeitos.

```tsx
const buscarDados = useCallback(() => {
  api.get(`/usuario/${id}`);
}, [id]); // Só muda de referência se o 'id' mudar

useEffect(() => {
  buscarDados();
}, [buscarDados]); // Sem useCallback, isso causaria um loop infinito
```

### Cenário C: Criação de Custom Hooks (Hooks Personalizados) e Context Providers

Garante estabilidade para o desenvolvedor que consumir o seu hook ou contexto.

```tsx
// Custom Hook
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle] as const;
};
```

---

## 4. Quando NÃO Usar? (Os Erros Mais Comuns)

**Não saia colocando `useCallback` em todas as funções do seu componente.** Ele tem custos de processamento. Evite em:

1. **Componentes Nativos Comuns**:
O `TouchableOpacity` nativo não usa `React.memo` internamente. Ele vai re-renderizar de qualquer forma. O `useCallback` aqui é inútil.
    
    ```tsx
    // ❌ DESPERDÍCIO DE PERFORMANCE:
    const handlePress = useCallback(() => console.log('ok'), []);
    return <TouchableOpacity onPress={handlePress} />;
    ```
    
2. **Funções Internas**: Que são executadas apenas dentro do próprio componente e não são passadas para filhos nas props.
3. **Dependências Instáveis**: Se a função depende de dados que mudam a cada renderização (ex: o texto que o usuário digita em tempo real), ela será recriada em todo render de qualquer forma.

---

## 5. FAQ: Perguntas e Respostas Fundamentais

### ❓ P: Se o `useCallback` manteve a referência da função (retornando `false` na mudança), por que não usar em tudo?

**R:** Criar uma função em JavaScript moderno (`const f = () => {}`) é uma operação extremamente rápida e barata. O custo de rodar o `useCallback` (alocar espaço para o hook, salvar o array de dependências e fazer a checagem de igualdade das dependências a cada render) é **maior** do que o custo de simplesmente recriar a função do zero.

### ❓ P: Qual é o verdadeiro objetivo do `useCallback` então?

**R:** O objetivo dele não é economizar a criação da função no pai, mas sim **estabilizar a referência** para que **outro componente** (o filho memoizado) ou **outro hook** (o `useEffect`) não execute tarefas pesadas desnecessariamente.

---

## 6. Como testar na prática se o `useCallback` funciona?

### Método A: Teste da Igualdade de Referência (`useRef`)

Você pode verificar se a referência física da função mudou usando um `useRef` para guardar o endereço anterior:

```tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

export const TesteCallback = () => {
  const [contador, setContador] = useState(0);

  const funcaoMemorizada = useCallback(() => {
    console.log("Executou");
  }, []); // Sem dependências = referência fixa

  const funcaoAnteriorRef = useRef(funcaoMemorizada);

  useEffect(() => {
    const mudouReferencia = funcaoAnteriorRef.current !== funcaoMemorizada;
    console.log(`[useCallback] A referência mudou? ${mudouReferencia}`);
    funcaoAnteriorRef.current = funcaoMemorizada;
  });

  return (
    <View>
      <Text>Cliques: {contador}</Text>
      <Button title="Clicar" onPress={() => setContador(c => c + 1)} />
    </View>
  );
};
```

- **Com `useCallback`**: O log imprimirá `false` ao clicar no botão.
- **Sem `useCallback`**: O log imprimirá `true` a cada clique, provando que a função ganhou um novo endereço de memória.
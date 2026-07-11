# Controle de Concorrência e Agendamento

Este guia aborda como gerenciar a prioridade de execução de tarefas no React Native para evitar perda de frames (FPS drops/janks) durante transições de tela, animações e interações táteis.

---

## 1. O Problema da Linha do Tempo Única (Single Thread)

Como o JavaScript possui apenas uma thread de execução principal (JS Thread), se você executar uma tarefa pesada (como processar um JSON grande, salvar dados no MMKV ou renderizar uma árvore complexa de componentes) ao mesmo tempo em que o usuário clica para abrir uma tela ou enquanto uma animação está rodando:
* A thread do JS ficará ocupada processando a lógica.
* O envio dos comandos de layout para a thread nativa (UI Thread) atrasará.
* O resultado é uma engasgada perceptível na interface (queda de 60fps/120fps).

Para resolver isso, dividimos as tarefas em **Urgentes** (animações de transição, digitação de texto, cliques em botões) e **Não Urgentes** (sincronizar banco de dados local, buscar dados adicionais, renderizar listas filtradas pesadas).

---

## 2. A API Legada: `InteractionManager`

Historicamente, o `InteractionManager` era a solução padrão do React Native para agendar códigos pesados para depois das animações e transições.

```tsx
import React from 'react';
import { InteractionManager } from 'react-native';

const MyComponent = () => {
  const handleNavigate = () => {
    // 1. Inicia transição de tela ou animação
    navigation?.navigate?.('Details');

    // 2. Agenda o processamento pesado para rodar apenas quando as animações acabarem
    InteractionManager?.runAfterInteractions(() => {
      console?.log("Executando tarefa pesada pós-animação...");
      executarCargaDeDadosPesada?.();
    });
  };
};
```

### Por que foi descontinuado no React Native 0.86?
Com a chegada da **Nova Arquitetura (Fabric)** e o suporte nativo às **Concurrent Features (React 18/19)**, o agendamento de tarefas passou a seguir padrões web mais eficientes e portáveis. 

O `InteractionManager` dependia de um mecanismo de contagem manual de interações ativas que muitas vezes falhava em detectar animações complexas ou causava atrasos exagerados (*starvation*). Ele foi formalmente depreciado em prol de **`requestIdleCallback`** e dos hooks concorrentes do React.

---

## 3. A API Moderna: `requestIdleCallback`

O `requestIdleCallback` é uma API padrão do ecossistema Web (agora disponível no React Native) que permite enfileirar uma função para ser executada quando a thread principal estiver ociosa (*idle*), garantindo que ela não interfira na renderização de frames prioritários.

### Como funciona
A callback registrada recebe um objeto de controle chamado `deadline` que fornece duas propriedades principais:
* `deadline?.timeRemaining()`: Retorna quantos milissegundos restam no bloco de ociosidade atual (máximo de 50ms). Se o tempo acabar, você deve pausar e reagendar o restante da tarefa.
* `deadline?.didTimeout`: Indica se a tarefa está rodando porque estourou o limite de tempo configurado.

### Exemplo Prático: Processando dados pesados em lotes (chunks)

```tsx
import React from 'react';

export const processarDadosEmLotes = (dadosGrandes) => {
  let index = 0;

  const processarLote = (deadline) => {
    // Roda enquanto houver itens para processar E restar tempo livre no frame atual (timeRemaining > 0)
    while (
      index < dadosGrandes?.length && 
      (deadline?.timeRemaining() > 0 || deadline?.didTimeout)
    ) {
      const item = dadosGrandes?.[index];
      processarItemIndividual?.(item);
      index++;
    }

    // Se ainda restam itens, agenda o próximo bloco livre para continuar
    if (index < dadosGrandes?.length) {
      global?.requestIdleCallback?.(processarLote);
    } else {
      console?.log("Processamento concluído com sucesso!");
    }
  };

  // Agenda o início da tarefa com um timeout de segurança de 1 segundo
  global?.requestIdleCallback?.(processarLote, { timeout: 1000 });
};
```

---

## 4. O Hook `useTransition`

Disponível no React 18 e 19, o `useTransition` é um hook que divide as atualizações de estado em duas categorias:
1. **Atualizações Urgentes**: Ações imediatas, como digitar em um campo de texto ou clicar em um botão de aba.
2. **Atualizações de Transição**: Ações secundárias que podem atrasar alguns milissegundos sem prejudicar a experiência do usuário (ex: filtrar um array grande).

### Exemplo Prático: Input de busca com filtro pesado

Sem transição, digitar em um campo que filtra uma lista enorme causa engasgos, pois a digitação (urgente) concorre com o filtro de dados (pesado).

```tsx
import React, { useState, useTransition, useMemo } from 'react';
import { TextInput, FlatList, Text, View, ActivityIndicator } from 'react-native';

export const BuscaEstudantes = ({ listaEstudantes }) => {
  const [busca, setBusca] = useState("");
  const [buscaFiltrada, setBuscaFiltrada] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (texto) => {
    // 1. Atualização Urgente: Atualiza o texto digitado na tela imediatamente
    setBusca?.(texto);

    // 2. Atualização Não Urgente (Transição): Adia o processamento pesado do filtro
    startTransition?.(() => {
      setBuscaFiltrada?.(texto);
    });
  };

  const estudantesFiltrados = useMemo(() => {
    if (!buscaFiltrada) return listaEstudantes;
    return listaEstudantes?.filter?.((estudante) => 
      estudante?.nome?.toLowerCase()?.includes?.(buscaFiltrada?.toLowerCase())
    );
  }, [buscaFiltrada, listaEstudantes]);

  return (
    <View className={ `flex-1 p-4` }>
      <TextInput
        value={ busca }
        onChangeText={ handleSearchChange }
        placeholder="Pesquisar estudante..."
        className={ `border p-3 rounded bg-white` }
      />

      { isPending && <ActivityIndicator size="small" color="#000" /> }

      <FlatList
        data={ estudantesFiltrados }
        keyExtractor={ (item) => item?.id }
        renderItem={ ({ item }) => <Text>{ item?.nome }</Text> }
      />
    </View>
  );
};
```

* **Benefício**: Ao digitar rápido, o `TextInput` responde instantaneamente. O React prioriza renderizar a sua digitação e, nos intervalos livres, atualiza a lista filtrada em segundo plano.

---

## 5. O Hook `useDeferredValue`

Diferente do `useTransition` que envolve a função que altera o estado, o `useDeferredValue` recebe um **valor** e retorna uma versão "atrasada" desse valor. Ele age de forma semelhante a um *debounce*, mas sem tempo fixo; o atraso é determinado dinamicamente de acordo com o carregamento da CPU.

### Exemplo Prático: Adiar a atualização de um componente filho pesado

```tsx
import React, { useState, useDeferredValue, useMemo } from 'react';
import { TextInput, View } from 'react-native';

export const TelaPesquisa = () => {
  const [texto, setTexto] = useState("");
  
  // Cria uma versão adiada do texto digitado
  const textoAdiado = useDeferredValue(texto);

  // O componente pesado só será re-renderizado quando a CPU estiver ociosa
  const listaMemorizada = useMemo(() => {
    return <ComponenteListaPesada busca={ textoAdiado } />;
  }, [textoAdiado]);

  return (
    <View className={ `flex-1 p-4` }>
      <TextInput
        value={ texto }
        onChangeText={ setTexto }
        placeholder="Pesquisar..."
        className={ `border p-3 rounded` }
      />
      { listaMemorizada }
    </View>
  );
};
```

---

## 6. Tabela Comparativa de Agendamento

| Ferramenta | Quando Usar | Como Funciona | Status |
| :--- | :--- | :--- | :--- |
| **`InteractionManager`** | Código pesado pós-navegação / animação nativa. | Aguarda a conclusão de interações/animações pendentes na UI Thread. | **Depreciado (0.86)** |
| **`requestIdleCallback`** | Lotes de dados, logs, processamento em background. | Roda na JS Thread durante tempos mortos de frames (ociosidade). | **Recomendado** |
| **`useTransition`** | Filtragem de listas e atualizações visuais custosas ligadas a funções. | Cria estados de prioridade baixa, permitindo interrupção para renderização urgente. | **Recomendado** |
| **`useDeferredValue`** | Adiar a re-renderização de componentes filhos pesados com base em propriedades. | Adia o repasse de valores novos para componentes filhos até que a CPU esteja livre. | **Recomendado** |

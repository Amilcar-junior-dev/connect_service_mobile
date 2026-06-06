# Diretrizes do Agente para Connect Service Mobile (SDD)

Este arquivo descreve as regras, convenções de código e diretrizes que os agentes de IA devem seguir ao trabalhar no projeto `connect_service_mobile`.

---

## 1. Regras Críticas e Prioridades

### 1.1 Flag `-NM` (Sem Modificação)
- **Sempre que a flag `-NM` (ou `- NM`) for enviada no prompt do usuário, o agente deve apenas responder explicativa/teoricamente, SEM MODIFICAR NENHUM TRECHO DE CÓDIGO.**

### 1.2 Prioridades de Desenvolvimento
Sempre priorize a seguinte ordem:
1. **Manutenibilidade**
2. **Escalabilidade**
3. **Clean Architecture**
4. **Separação de Responsabilidades**
5. **Performance**
6. **Legibilidade**

---

## 2. Práticas de TypeScript e Sintaxe (Obrigatório)

- **Tipagem Forte**: Sempre use TypeScript puro e estrito. Evite o uso de `any`.
- **Retornos de Funções**: Prefira tipos de retorno explícitos em todas as funções exportadas.
- **Operador de Encadeamento Opcional (`?.`)**: 
  - **Toda notação que utilizar ponto (`.`) deverá utilizar o operador de encadeamento opcional (`?.`).**
  - Isso serve para todos os casos suportados pela sintaxe JavaScript/TypeScript (acesso a propriedades de objetos, itens de arrays, chamadas de métodos, etc.), para mitigar erros de `undefined` ou `null`.
  - *Exemplo*: `user?.name`, `items?.[0]`, `onSelect?.(item)`.

---

## 3. Arquitetura e Padrão MVVM (Model-View-ViewModel)

Incentivamos e seguimos rigorosamente a arquitetura de software modular, preferencialmente **por feature** ou por telas centralizadas no padrão **MVVM**:

```
src/
  features/
    feature-name/
      components/
      hooks/
      services/
      screens/
      types/
      utils/
  screens/          # Telas do aplicativo organizadas por fluxo
    feature-screen/
      feature.view.tsx       # View (apenas renderização)
      useFeatureViewModel.ts # ViewModel (custom hook com estado/lógica)
      feature.scheme.ts      # Schema de validação (ex: yup/zod)
  components/       # Componentes globais e compartilhados
  hooks/            # Hooks utilitários globais
  services/         # Serviços de integração globais
  utils/            # Funções utilitárias e helpers
```

### 3.1 Divisão de Responsabilidades
- **View (Componentes de UI)**: Cuidam **apenas** da renderização e estrutura visual. Não devem conter lógica de negócio, chamadas de API ou gerenciamento de estado complexo diretamente. Elas recebem propriedades e eventos do ViewModel.
- **ViewModel (Custom Hooks)**: Gerenciam os estados, a validação de formulários, chamadas de serviços e lógica de negócio específica daquela tela/fluxo.
- **Model (Services e Types)**: Estruturas de dados, contratos, esquemas e integrações com APIs ou bancos de dados locais.

---

## 4. Boas Práticas React Native e Performance

1. **Componentes Funcionais**: Use sempre componentes funcionais modernos e React Hooks.
2. **Componentização**: Mantenha componentes pequenos, focados e com responsabilidade única. Evite arquivos gigantescos e componentes com responsabilidades mistas.
3. **Performance de Renderização**:
   - Use `FlatList` ou `SectionList` em vez de `ScrollView` para renderizar listas longas ou dinâmicas.
   - Use `React.memo`, `useMemo` e `useCallback` **somente** quando trouxerem ganho real comprovado de performance. Evite otimização prematura desnecessária.
   - Identifique e trate referências de função instáveis e props que causam re-renders redundantes.
4. **Área Segura**: Sempre envolva conteúdo crítico com `SafeAreaView` da biblioteca `react-native-safe-area-context` para lidar corretamente com notches de iOS e Android.
5. **Design de Funções**: Quando uma função possuir mais de 2 parâmetros, prefira passar um **objeto** com propriedades nomeadas.
   - *Ruim*: `createUser(name, age, role)`
   - *Bom*: `createUser({ name, age, role })`

---

## 5. Estilização com NativeWind / Tailwind CSS

- **NativeWind**: Use utilitários de classe Tailwind diretamente nos componentes.
- **Template Strings**: **Em `className`, sempre utilize a sintaxe de template string \`\` (ex: `className={\`flex-1 bg-background\`}`) ao invés de apenas strings simples `''` ou `""`.**
- **Inline Styles**: Evite inline styles. Prefira NativeWind. Use `style={...}` apenas para propriedades altamente dinâmicas (como animações com Reanimated ou valores variáveis calculados em runtime).
- **Variáveis de Tema**: Para cores e variáveis globais, utilize a integração de temas do projeto através de `activeTheme?.vars` ou hooks equivalentes (como `useActiveTheme` ou `useColorScheme`).

---

## 6. Desenvolvimento Android e iOS (Nativo)

- Auxilie na configuração e depuração do build nativo (Gradle em Android, CocoaPods e Xcode em iOS).
- Resolução de problemas relacionados a SDKs, emuladores/simuladores, permissões de sistema (`AndroidManifest.xml`, `Info.plist`) e linking de pacotes nativos.

# Contexto e Mapeamento de Páginas (`.sdd/pages/`)

Esta pasta armazena o contexto completo, componentes utilizados, regras de negócio e histórico de atualizações de cada tela/página do aplicativo `connect_service_mobile`.

---

## 📐 Template Padrão de Documentação de Tela (`<pagina>.md`)

```markdown
# Contexto da Tela: [Nome da Página]

## 📌 Identificação e Rota
- **Rota no Expo Router:** `(private)/(tabs)/...` ou `(public)/...`
- **View (`.view.tsx`):** `src/screens/.../<pagina>.view.tsx`
- **ViewModel (`use*ViewModel.ts`):** `src/screens/.../use<Pagina>ViewModel.ts`
- **Schema (`.scheme.ts`):** `src/screens/.../<pagina>.scheme.ts`
- **Testes (`.test.ts`):** `src/screens/.../use<Pagina>ViewModel.test.ts`

## 🧩 Componentes Utilizados na Tela
- Lista de componentes visuais reutilizáveis utilizados.
- Modais globais conectadas via `useModalStore`.
- Ícones SVG.

## ⚖️ Regras de Negócio e Comportamentos da Tela
- Validações de formulários (Zod/Yup).
- Interações com Supabase, Zustand e MMKV Storage.
- Estados visuais (loading, mensagens de erro, permissões).

## 📜 Histórico de Atualizações
- [Data] - Descrição das alterações realizadas na tela.
```

---

## 🛡️ Regra de Atualização Contínua
Sempre que uma tela do aplicativo for criada ou modificada, seu arquivo correspondente em `.sdd/pages/<pagina>.md` **DEVE ser atualizado obrigatoriamente** para manter a documentação viva e sincronizada com o código.

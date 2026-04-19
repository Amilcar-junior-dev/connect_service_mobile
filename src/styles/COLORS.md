# Paleta e tokens de cor

Este documento descreve os **tokens de cor** definidos em `colors.ts`, expostos ao NativeWind via `tailwind.config.js`, e o **porquê** dos nomes.

## Por que esses nomes (e não `textPrimary`, `background`, etc.)?

Antes, nomes como `textPrimary` ou `background` sugeriam **um único uso** (só texto, só fundo). Na prática a mesma cor aparecia em ícones, bordas, estados selecionados e overlays — o nome mentia sobre a intenção.

Aqui adotamos **tokens semânticos genéricos**:

- Descrevem **papel visual** (contraste, hierarquia, estado), não o componente onde a cor cai.
- Permitem reutilizar a mesma cor em texto, ícone, borda ou fundo **sem parecer erro de naming**.
- Alinham com ideias comuns de design system: *surface*, *ink*, *accent*, *muted*, *danger*.

Ou seja: o nome responde a “**que tipo de cor é essa no layout?**”, não a “**em qual prop eu coloquei?**”.

## Tokens (valores em `Theme.light.colors` / `Theme.dark.colors`)

| Token | Uso típico | Por que esse nome |
|--------|------------|-------------------|
| `surface` | Fundo principal claro, texto/ícone claro sobre fundo escuro | *Surface* é superfície base da interface; não é “só background de tela”. |
| `ink` | Conteúdo de alto contraste: texto principal, ícones, preenchimentos escuros | *Ink* evoca pigmento forte sobre papel — independe de ser `<Text>` ou `<View>`. |
| `muted` | Conteúdo secundário, placeholders visuais, avatares discretos | *Muted* = atenuado na hierarquia, padrão em UI kits. |
| `stone` | Estados desabilitados, neutros intermediários | *Stone* sugere cinza material, neutro sem carregar “erro” ou “link”. |
| `tabBar` | Fundo da barra de abas / dock escuro | Nome **específico** onde o token tem contexto fixo (só aquela peça). |
| `accent` | Ações, links, destaques, estados “ativo” em azul claro | *Accent* = cor de ênfase da marca, sem dizer “botão” ou “primaryBlue”. |
| `accentDeep` | Variação mais escura do azul (contraste, hierarquia com `accent`) | *Deep* indica o mesmo “eixo” cromático, tom mais fechado. |
| `tintBlue` / `tintGreen` | Fundos suaves, chips, lembretes visuais leves | *Tint* deixa claro que é **lavado**, não cor saturada de ação. |
| `forest` | Verde escuro para ícones ou detalhes (ex. contexto financeiro) | Nome evoca o tom verde profundo sem amarrar a “texto” ou “card”. |
| `danger` | Erros, bordas/labels de validação | Padrão da indústria; mais claro que `warningRed`. |
| `warning` | Alertas não fatais (amarelo/laranja) | Semântica de estado, não de componente. |
| `deepSurface` | Superfície escura (cards escuros, modais, áreas de contraste) | *Deep* + *surface* = camada escura da UI, sem dizer “cardBackground” só para cards. |
| `divider` | Bordas hairline, separadores, fundos extremamente sutis | *Divider* descreve função (separar), evitando `border` como nome de token (confunde com utilitário CSS). |

## Onde cada coisa vive

- **CSS variables (RGB separado):** `Theme.light.vars` / `Theme.dark.vars` — alimentam classes Tailwind/NativeWind (`bg-ink`, `text-surface`, …).
- **Valores prontos para APIs nativas:** `Theme.*.colors` — strings `rgb()` / `rgba()` para `color=` de SVG, `react-native-calendars`, `LinearGradient`, etc.
- **Tailwind:** `tailwind.config.js` mapeia cada chave para `rgb(var(--color-…) / <alpha-value>)`, permitindo opacidade (`bg-ink/10`).

## Alterar uma cor

1. Ajuste o valor em **ambos** os blocos `light` e `dark` em `colors.ts` (hoje os valores são iguais; quando evoluir o tema escuro, mude só o necessário).
2. Mantenha **o mesmo token** se o *papel* visual não mudou; crie um token novo só se for uma nova função na UI.

## Referência rápida (variável CSS ↔ token JS ↔ classe)

| Variável | Chave em `colors` | Exemplo de classe |
|----------|-------------------|-------------------|
| `--color-surface` | `surface` | `bg-surface`, `text-surface` |
| `--color-ink` | `ink` | `text-ink`, `bg-ink`, `border-ink` |
| `--color-muted` | `muted` | `bg-muted`, `text-muted` |
| `--color-stone` | `stone` | `text-stone`, `border-stone` |
| `--color-tab-bar` | `tabBar` | `bg-tabBar` |
| `--color-accent` | `accent` | `bg-accent`, `text-accent`, `border-accent` |
| `--color-accent-deep` | `accentDeep` | `text-accentDeep` |
| `--color-tint-blue` | `tintBlue` | `bg-tintBlue` |
| `--color-tint-green` | `tintGreen` | `bg-tintGreen` |
| `--color-forest` | `forest` | (uso via `theme.colors.forest` em ícones) |
| `--color-danger` | `danger` | `text-danger`, `border-danger` |
| `--color-warning` | `warning` | `text-warning` |
| `--color-deep-surface` | `deepSurface` | `bg-deepSurface` |
| `--color-divider` | `divider` | `border-divider`, `bg-divider` |

# Contexto da Tela: Home / Dashboard (`HomeView`)

## 📌 Identificação e Rota
- **Rota no Expo Router:** `(private)/(tabs)/home` (Entrada da área privada autenticada)
- **View (`.view.tsx`):** `src/screens/home/home.view.tsx`

---

## 🧩 Componentes Utilizados na Tela

### Componentes de UI e Animações:
- **`LinearGradient`** (`expo-linear-gradient`): Gradiente de fundo suave utilizando as cores do tema ativo (`accent` para `surface`).
- **`TopSheet`** (`~/components/topSheet/topSheet.view`): Painel superior expansível e retrátil animado com Reanimated, exibindo informações da conta/estabelecimento do usuário.
- **`ExpandableCalendarScreen`** (`~/components/calendar/ExpandableCalendar.view`): Calendário expansível e interativo para navegação entre dias e semanas.
- **`FloatingMenu`** (`~/components/floatingMenu/FloatingMenu.view`): Menu de ações rápidas flutuante na parte inferior da tela.

---

## ⚖️ Regras de Negócio e Comportamentos da Tela

1. **Navegação Protegida (Área Privada):**
   - Acessível apenas se houver sessão de usuário ativa salva na store `useAuthStore`.
   - Se o token expirar ou for nulo, o layout privado redireciona automaticamente para `(public)/login`.

2. **Animação Interativa do TopSheet:**
   - Controlada por valores compartilhados de Reanimated (`useSharedValue` e `useAnimatedStyle`).
   - Ajusta a posição `translateY` dinamicamente entre a altura expandida (`EXPANDED_HEIGHT`: 25% da tela) e recolhida (`COLLAPSED_HEIGHT`: 110px).
   - O conteúdo do calendário acompanha suavemente a transição do painel superior.

---

## 📜 Histórico de Atualizações
- **2026-08-23**: Mapeamento inicial da tela principal privada (Home/Dashboard).

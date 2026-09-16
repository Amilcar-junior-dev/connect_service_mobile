# Contexto da Tela: Redefinição de Senha (`resetPasswordView`)

## 📌 Identificação e Rota
- **Rota no Expo Router:** `reset-password` (Acessada via Deep Link `connectservice://reset-password`)
- **View (`.view.tsx`):** `src/screens/resetPasswordView/resetPassword.view.tsx`
- **ViewModel (`use*ViewModel.ts`):** `src/screens/resetPasswordView/resetPassword.viewModel.ts`
- **Schema (`.scheme.ts`):** `src/screens/resetPasswordView/resetPassword.schema.ts`
- **Testes Unitários (`.test.ts`):** `src/screens/resetPasswordView/resetPassword.viewModel.test.ts`

---

## 🧩 Componentes Utilizados na Tela

### Componentes de UI:
- **`FormScrollContainer`** (`~/components/formScroll/FormScrollContainer`): Container com scroll responsivo e ajuste automático de teclado.
- **`TextInputComponent`** (`~/components/inputs/textInput/CustomTextInput.view`): Inputs para Nova Senha e Confirmar Nova Senha.
- **`ActivityIndicator`**: Indicador visual de carregamento no botão "Salvar Nova Senha".

### Recursos Vetoriais (SVGs):
- `LogoConnect.svg`: Logotipo da aplicação.
- `Eye.svg` / `CloseEye.svg`: Alternância de visibilidade das senhas.

---

## ⚖️ Regras de Negócio e Comportamentos da Tela

1. **Captura e Validação de Deep Link (`useLinkingURL`):**
   - Ao carregar a tela, a ViewModel captura a URL de abertura via `Linking.useLinkingURL()`.
   - Trata tanto o **PKCE Flow** (`queryParams.code` com `supabase.auth.exchangeCodeForSession`) quanto o **Implicit Flow** (`queryParams.access_token` e `refresh_token` com `supabase.auth.setSession`).
   - Se o link for inválido, expirado ou não houver sessão ativa, exibe alerta *"Acesso Negado"* e redireciona o usuário de volta para o `/login`.

2. **Validação do Formulário (`resetPasswordScheme` com Zod):**
   - Nova Senha obrigatória (mínimo de 6 caracteres).
   - Confirmar Nova Senha deve ser exatamente igual à Nova Senha (`refine`).

3. **Atualização no Supabase (`updateUser`):**
   - Ao submeter o formulário (`onSubmit`), envia a nova senha via `supabase.auth.updateUser({ password })`.
   - Em caso de sucesso, exibe mensagem *"Senha Redefinida"* e redireciona para a tela de `/login`.

---

## 📜 Histórico de Atualizações
- **2026-08-23**: Mapeamento inicial da página de redefinição de senha via Deep Link.

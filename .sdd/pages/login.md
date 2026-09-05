# Contexto da Tela: Login (`loginView`)

## 📌 Identificação e Rota
- **Rota no Expo Router:** `(public)/login` (Entrada pública do aplicativo)
- **View (`.view.tsx`):** `src/screens/loginView/login.view.tsx`
- **ViewModel (`use*ViewModel.ts`):** `src/screens/loginView/useLoginViewModel.ts`
- **Schema (`.scheme.ts`):** `src/screens/loginView/login.scheme.ts`
- **Testes Unitários (`.test.ts`):** `src/screens/loginView/useLoginViewModel.test.ts`

---

## 🧩 Componentes Utilizados na Tela

### Componentes de UI:
- **`FormScrollContainer`** (`~/components/formScroll/FormScrollContainer`): Container com scroll responsivo e ajuste automático de teclado.
- **`TextInputComponent`** (`~/components/inputs/textInput/CustomTextInput.view`): Inputs para e-mail e senha com suporte a ícones e erros.
- **`ActivityIndicator`**: Indicador visual de carregamento no botão principal durante a requisição.

### Modais Conectadas:
- **`RECOVER_PASSWORD`** (`ModalRecoverPassword`): Disparada ao clicar no link *"Esqueci minha senha"*.

### Recursos Vetoriais (SVGs):
- `LogoConnect.svg`: Logotipo principal da marca.
- `Eye.svg` / `CloseEye.svg`: Alternância de visibilidade da senha.
- `GoogleLogo.svg`: Ícone para o botão de autenticação social com o Google.

---

## ⚖️ Regras de Negócio e Comportamentos da Tela

1. **Validação do Formulário (`loginScheme` com Zod):**
   - E-mail obrigatório com formato válido (`email()`).
   - Senha obrigatória (mínimo de 6 caracteres).

2. **Autenticação no Supabase:**
   - Ao submeter o formulário (`onSubmit`), invoca `supabase.auth.signInWithPassword({ email, password })`.
   - **Sucesso:** O ouvinte de autenticação do Supabase atualiza a store global `useAuthStore` com o `token` e dados do `user`, e redireciona a navegação para a rota privada `/(private)/(tabs)/home`.
   - **Erro:** Exibe um alerta nativo (`Alert.alert`) com a mensagem de erro retornada pelo Supabase.

3. **Alternância de Visibilidade da Senha:**
   - O ícone `Eye` / `CloseEye` alterna o estado `isPasswordVisible`, alterando o atributo `secureTextEntry` do input.

4. **Navegações Secundárias:**
   - **"Esqueci minha senha"**: Dispara `useModalStore.getState().openModal('RECOVER_PASSWORD')`.
   - **"Criar conta"**: Executa `router.push('/register')`.
   - **"Entrar com o Google"**: Botão preparado para futura integração OAuth.

---

## 📜 Histórico de Atualizações
- **2026-08-23**: Mapeamento inicial da página de login. Removida qualquer dependência de biometria para manter o escopo enxuto da V1.

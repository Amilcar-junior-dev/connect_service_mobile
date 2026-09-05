# Contexto da Tela: Cadastro de Conta (`registerView`)

## 📌 Identificação e Rota
- **Rota no Expo Router:** `(public)/register`
- **View (`.view.tsx`):** `src/screens/registerView/register.view.tsx`
- **ViewModel (`use*ViewModel.ts`):** `src/screens/registerView/useRegisterViewModel.ts`
- **Schema (`.scheme.ts`):** `src/screens/registerView/register.scheme.ts`
- **Testes Unitários (`.test.ts`):** `src/screens/registerView/useRegisterViewModel.test.ts`

---

## 🧩 Componentes Utilizados na Tela

### Componentes de UI:
- **`FormScrollContainer`** (`~/components/formScroll/FormScrollContainer`): Container com scroll responsivo e tratamento de teclado.
- **`TextInputComponent`** (`~/components/inputs/textInput/CustomTextInput.view`): Inputs para E-mail, Senha e Confirmar Senha.
- **`ActivityIndicator`**: Indicador visual de carregamento no botão "Criar Conta".

### Recursos Vetoriais (SVGs):
- `LogoConnect.svg`: Logotipo da aplicação.
- `Eye.svg` / `CloseEye.svg`: Alternância de visibilidade das senhas.

---

## ⚖️ Regras de Negócio e Comportamentos da Tela

1. **Validação do Formulário (`registerScheme` com Zod):**
   - E-mail obrigatório no formato correto (`email()`).
   - Senha obrigatória (mínimo de 6 caracteres).
   - Confirmar senha deve corresponder exatamente ao campo de senha (`refine(data => data.password === data.confirmPassword)`).

2. **Cadastro no Supabase (`signUp`):**
   - Ao enviar o formulário (`onSubmit`), dispara `supabase.auth.signUp({ email, password })`.
   - **Caso com Sessão Automática (`data.session` existe):** Exibe alerta de sucesso e navega diretamente para a Home privada `/(private)/(tabs)/home`.
   - **Caso com Confirmação de E-mail (`!data.session`):** Exibe mensagem orientando o usuário a verificar a caixa de entrada para confirmar a conta e redireciona para a tela de `/login`.
   - **Erro:** Exibe alerta nativo (`Alert.alert`) com a mensagem de erro do Supabase.

3. **Visibilidade das Senhas:**
   - Possui alternâncias independentes para a senha principal (`isPasswordVisible`) e para a confirmação de senha (`isConfirmPasswordVisible`).

4. **Navegação de Retorno:**
   - Botão **"Já tenho conta"** executa `router.replace('/login')`.

---

## 📜 Histórico de Atualizações
- **2026-08-23**: Mapeamento inicial da página de cadastro de conta.

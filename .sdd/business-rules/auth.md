# Regras de Negócio: Autenticação & Segurança (`Auth`)

## 1. Login Tradicional (E-mail e Senha)
- O login é realizado contra o serviço de autenticação do **Supabase** (`supabase.auth.signInWithPassword`).
- Em caso de sucesso, o token de acesso e os dados do usuário são salvos reativamente na store `useAuthStore` (persistida com MMKV).

## 2. Recuperação de Senha
- É acionada via modal `RECOVER_PASSWORD`.
- Envia um e-mail com `redirectTo: 'connectservice://reset-password'`.
- O app captura o Deep Link e abre a tela de redefinição de senha (`reset-password`).

## 3. Autenticação Biométrica Nativa (`NativeBiometrics`)
- **Consulta de Suporte:** O app verifica se o dispositivo possui hardware e se há biometria cadastrada no SO (`isBiometricsAvailable`).
- **Ativação (1º Login):** Após o login com e-mail/senha, se a biometria estiver disponível e ainda não tiver sido ativada nem recusada (`!isBiometricsEnabled && !isPromptDismissed`), abre a modal `REGISTER_BIOMETRICS`.
- **Auto-Disparo (Acessos Seguintes):** Ao carregar a tela de login, se `isBiometricsEnabled === true`, dispara automaticamente o prompt nativo (`BiometricPrompt` no Android / `LAContext` no iOS).
- **Acesso Manual:** Um botão secundário "Entrar com Biometria" é exibido na tela de login para disparo sob demanda.

# Catálogo de Componentes de UI (Design System / connect_service_mobile)

Este catálogo documenta os componentes de interface e padrões visuais já criados no projeto. **A IA DEVE consultar este catálogo antes de criar novos elementos visuais**, garantindo a consistência do Design System e evitando código duplicado.

---

## 🎨 Cores e Temas
- **Hook de Tema:** `useActiveTheme()` em `~/hooks/colorScheme`.
- **Tokens Principais:**
  - `colors.surface`: Fundo de telas e modais (`#FFFFFF` ou tema escuro).
  - `colors.ink`: Texto principal / títulos.
  - `colors.muted`: Subtítulos, placeholders e ícones secundários.
  - `colors.tabBar`: Cor primária da marca (botões principais, destaques).
  - `colors.accent`: Botões de ações de apoio.

---

## 📝 Componentes de Formulário e Entrada

### 1. `TextInputComponent`
- **Caminho:** `~/components/inputs/textInput/CustomTextInput.view`
- **Uso:** Integrado com `react-hook-form` (`FormProvider`).
- **Props Notáveis:** `name`, `label`, `placeholder`, `keyboardType`, `rightIcon`, `containerClass`, `editable`.
- **Exemplo:**
  ```tsx
  <TextInputComponent
    name="email"
    label="Email"
    placeholder="Digite seu email"
    keyboardType="email-address"
    autoCapitalize="none"
  />
  ```

### 2. `FormScrollContainer`
- **Caminho:** `~/components/formScroll/FormScrollContainer`
- **Uso:** Container com scroll responsivo que trata automaticamente o teclado (`KeyboardAvoidingView`).
- **Exemplo:**
  ```tsx
  <FormScrollContainer contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}>
    {/* Conteúdo do formulário */}
  </FormScrollContainer>
  ```

---

## 🪟 Sistema Global de Modais (`Modalize`)

Todas as modais da aplicação usam o `react-native-modalize` e são gerenciadas centralizadamente pelo **`GlobalModalManager`** (`~/components/modals/GlobalModalManager.tsx`).

### Modais Registradas:
1. **`SERVICE` (`ModalNewService`)**: Cadastro/Edição de Serviço.
2. **`CLIENT` (`ModalNewClient`)**: Cadastro/Edição de Cliente.
3. **`SELECT_DATE_TIME` (`ModalSelectDateTime`)**: Seleção de Data e Hora no calendário.
4. **`EMPLOYEE` (`ModalNewEmployee`)**: Cadastro de Colaborador.
5. **`RECOVER_PASSWORD` (`ModalRecoverPassword`)**: Solicitação de recuperação de senha.
6. **`REGISTER_BIOMETRICS` (`ModalRegisterBiometrics`)**: Oferta de ativação da biometria nativa.

### Como abrir uma modal via ViewModel:
```typescript
useModalStore.getState().openModal('RECOVER_PASSWORD', { optionalData });
```

---

## 🔔 Sistema Global de Feedback (`ToastContainer`)

Notificações flutuantes animadas no topo da tela com suporte a **4 variantes (`error`, `success`, `warning`, `info`)**, temas **Light/Dark**, **tempo customizável**, **título + descrição**, **ícone no canto esquerdo** e **ação de clique (`onPress`)**.

### Como disparar um Toast em qualquer ViewModel, Hook ou utilitário:
```typescript
import { toast } from '~/store/useToastStore';
import { mapSupabaseAuthError } from '~/utils/errorMapper';

// Exemplo 1: Toast de erro amigável com tradução de erro do Supabase
const mapped = mapSupabaseAuthError(error);
toast.error(mapped.description, { title: mapped.title });

// Exemplo 2: Toast de sucesso com tempo e callback de clique
toast.success('Perfil atualizado com sucesso!', {
  title: 'Sucesso',
  duration: 3000,
  onPress: () => router.push('/profile'),
});

// Exemplo 3: Toast de informação com ícone customizado
toast.info('Seu link de confirmação foi enviado por e-mail.', {
  title: 'Verifique sua Caixa de Entrada',
  duration: 6000,
});
```

---

## 🖼️ Ícones e Recursos Vetoriais (SVG)
- **Caminho:** `~/assets/svg/`
- **Ícones disponíveis:** `LogoConnect.svg`, `Eye.svg`, `CloseEye.svg`, `GoogleLogo.svg`, `Close.svg`, `Check.svg`, `Notification.svg`, etc.


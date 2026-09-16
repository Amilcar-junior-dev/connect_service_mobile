import { renderHook, act } from '@testing-library/react-native';
import useRegisterViewModel from './useRegisterViewModel';
import { supabase } from '~/lib/supabase';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useToastStore } from '~/store/useToastStore';

describe('useRegisterViewModel', () => {
  it('deve alternar a visibilidade da senha e confirmação de senha de forma independente', async () => {
    const { result } = await renderHook(() => useRegisterViewModel());
    expect(result.current.isPasswordVisible).toBe(false);
    expect(result.current.isConfirmPasswordVisible).toBe(false);

    await act(async () => {
      result.current.togglePasswordVisibility();
    });
    expect(result.current.isPasswordVisible).toBe(true);
    expect(result.current.isConfirmPasswordVisible).toBe(false);

    await act(async () => {
      result.current.toggleConfirmPasswordVisibility();
    });
    expect(result.current.isPasswordVisible).toBe(true);
    expect(result.current.isConfirmPasswordVisible).toBe(true);
  });

  it('deve cadastrar com sucesso (sessão direta) e navegar para o Onboarding', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    mockSignUp.mockResolvedValueOnce({
      data: { session: { access_token: 'token' } },
      error: null,
    });

    const { result } = await renderHook(() => useRegisterViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'novo@example.com');
      result.current.methods.setValue('password', 'senha123');
      result.current.methods.setValue('confirmPassword', 'senha123');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'novo@example.com',
      password: 'senha123',
    });
    const toastState = useToastStore.getState();
    expect(toastState.visible).toBe(true);
    expect(toastState.type).toBe('success');
    expect(toastState.title).toBe('Boas-vindas!');
    expect(router.push).toHaveBeenCalledWith('/onboarding');
  });

  it('deve cadastrar com sucesso (confirmação pendente), notificar via Toast e ir para login', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    // Sem data.session indica confirmação pendente de e-mail
    mockSignUp.mockResolvedValueOnce({
      data: { session: null },
      error: null,
    });

    const { result } = await renderHook(() => useRegisterViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'confirmar@example.com');
      result.current.methods.setValue('password', 'senha123');
      result.current.methods.setValue('confirmPassword', 'senha123');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    const toastState = useToastStore.getState();
    expect(toastState.visible).toBe(true);
    expect(toastState.type).toBe('info');
    expect(toastState.title).toBe('Confirmar Conta');
    expect(router.push).toHaveBeenCalledWith('/login');
  });

  it('deve exibir um Toast de erro amigável quando a API do Supabase retornar erro no cadastro', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    mockSignUp.mockResolvedValueOnce({
      data: { session: null },
      error: { message: 'User already registered' },
    });

    const { result } = await renderHook(() => useRegisterViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'repetido@example.com');
      result.current.methods.setValue('password', 'senha123');
      result.current.methods.setValue('confirmPassword', 'senha123');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    const toastState = useToastStore.getState();
    expect(toastState.visible).toBe(true);
    expect(toastState.type).toBe('error');
    expect(toastState.title).toBe('E-mail já Cadastrado');
    expect(toastState.description).toContain('já está cadastrado');
    expect(router.push).not.toHaveBeenCalled();
  });
});

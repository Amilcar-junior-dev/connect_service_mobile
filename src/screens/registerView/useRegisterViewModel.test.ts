import { renderHook, act } from '@testing-library/react-native';
import useRegisterViewModel from './useRegisterViewModel';
import { supabase } from '~/lib/supabase';
import { router } from 'expo-router';
import { Alert } from 'react-native';

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

  it('deve cadastrar com sucesso (sessão direta) e navegar para a Home', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    mockSignUp.mockResolvedValueOnce({
      data: { session: { access_token: 'token' } },
      error: null,
    });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
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
    expect(alertSpy).toHaveBeenCalledWith('Sucesso!', 'Cadastro realizado com sucesso!');
    expect(router.push).toHaveBeenCalledWith('/(private)/(tabs)/home');
  });

  it('deve cadastrar com sucesso (confirmação pendente), alertar o usuário e ir para login', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    // Sem data.session indica confirmação pendente de e-mail
    mockSignUp.mockResolvedValueOnce({
      data: { session: null },
      error: null,
    });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { result } = await renderHook(() => useRegisterViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'confirmar@example.com');
      result.current.methods.setValue('password', 'senha123');
      result.current.methods.setValue('confirmPassword', 'senha123');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(alertSpy).toHaveBeenCalledWith(
      'Confirmar Conta',
      'Cadastro realizado! Por favor, confirme seu e-mail pelo link enviado para a sua caixa de entrada.'
    );
    expect(router.push).toHaveBeenCalledWith('/login');
  });

  it('deve exibir um Alerta quando a API do Supabase retornar erro no cadastro', async () => {
    const mockSignUp = supabase.auth.signUp as jest.Mock;
    mockSignUp.mockResolvedValueOnce({
      data: { session: null },
      error: { message: 'Este e-mail já está cadastrado' },
    });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { result } = await renderHook(() => useRegisterViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'repetido@example.com');
      result.current.methods.setValue('password', 'senha123');
      result.current.methods.setValue('confirmPassword', 'senha123');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(alertSpy).toHaveBeenCalledWith('Erro ao cadastrar', 'Este e-mail já está cadastrado');
    expect(router.push).not.toHaveBeenCalled();
  });
});

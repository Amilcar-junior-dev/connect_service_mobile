import { renderHook, act } from '@testing-library/react-native';
import useResetPasswordViewModel from './resetPassword.viewModel';
import { supabase } from '~/lib/supabase';
import { useLinkingURL } from 'expo-linking';
import { router } from 'expo-router';
import { Alert } from 'react-native';

describe('useResetPasswordViewModel', () => {
  beforeEach(() => {
    const mockUseLinkingURL = useLinkingURL as jest.Mock;
    mockUseLinkingURL.mockReturnValue(null);
  });

  it('deve alternar a visibilidade de senha e confirmação de senha', async () => {
    const { result } = await renderHook(() => useResetPasswordViewModel());
    expect(result.current.isPasswordVisible).toBe(false);
    expect(result.current.isConfirmPasswordVisible).toBe(false);

    await act(async () => {
      result.current.togglePasswordVisibility();
    });
    expect(result.current.isPasswordVisible).toBe(true);

    await act(async () => {
      result.current.toggleConfirmPasswordVisibility();
    });
    expect(result.current.isConfirmPasswordVisible).toBe(true);
  });

  it('deve realizar a troca de código por sessão se houver código na URL (PKCE Flow)', async () => {
    const mockUseLinkingURL = useLinkingURL as jest.Mock;
    mockUseLinkingURL.mockReturnValue('connectservice://reset-password?code=123456');

    const mockExchange = supabase.auth.exchangeCodeForSession as jest.Mock;
    mockExchange.mockResolvedValueOnce({ error: null });

    await renderHook(() => useResetPasswordViewModel());

    expect(mockExchange).toHaveBeenCalledWith('123456');
  });

  it('deve realizar a ativação de sessão se houver access_token na URL (Implicit Flow)', async () => {
    const mockUseLinkingURL = useLinkingURL as jest.Mock;
    mockUseLinkingURL.mockReturnValue('connectservice://reset-password#access_token=token_abc&refresh_token=token_xyz');

    const mockSetSession = supabase.auth.setSession as jest.Mock;
    mockSetSession.mockResolvedValueOnce({ error: null });

    await renderHook(() => useResetPasswordViewModel());

    expect(mockSetSession).toHaveBeenCalledWith({
      access_token: 'token_abc',
      refresh_token: 'token_xyz',
    });
  });

  it('deve alertar e redirecionar se o link estiver inválido', async () => {
    const mockUseLinkingURL = useLinkingURL as jest.Mock;
    mockUseLinkingURL.mockReturnValue('connectservice://reset-password?code=codigo-errado');

    const mockExchange = supabase.auth.exchangeCodeForSession as jest.Mock;
    mockExchange.mockResolvedValueOnce({ error: { message: 'Token expirou' } });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    await renderHook(() => useResetPasswordViewModel());

    expect(mockExchange).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(
      'Link Inválido',
      expect.stringContaining('Token expirou'),
      expect.any(Array)
    );
  });

  it('deve redefinir senha com sucesso e navegar para o Login', async () => {
    const mockUseLinkingURL = useLinkingURL as jest.Mock;
    mockUseLinkingURL.mockReturnValue('connectservice://reset-password?code=123');

    const mockExchange = supabase.auth.exchangeCodeForSession as jest.Mock;
    mockExchange.mockResolvedValueOnce({ error: null });

    const mockUpdateUser = supabase.auth.updateUser as jest.Mock;
    mockUpdateUser.mockResolvedValueOnce({ error: null });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { result } = await renderHook(() => useResetPasswordViewModel());

    // Preenche os campos
    await act(async () => {
      result.current.methods.setValue('password', 'novasenha123');
      result.current.methods.setValue('confirmPassword', 'novasenha123');
    });

    // Envia o formulário
    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockUpdateUser).toHaveBeenCalledWith({ password: 'novasenha123' });
    expect(alertSpy).toHaveBeenCalledWith(
      'Senha Redefinida',
      expect.any(String),
      expect.any(Array)
    );

    // Clica em "Ir para o Login"
    const alertCallbacks = alertSpy.mock.calls[0][2];
    // @ts-ignore
    alertCallbacks[0].onPress();
    expect(router.replace).toHaveBeenCalledWith('/login');
  });
});

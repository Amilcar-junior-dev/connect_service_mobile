import { renderHook, act } from '@testing-library/react-native';
import useLoginViewModel from './useLoginViewModel';
import { supabase } from '~/lib/supabase';
import { router } from 'expo-router';
import { Alert } from 'react-native';

describe('useLoginViewModel', () => {
  it('deve alternar a visibilidade da senha ao chamar togglePasswordVisibility', async () => {
    const { result } = await renderHook(() => useLoginViewModel());
    expect(result.current.isPasswordVisible).toBe(false);

    await act(async () => {
      result.current.togglePasswordVisibility();
    });
    expect(result.current.isPasswordVisible).toBe(true);

    await act(async () => {
      result.current.togglePasswordVisibility();
    });
    expect(result.current.isPasswordVisible).toBe(false);
  });

  it('deve fazer login com sucesso e navegar para a Home', async () => {
    const mockSignIn = supabase.auth.signInWithPassword as jest.Mock;
    mockSignIn.mockResolvedValueOnce({ data: { session: {} }, error: null });

    const { result } = await renderHook(() => useLoginViewModel());

    // Preenche o formulário
    await act(async () => {
      result.current.methods.setValue('email', 'teste@example.com');
      result.current.methods.setValue('password', 'senha123');
    });

    // Envia o formulário
    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'teste@example.com',
      password: 'senha123',
    });
    expect(router.push).toHaveBeenCalledWith('/(private)/(tabs)/home');
  });

  it('deve exibir um Alerta quando a API do Supabase retornar erro', async () => {
    const mockSignIn = supabase.auth.signInWithPassword as jest.Mock;
    mockSignIn.mockResolvedValueOnce({
      data: { session: null },
      error: { message: 'Credenciais inválidas' },
    });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { result } = await renderHook(() => useLoginViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'teste@example.com');
      result.current.methods.setValue('password', 'senha-errada');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockSignIn).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Erro ao entrar', 'Credenciais inválidas');
    expect(router.push).not.toHaveBeenCalled();
  });
});

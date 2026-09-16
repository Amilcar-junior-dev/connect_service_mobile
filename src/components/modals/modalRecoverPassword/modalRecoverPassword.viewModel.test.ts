import { renderHook, act } from '@testing-library/react-native';
import { useModalRecoverPasswordViewModel } from './modalRecoverPassword.viewModel';
import { supabase } from '~/lib/supabase';
import { useToastStore } from '~/store/useToastStore';

describe('useModalRecoverPasswordViewModel', () => {
  it('deve solicitar recuperação de senha com sucesso, exibir Toast e fechar a modal', async () => {
    const mockReset = supabase.auth.resetPasswordForEmail as jest.Mock;
    mockReset.mockResolvedValueOnce({ error: null });

    const { result } = await renderHook(() => useModalRecoverPasswordViewModel());

    const closeSpy = jest.fn();
    // @ts-ignore
    result.current.modalRef.current = { close: closeSpy };

    await act(async () => {
      result.current.methods.setValue('email', 'recuperar@example.com');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockReset).toHaveBeenCalledWith('recuperar@example.com', {
      redirectTo: 'connectservice://reset-password',
    });
    const toastState = useToastStore.getState();
    expect(toastState.visible).toBe(true);
    expect(toastState.type).toBe('success');
    expect(toastState.title).toBe('Recuperação Enviada');
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('deve exibir um Toast de erro amigável quando a API do Supabase falhar', async () => {
    const mockReset = supabase.auth.resetPasswordForEmail as jest.Mock;
    mockReset.mockResolvedValueOnce({
      error: { message: 'too many requests' },
    });

    const { result } = await renderHook(() => useModalRecoverPasswordViewModel());

    const closeSpy = jest.fn();
    // @ts-ignore
    result.current.modalRef.current = { close: closeSpy };

    await act(async () => {
      result.current.methods.setValue('email', 'limite@example.com');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockReset).toHaveBeenCalledWith('limite@example.com', {
      redirectTo: 'connectservice://reset-password',
    });
    const toastState = useToastStore.getState();
    expect(toastState.visible).toBe(true);
    expect(toastState.type).toBe('error');
    expect(toastState.title).toBe('Muitas Tentativas');
    expect(closeSpy).not.toHaveBeenCalled();
  });
});

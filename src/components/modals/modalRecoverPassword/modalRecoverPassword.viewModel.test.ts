import { renderHook, act } from '@testing-library/react-native';
import { useModalRecoverPasswordViewModel } from './modalRecoverPassword.viewModel';
import { supabase } from '~/lib/supabase';
import { Alert } from 'react-native';

describe('useModalRecoverPasswordViewModel', () => {
  it('deve solicitar recuperação de senha com sucesso e fechar a modal', async () => {
    const mockReset = supabase.auth.resetPasswordForEmail as jest.Mock;
    mockReset.mockResolvedValueOnce({ error: null });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { result } = await renderHook(() => useModalRecoverPasswordViewModel());

    // Mock do método close da modalize
    const closeSpy = jest.fn();
    // @ts-ignore
    result.current.modalRef.current = { close: closeSpy };

    await act(async () => {
      result.current.methods.setValue('email', 'recuperar@example.com');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockReset).toHaveBeenCalledWith('recuperar@example.com');
    expect(alertSpy).toHaveBeenCalledWith(
      'Recuperação de Senha',
      'Se o e-mail informado estiver cadastrado, você receberá um link para redefinir sua senha.',
      expect.any(Array)
    );
    
    // Simula o clique no botão "OK" do Alerta que aciona o closeSpy
    const alertCallbacks = alertSpy.mock.calls[0][2];
    // @ts-ignore
    alertCallbacks[0].onPress();
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('deve exibir um Alerta quando a API do Supabase falhar', async () => {
    const mockReset = supabase.auth.resetPasswordForEmail as jest.Mock;
    mockReset.mockResolvedValueOnce({
      error: { message: 'Limite de envios excedido' },
    });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
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

    expect(mockReset).toHaveBeenCalledWith('limite@example.com');
    expect(alertSpy).toHaveBeenCalledWith('Erro ao solicitar recuperação', 'Limite de envios excedido');
    expect(closeSpy).not.toHaveBeenCalled();
  });
});

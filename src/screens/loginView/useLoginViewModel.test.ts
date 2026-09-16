import { renderHook, act } from '@testing-library/react-native';
import useLoginViewModel from './useLoginViewModel';
import { supabase } from '~/lib/supabase';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { companyService } from '~/services/companyService';
import { useOnboardingStore } from '~/store/useOnboardingStore';
import { useToastStore } from '~/store/useToastStore';

jest.mock('~/services/companyService', () => ({
  companyService: {
    getCompanyByOwner: jest.fn(),
  },
}));

describe('useLoginViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOnboardingStore.getState().resetOnboarding();
  });

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

  it('deve fazer login com sucesso e navegar para a Home quando a empresa já tem o onboarding concluído', async () => {
    const mockSignIn = supabase.auth.signInWithPassword as jest.Mock;
    mockSignIn.mockResolvedValueOnce({ data: { session: {} }, error: null });
    (companyService.getCompanyByOwner as jest.Mock).mockResolvedValueOnce({ onboarding_completed: true });

    const { result } = await renderHook(() => useLoginViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'teste@example.com');
      result.current.methods.setValue('password', 'senha123');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'teste@example.com',
      password: 'senha123',
    });
    expect(router.push).toHaveBeenCalledWith('/(private)/(tabs)/home');
  });

  it('deve navegar para /onboarding quando a empresa ainda não concluiu o onboarding', async () => {
    const mockSignIn = supabase.auth.signInWithPassword as jest.Mock;
    mockSignIn.mockResolvedValueOnce({ data: { session: {} }, error: null });
    (companyService.getCompanyByOwner as jest.Mock).mockResolvedValueOnce(null);

    const { result } = await renderHook(() => useLoginViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'novo@example.com');
      result.current.methods.setValue('password', 'senha123');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(router.push).toHaveBeenCalledWith('/onboarding');
  });

  it('deve exibir um Toast de erro amigável quando a API do Supabase retornar erro', async () => {
    const mockSignIn = supabase.auth.signInWithPassword as jest.Mock;
    mockSignIn.mockResolvedValueOnce({
      data: { session: null },
      error: { message: 'Invalid login credentials' },
    });

    const { result } = await renderHook(() => useLoginViewModel());

    await act(async () => {
      result.current.methods.setValue('email', 'teste@example.com');
      result.current.methods.setValue('password', 'senha-errada');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockSignIn).toHaveBeenCalled();
    const toastState = useToastStore.getState();
    expect(toastState.visible).toBe(true);
    expect(toastState.type).toBe('error');
    expect(toastState.title).toBe('Credenciais Inválidas');
    expect(toastState.description).toContain('E-mail ou senha incorretos');
    expect(router.push).not.toHaveBeenCalled();
  });
});

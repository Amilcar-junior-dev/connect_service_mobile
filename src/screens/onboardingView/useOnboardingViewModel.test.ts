import { renderHook, act } from '@testing-library/react-native';
import { useOnboardingViewModel, generateSlug } from './useOnboardingViewModel';
import { useOnboardingStore } from '~/store/useOnboardingStore';
import { companyService } from '~/services/companyService';
import { Alert } from 'react-native';
import { router } from 'expo-router';

// Mocks
jest.mock('~/services/companyService', () => ({
  companyService: {
    createCompany: jest.fn(),
  },
}));

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('useOnboardingViewModel (Benchmark Redesign 4-Steps Test Suite)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOnboardingStore.getState().resetOnboarding();
  });

  // [TDD-01]
  it('deve iniciar no Passo 1 com valores padrão vazios e barra de progresso em 25%', async () => {
    const { result } = await renderHook(() => useOnboardingViewModel());
    expect(result.current.currentStep).toBe(1);
    expect(result.current.progressPercentage).toBe('25%');
    expect(result.current.firstName).toBe('');
  });

  // [TDD-02]
  it('deve validar nome de pelo menos 2 caracteres no Passo 1 e progredir para o Passo 2 com 50%', async () => {
    const { result } = await renderHook(() => useOnboardingViewModel());

    await act(async () => {
      result.current.setFirstName('Junior');
      result.current.setLastName('Oliveira');
    });

    await act(async () => {
      const success = result.current.handleStep1Next();
      expect(success).toBe(true);
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.progressPercentage).toBe('50%');
  });

  // [TDD-03]
  it('deve aceitar especialização customizada digitada no input do Passo 2', async () => {
    const { result } = await renderHook(() => useOnboardingViewModel());

    await act(async () => {
      result.current.setFirstName('Junior');
    });
    await act(async () => {
      result.current.handleStep1Next();
    });

    await act(async () => {
      result.current.setCustomSpecialization('Podóloga');
    });
    await act(async () => {
      const success = result.current.handleStep2Next();
      expect(success).toBe(true);
    });

    expect(result.current.currentStep).toBe(3);
    expect(result.current.progressPercentage).toBe('75%');
    expect(useOnboardingStore.getState().specialization).toBe('Podóloga');
  });

  // [TDD-04]
  it('deve autocompletar o endereço no Passo 3 ao buscar um CEP de 8 dígitos', async () => {
    const fakeViaCepResponse = {
      logradouro: 'Rua Flamboyant',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeViaCepResponse),
    } as any);

    const { result } = await renderHook(() => useOnboardingViewModel());

    await act(async () => {
      await result.current.setZipCode('01001-000');
    });

    expect(result.current.address).toBe('Rua Flamboyant');
    expect(result.current.city).toBe('São Paulo');
    expect(result.current.state).toBe('SP');
  });

  // [TDD-05]
  it('deve marcar a barra de progresso em 90% no Passo 4 e atingir 100% apenas após o clique bem-sucedido em finalizar', async () => {
    (companyService.createCompany as jest.Mock).mockResolvedValue({ id: 'company-999' });

    const { result } = await renderHook(() => useOnboardingViewModel());

    // Passo 1
    await act(async () => { result.current.setFirstName('Junior'); });
    await act(async () => { result.current.handleStep1Next(); });

    // Passo 2
    await act(async () => { result.current.setSpecialization('Barbeiro(a)'); });
    await act(async () => { result.current.handleStep2Next(); });

    // Passo 3
    await act(async () => { result.current.setWorkplaceName('Vikings barbudos'); });
    await act(async () => { result.current.handleStep3Next(); });

    expect(result.current.currentStep).toBe(4);
    expect(result.current.progressPercentage).toBe('90%');

    // Clica em Finalizar
    await act(async () => {
      await result.current.handleFinishOnboarding();
    });

    expect(companyService.createCompany).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Junior',
        specialization: 'Barbeiro(a)',
        workplaceName: 'Vikings barbudos',
      })
    );

    expect(result.current.progressPercentage).toBe('100%');
    expect(useOnboardingStore.getState().isOnboardingCompleted).toBe(true);
    expect(router.replace).toHaveBeenCalledWith('/(private)/(tabs)/home');
  });
});

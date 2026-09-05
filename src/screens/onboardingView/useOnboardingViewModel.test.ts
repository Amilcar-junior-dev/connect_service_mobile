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

describe('useOnboardingViewModel (TDD Test Suite)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOnboardingStore.getState().resetOnboarding();
  });

  // [TDD-01]
  it('deve iniciar no Passo 1 com valores padrão vazios e progresso em 33%', async () => {
    const { result } = await renderHook(() => useOnboardingViewModel());
    expect(result.current.currentStep).toBe(1);
    expect(result.current.companyName).toBe('');
    expect(result.current.slug).toBe('');
  });

  // [TDD-02]
  it('deve gerar o slug automaticamente ao alterar o nome da empresa', async () => {
    const { result } = await renderHook(() => useOnboardingViewModel());

    await act(async () => {
      result.current.setCompanyName('Barbearia do Silva & Cia!');
    });

    expect(result.current.companyName).toBe('Barbearia do Silva & Cia!');
    expect(result.current.slug).toBe('barbearia-do-silva-cia');
  });

  it('função generateSlug deve formatar corretamente acentos e caracteres especiais', () => {
    expect(generateSlug('Estética & Salão Épico')).toBe('estetica-salao-epico');
    expect(generateSlug('  Studio   Ana  ')).toBe('studio-ana');
  });

  // [TDD-03]
  it('deve impedir avançar do Passo 1 se o nome da empresa tiver menos de 3 caracteres', async () => {
    const { result } = await renderHook(() => useOnboardingViewModel());

    await act(async () => {
      result.current.setCompanyName('Ab');
    });

    let success = false;
    await act(async () => {
      success = result.current.handleStep1Next();
    });

    expect(success).toBe(false);
    expect(result.current.currentStep).toBe(1);
    expect(Alert.alert).toHaveBeenCalledWith('Atenção', expect.any(String));
  });

  // [TDD-04]
  it('deve impedir avançar do Passo 2 para o Passo 3 se o segmento ou porte não forem selecionados', async () => {
    const { result } = await renderHook(() => useOnboardingViewModel());

    await act(async () => {
      result.current.setCompanyName('Barbearia Exemplo');
    });

    await act(async () => {
      result.current.handleStep1Next();
    });

    expect(result.current.currentStep).toBe(2);

    let success = false;
    await act(async () => {
      success = result.current.handleStep2Next();
    });

    expect(success).toBe(false);
    expect(result.current.currentStep).toBe(2);
    expect(Alert.alert).toHaveBeenCalledWith('Atenção', 'Selecione o segmento do seu negócio.');
  });

  // [TDD-05]
  it('deve autocompletar cidade, estado e rua ao buscar um CEP válido de 8 dígitos', async () => {
    const fakeViaCepResponse = {
      logradouro: 'Rua das Flores',
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

    expect(result.current.address).toBe('Rua das Flores');
    expect(result.current.city).toBe('São Paulo');
    expect(result.current.state).toBe('SP');
  });

  // [TDD-06] & [TDD-07]
  it('deve submeter a empresa no Supabase, salvar onboarding_completed: true e navegar para a Home', async () => {
    (companyService.createCompany as jest.Mock).mockResolvedValue({ id: 'company-123' });

    const { result } = await renderHook(() => useOnboardingViewModel());

    await act(async () => {
      result.current.setCompanyName('Studio Beleza');
    });

    await act(async () => {
      result.current.handleStep1Next();
    });

    await act(async () => {
      result.current.setSegment('salon');
      result.current.setTeamSize('small_2_5');
    });

    await act(async () => {
      result.current.handleStep2Next();
    });

    await act(async () => {
      await result.current.handleFinishOnboarding();
    });

    expect(companyService.createCompany).toHaveBeenCalledWith({
      companyName: 'Studio Beleza',
      slug: 'studio-beleza',
      segment: 'salon',
      teamSize: 'small_2_5',
      serviceType: 'fixed',
      zipCode: '',
      city: '',
      state: '',
      address: '',
    });

    expect(useOnboardingStore.getState().isOnboardingCompleted).toBe(true);
    expect(router.replace).toHaveBeenCalledWith('/(private)/(tabs)/home');
  });

  // [TDD-08]
  it('deve reter os dados salvos na MMKV e exibir alerta amigável se a requisição do Supabase falhar', async () => {
    (companyService.createCompany as jest.Mock).mockRejectedValue(new Error('Erro de Conexão'));

    const { result } = await renderHook(() => useOnboardingViewModel());

    await act(async () => {
      result.current.setCompanyName('Barbearia Teste');
    });

    await act(async () => {
      result.current.handleStep1Next();
    });

    await act(async () => {
      result.current.setSegment('barbershop');
      result.current.setTeamSize('solo');
    });

    await act(async () => {
      result.current.handleStep2Next();
    });

    await act(async () => {
      await result.current.handleFinishOnboarding();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro na Conexão',
      expect.stringContaining('Seus dados foram mantidos no celular')
    );
    expect(useOnboardingStore.getState().companyName).toBe('Barbearia Teste');
  });
});

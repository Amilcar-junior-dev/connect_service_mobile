import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useOnboardingStore } from '~/store/useOnboardingStore';
import { companyService } from '~/services/companyService';

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '')   // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-');          // Substitui espaços por hífens
}

export function useOnboardingViewModel() {
  const store = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  // Estados locais do formulário inicializados com a store MMKV
  const [companyName, setCompanyName] = useState(store.companyName);
  const [slug, setSlug] = useState(store.slug);
  const [segment, setSegment] = useState(store.segment);
  const [teamSize, setTeamSize] = useState(store.teamSize);
  const [serviceType, setServiceType] = useState(store.serviceType || 'fixed');
  const [zipCode, setZipCode] = useState(store.zipCode);
  const [city, setCity] = useState(store.city);
  const [state, setState] = useState(store.state);
  const [address, setAddress] = useState(store.address);

  // Atualiza o slug automaticamente ao mudar o nome da empresa
  const handleCompanyNameChange = useCallback((name: string) => {
    setCompanyName(name);
    const autoSlug = generateSlug(name);
    setSlug(autoSlug);
  }, []);

  // Busca o endereço na API do ViaCEP ao informar um CEP completo
  const handleCepSearch = useCallback(async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    setZipCode(cleanCep);

    if (cleanCep.length === 8) {
      setIsFetchingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (!data?.erro) {
          if (data?.logradouro) setAddress(data.logradouro);
          if (data?.localidade) setCity(data.localidade);
          if (data?.uf) setState(data.uf);
        }
      } catch (error) {
        console.log('Erro ao buscar CEP:', error);
      } finally {
        setIsFetchingCep(false);
      }
    }
  }, []);

  const handleStep1Next = useCallback(() => {
    if (!companyName?.trim() || companyName.trim().length < 3) {
      Alert.alert('Atenção', 'Informe o nome da empresa com pelo menos 3 caracteres.');
      return false;
    }
    const finalSlug = slug || generateSlug(companyName);
    store.setStep1Data({ companyName, slug: finalSlug });
    store.setCurrentStep(2);
    return true;
  }, [companyName, slug, store]);

  const handleStep2Next = useCallback(() => {
    if (!segment) {
      Alert.alert('Atenção', 'Selecione o segmento do seu negócio.');
      return false;
    }
    if (!teamSize) {
      Alert.alert('Atenção', 'Selecione o porte da sua equipe.');
      return false;
    }
    store.setStep2Data({ segment, teamSize });
    store.setCurrentStep(3);
    return true;
  }, [segment, teamSize, store]);

  const handlePrevStep = useCallback(() => {
    if (store.currentStep > 1) {
      store.setCurrentStep(store.currentStep - 1);
    }
  }, [store]);

  const handleFinishOnboarding = useCallback(async () => {
    if (!serviceType) {
      Alert.alert('Atenção', 'Selecione o tipo de atendimento.');
      return;
    }

    setIsLoading(true);
    const payload = {
      companyName: store.companyName || companyName,
      slug: store.slug || slug,
      segment: store.segment || segment,
      teamSize: store.teamSize || teamSize,
      serviceType,
      zipCode,
      city,
      state,
      address,
    };

    try {
      await companyService.createCompany(payload);

      store.setStep3Data({ serviceType, zipCode, city, state, address });
      store.setOnboardingCompleted(true);

      Alert.alert('Sucesso!', 'Seu estabelecimento foi configurado com sucesso!');
      router.replace('/(private)/(tabs)/home');
    } catch (error: any) {
      console.error('Erro ao salvar onboarding no Supabase:', error);
      // Retém os dados salvos localmente na MMKV para permitir nova tentativa
      store.setStep3Data({ serviceType, zipCode, city, state, address });
      Alert.alert(
        'Erro na Conexão',
        'Não foi possível salvar online no momento. Seus dados foram mantidos no celular. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    serviceType,
    zipCode,
    city,
    state,
    address,
    companyName,
    slug,
    segment,
    teamSize,
    store,
  ]);

  return {
    currentStep: store.currentStep,
    companyName,
    slug,
    segment,
    teamSize,
    serviceType,
    zipCode,
    city,
    state,
    address,
    isLoading,
    isFetchingCep,

    setCompanyName: handleCompanyNameChange,
    setSlug,
    setSegment,
    setTeamSize,
    setServiceType,
    setZipCode: handleCepSearch,
    setCity,
    setState,
    setAddress,

    handleStep1Next,
    handleStep2Next,
    handlePrevStep,
    handleFinishOnboarding,
  };
}

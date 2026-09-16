import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useOnboardingStore, DayHours } from '~/store/useOnboardingStore';
import { companyService } from '~/services/companyService';

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const PRESET_SPECIALIZATIONS = [
  'Cabeleireiro(a)',
  'Manicure',
  'Cosmetologista',
  'Técnico(a) de depilação',
  'Maquiador(a)',
  'Designer de sobrancelha',
  'Extensionista',
  'Barbeiro(a)',
  'Esteticista',
  'Massoterapeuta',
];

export function useOnboardingViewModel() {
  const store = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [isFinishedSuccess, setIsFinishedSuccess] = useState(false);

  // Estados dos 4 passos
  const [firstName, setFirstName] = useState(store.firstName);
  const [lastName, setLastName] = useState(store.lastName);
  const [avatarUrl, setAvatarUrl] = useState(store.avatarUrl);
  const [specialization, setSpecialization] = useState(store.specialization);
  const [customSpecialization, setCustomSpecialization] = useState('');
  const [workplaceName, setWorkplaceName] = useState(store.workplaceName);
  const [zipCode, setZipCode] = useState(store.zipCode);
  const [city, setCity] = useState(store.city);
  const [state, setState] = useState(store.state);
  const [address, setAddress] = useState(store.address);
  const [operatingHours, setOperatingHours] = useState<Record<string, DayHours>>(store.operatingHours);

  // Estados para TimePickerModal
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [timePickerTarget, setTimePickerTarget] = useState<{ dayKey: string; type: 'start' | 'end' } | null>(null);
  const [lastFocusedDayKey, setLastFocusedDayKey] = useState<string>('segunda');

  const openTimePicker = useCallback((dayKey: string, type: 'start' | 'end') => {
    setLastFocusedDayKey(dayKey);
    setTimePickerTarget({ dayKey, type });
    setIsTimePickerVisible(true);
  }, []);

  const closeTimePicker = useCallback(() => {
    setIsTimePickerVisible(false);
    setTimePickerTarget(null);
  }, []);

  const updateSelectedTime = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      if (!timePickerTarget) return;
      const { dayKey, type } = timePickerTarget;

      setOperatingHours((prev) => ({
        ...prev,
        [dayKey]: {
          ...prev[dayKey],
          ...(type === 'start'
            ? { startHours: hours, startMinutes: minutes }
            : { endHours: hours, endMinutes: minutes }),
        },
      }));
    },
    [timePickerTarget]
  );

  const copyTimesToAllDays = useCallback(() => {
    const reference = operatingHours[lastFocusedDayKey];
    if (!reference) return;

    setOperatingHours((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key] = {
          ...updated[key],
          startHours: reference.startHours,
          startMinutes: reference.startMinutes,
          endHours: reference.endHours,
          endMinutes: reference.endMinutes,
        };
      });
      return updated;
    });
    Alert.alert('Sucesso', 'Horários copiados para todos os dias!');
  }, [operatingHours, lastFocusedDayKey]);

  // Cálculo da Barra de Progresso
  let progressPercentage = '25%';
  if (isFinishedSuccess) {
    progressPercentage = '100%';
  } else if (store.currentStep === 1) {
    progressPercentage = '25%';
  } else if (store.currentStep === 2) {
    progressPercentage = '50%';
  } else if (store.currentStep === 3) {
    progressPercentage = '75%';
  } else if (store.currentStep === 4) {
    progressPercentage = '90%';
  }

  // Busca o endereço na API do ViaCEP
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

  // Handlers dos Passos
  const handleStep1Next = useCallback(() => {
    if (!firstName?.trim() || firstName.trim().length < 2) {
      Alert.alert('Atenção', 'Informe seu nome com pelo menos 2 caracteres.');
      return false;
    }
    store.setStep1Data({ firstName, lastName, avatarUrl });
    store.setCurrentStep(2);
    return true;
  }, [firstName, lastName, avatarUrl, store]);

  const handleStep2Next = useCallback(() => {
    const selectedSpec = customSpecialization?.trim() || specialization;
    if (!selectedSpec) {
      Alert.alert('Atenção', 'Selecione ou digite sua especialização.');
      return false;
    }
    store.setStep2Data({ specialization: selectedSpec });
    store.setCurrentStep(3);
    return true;
  }, [specialization, customSpecialization, store]);

  const handleStep3Next = useCallback(() => {
    store.setStep3Data({ workplaceName, zipCode, city, state, address });
    store.setCurrentStep(4);
    return true;
  }, [workplaceName, zipCode, city, state, address, store]);

  const handlePrevStep = useCallback(() => {
    if (store.currentStep > 1) {
      store.setCurrentStep(store.currentStep - 1);
    }
  }, [store]);

  const toggleDay = useCallback((dayKey: string) => {
    setOperatingHours((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        active: !prev[dayKey].active,
      },
    }));
  }, []);

  const handleFinishOnboarding = useCallback(async () => {
    setIsLoading(true);

    const activeSpecialization = customSpecialization?.trim() || store.specialization || specialization;
    const companyName = workplaceName?.trim() || [firstName, lastName].filter(Boolean).join(' ') || 'Minha Empresa';
    const slug = generateSlug(companyName);

    const payload = {
      firstName: store.firstName || firstName,
      lastName: store.lastName || lastName,
      avatarUrl: store.avatarUrl || avatarUrl,
      specialization: activeSpecialization,
      workplaceName: store.workplaceName || workplaceName,
      companyName,
      slug,
      zipCode,
      city,
      state,
      address,
      operatingHours,
    };

    try {
      await companyService.createCompany(payload);

      store.setStep4Data({ operatingHours });
      store.setOnboardingCompleted(true);

      // Atualiza o progresso para 100% apenas após o sucesso!
      setIsFinishedSuccess(true);

      Alert.alert('Sucesso!', 'Seu perfil e horário de atendimento foram salvos!');
      router.replace('/(private)/(tabs)/home');
    } catch (error: any) {
      console.error('Erro ao salvar onboarding no Supabase:', error);
      store.setStep4Data({ operatingHours });
      Alert.alert(
        'Erro na Conexão',
        'Não foi possível salvar online no momento. Seus dados foram mantidos no celular. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    firstName,
    lastName,
    avatarUrl,
    specialization,
    customSpecialization,
    workplaceName,
    zipCode,
    city,
    state,
    address,
    operatingHours,
    store,
  ]);

  return {
    currentStep: store.currentStep,
    progressPercentage,
    firstName,
    lastName,
    avatarUrl,
    specialization,
    customSpecialization,
    workplaceName,
    zipCode,
    city,
    state,
    address,
    operatingHours,
    isLoading,
    isFetchingCep,
    isTimePickerVisible,
    timePickerTarget,
    openTimePicker,
    closeTimePicker,
    updateSelectedTime,
    copyTimesToAllDays,

    setFirstName,
    setLastName,
    setAvatarUrl,
    setSpecialization,
    setCustomSpecialization,
    setWorkplaceName,
    setZipCode: handleCepSearch,
    setCity,
    setState,
    setAddress,
    toggleDay,

    handleStep1Next,
    handleStep2Next,
    handleStep3Next,
    handlePrevStep,
    handleFinishOnboarding,
  };
}

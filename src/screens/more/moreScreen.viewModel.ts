import { useState, useCallback } from 'react';
import { Alert, Clipboard } from 'react-native';
import { router } from 'expo-router';
import { useAppForm } from '~/hooks/useAppForm';
import { BookingPageSchema } from './bookingPage.schema';
import { SERVICE_COLORS } from '~/styles/colors';
import { useModalStore } from '~/store/useModalStore';
import { useAuthStore } from '~/store/useAuthStore';
import { useEmployeeStore } from '~/store/useEmployeeStore';

export interface Employee {
  id: string;
  name: string;
  email: string;
  imageUrl?: string | null;
}

export interface DayHours {
  active: boolean;
  startHours: number;
  startMinutes: number;
  endHours: number;
  endMinutes: number;
}

export const DAYS_OF_WEEK = [
  { key: 'segunda', label: 'Segunda - feira' },
  { key: 'terca', label: 'Terça - feira' },
  { key: 'quarta', label: 'Quarta - feira' },
  { key: 'quinta', label: 'Quinta - feira' },
  { key: 'sexta', label: 'Sexta - feira' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' },
];

export function useMoreScreenViewModel() {
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);

  // States for Booking Page Configurations
  const [coverImage, setCoverImage] = useState<string>('');
  const [logoImage, setLogoImage] = useState<string>('');
  const [bookingColor, setBookingColor] = useState<string>(SERVICE_COLORS[0]);

  // States for Employees
  const employees = useEmployeeStore((state) => state.employees);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);

  // States for Operating Hours
  const [operatingHours, setOperatingHours] = useState<Record<string, DayHours>>({
    segunda: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
    terca: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
    quarta: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
    quinta: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
    sexta: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
    sabado: { active: false, startHours: 9, startMinutes: 0, endHours: 13, endMinutes: 0 },
    domingo: { active: false, startHours: 9, startMinutes: 0, endHours: 13, endMinutes: 0 },
  });

  const [lastFocusedDayKey, setLastFocusedDayKey] = useState<string>('segunda');
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [timePickerTarget, setTimePickerTarget] = useState<{ dayKey: string; type: 'start' | 'end' } | null>(null);

  // Form initialization
  const methods = useAppForm({
    schema: BookingPageSchema,
    defaultValues: {
      companyName: '',
      pageUrl: '',
      aboutCompany: '',
      email: '',
      countryCode: '+55',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      instagram: '',
      facebook: '',
    },
  });

  const toggleDropdown = useCallback((key: string) => {
    setActiveDropdownKey(prev => (prev === key ? null : key));
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza de que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            useAuthStore.getState().logout();
            router.replace('/login');
          },
        },
      ],
      { cancelable: true }
    );
  }, []);

  const handleShareApp = useCallback(() => {
    Clipboard.setString('https://connectservice.com.br/download');
    Alert.alert('Sucesso', 'Link do app copiado para a área de transferência!');
  }, []);

  const onSubmitBookingForm = methods.handleSubmit(
    (data) => {
      const payload = {
        ...data,
        coverImage,
        logoImage,
        bookingColor,
      };
      console.log('✅ Configurações da página salvas com sucesso:', payload);
      Alert.alert('Sucesso', 'Configurações da página salvas com sucesso!');
    },
    (errors) => {
      console.log('❌ Erros de validação do formulário:', errors);
      Alert.alert('Ops!', 'Preencha os campos obrigatórios corretamente.');
    }
  );

  // Operating Hours Handlers
  const toggleDay = useCallback((dayKey: string) => {
    setOperatingHours(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        active: !prev[dayKey].active,
      },
    }));
  }, []);

  const openTimePicker = useCallback((dayKey: string, type: 'start' | 'end') => {
    setLastFocusedDayKey(dayKey);
    setTimePickerTarget({ dayKey, type });
    setIsTimePickerVisible(true);
  }, []);

  const closeTimePicker = useCallback(() => {
    setIsTimePickerVisible(false);
    setTimePickerTarget(null);
  }, []);

  const updateSelectedTime = useCallback(({ hours, minutes }: { hours: number; minutes: number }) => {
    if (!timePickerTarget) return;
    const { dayKey, type } = timePickerTarget;

    setOperatingHours(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        startHours: type === 'start' ? hours : prev[dayKey].startHours,
        startMinutes: type === 'start' ? minutes : prev[dayKey].startMinutes,
        endHours: type === 'end' ? hours : prev[dayKey].endHours,
        endMinutes: type === 'end' ? minutes : prev[dayKey].endMinutes,
      },
    }));
  }, [timePickerTarget]);

  const copyTimesToAllDays = useCallback(() => {
    const source = operatingHours[lastFocusedDayKey];
    if (!source) return;

    setOperatingHours(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => {
        next[key] = {
          ...next[key],
          startHours: source.startHours,
          startMinutes: source.startMinutes,
          endHours: source.endHours,
          endMinutes: source.endMinutes,
        };
      });
      return next;
    });
    Alert.alert('Sucesso', 'Horários copiados para todos os dias!');
  }, [operatingHours, lastFocusedDayKey]);

  const openModal = useModalStore((state) => state.openModal);
  const openEmployeeModal = useCallback(() => {
    openModal('EMPLOYEE');
  }, [openModal]);

  return {
    activeDropdownKey,
    toggleDropdown,
    handleLogout,
    handleShareApp,
    
    // Booking Form bindings
    methods,
    coverImage,
    setCoverImage,
    logoImage,
    setLogoImage,
    bookingColor,
    setBookingColor,
    onSubmitBookingForm,

    // Operating Hours bindings
    operatingHours,
    lastFocusedDayKey,
    isTimePickerVisible,
    timePickerTarget,
    toggleDay,
    openTimePicker,
    closeTimePicker,
    updateSelectedTime,
    copyTimesToAllDays,

    // Employees bindings
    employees,
    filteredEmployees,
    setFilteredEmployees,
    openEmployeeModal,
  };
}


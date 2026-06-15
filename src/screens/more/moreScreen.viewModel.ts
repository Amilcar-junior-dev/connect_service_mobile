import { useState, useCallback } from 'react';
import { Alert, Clipboard } from 'react-native';
import { router } from 'expo-router';
import { useAppForm } from '~/hooks/useAppForm';
import { BookingPageSchema } from './bookingPage.schema';
import { SERVICE_COLORS } from '~/styles/colors';

export function useMoreScreenViewModel() {
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);

  // States for Booking Page Configurations
  const [coverImage, setCoverImage] = useState<string>('');
  const [logoImage, setLogoImage] = useState<string>('');
  const [bookingColor, setBookingColor] = useState<string>(SERVICE_COLORS[0]);

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
  };
}

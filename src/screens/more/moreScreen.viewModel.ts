import { useState, useCallback } from 'react';
import { Alert, Clipboard } from 'react-native';
import { router } from 'expo-router';

export function useMoreScreenViewModel() {
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);

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

  return {
    activeDropdownKey,
    toggleDropdown,
    handleLogout,
    handleShareApp,
  };
}

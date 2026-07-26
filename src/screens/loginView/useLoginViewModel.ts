import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppForm } from '~/hooks/useAppForm';
import { LoginFormData, loginScheme } from './login.scheme';
import { useModalStore } from '~/store/useModalStore';
import { supabase } from '~/lib/supabase';

export default function useLoginViewModel() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useAppForm({
    schema: loginScheme,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSubmit = methods.handleSubmit(async (loginData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        Alert.alert('Erro ao entrar', error.message);
        return;
      }

      router.push('/(private)/(tabs)/home');
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao fazer login.');
    } finally {
      setIsLoading(false);
    }
  });

  const handleForgotPassword = () => {
    useModalStore.getState().openModal('RECOVER_PASSWORD');
  };

  return {
    methods,
    isPasswordVisible,
    togglePasswordVisibility,
    isLoading,
    onSubmit,
    handleForgotPassword,
  };
}

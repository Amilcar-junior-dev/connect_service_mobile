import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppForm } from '~/hooks/useAppForm';
import { RegisterFormData, registerScheme } from './register.scheme';
import { supabase } from '~/lib/supabase';

export default function useRegisterViewModel() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useAppForm({
    schema: registerScheme,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const onSubmit = methods.handleSubmit(async (registerData) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
      });

      if (error) {
        Alert.alert('Erro ao cadastrar', error.message);
        return;
      }

      if (data.session) {
        Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
        router.push('/(private)/(tabs)/home');
      } else {
        Alert.alert(
          'Confirmar Conta',
          'Cadastro realizado! Por favor, confirme seu e-mail pelo link enviado para a sua caixa de entrada.'
        );
        router.push('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao realizar o cadastro.');
    } finally {
      setIsLoading(false);
    }
  });

  return {
    methods,
    isPasswordVisible,
    isConfirmPasswordVisible,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    isLoading,
    onSubmit,
  };
}

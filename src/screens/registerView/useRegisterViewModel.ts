import { useState } from 'react';
import { router } from 'expo-router';
import { useAppForm } from '~/hooks/useAppForm';
import { RegisterFormData, registerScheme } from './register.scheme';
import { useAuthStore } from '~/store/useAuthStore';

export default function useRegisterViewModel() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser } = useAuthStore();

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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save credentials to global state store
      setToken('mock-jwt-token-123');
      setUser({
        name: 'Novo Usuário',
        email: registerData.email,
      });

      // Redirect to private area
      router.push('/(private)/(tabs)/home');
    } catch (error) {
      console.error('Error registering user:', error);
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

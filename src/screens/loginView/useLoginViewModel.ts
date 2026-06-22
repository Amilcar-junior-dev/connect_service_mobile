import { useState } from 'react';
import { router } from 'expo-router';
import { useAppForm } from '~/hooks/useAppForm';
import { LoginFormData, loginScheme } from './login.scheme';
import { useAuthStore } from '~/store/useAuthStore';
import { useModalStore } from '~/store/useModalStore';

export default function useLoginViewModel() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser } = useAuthStore();

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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save credentials to global state store
      setToken('mock-jwt-token-123');
      setUser({
        name: 'Usuário Teste',
        email: loginData.email,
      });

      // Redirect to private area
      router.push('/(private)/(tabs)/home');
    } catch (error) {
      console.error('Error logging in:', error);
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

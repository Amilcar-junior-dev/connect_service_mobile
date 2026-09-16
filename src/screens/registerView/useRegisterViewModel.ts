import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppForm } from '~/hooks/useAppForm';
import { RegisterFormData, registerScheme } from './register.scheme';
import { supabase } from '~/lib/supabase';
import { toast } from '~/store/useToastStore';
import { mapSupabaseAuthError } from '~/utils/errorMapper';

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
        const mapped = mapSupabaseAuthError(error);
        toast.error(mapped.description, { title: mapped.title });
        return;
      }

      if (data.session) {
        toast.success('Cadastro realizado com sucesso!', { title: 'Boas-vindas!' });
        router.push('/onboarding');
      } else {
        toast.info(
          'Cadastro realizado! Por favor, confirme seu e-mail pelo link enviado para sua caixa de entrada.',
          { title: 'Confirmar Conta', duration: 6000 }
        );
        router.push('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      const mapped = mapSupabaseAuthError(error);
      toast.error(mapped.description, { title: mapped.title });
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

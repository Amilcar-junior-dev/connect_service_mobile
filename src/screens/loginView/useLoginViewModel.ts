import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppForm } from '~/hooks/useAppForm';
import { loginScheme } from './login.scheme';
import { useModalStore } from '~/store/useModalStore';
import { supabase } from '~/lib/supabase';
import { companyService } from '~/services/companyService';
import { useOnboardingStore } from '~/store/useOnboardingStore';
import { toast } from '~/store/useToastStore';
import { mapSupabaseAuthError } from '~/utils/errorMapper';

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

      console.log("🚀 ~ useLoginViewModel.ts:33 ~ useLoginViewModel ~ error:", error)
      if (error) {
        const mapped = mapSupabaseAuthError(error);
        toast.error(mapped.description, { title: mapped.title });
        return;
      }

      // Verifica no Supabase se o usuário já possui empresa configurada
      let isCompanyCompleted = false;
      try {
        const company = await companyService.getCompanyByOwner();
        if (company?.onboarding_completed) {
          isCompanyCompleted = true;
          useOnboardingStore.getState().setOnboardingCompleted(true);
        }
      } catch (err) {
        console.log('Erro ao checar empresa no login:', err);
      }

      if (isCompanyCompleted || useOnboardingStore.getState().isOnboardingCompleted) {
        router.push('/(private)/(tabs)/home');
      } else {
        router.push('/onboarding');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      const mapped = mapSupabaseAuthError(error);
      toast.error(mapped.description, { title: mapped.title });
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

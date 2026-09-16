import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as Linking from 'expo-linking';

import { useAppForm } from '~/hooks/useAppForm';
import { resetPasswordScheme } from './resetPassword.schema';
import { supabase } from '~/lib/supabase';

export function useResetPasswordViewModel() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const url = Linking.useLinkingURL();

  const methods = useAppForm({
    schema: resetPasswordScheme,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    async function handleSessionExchange() {
      if (!url) return;

      setIsLoading(true);
      try {
        // Converte o fragmento hash (#) em query param (?) para conseguir parsear em ambos os fluxos
        const cleanUrl = url.replace('#', '?');
        const parsed = Linking.parse(cleanUrl);
        const queryParams = parsed?.queryParams;

        if (queryParams?.code) {
          // PKCE Flow (Código de uso único)
          const { error } = await supabase.auth.exchangeCodeForSession(String(queryParams.code));
          if (error) throw error;
        } else if (queryParams?.access_token && queryParams?.refresh_token) {
          // Implicit Flow (Tokens diretos no hash da URL)
          const { error } = await supabase.auth.setSession({
            access_token: String(queryParams.access_token),
            refresh_token: String(queryParams.refresh_token),
          });
          if (error) throw error;
        } else {
          // Sem tokens na URL, verifica se já existe sessão ativa carregada
          const { data } = await supabase.auth.getSession();
          if (!data?.session) {
            Alert.alert(
              'Acesso Negado',
              'Você precisa de um link de e-mail de recuperação válido para acessar esta tela.',
              [
                {
                  text: 'Ir para o Login',
                  onPress: () => router.replace('/login'),
                },
              ]
            );
          }
        }
      } catch (err: any) {
        console.error('Error exchanging code/session:', err);
        Alert.alert(
          'Link Inválido',
          'O link de recuperação expirou ou é inválido. Solicite um novo link: ' + (err?.message || ''),
          [
            {
              text: 'Ir para o Login',
              onPress: () => router.replace('/login'),
            },
          ]
        );
      } finally {
        setIsLoading(false);
      }
    }
    handleSessionExchange();
  }, [url]);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        Alert.alert('Erro ao redefinir senha', error.message);
        return;
      }

      Alert.alert(
        'Senha Redefinida',
        'Sua senha foi alterada com sucesso! Você já pode entrar com suas novas credenciais.',
        [
          {
            text: 'Ir para o Login',
            onPress: () => {
              router.replace('/login');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao redefinir sua senha.');
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

export default useResetPasswordViewModel;

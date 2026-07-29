import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { useAppForm } from '~/hooks/useAppForm';
import { useModalStore } from '~/store/useModalStore';
import { RecoverPasswordSchema } from './modalRecoverPassword.schema';
import { supabase } from '~/lib/supabase';

export function useModalRecoverPasswordViewModel() {
  const modalRef = useRef<Modalize>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useAppForm({
    schema: RecoverPasswordSchema,
    defaultValues: {
      email: '',
    },
  });

  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    modalRef.current?.open();
  }, []);

  const handleClose = () => {
    modalRef.current?.close();
  };

  const onSubmit = methods.handleSubmit(
    async (dat) => {
      setIsLoading(true);
      try {
        const { error, data } = await supabase.auth.resetPasswordForEmail(dat.email, {
          redirectTo: 'connectservice://reset-password',
        });

        if (error) {
          Alert.alert('Erro ao solicitar recuperação', error.message);
          return;
        }

        console.log('✅ Solicitação de recuperação enviada para:', dat.email);

        Alert.alert(
          'Recuperação de Senha',
          'Se o e-mail informado estiver cadastrado, você receberá um link para redefinir sua senha.',
          [
            {
              text: 'OK',
              onPress: () => {
                handleClose();
              },
            },
          ]
        );
      } catch (error) {
        console.error('Error requesting password recovery:', error);
        Alert.alert('Erro', 'Ocorreu um erro inesperado ao solicitar a recuperação de senha.');
      } finally {
        setIsLoading(false);
      }
    },
    (errors) => {
      console.log('❌ Validação do formulário:', errors);
    }
  );

  return {
    modalRef,
    methods,
    isLoading,
    onSubmit,
    handleClose,
    closeModal,
  };
}

import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FormProvider } from 'react-hook-form';

import { useModalRecoverPasswordViewModel } from './modalRecoverPassword.viewModel';
import Close from '~/assets/svg/Close.svg';
import { useActiveTheme } from '~/hooks/colorScheme';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';

interface RecoverPasswordModalProps {
  data?: Record<string, unknown> | null;
}

export function ModalRecoverPassword({ data }: RecoverPasswordModalProps) {
  const { colors } = useActiveTheme();
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const vm = useModalRecoverPasswordViewModel();

  const MODAL_HEIGHT = SCREEN_HEIGHT * 0.40;

  return (
    <Modalize
      ref={vm.modalRef}
      modalHeight={MODAL_HEIGHT}
      openAnimationConfig={{
        timing: { duration: 200 },
      }}
      handlePosition="inside"
      keyboardAvoidingBehavior="padding"
      tapGestureEnabled={false}
      panGestureEnabled={false}
      closeOnOverlayTap={false}
      withHandle={false}
      modalStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#FFFFFF',
      }}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
          paddingBottom: 40,
          paddingTop: 10,
        },
      }}
      HeaderComponent={
        <View className={`w-full px-5 py-8 pt-4 relative`}>
          <Text className={`text-2xl self-center text-ink font-bold`}>
            Recuperar Senha
          </Text>
          <View className={`absolute top-4 right-5`}>
            <TouchableOpacity onPress={vm.handleClose} className={`p-1`}>
              <Close color={colors.ink} height={30} width={30} />
            </TouchableOpacity>
          </View>
        </View>
      }
      onClosed={vm.closeModal}
    >
      <View className={`flex-1 pl-4 pr-4 mt-2`}>
        <FormProvider {...vm.methods}>
          <TextInputComponent
            name="email"
            label=""
            placeholder="Digite seu email para recuperar a senha"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!vm.isLoading}
            containerClass={`mb-2`}
          />
        </FormProvider>

        <TouchableOpacity
          onPress={vm.onSubmit}
          className={`bg-tabBar h-12 items-center justify-center rounded-xl mt-4 shadow-sm`}
          disabled={vm.isLoading}
          activeOpacity={0.8}
        >
          {vm.isLoading ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <Text className={`font-bold text-surface text-base`}>Recuperar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={vm.handleClose}
          className={`p-2 items-center justify-center mt-1`}
          disabled={vm.isLoading}
          activeOpacity={0.7}
        >
          <Text className={`text-muted font-robotoMedium text-base`}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
}

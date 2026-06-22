import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FormProvider, Controller } from 'react-hook-form';

import { useModalRecoverPasswordViewModel } from './modalRecoverPassword.viewModel';
import Close from '~/assets/svg/Close.svg';
import { useActiveTheme } from '~/hooks/colorScheme';

interface RecoverPasswordModalProps {
  data?: Record<string, unknown> | null;
}

export function ModalRecoverPassword({ data }: RecoverPasswordModalProps) {
  const { colors } = useActiveTheme();
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const vm = useModalRecoverPasswordViewModel();
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const MAX_MODAL_HEIGHT = SCREEN_HEIGHT * 0.92;

  return (
    <Modalize
      ref={vm.modalRef}
      modalHeight={MAX_MODAL_HEIGHT}
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
          paddingBottom: 100,
          paddingTop: 20,
        },
      }}
      HeaderComponent={
        <View className={`w-full px-5 py-12 pt-4 relative`}>
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
      <View className={`flex-1 pl-4 pr-4 mt-6`}>
        <FormProvider {...vm.methods}>
          <Controller
            control={vm.methods.control}
            name="email"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View className={`w-full mb-6`}>
                <View
                  className={`flex-row w-full h-12 px-4 rounded-xl border items-center bg-stone/5 ${
                    error ? 'border-danger' : isEmailFocused ? 'border-tabBar' : 'border-stone/30'
                  }`}
                >
                  <TextInput
                    className={`flex-1 text-base text-ink font-robotoRegular`}
                    placeholder="Digite seu email para recuperar a senha"
                    placeholderTextColor={colors.muted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => {
                      setIsEmailFocused(false);
                      onBlur();
                    }}
                    onChangeText={onChange}
                    value={value}
                    editable={!vm.isLoading}
                  />
                </View>
                {error && (
                  <Text className={`text-xs text-danger mt-1 font-robotoRegular`}>
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </FormProvider>

        <TouchableOpacity
          onPress={vm.onSubmit}
          className={`bg-tabBar h-12 items-center justify-center rounded-xl mt-6 shadow-sm`}
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
          className={`p-3 items-center justify-center mt-2`}
          disabled={vm.isLoading}
          activeOpacity={0.7}
        >
          <Text className={`text-muted font-robotoMedium text-base`}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
}

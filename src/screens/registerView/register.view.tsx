import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider } from 'react-hook-form';
import { router } from 'expo-router';

import { useActiveTheme } from '~/hooks/colorScheme';
import useRegisterViewModel from './useRegisterViewModel';
import LogoConnect from '~/assets/svg/LogoConnect.svg';
import Eye from '~/assets/svg/Eye.svg';
import CloseEye from '~/assets/svg/CloseEye.svg';
import { FormScrollContainer } from '~/components/formScroll/FormScrollContainer';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';

export const RegisterView: React.FC<ReturnType<typeof useRegisterViewModel>> = ({
  methods,
  isPasswordVisible,
  isConfirmPasswordVisible,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  isLoading,
  onSubmit,
}) => {
  const { colors, vars } = useActiveTheme();

  return (
    <View style={[vars]} className={`flex-1 bg-surface`}>
      <SafeAreaView className={`flex-1`} edges={['top', 'bottom']}>
        <FormScrollContainer contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 40 }}>
          <View className={`items-center justify-center mb-8 mt-4`}>
            <LogoConnect width={220} height={120} color={colors.ink} />
          </View>

          <Text className={`text-sm font-robotoMedium text-ink mb-6 text-center`}>CRIE SUA CONTA</Text>

          <FormProvider {...methods}>
            <View className={`w-full gap-y-4`}>
              
              <TextInputComponent
                name="email"
                label="Email"
                placeholder="Digite seu email"
                placeholderTextColor={colors.muted}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
                labelClass={`font-robotoMedium`}
                className={`flex-1 text-base text-ink font-robotoRegular`}
              />

              <TextInputComponent
                name="password"
                label="Senha"
                placeholder="Digite sua senha"
                placeholderTextColor={colors.muted}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                editable={!isLoading}
                labelClass={`font-robotoMedium`}
                className={`flex-1 text-base text-ink font-robotoRegular`}
                rightIcon={
                  <TouchableOpacity 
                    onPress={togglePasswordVisibility}
                    className={`p-1`}
                    activeOpacity={0.7}
                  >
                    {isPasswordVisible ? (
                      <Eye width={20} height={20} color={colors.ink} />
                    ) : (
                      <CloseEye width={20} height={20} color={colors.ink} />
                    )}
                  </TouchableOpacity>
                }
              />

              <TextInputComponent
                name="confirmPassword"
                label="Confirmar senha"
                placeholder="Confirmar senha"
                placeholderTextColor={colors.muted}
                secureTextEntry={!isConfirmPasswordVisible}
                autoCapitalize="none"
                editable={!isLoading}
                labelClass={`font-robotoMedium`}
                className={`flex-1 text-base text-ink font-robotoRegular`}
                rightIcon={
                  <TouchableOpacity 
                    onPress={toggleConfirmPasswordVisibility}
                    className={`p-1`}
                    activeOpacity={0.7}
                  >
                    {isConfirmPasswordVisible ? (
                      <Eye width={20} height={20} color={colors.ink} />
                    ) : (
                      <CloseEye width={20} height={20} color={colors.ink} />
                    )}
                  </TouchableOpacity>
                }
              />

              <TouchableOpacity
                onPress={onSubmit}
                className={`w-full bg-tabBar h-12 rounded-xl items-center justify-center mt-6 shadow-sm`}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.surface} />
                ) : (
                  <Text className={`text-base font-robotoBold text-surface font-bold`}>Criar Conta</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.replace('/login');
                }}
                className={`w-full border border-tabBar h-12 rounded-xl items-center justify-center`}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text className={`text-base font-robotoBold text-tabBar font-bold`}>Já tenho conta</Text>
              </TouchableOpacity>

            </View>
          </FormProvider>
        </FormScrollContainer>
      </SafeAreaView>
    </View>
  );
};

export default RegisterView;

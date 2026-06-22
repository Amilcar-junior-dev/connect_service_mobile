import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider } from 'react-hook-form';
import { router } from 'expo-router';

import { useActiveTheme } from '~/hooks/colorScheme';
import useLoginViewModel from './useLoginViewModel';
import LogoConnect from '~/assets/svg/LogoConnect.svg';
import Eye from '~/assets/svg/Eye.svg';
import CloseEye from '~/assets/svg/CloseEye.svg';
import GoogleLogo from '~/assets/svg/GoogleLogo.svg';
import { FormScrollContainer } from '~/components/formScroll/FormScrollContainer';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';

export const LoginView: React.FC<ReturnType<typeof useLoginViewModel>> = ({
  methods,
  isPasswordVisible,
  togglePasswordVisibility,
  isLoading,
  onSubmit,
  handleForgotPassword,
}) => {
  const { colors, vars } = useActiveTheme();

  return (
    <View style={[vars]} className={`flex-1 bg-surface`}>
      <SafeAreaView className={`flex-1`} edges={['top', 'bottom']}>
        <FormScrollContainer contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 40 }}>
          <View className={`items-center justify-center mb-8 mt-4`}>
            <LogoConnect width={220} height={120} color={colors.ink} />
          </View>

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

              <TouchableOpacity
                onPress={handleForgotPassword}
                className={`self-end py-1`}
                activeOpacity={0.7}
              >
                <Text className={`text-xs font-robotoMedium text-ink/80 underline`}>Esqueci minha senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onSubmit}
                className={`w-full bg-tabBar h-12 rounded-xl items-center justify-center mt-4 shadow-sm`}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.surface} />
                ) : (
                  <Text className={`text-base font-robotoBold text-surface font-bold`}>Entrar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.push('/register');
                }}
                className={`w-full border border-tabBar h-12 rounded-xl items-center justify-center`}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text className={`text-base font-robotoBold text-tabBar font-bold`}>Criar conta</Text>
              </TouchableOpacity>

              <View className={`flex-row items-center my-6`}>
                <View className={`flex-1 h-[1px] bg-stone/20`}></View>
                <Text className={`mx-4 text-xs font-robotoMedium text-muted`}>OU</Text>
                <View className={`flex-1 h-[1px] bg-stone/20`}></View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  console.log('Google Auth pressed');
                }}
                className={`w-full bg-accent h-12 rounded-xl flex-row items-center justify-center gap-x-2`}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <GoogleLogo width={18} height={18} />
                <Text className={`text-base font-robotoBold text-white font-bold`}>Entrar com o Google</Text>
              </TouchableOpacity>

            </View>
          </FormProvider>
        </FormScrollContainer>
      </SafeAreaView>
    </View>
  );
};

export default LoginView;
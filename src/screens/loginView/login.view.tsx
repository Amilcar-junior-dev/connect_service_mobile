import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, FormProvider } from 'react-hook-form';
import { router } from 'expo-router';

import { useActiveTheme } from '~/hooks/colorScheme';
import useLoginViewModel from './useLoginViewModel';
import LogoConnect from '~/assets/svg/LogoConnect.svg';
import Eye from '~/assets/svg/Eye.svg';
import CloseEye from '~/assets/svg/CloseEye.svg';
import GoogleLogo from '~/assets/svg/GoogleLogo.svg';
import { FormScrollContainer } from '~/components/formScroll/FormScrollContainer';

export const LoginView: React.FC<ReturnType<typeof useLoginViewModel>> = ({
  methods,
  isPasswordVisible,
  togglePasswordVisibility,
  isLoading,
  onSubmit,
}) => {
  const { colors, vars } = useActiveTheme();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <View style={[vars]} className={`flex-1 bg-surface`}>
      <SafeAreaView className={`flex-1`} edges={['top', 'bottom']}>
        <FormScrollContainer contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 40 }}>
          {/* Logo Section */}
          <View className={`items-center justify-center mb-8 mt-4`}>
            <LogoConnect width={220} height={120} color={colors.ink} />
          </View>

          {/* Form */}
          <FormProvider {...methods}>
            <View className={`w-full gap-y-4`}>
              
              {/* Email field */}
              <View className={`w-full`}>
                <Text className={`text-sm font-robotoMedium text-ink mb-1`}>Email</Text>
                <Controller
                  control={methods.control}
                  name="email"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                      <View
                        className={`flex-row w-full h-12 px-4 rounded-xl border items-center bg-stone/5 ${
                          error ? 'border-danger' : isEmailFocused ? 'border-tabBar' : 'border-stone/30'
                        }`}
                      >
                        <TextInput
                          className={`flex-1 text-base text-ink font-robotoRegular`}
                          placeholder="Digite seu email"
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
                          editable={!isLoading}
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
              </View>

              {/* Password field */}
              <View className={`w-full`}>
                <Text className={`text-sm font-robotoMedium text-ink mb-1`}>Senha</Text>
                <Controller
                  control={methods.control}
                  name="password"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                      <View
                        className={`flex-row w-full h-12 px-4 rounded-xl border items-center bg-stone/5 ${
                          error ? 'border-danger' : isPasswordFocused ? 'border-tabBar' : 'border-stone/30'
                        }`}
                      >
                        <TextInput
                          className={`flex-1 text-base text-ink font-robotoRegular`}
                          placeholder="Digite sua senha"
                          placeholderTextColor={colors.muted}
                          secureTextEntry={!isPasswordVisible}
                          autoCapitalize="none"
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => {
                            setIsPasswordFocused(false);
                            onBlur();
                          }}
                          onChangeText={onChange}
                          value={value}
                          editable={!isLoading}
                        />
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
                      </View>
                      {error && (
                        <Text className={`text-xs text-danger mt-1 font-robotoRegular`}>
                          {error.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
              </View>

              {/* Forgot password */}
              <TouchableOpacity
                onPress={() => {
                  console.log('Forgot password pressed');
                }}
                className={`self-end py-1`}
                activeOpacity={0.7}
              >
                <Text className={`text-xs font-robotoMedium text-ink/80`}>Esqueci minha senha</Text>
              </TouchableOpacity>

              {/* Login Button */}
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

              {/* Register Button */}
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

              {/* Divider */}
              <View className={`flex-row items-center my-6`}>
                <View className={`flex-1 h-[1px] bg-stone/20`}></View>
                <Text className={`mx-4 text-xs font-robotoMedium text-muted`}>OU</Text>
                <View className={`flex-1 h-[1px] bg-stone/20`}></View>
              </View>

              {/* Google Login Button */}
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
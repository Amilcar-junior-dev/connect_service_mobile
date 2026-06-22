import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, FormProvider } from 'react-hook-form';
import { router } from 'expo-router';

import { useActiveTheme } from '~/hooks/colorScheme';
import useRegisterViewModel from './useRegisterViewModel';
import LogoConnect from '~/assets/svg/LogoConnect.svg';
import Eye from '~/assets/svg/Eye.svg';
import CloseEye from '~/assets/svg/CloseEye.svg';
import { FormScrollContainer } from '~/components/formScroll/FormScrollContainer';

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
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  return (
    <View style={[vars]} className={`flex-1 bg-surface`}>
      <SafeAreaView className={`flex-1`} edges={['top', 'bottom']}>
        <FormScrollContainer contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 40 }}>
          {/* Logo Section */}
          <View className={`items-center justify-center mb-8 mt-4`}>
            <LogoConnect width={220} height={120} color={colors.ink} />
          </View>

          {/* Header text */}
          <Text className={`text-sm font-robotoMedium text-ink mb-6 text-center`}>CRIE SUA CONTA</Text>

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

              {/* Confirm Password field */}
              <View className={`w-full`}>
                <Text className={`text-sm font-robotoMedium text-ink mb-1`}>Senha</Text>
                <Controller
                  control={methods.control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                      <View
                        className={`flex-row w-full h-12 px-4 rounded-xl border items-center bg-stone/5 ${
                          error ? 'border-danger' : isConfirmPasswordFocused ? 'border-tabBar' : 'border-stone/30'
                        }`}
                      >
                        <TextInput
                          className={`flex-1 text-base text-ink font-robotoRegular`}
                          placeholder="Confirmar senha"
                          placeholderTextColor={colors.muted}
                          secureTextEntry={!isConfirmPasswordVisible}
                          autoCapitalize="none"
                          onFocus={() => setIsConfirmPasswordFocused(true)}
                          onBlur={() => {
                            setIsConfirmPasswordFocused(false);
                            onBlur();
                          }}
                          onChangeText={onChange}
                          value={value}
                          editable={!isLoading}
                        />
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

              {/* Register Button */}
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

              {/* Back to Login Button */}
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

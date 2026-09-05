import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useActiveTheme } from '~/hooks/colorScheme';
import {
  useOnboardingViewModel,
  PRESET_SPECIALIZATIONS,
} from './useOnboardingViewModel';
import { CircularImageInput } from '~/components/inputs/circularImageInput/CircularImageInput.view';
import ArrowLeft from '~/assets/svg/ArrowLeft.svg';

const DAYS_LIST = [
  { key: 'domingo', label: 'Dom.' },
  { key: 'segunda', label: 'Seg.' },
  { key: 'terca', label: 'Ter.' },
  { key: 'quarta', label: 'Qua.' },
  { key: 'quinta', label: 'Qui.' },
  { key: 'sexta', label: 'Sex.' },
  { key: 'sabado', label: 'Sáb.' },
];

export function OnboardingView() {
  const { colors, vars } = useActiveTheme();
  const vm = useOnboardingViewModel();

  return (
    <View style={[vars]} className="flex-1 bg-surface">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        {/* Header do Benchmark */}
        <View className="px-4 pt-2 pb-3">
          <View className="flex-row items-center justify-between h-10 mb-2">
            {vm.currentStep > 1 ? (
              <TouchableOpacity
                onPress={vm.handlePrevStep}
                className="p-2 -ml-2"
                activeOpacity={0.7}
              >
                <ArrowLeft width={24} height={24} color={colors.ink} />
              </TouchableOpacity>
            ) : (
              <View className="w-6" />
            )}

            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-sm font-robotoMedium text-accent">Ajuda</Text>
            </TouchableOpacity>
          </View>

          {/* Barra de Progresso Fina */}
          <View className="w-full h-1 bg-stone/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-accent rounded-full"
              style={{ width: vm.progressPercentage }}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* PASSO 1: QUAL É O SEU NOME? (Imagem 1 Benchmark) */}
          {vm.currentStep === 1 && (
            <View className="flex-1 justify-between pt-2">
              <View>
                <Text className="text-2xl font-robotoBold text-ink mb-2">
                  Qual é o seu nome?
                </Text>
                <Text className="text-sm font-robotoRegular text-ink/70 mb-8 leading-5">
                  Os clientes verão seu nome no perfil e ao agendar online (pode ser seu nome pessoal ou o nome da sua empresa).
                </Text>

                {/* Photo / Logo Picker (Opcional - Propaga para o TopSheet) */}
                <View className="items-center mb-8">
                  <CircularImageInput
                    value={vm.avatarUrl}
                    onChangeImage={vm.setAvatarUrl}
                    placeholderText="Adicionar foto"
                  />
                </View>

                {/* Inputs de Nome e Sobrenome */}
                <View className="gap-y-4">
                  <View className="bg-stone/10 rounded-2xl px-4 py-3 border border-stone/20">
                    <TextInput
                      placeholder="Nome *"
                      placeholderTextColor={colors.muted}
                      value={vm.firstName}
                      onChangeText={vm.setFirstName}
                      autoCapitalize="words"
                      className="text-base text-ink font-robotoRegular h-10"
                    />
                  </View>

                  <View className="bg-stone/10 rounded-2xl px-4 py-3 border border-stone/20">
                    <TextInput
                      placeholder="Sobrenome / Nome da Empresa (Opcional)"
                      placeholderTextColor={colors.muted}
                      value={vm.lastName}
                      onChangeText={vm.setLastName}
                      autoCapitalize="words"
                      className="text-base text-ink font-robotoRegular h-10"
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={vm.handleStep1Next}
                className="w-full bg-accent h-14 rounded-2xl items-center justify-center mt-8 shadow-sm"
                activeOpacity={0.8}
              >
                <Text className="text-base font-robotoBold text-white font-bold">
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* PASSO 2: ESPECIALIZAÇÃO (Imagem 2 Benchmark) */}
          {vm.currentStep === 2 && (
            <View className="flex-1 justify-between pt-2">
              <View>
                <Text className="text-2xl font-robotoBold text-ink mb-6">
                  {vm.firstName ? `${vm.firstName}, informe` : 'Informe'} sua especialização
                </Text>

                {/* Input para digitação customizada */}
                <View className="bg-stone/10 rounded-2xl px-4 py-3 border border-stone/20 mb-4">
                  <TextInput
                    placeholder="Outra especialização (digite aqui...)"
                    placeholderTextColor={colors.muted}
                    value={vm.customSpecialization}
                    onChangeText={(txt) => {
                      vm.setCustomSpecialization(txt);
                      if (txt) vm.setSpecialization('');
                    }}
                    className="text-base text-ink font-robotoRegular h-10"
                  />
                </View>

                {/* Lista de Opções Radio */}
                <View className="gap-y-2 mb-6">
                  {PRESET_SPECIALIZATIONS.map((spec) => {
                    const isSelected = !vm.customSpecialization && vm.specialization === spec;
                    return (
                      <TouchableOpacity
                        key={spec}
                        onPress={() => {
                          vm.setCustomSpecialization('');
                          vm.setSpecialization(spec);
                        }}
                        className={`flex-row items-center justify-between p-4 rounded-2xl border ${
                          isSelected
                            ? 'border-accent bg-accent/10'
                            : 'border-stone/20 bg-stone/5'
                        }`}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={`text-base font-robotoMedium ${
                            isSelected ? 'text-accent font-bold' : 'text-ink'
                          }`}
                        >
                          {spec}
                        </Text>
                        <View
                          className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                            isSelected ? 'border-accent bg-accent' : 'border-stone/40'
                          }`}
                        >
                          {isSelected && <View className="w-2 h-2 rounded-full bg-white" />}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <TouchableOpacity
                onPress={vm.handleStep2Next}
                className="w-full bg-accent h-14 rounded-2xl items-center justify-center mt-6 shadow-sm"
                activeOpacity={0.8}
              >
                <Text className="text-base font-robotoBold text-white font-bold">
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* PASSO 3: LOCAL DE TRABALHO & ENDEREÇO (Imagem 3 Benchmark) */}
          {vm.currentStep === 3 && (
            <View className="flex-1 justify-between pt-2">
              <View>
                <Text className="text-2xl font-robotoBold text-ink mb-6">
                  Informe seu local de trabalho
                </Text>

                <View className="gap-y-3">
                  <View className="bg-stone/10 rounded-2xl px-4 py-3 border border-stone/20">
                    <TextInput
                      placeholder="Nome do local (ex: Vikings barbudos)"
                      placeholderTextColor={colors.muted}
                      value={vm.workplaceName}
                      onChangeText={vm.setWorkplaceName}
                      autoCapitalize="words"
                      className="text-base text-ink font-robotoRegular h-10"
                    />
                  </View>

                  <View className="flex-row items-center gap-x-2">
                    <View className="flex-1 bg-stone/10 rounded-2xl px-4 py-3 border border-stone/20">
                      <TextInput
                        placeholder="CEP (ex: 01001-000)"
                        placeholderTextColor={colors.muted}
                        value={vm.zipCode}
                        onChangeText={vm.setZipCode}
                        keyboardType="numeric"
                        maxLength={9}
                        className="text-base text-ink font-robotoRegular h-10"
                      />
                    </View>
                    {vm.isFetchingCep && <ActivityIndicator color={colors.accent} />}
                  </View>

                  <View className="bg-stone/10 rounded-2xl px-4 py-3 border border-stone/20">
                    <TextInput
                      placeholder="Rua / Endereço"
                      placeholderTextColor={colors.muted}
                      value={vm.address}
                      onChangeText={vm.setAddress}
                      className="text-base text-ink font-robotoRegular h-10"
                    />
                  </View>

                  <View className="flex-row gap-x-2">
                    <View className="flex-1 bg-stone/10 rounded-2xl px-4 py-3 border border-stone/20">
                      <TextInput
                        placeholder="Bairro / Cidade"
                        placeholderTextColor={colors.muted}
                        value={vm.city}
                        onChangeText={vm.setCity}
                        className="text-base text-ink font-robotoRegular h-10"
                      />
                    </View>
                    <View className="w-24 bg-stone/10 rounded-2xl px-4 py-3 border border-stone/20">
                      <TextInput
                        placeholder="UF"
                        placeholderTextColor={colors.muted}
                        value={vm.state}
                        onChangeText={vm.setState}
                        autoCapitalize="characters"
                        maxLength={2}
                        className="text-base text-ink font-robotoRegular h-10 text-center"
                      />
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={vm.handleStep3Next}
                className="w-full bg-accent h-14 rounded-2xl items-center justify-center mt-8 shadow-sm"
                activeOpacity={0.8}
              >
                <Text className="text-base font-robotoBold text-white font-bold">
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* PASSO 4: HORÁRIOS DE TRABALHO (Imagem 4 Benchmark) */}
          {vm.currentStep === 4 && (
            <View className="flex-1 justify-between pt-2">
              <View>
                <Text className="text-2xl font-robotoBold text-ink mb-2">
                  Configure seu horário de trabalho
                </Text>
                <Text className="text-sm font-robotoRegular text-ink/70 mb-6 leading-5">
                  Informe seu horário de atendimento. Não se preocupe: você poderá editar isso depois, se necessário.
                </Text>

                {/* Lista de Dias da Semana com Switches Toggles */}
                <View className="gap-y-3">
                  {DAYS_LIST.map((day) => {
                    const dayConfig = vm.operatingHours[day.key] || {
                      active: true,
                      startHours: 9,
                      startMinutes: 0,
                      endHours: 18,
                      endMinutes: 0,
                    };

                    const startTimeStr = `${String(dayConfig.startHours).padStart(2, '0')}:${String(dayConfig.startMinutes).padStart(2, '0')}`;
                    const endTimeStr = `${String(dayConfig.endHours).padStart(2, '0')}:${String(dayConfig.endMinutes).padStart(2, '0')}`;

                    return (
                      <View
                        key={day.key}
                        className="flex-row items-center justify-between p-4 rounded-2xl bg-stone/5 border border-stone/20"
                      >
                        <View className="flex-row items-center gap-x-4">
                          <Text className="text-base font-robotoBold text-ink w-12">
                            {day.label}
                          </Text>
                          {dayConfig.active ? (
                            <Text className="text-sm font-robotoMedium text-ink/80">
                              {startTimeStr} - {endTimeStr}
                            </Text>
                          ) : (
                            <Text className="text-sm font-robotoRegular text-muted italic">
                              Fechado
                            </Text>
                          )}
                        </View>

                        <Switch
                          value={dayConfig.active}
                          onValueChange={() => vm.toggleDay(day.key)}
                          trackColor={{ false: '#e2e8f0', true: colors.accent }}
                          thumbColor="#ffffff"
                        />
                      </View>
                    );
                  })}
                </View>
              </View>

              <TouchableOpacity
                onPress={vm.handleFinishOnboarding}
                className="w-full bg-accent h-14 rounded-2xl items-center justify-center mt-8 shadow-sm"
                disabled={vm.isLoading}
                activeOpacity={0.8}
              >
                {vm.isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-base font-robotoBold text-white font-bold">
                    Concluir Setup
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

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
import { TimePickerModal } from '~/components/modals/timePicker/TimePickerModal.view';
import ArrowLeft from '~/assets/svg/ArrowLeft.svg';
import Copy from '~/assets/svg/Copy.svg';

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

  const handleBottomButtonPress = () => {
    if (vm.currentStep === 1) {
      vm.handleStep1Next();
    } else if (vm.currentStep === 2) {
      vm.handleStep2Next();
    } else if (vm.currentStep === 3) {
      vm.handleStep3Next();
    } else if (vm.currentStep === 4) {
      vm.handleFinishOnboarding();
    }
  };

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

            {/* Botão Ajuda (Oculto na UI conforme solicitação) */}
            {false && (
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-sm font-robotoMedium text-accent">Ajuda</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Barra de Progresso Fina */}
          <View className="w-full h-1 bg-stone/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-accent rounded-full"
              style={{ width: vm.progressPercentage }}
            />
          </View>
        </View>

        {/* Corpo Scrollável dos Passos */}
        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* PASSO 1: QUAL É O SEU NOME? (Imagem 1 Benchmark) */}
          {vm.currentStep === 1 && (
            <View className="pt-2">
              <Text className="text-2xl font-robotoBold text-ink mb-2">
                Qual é o seu nome?
              </Text>
              <Text className="text-sm font-robotoRegular text-ink/70 mb-8 leading-5">
                Os clientes verão seu nome no perfil e ao agendar online (pode ser seu nome pessoal ou o nome da sua empresa).
              </Text>

              {/* Photo / Logo Picker (Centralizado) */}
              <View className="items-center justify-center mb-8 w-full">
                <CircularImageInput
                  imageUri={vm.avatarUrl}
                  onChangeImage={vm.setAvatarUrl}
                  onRemoveImage={() => vm.setAvatarUrl('')}
                  containerClass="justify-center mb-0"
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
          )}

          {/* PASSO 2: ESPECIALIZAÇÃO (Imagem 2 Benchmark) */}
          {vm.currentStep === 2 && (
            <View className="pt-2">
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
              <View className="gap-y-2 mb-4">
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
          )}

          {/* PASSO 3: LOCAL DE TRABALHO & ENDEREÇO (Imagem 3 Benchmark) */}
          {vm.currentStep === 3 && (
            <View className="pt-2">
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
          )}

          {/* PASSO 4: HORÁRIOS DE TRABALHO (Imagem 4 Benchmark) */}
          {vm.currentStep === 4 && (
            <View className="pt-2">
              <Text className="text-2xl font-robotoBold text-ink mb-2">
                Configure seu horário de trabalho
              </Text>
              <Text className="text-sm font-robotoRegular text-ink/70 mb-4 leading-5">
                Informe seu horário de atendimento. Não se preocupe: você poderá editar isso depois, se necessário.
              </Text>

              {/* Botão de Copiar Horários (Oculto na UI conforme solicitação) */}
              {false && (
                <View className="flex-row justify-end mb-4">
                  <TouchableOpacity
                    onPress={vm.copyTimesToAllDays}
                    activeOpacity={0.7}
                    className="flex-row items-center bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20"
                  >
                    <Copy color={colors.accent} width={14} height={14} className="mr-1.5" />
                    <Text className="text-accent text-xs font-robotoMedium">
                      Copiar para todos os dias
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Lista de Dias da Semana com Seleção Interativa de Horário */}
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

                  const isEditingStart =
                    vm.timePickerTarget?.dayKey === day.key && vm.timePickerTarget?.type === 'start';
                  const isEditingEnd =
                    vm.timePickerTarget?.dayKey === day.key && vm.timePickerTarget?.type === 'end';

                  return (
                    <View
                      key={day.key}
                      className="flex-row items-center justify-between p-3.5 rounded-2xl bg-stone/5 border border-stone/20"
                    >
                      <View className="flex-row items-center gap-x-3">
                        <Text className="text-base font-robotoBold text-ink w-12">
                          {day.label}
                        </Text>

                        {dayConfig.active ? (
                          <View className="flex-row items-center gap-x-2">
                            <TouchableOpacity
                              onPress={() => vm.openTimePicker(day.key, 'start')}
                              activeOpacity={0.7}
                              className={`px-2.5 py-1 rounded-lg border bg-surface ${
                                isEditingStart ? 'border-accent bg-accent/10' : 'border-stone/30'
                              }`}
                            >
                              <Text className="text-sm font-robotoMedium text-ink">
                                {startTimeStr}
                              </Text>
                            </TouchableOpacity>

                            <Text className="text-xs text-muted font-robotoBold">-</Text>

                            <TouchableOpacity
                              onPress={() => vm.openTimePicker(day.key, 'end')}
                              activeOpacity={0.7}
                              className={`px-2.5 py-1 rounded-lg border bg-surface ${
                                isEditingEnd ? 'border-accent bg-accent/10' : 'border-stone/30'
                              }`}
                            >
                              <Text className="text-sm font-robotoMedium text-ink">
                                {endTimeStr}
                              </Text>
                            </TouchableOpacity>
                          </View>
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
          )}
        </ScrollView>

        {/* Botão Fixo no Rodapé (Sempre Visível) */}
        <View className="px-5 py-3 border-t border-stone/10 bg-surface">
          <TouchableOpacity
            onPress={handleBottomButtonPress}
            className="w-full bg-accent h-14 rounded-2xl items-center justify-center shadow-sm"
            disabled={vm.isLoading}
            activeOpacity={0.8}
          >
            {vm.isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-base font-robotoBold text-white font-bold">
                {vm.currentStep === 4 ? 'Concluir' : 'Continuar'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Modal de Seleção de Horários */}
        <TimePickerModal
          visible={vm.isTimePickerVisible}
          onClose={vm.closeTimePicker}
          hours={
            vm.timePickerTarget?.type === 'start'
              ? vm.operatingHours[vm.timePickerTarget?.dayKey || 'segunda']?.startHours ?? 9
              : vm.operatingHours[vm.timePickerTarget?.dayKey || 'segunda']?.endHours ?? 18
          }
          minutes={
            vm.timePickerTarget?.type === 'start'
              ? vm.operatingHours[vm.timePickerTarget?.dayKey || 'segunda']?.startMinutes ?? 0
              : vm.operatingHours[vm.timePickerTarget?.dayKey || 'segunda']?.endMinutes ?? 0
          }
          onTimeChange={vm.updateSelectedTime}
        />
      </SafeAreaView>
    </View>
  );
}

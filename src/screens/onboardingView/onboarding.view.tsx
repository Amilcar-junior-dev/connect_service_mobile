import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useActiveTheme } from '~/hooks/colorScheme';
import { useOnboardingViewModel } from './useOnboardingViewModel';
import LogoConnect from '~/assets/svg/LogoConnect.svg';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';
import { FormProvider } from 'react-hook-form';

const SEGMENTS = [
  { id: 'barbershop', label: 'Barbearia', icon: '💇‍♂️' },
  { id: 'salon', label: 'Salão de Beleza', icon: '💇‍♀️' },
  { id: 'nailing', label: 'Esmalteria / Manicure', icon: '💅' },
  { id: 'aesthetic', label: 'Estética / Cílios', icon: '💄' },
  { id: 'spa', label: 'Spa & Massagem', icon: '💆‍♀️' },
  { id: 'others', label: 'Outros Serviços', icon: '🩺' },
];

const TEAM_SIZES = [
  { id: 'solo', label: 'Apenas eu', subtitle: 'Profissional solo', icon: '👤' },
  { id: 'small_2_5', label: '2 a 5 pessoas', subtitle: 'Pequena equipe', icon: '👥' },
  { id: 'medium_6_15', label: '6 a 15 pessoas', subtitle: 'Médio porte', icon: '👥' },
  { id: 'large_15_plus', label: 'Mais de 15', subtitle: 'Grande porte', icon: '🏢' },
];

const SERVICE_TYPES = [
  { id: 'fixed', label: 'No meu estabelecimento', subtitle: 'Local fixo', icon: '🏠' },
  { id: 'home', label: 'A domicílio', subtitle: 'Atendimento móvel', icon: '🚗' },
  { id: 'both', label: 'Ambos', subtitle: 'Fixo e a domicílio', icon: '🔄' },
];

export function OnboardingView() {
  const { colors, vars } = useActiveTheme();
  const vm = useOnboardingViewModel();

  const progressPercentage = vm.currentStep === 1 ? '33%' : vm.currentStep === 2 ? '66%' : '100%';

  return (
    <View style={[vars]} className="flex-1 bg-surface">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        {/* Header com Barra de Progresso */}
        <View className="px-6 pt-4 pb-2">
          <View className="items-center mb-4">
            <LogoConnect width={160} height={60} color={colors.ink} />
          </View>

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xs font-robotoMedium text-muted">
              PASSO {vm.currentStep} DE 3
            </Text>
            <Text className="text-xs font-robotoBold text-tabBar">
              {progressPercentage} CONCLUÍDO
            </Text>
          </View>

          <View className="w-full h-2 bg-stone/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-tabBar rounded-full"
              style={{ width: progressPercentage }}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* PASSO 1: DADOS DO NEGÓCIO */}
          {vm.currentStep === 1 && (
            <View className="mt-4">
              <Text className="text-xl font-robotoBold text-ink mb-2">
                Qual o nome do seu estabelecimento?
              </Text>
              <Text className="text-sm font-robotoRegular text-muted mb-6">
                Informe o nome comercial que seus clientes verão na página de agendamentos.
              </Text>

              <View className="gap-y-4">
                <View>
                  <Text className="text-xs font-robotoMedium text-ink mb-1">Nome da Empresa *</Text>
                  <View className="border border-stone/30 rounded-xl px-4 py-3 bg-surface">
                    <TextInputComponent
                      name="companyName"
                      placeholder="Ex: Barbearia do Silva"
                      placeholderTextColor={colors.muted}
                      value={vm.companyName}
                      onChangeText={vm.setCompanyName}
                      autoCapitalize="words"
                      editable={!vm.isLoading}
                      className="text-base text-ink font-robotoRegular"
                    />
                  </View>
                </View>

                {vm.slug ? (
                  <View className="bg-stone/10 p-4 rounded-xl border border-stone/20">
                    <Text className="text-xs font-robotoMedium text-muted mb-1">
                      Seu link de agendamento será:
                    </Text>
                    <Text className="text-sm font-robotoBold text-tabBar">
                      connectservice.com.br/{vm.slug}
                    </Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  onPress={vm.handleStep1Next}
                  className="w-full bg-tabBar h-12 rounded-xl items-center justify-center mt-6 shadow-sm"
                  activeOpacity={0.8}
                >
                  <Text className="text-base font-robotoBold text-surface font-bold">
                    Avançar para o Passo 2
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* PASSO 2: SEGMENTO & PORTE */}
          {vm.currentStep === 2 && (
            <View className="mt-4">
              <Text className="text-xl font-robotoBold text-ink mb-2">
                Qual o segmento do seu negócio?
              </Text>
              <Text className="text-sm font-robotoRegular text-muted mb-4">
                Selecione a categoria principal e a quantidade de profissionais.
              </Text>

              <Text className="text-xs font-robotoBold text-ink mb-2">SEGMENTO PRINCIPAL</Text>
              <View className="flex-row flex-wrap gap-2 mb-6">
                {SEGMENTS.map((seg) => {
                  const isSelected = vm.segment === seg.id;
                  return (
                    <TouchableOpacity
                      key={seg.id}
                      onPress={() => vm.setSegment(seg.id)}
                      className={`flex-row items-center px-4 py-3 rounded-xl border ${
                        isSelected
                          ? 'border-tabBar bg-tabBar/10'
                          : 'border-stone/20 bg-surface'
                      }`}
                      activeOpacity={0.7}
                    >
                      <Text className="text-base mr-2">{seg.icon}</Text>
                      <Text
                        className={`text-sm font-robotoMedium ${
                          isSelected ? 'text-tabBar font-bold' : 'text-ink'
                        }`}
                      >
                        {seg.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text className="text-xs font-robotoBold text-ink mb-2">TAMANHO DA EQUIPE</Text>
              <View className="gap-y-2 mb-6">
                {TEAM_SIZES.map((size) => {
                  const isSelected = vm.teamSize === size.id;
                  return (
                    <TouchableOpacity
                      key={size.id}
                      onPress={() => vm.setTeamSize(size.id)}
                      className={`flex-row items-center justify-between p-4 rounded-xl border ${
                        isSelected
                          ? 'border-tabBar bg-tabBar/10'
                          : 'border-stone/20 bg-surface'
                      }`}
                      activeOpacity={0.7}
                    >
                      <View className="flex-row items-center">
                        <Text className="text-xl mr-3">{size.icon}</Text>
                        <View>
                          <Text
                            className={`text-base font-robotoBold ${
                              isSelected ? 'text-tabBar font-bold' : 'text-ink'
                            }`}
                          >
                            {size.label}
                          </Text>
                          <Text className="text-xs font-robotoRegular text-muted">
                            {size.subtitle}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View className="flex-row gap-x-3 mt-2">
                <TouchableOpacity
                  onPress={vm.handlePrevStep}
                  className="flex-1 border border-stone/30 h-12 rounded-xl items-center justify-center"
                  activeOpacity={0.8}
                >
                  <Text className="text-base font-robotoMedium text-ink">Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={vm.handleStep2Next}
                  className="flex-1 bg-tabBar h-12 rounded-xl items-center justify-center shadow-sm"
                  activeOpacity={0.8}
                >
                  <Text className="text-base font-robotoBold text-surface font-bold">
                    Avançar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* PASSO 3: ENDEREÇO & TIPO DE ATENDIMENTO */}
          {vm.currentStep === 3 && (
            <View className="mt-4">
              <Text className="text-xl font-robotoBold text-ink mb-2">
                Como você atende seus clientes?
              </Text>
              <Text className="text-sm font-robotoRegular text-muted mb-4">
                Selecione o modelo de atendimento e a localização do seu espaço.
              </Text>

              <View className="gap-y-2 mb-6">
                {SERVICE_TYPES.map((type) => {
                  const isSelected = vm.serviceType === type.id;
                  return (
                    <TouchableOpacity
                      key={type.id}
                      onPress={() => vm.setServiceType(type.id)}
                      className={`flex-row items-center p-4 rounded-xl border ${
                        isSelected
                          ? 'border-tabBar bg-tabBar/10'
                          : 'border-stone/20 bg-surface'
                      }`}
                      activeOpacity={0.7}
                    >
                      <Text className="text-xl mr-3">{type.icon}</Text>
                      <View>
                        <Text
                          className={`text-base font-robotoBold ${
                            isSelected ? 'text-tabBar font-bold' : 'text-ink'
                          }`}
                        >
                          {type.label}
                        </Text>
                        <Text className="text-xs font-robotoRegular text-muted">
                          {type.subtitle}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {vm.serviceType !== 'home' && (
                <View className="gap-y-3 mb-6 bg-stone/5 p-4 rounded-xl border border-stone/20">
                  <Text className="text-xs font-robotoBold text-ink mb-1">
                    LOCALIZAÇÃO DO ESTABELECIMENTO
                  </Text>

                  <View className="flex-row items-center gap-x-2">
                    <View className="flex-1 border border-stone/30 rounded-xl px-4 py-3 bg-surface">
                      <TextInputComponent
                        name="zipCode"
                        placeholder="CEP (ex: 01001-000)"
                        placeholderTextColor={colors.muted}
                        value={vm.zipCode}
                        onChangeText={vm.setZipCode}
                        keyboardType="numeric"
                        maxLength={9}
                        editable={!vm.isLoading}
                        className="text-base text-ink font-robotoRegular"
                      />
                    </View>
                    {vm.isFetchingCep && <ActivityIndicator color={colors.tabBar} />}
                  </View>

                  <View className="flex-row gap-x-2">
                    <View className="flex-1 border border-stone/30 rounded-xl px-4 py-3 bg-surface">
                      <TextInputComponent
                        name="city"
                        placeholder="Cidade"
                        placeholderTextColor={colors.muted}
                        value={vm.city}
                        onChangeText={vm.setCity}
                        editable={!vm.isLoading}
                        className="text-base text-ink font-robotoRegular"
                      />
                    </View>
                    <View className="w-20 border border-stone/30 rounded-xl px-4 py-3 bg-surface">
                      <TextInputComponent
                        name="state"
                        placeholder="UF"
                        placeholderTextColor={colors.muted}
                        value={vm.state}
                        onChangeText={vm.setState}
                        autoCapitalize="characters"
                        maxLength={2}
                        editable={!vm.isLoading}
                        className="text-base text-ink font-robotoRegular"
                      />
                    </View>
                  </View>

                  <View className="border border-stone/30 rounded-xl px-4 py-3 bg-surface">
                    <TextInputComponent
                      name="address"
                      placeholder="Endereço e Número"
                      placeholderTextColor={colors.muted}
                      value={vm.address}
                      onChangeText={vm.setAddress}
                      editable={!vm.isLoading}
                      className="text-base text-ink font-robotoRegular"
                    />
                  </View>
                </View>
              )}

              <View className="flex-row gap-x-3 mt-4">
                <TouchableOpacity
                  onPress={vm.handlePrevStep}
                  className="flex-1 border border-stone/30 h-12 rounded-xl items-center justify-center"
                  disabled={vm.isLoading}
                  activeOpacity={0.8}
                >
                  <Text className="text-base font-robotoMedium text-ink">Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={vm.handleFinishOnboarding}
                  className="flex-1 bg-tabBar h-12 rounded-xl items-center justify-center shadow-sm"
                  disabled={vm.isLoading}
                  activeOpacity={0.8}
                >
                  {vm.isLoading ? (
                    <ActivityIndicator color={colors.surface} />
                  ) : (
                    <Text className="text-base font-robotoBold text-surface font-bold">
                      Concluir Setup
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

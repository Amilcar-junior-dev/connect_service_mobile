import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useActiveTheme } from '~/hooks/colorScheme';
import { useMoreScreenViewModel } from './moreScreen.viewModel';
import { MoreDropdown } from '~/components/moreDropdown/MoreDropdown.view';

// SVGs
import LogoConnect from '~/assets/svg/LogoConnect.svg';
import Clock from '~/assets/svg/Clock.svg';
import Peoples from '~/assets/svg/Peoples.svg';
import Integrations from '~/assets/svg/Integrations.svg';
import Heart from '~/assets/svg/Heart.svg';
import Exit from '~/assets/svg/Exit.svg';

export function MoreScreen() {
  const { colors, vars } = useActiveTheme();
  const vm = useMoreScreenViewModel();

  return (
    <View style={[vars]} className={`flex-1 bg-surface px-4`}>
      <SafeAreaView className={`flex-1`} edges={['top']}>
        {/* Screen Title */}
        <View className={`w-full flex-row items-center justify-center py-4`}>
          <Text className={`text-xl font-bold text-ink font-robotoBold`}>Configurações</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className={`flex-1 mt-2`}>
          {/* Section: Connect Service */}
          <View className={`w-full pb-2 mt-2`}>
            <Text className={`text-lg font-normal text-ink font-robotoMedium`}>Connect Service</Text>
          </View>

          {/* Group 1: Configuration Dropdowns */}
          <View className={`w-full gap-y-1`}>
            <MoreDropdown
              title="Página de agendamentos"
              icon={<LogoConnect color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'agendamentos'}
              onPress={() => vm.toggleDropdown('agendamentos')}
            >
              <View className={`gap-2`}>
                <Text className={`text-muted text-sm font-robotoRegular`}>Seu link público de agendamento:</Text>
                <View className={`bg-stone/10 p-2.5 rounded-lg border border-stone/20 flex-row items-center justify-between`}>
                  <Text className={`text-ink text-sm font-semibold font-robotoMedium select-all`}>
                    connectservice.com.br/empresa123
                  </Text>
                </View>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  className={`bg-tabBar py-2.5 rounded-lg items-center justify-center mt-1 active:opacity-80`}
                >
                  <Text className={`text-surface font-semibold text-sm font-robotoMedium`}>Visualizar Página</Text>
                </TouchableOpacity>
              </View>
            </MoreDropdown>

            <MoreDropdown
              title="Horários de Atendimento"
              icon={<Clock color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'horarios'}
              onPress={() => vm.toggleDropdown('horarios')}
            >
              <View className={`gap-2`}>
                <View className={`flex-row justify-between py-1 border-b border-stone/10`}>
                  <Text className={`text-ink text-sm font-medium font-robotoMedium`}>Segunda a Sexta</Text>
                  <Text className={`text-muted text-sm font-robotoRegular`}>08:00 - 18:00</Text>
                </View>
                <View className={`flex-row justify-between py-1 border-b border-stone/10`}>
                  <Text className={`text-ink text-sm font-medium font-robotoMedium`}>Sábado</Text>
                  <Text className={`text-muted text-sm font-robotoRegular`}>09:00 - 13:00</Text>
                </View>
                <View className={`flex-row justify-between py-1`}>
                  <Text className={`text-ink text-sm font-medium font-robotoMedium`}>Domingo</Text>
                  <Text className={`text-danger text-sm font-medium font-robotoMedium`}>Fechado</Text>
                </View>
              </View>
            </MoreDropdown>

            <MoreDropdown
              title="Funcionários"
              icon={<Peoples color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'funcionarios'}
              onPress={() => vm.toggleDropdown('funcionarios')}
            >
              <View className={`gap-2`}>
                <View className={`flex-row items-center justify-between py-1`}>
                  <View>
                    <Text className={`text-ink text-sm font-semibold font-robotoMedium`}>Carlos Silva</Text>
                    <Text className={`text-muted text-xs font-robotoRegular`}>Administrador</Text>
                  </View>
                  <Text className={`text-success text-xs font-semibold font-robotoMedium`}>Ativo</Text>
                </View>
                <View className={`flex-row items-center justify-between py-1 border-t border-stone/10 pt-2`}>
                  <View>
                    <Text className={`text-ink text-sm font-semibold font-robotoMedium`}>Mariana Souza</Text>
                    <Text className={`text-muted text-xs font-robotoRegular`}>Esteticista</Text>
                  </View>
                  <Text className={`text-success text-xs font-semibold font-robotoMedium`}>Ativo</Text>
                </View>
              </View>
            </MoreDropdown>

            <MoreDropdown
              title="Integrações"
              icon={<Integrations color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'integracoes'}
              onPress={() => vm.toggleDropdown('integracoes')}
            >
              <View className={`gap-3`}>
                <View className={`flex-row items-center justify-between`}>
                  <Text className={`text-ink text-sm font-medium font-robotoMedium`}>Google Calendar</Text>
                  <View className={`bg-success/10 px-2 py-0.5 rounded`}>
                    <Text className={`text-success text-xs font-semibold font-robotoMedium`}>Ativado</Text>
                  </View>
                </View>
                <View className={`flex-row items-center justify-between border-t border-stone/10 pt-2`}>
                  <Text className={`text-ink text-sm font-medium font-robotoMedium`}>WhatsApp Business</Text>
                  <TouchableOpacity activeOpacity={0.7} className={`bg-stone/30 px-2.5 py-1 rounded`}>
                    <Text className={`text-ink text-xs font-medium font-robotoMedium`}>Configurar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </MoreDropdown>
          </View>

          {/* Group 2: App Actions Dropdowns */}
          <View className={`w-full gap-y-1`}>
            <MoreDropdown
              title="Compartilhar App"
              icon={<Heart color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'compartilhar'}
              onPress={() => vm.toggleDropdown('compartilhar')}
            >
              <View className={`gap-2`}>
                <Text className={`text-muted text-sm font-robotoRegular`}>Indique o Connect Service e ganhe benefícios!</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={vm.handleShareApp}
                  className={`bg-tabBar py-2.5 rounded-lg items-center justify-center mt-1 active:opacity-80`}
                >
                  <Text className={`text-surface font-semibold text-sm font-robotoMedium`}>Copiar Link de Convite</Text>
                </TouchableOpacity>
              </View>
            </MoreDropdown>

            <MoreDropdown
              title="Sair"
              icon={<Exit color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'sair'}
              onPress={() => vm.toggleDropdown('sair')}
            >
              <View className={`gap-2 items-center`}>
                <Text className={`text-muted text-sm text-center font-robotoRegular`}>Deseja realmente sair da sua conta?</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={vm.handleLogout}
                  className={`bg-danger py-2.5 w-full rounded-lg items-center justify-center mt-1 active:opacity-80`}
                >
                  <Text className={`text-white font-semibold text-sm font-robotoMedium`}>Confirmar Logout</Text>
                </TouchableOpacity>
              </View>
            </MoreDropdown>
          </View>

          {/* Footer Spacer for TabBar */}
          <View className={`h-24`} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

import Plus from '~/assets/svg/Plus.svg'; 
import Agend from '~/assets/svg/AgendList.svg'; 
import Contact from '~/assets/svg/Contact.svg'; 
import Event from '~/assets/svg/Event.svg'; 
import Meet from '~/assets/svg/Meet.svg'; 
import Line from '~/assets/svg/Line.svg'; 

import { useActiveTheme } from '~/hooks/colorScheme';
import { useFloatingMenuViewModel } from './floatingMenu.viewModel';
import { useModalStore } from '~/store/useModalStore';


export function FloatingMenu() {
  const { colors } = useActiveTheme();
  const vm = useFloatingMenuViewModel();
  const openModal = useModalStore((state) => state.openModal);


  const menuActions = [
    { action: ()=> {}, id: 'despesa', label: 'Despesa', icon:<Line height={15} width={15} color={colors.ink}/> , width: 110 },
    { action: ()=> {}, id: 'reuniao', label: 'Reunião', icon:<Meet height={20} width={20} color={colors.ink}/> , width: 125 },
    { action: ()=> {}, id: 'evento', label: 'Evento', icon: <Event  height={22} width={22} color={colors.ink}/>, width: 140 },
    { action: ()=> {}, id: 'clientes', label: 'Clientes', icon: <Contact height={20} width={20} color={colors.ink}/>, width: 155 },
    { action: ()=> {}, id: 'agendamento', label: 'Agendamento', icon:<Agend height={18} width={18}  color={colors.ink}/> , width: 170 },
    { action: ()=> openModal('SERVICE', {origin: 'Floating Menu'}), id: 'servico', label: 'Serviço', icon:<Agend height={18} width={18}  color={colors.ink}/> , width: 185 },
  ];

  return (
    <>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors.deepSurface, zIndex: 10 },
          vm.backdropStyle
        ]}
        pointerEvents={vm.isOpen ? 'auto' : 'none'}
        onTouchStart={vm.toggleMenu} 
      />

      <View className="absolute bottom-28 right-5 items-end justify-end " style={{ zIndex: 10 }}>
          
          {menuActions.map((action, index) => {
              const itemAnimatedStyle = useAnimatedStyle(() => {
                  const translateY = interpolate(vm.animationProgress.value, [0, 1], [0, -60 * (index + 1)]);
                  const scale = interpolate(vm.animationProgress.value, [0, 1], [0.5, 1]);
                  return { 
                    opacity: vm.animationProgress.value, 
                    transform: [{ translateY }, { scale }] 
                  };
              });

              return (
                  <Animated.View
                      key={action.id}
                      className="absolute bottom-0 right-0 flex-row items-center mb-3"
                      style={itemAnimatedStyle}
                      pointerEvents={vm.isOpen ? 'auto' : 'none'}
                  >
                      <TouchableOpacity activeOpacity={0.7} className="flex-row items-center" onPress={() => action.action()}>
                              <View className="bg-ink/90 rounded-full mr-3 items-center justify-center shadow-sm elevation-md h-9" style={{ width: action.width }}>
                                  <Text className="text-surface font-bold text-sm">{action.label}</Text>
                              </View>
                              <View className="w-16 items-center">
                                  <View className="w-12 h-12 rounded-full bg-tintBlue items-center justify-center shadow-sm  elevation-mdborder border-transparent">
                                      {action?.icon}
                                  </View>
                              </View>
                      </TouchableOpacity>
                  </Animated.View>
              );
          })}

          <TouchableOpacity
              activeOpacity={0.9}
              onPress={vm.toggleMenu}
              className="w-16 h-16 rounded-full items-center justify-center shadow-lg"
              style={{ backgroundColor: colors.accent }} 
          >
              <Animated.View style={vm.mainButtonStyle}>
                  <Plus width={28} height={28} color={colors.ink} />
              </Animated.View>
          </TouchableOpacity>
          
      </View>
    </>
  );
}
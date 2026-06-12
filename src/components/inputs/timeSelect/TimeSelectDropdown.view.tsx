import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { cn } from '~/utils/cx';
import { useActiveTheme } from '~/hooks/colorScheme';
import Clock from '~/assets/svg/Clock.svg';
import ArrowDown from '~/assets/svg/ArrowDown.svg';
import { useTimeSelectViewModel } from './TimeSelectDropdown.viewModel';
import { TimeSelectDropdownProps, ITEM_HEIGHT } from './timeSelectDropdown.scheme';

const TimeSelectDropdownComponent = ({
  label,
  hours = 0,
  minutes = 0,
  onTimeChange,
  isRequire = false,
  containerClass,
}: TimeSelectDropdownProps) => {
  const { colors } = useActiveTheme();
  const vm = useTimeSelectViewModel({ hours, minutes, onTimeChange });

  return (
    <View className={cn(`mb-4 w-full`, containerClass)}>
      <Text className={`text-sm font-normal text-ink mb-1`}>
        {label} {isRequire && <Text className={`text-danger`}>*</Text>}
      </Text>

      <TouchableOpacity
        onPress={vm.toggleOpen}
        activeOpacity={0.7}
        className={cn(
          `h-12 flex-row items-center px-4 rounded-lg border`, 
          vm.isOpen ? `border-ink` : `border-stone`
        )}
      >
        <View className={`mr-2 w-6 items-center`}>
          <Clock color={colors.ink} width={18} height={18} />
        </View>

        <Text className={`flex-1 font-robotoMedium text-ink text-sm`}>
          {vm.formatValue(hours)} Hr(s) {vm.formatValue(minutes)} min(s)
        </Text>
        <Animated.View style={vm?.animatedStyle?.arrowStyle}>
          <ArrowDown color={colors.ink} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[vm?.animatedStyle?.dropdownStyle]}
        className={`mt-2 bg-surface rounded-xl border border-divider shadow-2xl overflow-hidden `}
      >
        <View className={`flex-row h-full`}>
          <View className={`flex-1 items-center justify-center `}>
            <Text className={`text-[10px] text-muted absolute top-1 font-robotoBold`}>HORAS</Text>
            <View className={`relative h-[120px] mt-10 items-center`}>
              <View 
                pointerEvents="none"
                style={{ height: ITEM_HEIGHT, top: '48%', marginTop: -ITEM_HEIGHT / 2 }}
                className={`absolute w-10/12 border border-accent rounded-md bg-accent/5`} 
              />

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  onMomentumScrollEnd={(e) => vm.handleScroll(e, 'hours')}
                  contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
                  contentOffset={{ x: 0, y: hours * ITEM_HEIGHT }}
                >
                  {vm.hoursArray.map((item) => (
                    <View key={`h-${item}`} style={{ height: ITEM_HEIGHT }} className={`items-center justify-center w-full`}>
                      <Text className={`text-lg font-robotoMedium text-ink`}>
                        {vm.formatValue(item)}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              
            </View>
              
          </View>

          <View className={`w-[1px] bg-divider h-4/5 self-center`} />

          <View className={`flex-1 items-center justify-center relative`}>
            <Text className={`text-[10px] text-muted absolute top-1 font-robotoBold`}>MINUTOS</Text>
            <View className={`relative h-[120px] mt-10 items-center`}>

              <View 
                pointerEvents="none"
                style={{ height: ITEM_HEIGHT, top: '48%', marginTop: -ITEM_HEIGHT / 2 }}
                className={`absolute w-10/12 border border-accent rounded-md bg-accent/5`} 
              />

              <ScrollView
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => vm.handleScroll(e, 'minutes')}
                contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
                contentOffset={{ x: 0, y: minutes * ITEM_HEIGHT }}
              >
                {vm.minutesArray.map((item) => (
                  <View key={`m-${item}`} style={{ height: ITEM_HEIGHT }} className={`items-center justify-center w-full`}>
                    <Text className={`text-lg font-robotoMedium text-ink`}>
                      {vm.formatValue(item)}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Animated.View>

    </View>
  );
};

export const TimeSelectDropdown = memo(TimeSelectDropdownComponent);
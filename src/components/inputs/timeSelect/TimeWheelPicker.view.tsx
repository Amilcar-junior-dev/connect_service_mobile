import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ITEM_HEIGHT } from './timeSelectDropdown.scheme';
import { useTimeWheelPickerViewModel } from './TimeWheelPicker.viewModel';
import { TimeWheelPickerProps } from './timeWheelPicker.scheme';

export function TimeWheelPicker({
  hours,
  minutes,
  onTimeChange,
  minuteInterval = 1,
}: TimeWheelPickerProps) {
  const vm = useTimeWheelPickerViewModel({
    hours,
    minutes,
    onTimeChange,
    minuteInterval,
  });

  return (
    <View className={`flex-row h-full w-full justify-center`}>
      {/* Hours Column */}
      <View className={`flex-1 items-center justify-center`}>
        <Text className={`text-[10px] text-muted absolute top-1 font-robotoBold`}>HORAS</Text>
        <View className={`relative h-[120px] mt-10 items-center w-full`}>
          <View
            pointerEvents={`none`}
            style={{ height: ITEM_HEIGHT, top: `48%`, marginTop: -ITEM_HEIGHT / 2 }}
            className={`absolute w-10/12 border border-accent rounded-md bg-accent/5`}
          />
          <ScrollView
            ref={vm.hoursRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate={`fast`}
            onMomentumScrollEnd={(e) => vm.handleScroll(e, `hours`)}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
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

      {/* Minutes Column */}
      <View className={`flex-1 items-center justify-center relative`}>
        <Text className={`text-[10px] text-muted absolute top-1 font-robotoBold`}>MINUTOS</Text>
        <View className={`relative h-[120px] mt-10 items-center w-full`}>
          <View
            pointerEvents={`none`}
            style={{ height: ITEM_HEIGHT, top: `48%`, marginTop: -ITEM_HEIGHT / 2 }}
            className={`absolute w-10/12 border border-accent rounded-md bg-accent/5`}
          />
          <ScrollView
            ref={vm.minutesRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate={`fast`}
            onMomentumScrollEnd={(e) => vm.handleScroll(e, `minutes`)}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
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
  );
}


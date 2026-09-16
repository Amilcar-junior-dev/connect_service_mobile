import React from 'react';

import { TouchableOpacity, View, Text } from 'react-native';

import Animated from 'react-native-reanimated';

import { cn } from '~/utils/cx';

import { CustomToggleProps } from './customToggle.scheme';
import { useCustomToggleViewModel } from './CustomToggle.viewModel';

export function CustomToggle({
  value,
  onValueChange,
  containerClass,
  label,
  labelClass,
}: CustomToggleProps) {
  const vm = useCustomToggleViewModel({ value, onValueChange });

  const toggleButton = (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={vm.handlePress}
    >
      <Animated.View
        style={vm.animatedContainerStyle}
        className={`w-11 h-6 rounded-full p-0.5 justify-center`}
      >
        <Animated.View
          style={vm.animatedCircleStyle}
          className={`w-5 h-5 rounded-full`}
        />
      </Animated.View>
    </TouchableOpacity>
  );


  return (
    <View className={cn(``, containerClass)}>
      {label && (
        <Text className={cn(`text-base font-normal text-ink mb-4`, labelClass)}>
          {label}
        </Text>
      )}
      {toggleButton}
    </View>
  );
}


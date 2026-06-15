import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { cn } from '~/utils/cx';
import { useCustomToggleViewModel } from './CustomToggle.viewModel';
import { CustomToggleProps } from './customToggle.scheme';

export function CustomToggle({
  value,
  onValueChange,
  containerClass,
}: CustomToggleProps) {
  const vm = useCustomToggleViewModel({ value, onValueChange });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={vm.handlePress}
      className={cn(``, containerClass)}
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
}


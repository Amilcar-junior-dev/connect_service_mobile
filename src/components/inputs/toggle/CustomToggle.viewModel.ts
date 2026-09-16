import { useEffect } from 'react';

import { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { useActiveTheme } from '~/hooks/colorScheme';

import { CustomToggleProps } from './customToggle.scheme';

export function useCustomToggleViewModel({ value, onValueChange }: Omit<CustomToggleProps, 'containerClass'>) {
  const { colors } = useActiveTheme();
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 250 });
  }, [value, progress]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors?.stone || `#D9D9D9`, colors?.success || `#189143`]
    );
    return {
      backgroundColor: bgColor,
    };
  });

  const animatedCircleStyle = useAnimatedStyle(() => {
    const translation = progress.value * 20; // width 44 - padding 2*2 - circle 20 = 20px delta
    const circleBgColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors?.tabBar || `#011627`, colors?.stone || `#D9D9D9`]
    );
    return {
      transform: [{ translateX: translation }],
      backgroundColor: circleBgColor,
    };
  });

  const handlePress = () => {
    onValueChange(!value);
  };

  return {
    animatedContainerStyle,
    animatedCircleStyle,
    handlePress,
  };
}

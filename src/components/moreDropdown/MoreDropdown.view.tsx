import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { useActiveTheme } from '~/hooks/colorScheme';
import { cn } from '~/utils/cx';

export interface MoreDropdownProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onPress: () => void;
  children?: React.ReactNode;
}

export function MoreDropdown({
  title,
  icon,
  isOpen,
  onPress,
  children,
}: MoreDropdownProps) {
  const { colors } = useActiveTheme();
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withTiming(isOpen ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
  }, [isOpen]);

  useEffect(() => {
    return () => {
      cancelAnimation(animation);
    };
  }, []);

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      height: animation.value * measuredHeight,
      opacity: animation.value,
      overflow: 'hidden',
    };
  }, [measuredHeight]);

  return (
    <View className={`w-full`}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={cn(
          `w-full flex-row items-center py-4 px-3 rounded-lg border-b border-transparent transition-all duration-200`,
          isOpen ? `bg-stone/30` : ``
        )}
      >
        <View className={`mr-3 w-6 items-center justify-center`}>
          {icon}
        </View>
        <Text className={`text-ink text-base font-normal font-robotoRegular flex-1`}>
          {title}
        </Text>
      </TouchableOpacity>

      {!isOpen && (
        <View className={`w-full`}>
          <View className={`border-b border-stone/50`} />
        </View>
      )}

      {children && (
        <>
          <View
            style={{ position: 'absolute', opacity: 0, left: -9999, width: '100%' }}
            pointerEvents="none"
            onLayout={(e) => {
              const h = e.nativeEvent.layout.height;
              if (h > 0 && h !== measuredHeight) {
                setMeasuredHeight(h);
              }
            }}
          >
            <View className={`px-12 py-3`}>
              {children}
            </View>
          </View>

          <Animated.View style={animatedContentStyle}>
            <View className={`px-12 py-3 bg-stone/5 rounded-b-lg`}>
              {children}
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
}

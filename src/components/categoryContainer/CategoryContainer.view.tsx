import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { useActiveTheme } from '~/hooks/colorScheme';
import FolderOpen from '~/assets/svg/FolderOpen.svg';
import FolderClose from '~/assets/svg/FolderClose.svg';
import ArrowDown from '~/assets/svg/ArrowDown.svg';

export interface CategoryContainerProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

export function CategoryContainer({
  title,
  count,
  children,
}: CategoryContainerProps) {
  const { colors } = useActiveTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const animation = useSharedValue(0);

  useEffect(() => {
    if (animation) {
      animation.value = withTiming(isOpen ? 1 : 0, {
        duration: 300,
        easing: Easing?.out?.(Easing?.quad),
      });
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (animation) {
        cancelAnimation(animation);
      }
    };
  }, []);

  const animatedContentStyle = useAnimatedStyle(() => {
    const val = animation?.value ?? 0;
    return {
      height: val * measuredHeight,
      opacity: val,
      overflow: 'hidden',
    };
  }, [measuredHeight]);

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isOpen ? '180deg' : '0deg', {
            duration: 300,
          }),
        },
      ],
    };
  });

  return (
    <View className={`w-full mb-4`}>
      {/* Category Header Row */}
      <TouchableOpacity
        onPress={() => setIsOpen((prev) => !prev)}
        activeOpacity={0.7}
        className={`w-full flex-row items-center justify-between py-3 border-b border-stone/30`}
      >
        <View className={`flex-row items-center`}>
          {/* Folder Icon */}
          <View className={`mr-3`}>
            {isOpen ? (
              <FolderOpen color={colors?.ink} width={24} height={20} />
            ) : (
              <FolderClose color={colors?.ink} width={24} height={20} />
            )}
          </View>
          {/* Title & Count */}
          <Text className={`text-ink text-lg font-semibold`}>
            {title} <Text className={`text-muted font-normal`}>({count})</Text>
          </Text>
        </View>

        {/* Arrow Down Icon */}
        <Animated.View style={arrowStyle}>
          <ArrowDown color={colors?.ink} width={16} height={16} />
        </Animated.View>
      </TouchableOpacity>

      {/* Invisible measurement container to get natural height of children */}
      <View
        style={{ position: 'absolute', opacity: 0, left: -9999, width: '100%' }}
        pointerEvents="none"
        className={`pt-4`}
        onLayout={(e) => {
          const h = e?.nativeEvent?.layout?.height;
          if (h > 0 && h !== measuredHeight) {
            setMeasuredHeight(h);
          }
        }}
      >
        {children}
      </View>

      {/* Collapsible Content */}
      <Animated.View style={animatedContentStyle}>
        <View className={`pt-4`}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

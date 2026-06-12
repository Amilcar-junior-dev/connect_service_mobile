import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { useActiveTheme } from '~/hooks/colorScheme';
import Tag from '~/assets/svg/Tag.svg';
import ArrowDown from '~/assets/svg/ArrowDown.svg';
import { SERVICE_COLORS } from '~/styles/colors';

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

  const iconColor = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < title?.length; i++) {
      hash = title?.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math?.abs(hash) % (SERVICE_COLORS?.length || 1);
    return SERVICE_COLORS[index] || colors?.ink;
  }, [title, colors?.ink]);

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
          <View className={`mr-3`}>
            <Tag color={iconColor} width={22} height={22} />
          </View>
          <Text className={`text-ink text-lg font-semibold`}>
            {title} <Text className={`text-muted font-normal`}>({count})</Text>
          </Text>
        </View>

        <Animated.View style={arrowStyle}>
          <ArrowDown color={colors?.ink} width={16} height={16} />
        </Animated.View>
      </TouchableOpacity>

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

      <Animated.View style={animatedContentStyle}>
        <View className={`pt-4`}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

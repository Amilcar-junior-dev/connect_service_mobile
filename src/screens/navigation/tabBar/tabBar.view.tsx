import { useEffect } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { TabRouteName } from './tabBar.scheme';

import Calendar from '~/assets/svg/Calendar.svg'
import Services from '~/assets/svg/Services.svg'
import Financial from '~/assets/svg/Financial.svg'
import More from '~/assets/svg/More.svg'
import { useTabBar } from '~/contexts/TabBarContext';

export function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const { tabBarOffset } = useTabBar();
  
  const { colorScheme } = useColorScheme();
  const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;

  const { width } = Dimensions.get('window');

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tabBarOffset.value }],
    };
  });

  const totalWidth = width * 0.7;
  const tabWidth = totalWidth / state.routes.length;

  const indicatorWidth = 10;

  const translateX = useSharedValue(0);

  const RouteIcons = {
    home: Calendar ,
    services: Services,
    financial: Financial,
    more: More,
  } as const;

  useEffect(() => {
    const targetX =
      state.index * tabWidth +
      tabWidth / 2 -
      indicatorWidth / 2;

    translateX.value = withTiming(targetX, {
      duration: 250,
    });
  }, [state.index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[activeTheme.vars, { width: totalWidth }, containerAnimatedStyle]}
      className={`absolute bottom-10 self-center h-16 bg-tabBar rounded-[30px] flex-row items-center shadow-lg`}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 8,
            width: indicatorWidth,
            height: 4,
          },
          animatedStyle,
        ]}
        className={`bg-accent rounded-full`}
      />

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = RouteIcons[route.name as TabRouteName];

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={{ width: tabWidth }}
            onPress={onPress}
            className="items-center justify-center"
          >
            <Icon
              width={24}
              height={24}
              color={'#FFFFFF'}
            />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
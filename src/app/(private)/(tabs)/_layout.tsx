import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { CustomTabBar } from '~/views/navigation/tabBar/tabBar.view';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { JSX } from 'react/jsx-runtime';

export default function TabLayout() {
  return (
    <Tabs 
     screenOptions={{ headerShown:false }}
     tabBar={(props: JSX.IntrinsicAttributes & BottomTabBarProps) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="services" />
      <Tabs.Screen name="financial" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}

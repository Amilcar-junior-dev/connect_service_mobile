import { Tabs } from 'expo-router';

import { CustomTabBar } from '~/screens/navigation/tabBar/tabBar.view';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { JSX } from 'react/jsx-runtime';
import { TabBarProvider } from '~/contexts/TabBarContext';


export default function TabLayout() {
  return (
    <TabBarProvider>
      <Tabs 
      screenOptions={{ headerShown:false, }}
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="services" />
        <Tabs.Screen name="financial" />
        <Tabs.Screen name="more" />
      </Tabs>
    </TabBarProvider>
  );
}

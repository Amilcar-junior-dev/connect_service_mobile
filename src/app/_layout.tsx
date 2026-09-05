import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import { Theme } from '~/styles/colors';
import '~/styles/global.css';
import { View } from 'react-native';
import { GlobalModalManager } from '~/components/modals/GlobalModalManager';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/lib/reactQuery';

export default function RouteLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const { colorScheme } = useColorScheme();
  const activeTheme = colorScheme === 'dark' ? Theme.dark : Theme.light;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={[{ flex: 1 }]}>
        <View style={[{ flex: 1 }, activeTheme.vars]}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack>
          <GlobalModalManager />
        </View>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
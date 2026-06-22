import { Redirect } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';

export default function RootLayout() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Redirect href="/(private)/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
}

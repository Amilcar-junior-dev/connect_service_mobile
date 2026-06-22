import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';

export default function PrivateLayout() {
  const token = useAuthStore((state) => state.token);
  const isLogged = !!token;

  if (!isLogged) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
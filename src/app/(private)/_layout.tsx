import {Redirect, Stack} from 'expo-router'

export default function PrivateLayout(){
    const isLogged = true; // substitua pela verificação real

    if (!isLogged) {
        return <Redirect href="/login" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />/ */}
        </Stack>
    )
}
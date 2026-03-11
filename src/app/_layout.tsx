import {Stack} from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '~/styles/global.css' 

export default function RouteLayout(){
    return (
         <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='login' options={{ headerShown: false }} />
                <Stack.Screen name='register' options={{ headerShown: false }} />
            </Stack>
         </GestureHandlerRootView>
    )
}
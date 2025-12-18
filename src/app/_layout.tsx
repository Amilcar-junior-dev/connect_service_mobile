import {Stack} from 'expo-router'
import '~/styles/global.css' 

export default function RouteLayout(){
    return (
         <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login' options={{ headerShown: false }} />
            <Stack.Screen name='register' options={{ headerShown: false }} />
         </Stack>
    )
}
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ButtonComponent from "~/components/buttons/Button";

import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import useLoginViewModel from "./useLoginViewModel";
import { router } from "expo-router";

export const LoginView: React.FC<ReturnType<typeof useLoginViewModel >> =({
    control,
    onSubmit,
})=>{


    const {colorScheme} = useColorScheme();
    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;

    
    return (
        <View style={[activeTheme.vars]} className={`flex-1 bg-background`}>
            <SafeAreaView className={`flex-1`}>
             
            </SafeAreaView>
        </View>
    )
}
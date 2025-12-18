import { useColorScheme } from "nativewind";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index(){

    const {colorScheme} = useColorScheme();
    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;
      console.log("🚀 ~ index.tsx:8 ~ RootLayout ~ colorScheme:", colorScheme)
    //   const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;

   
    return (
        <View  style={[activeTheme.vars]}  className={`flex-1 bg-background pl-4 pr-4 `}>
            <SafeAreaView className={`flex-1`}>
                <View className={`w-full flex-row`}>
                    <View className={`w-[50px] h-[50px] rounded-full items-center justify-center bg-textSecondary`}>
                        <Text> Foto </Text>
                    </View>
                    <View className={`w-full pl-4 `}>
                        <Text className={`text-textPrimary text-xs`}> Bem vindo de volta,</Text>
                        <Text className={`text-textPrimary text-lg font-bold mt-1`}> Junior Oliveira </Text>
                    </View>
                </View>
                <View className={`w-full h-52 mt-5 bg-slate-500`}>

                </View>
                <ScrollView className={`w-full flex-1 mt-8`} >
                    <View className={`w-full flex-row justify-between items-center`}>
                        <Text className={`font-medium text-lg text-textPrimary`}>Transações</Text>
                        <TouchableOpacity onPress={()=>{}}>
                            <Text className={`font-medium text-sm text-primaryBlue`}>Ver tudo</Text>    
                        </TouchableOpacity>
                    </View> 
                    
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
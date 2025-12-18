import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ButtonComponent from "~/components/buttons/Button";

import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import useLoginViewModel from "~/viewModels/loginViewModel/login.viewModel";
import { router } from "expo-router";
import { TextInputController } from "~/components/inputs/textInput/TextInputController";


export const LoginView: React.FC<ReturnType<typeof useLoginViewModel >> =({
    control,
    onSubmit,
})=>{


    const {colorScheme} = useColorScheme();
    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;

    
    return (
        <View style={[activeTheme.vars]} className={`flex-1 bg-background`}>
            <SafeAreaView className={`flex-1`}>
                <View className={`flex-1 justify-center p-5`}>
                    <Text className={`text-3xl text-textPrimary font-medium`}> Entrar </Text>
                    
                    <TextInputController 
                        control={control}
                        name="email"
                        label="Email"
                        autoCapitalize="none"
                        type="primary"
                    />
                    <TextInputController 
                        control={control}
                        name="password"
                        label="Senha"
                        type="primary"
                        leftIcon="email"
                        rightIcon="eyeShow"
                    />
                    <ButtonComponent
                        type="primary"
                        title="Entrar"
                        className={`mt-14 mb-5`}
                        action={()=>router.push('/(private)/(tabs)/home')}
                    />
                    <View  className={`w-full flex-row justify-center`}>
                        <Text className={`color-textPrimary`}>Eu sou um novo usuário. </Text>
                        <TouchableOpacity onPress={()=>{router.push('/register')}}>
                            <Text   className={`color-primaryBlue`}>Criar conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}
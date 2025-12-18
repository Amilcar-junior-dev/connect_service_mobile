import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";

import ButtonComponent from "~/components/buttons/Button";

import { Theme } from "~/styles/colors";
import useRegisterViewModel from "~/viewModels/registerViewModel/register.viewModel";

import ArrowLeft from '~/assets/svg/ArrowLeft.svg'
import { TextInputController } from "~/components/inputs/textInput/TextInputController";
import { useThemeColor } from "~/hooks/useColors";

export const RegisterView: React.FC<ReturnType<typeof useRegisterViewModel >> =({
    control,
    onSubmit,
})=>{


    const {colorScheme} = useColorScheme();
    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;


    //TODO: AJUSTAR OPACIDADE DAS CORES 
    //TODO: AJUSTAR MENSAGEM [Layout children]: No route named "/login" exists in nested children: ["index", "login", "register", "(private)"]
    
    return (
        <View style={[activeTheme.vars]} className={`flex-1 bg-background`}>
            <SafeAreaView className={`flex-1`}>
                <View className={`flex-1 justify-center p-5`}>
                     <TouchableOpacity onPress={()=>{router.back()}}>
                        <View className={`w-11 h-11 rounded-full items-center justify-center mb-14 bg-textPrimary/10`}>
                            <ArrowLeft height={20} width={20} color={useThemeColor('background')} />
                        </View>
                     </TouchableOpacity>
                    <Text className={`text-3xl text-textPrimary font-medium`}> Criar Conta </Text>
                    <TextInputController 
                        control={control}
                        type="primary"
                        label="Nome completo"
                        name="name"
                        leftIcon="email"
                        placeholder="Digite aqui o seu nome"
                    />
                    
                    <TextInputController 
                        control={control}
                        type="primary"
                        label="Número de Telefone"
                        name="phone"
                        className={`mt-5`}
                        leftIcon="phone"
                        placeholder="(XX) XXXXX-XXXX"
                    />
                   
                    <TextInputController 
                        control={control}
                        type="primary"
                        label="Email"
                        name="email"
                        placeholder="Digite aqui o seu melhor e-mail"
                        leftIcon="email"
                        className={`mt-5`}
                    />
                    
                    <TextInputController 
                        control={control}
                        name="password"
                        type="primary"
                        label="Senha"
                        placeholder="********"
                        leftIcon="password"
                        rightIcon="eyeShow"
                        className={`mt-5`}
                    />
                   
                    <TextInputController 
                        control={control}
                        name="confirm_password"
                        type="primary"
                        label="Confirmar senha"
                        placeholder="*******"
                        leftIcon="password"
                        rightIcon="eyeShow"
                        className={`mt-5`}
                    />
                    <ButtonComponent
                        type="primary"
                        title="Entrar"
                        className={`mt-14 mb-5`}
                        action={()=>onSubmit()}
                    />
                    <View  className={`w-full flex-row justify-center`}>
                        <Text className={`color-textPrimary`}>Já tenho conta. </Text>
                        <TouchableOpacity onPress={()=>{router.push('/login')}}>
                            <Text   className={`color-primaryBlue`}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}
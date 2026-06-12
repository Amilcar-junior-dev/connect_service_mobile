import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ButtonComponent from "~/components/buttons/Button";

import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import useLoginViewModel from "./useLoginViewModel";
import { router } from "expo-router";
import { CustomSelectDropdownComponent } from "~/components/inputs/selectInput/CustomSelectDropdown.view";

export const LoginView: React.FC<ReturnType<typeof useLoginViewModel >> =({
    control,
    onSubmit,
})=>{


    const {colorScheme} = useColorScheme();
    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;

    
    return (
        <View style={[activeTheme.vars]} className={`flex-1 bg-background`}>
            <SafeAreaView className={`flex-1 bg-red-400`}>
             <CustomSelectDropdownComponent 
                label="Tipo de usuário"
                placeholder="Selecione uma opção"
                leftIcon="User"
                rightActionIcon="UserPlus"
                onRightActionPress={() => alert('Adicionar novo')}
                options={[
                    { id: 1, label: 'Usuário' },
                    { id: 2, label: 'Admin' },
                    { id: 3, label: 'Convidado' },
                ]}
                onSelect={(item) => console.log('Selecionado:', item)}
                selectedValue={null}
                containerClass="w-full"
                labelClass="text-left"
                isRequire
             />
            </SafeAreaView>
        </View>
    )
};

export default LoginView;
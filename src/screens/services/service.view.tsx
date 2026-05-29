import { useState } from "react";
import { View} from "react-native";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useServiceScreenViewModel } from "./serviceScreen.viewModel";
import { CustomSelectDropdownComponent } from "~/components/inputs/selectInput/CustomSelectDropdown.view";
import { CustomSelectOption } from "~/components/inputs/selectInput/customSelectDropdown.scheme";
import { useModalStore } from "~/store/useModalStore";





const SERVICE_COLORS = [
    "#3B82F6", "#2563EB", "#0EA5E9", "#22C55E",
    "#16A34A", "#14B8A6", "#969E9E", "#6366F1",
    "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899",
];


export default function ServiceScreen(){

    const {colorScheme} = useColorScheme();
    const openModal = useModalStore((state) => state.openModal);
    const vm = useServiceScreenViewModel();

    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;

    const [ selectedUserType, setSelectedUserType ] = useState<CustomSelectOption>({ id:1,label: '' });

    return (
       
        <View  style={[activeTheme.vars]}  className={`flex-1 bg-surface pl-4 pr-4 `}>
            <SafeAreaView className={`flex-1`}>
                <CustomSelectDropdownComponent 
                    label="Tipo de usuário"
                    placeholder="Selecione uma opção"
                    leftIcon="User"
                    rightActionIcon="Contact"
                    onRightActionPress={() => openModal("CLIENT")}
                    options={[
                        { id: 1, label: 'Usuário' },
                        { id: 2, label: 'Admin' },
                        { id: 3, label: 'Convidado' },
                    ]}
                    onSelect={(item) => setSelectedUserType(item)}
                    selectedValue={selectedUserType }
                    labelClass="text-left"
                    isRequire
                />
        
                    
            </SafeAreaView>
        </View>


    )
}
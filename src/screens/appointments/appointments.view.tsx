import { useState } from "react";
import { View} from "react-native";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomSelectDropdownComponent } from "~/components/inputs/selectInput/CustomSelectDropdown.view";
import { CustomSelectOption } from "~/components/inputs/selectInput/customSelectDropdown.scheme";
import { useModalStore } from "~/store/useModalStore";
import { TimeSelectDropdown } from "~/components/inputs/timeSelect/TimeSelectDropdown.view";






export default function ApointmentScreen(){

    const {colorScheme} = useColorScheme();
    const openModal = useModalStore((state) => state.openModal);

    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;

    const [ selectedUserType, setSelectedUserType ] = useState<CustomSelectOption>({ id:1,label: '' });
    const [ selectedServiceTime, setSelectedServiceTime ] = useState<any>({ hours: 0, minutes: 0});

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
                <View className="w-full justify-between flex-row ">
                    <View className="w-[48%]">
                        <TimeSelectDropdown 
                            label="Tempo de serviço" 
                            hours={selectedServiceTime?.hours} minutes={selectedServiceTime?.minutes} 
                           onTimeChange={()=>{} }         
                        />
                    </View>
                    <View className="w-[48%]">
                        <TimeSelectDropdown 
                            label="Tempo de serviço" 
                            hours={selectedServiceTime?.hours} minutes={selectedServiceTime?.minutes} 
                            onTimeChange={()=>{} }                
                        />
                    </View>
                </View>
               
        
                    
            </SafeAreaView>
        </View>


    )
}
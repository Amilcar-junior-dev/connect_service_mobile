import { useState } from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomSelectDropdownComponent } from "~/components/inputs/selectInput/CustomSelectDropdown.view";
import { CustomSelectOption } from "~/components/inputs/selectInput/customSelectDropdown.scheme";
import { useModalStore } from "~/store/useModalStore";
import { TimeSelectDropdown } from "~/components/inputs/timeSelect/TimeSelectDropdown.view";
import { Controller, useFormContext, useForm, FormProvider } from "react-hook-form";

export default function ApointmentScreen() {
    const { colorScheme } = useColorScheme();
    const openModal = useModalStore((state) => state?.openModal);

    const activeTheme = colorScheme === "dark" ? Theme?.dark : Theme?.light;

    const [ selectedServiceTime, setSelectedServiceTime ] = useState<any>({ hours: 0, minutes: 0 });

    const context = useFormContext();
    const localMethods = useForm();
    const methods = context || localMethods;

    return (
        <FormProvider {...methods}>
            <View style={[activeTheme?.vars]} className={`flex-1 bg-surface pl-4 pr-4`}>
                <SafeAreaView className={`flex-1`}>
                    <Controller
                        control={methods?.control}
                        name="client"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CustomSelectDropdownComponent 
                                label="Cliente"
                                placeholder="Selecione uma opção"
                                leftIcon="User"
                                rightActionIcon="Contact"
                                onRightActionPress={() => openModal?.("CLIENT")}
                                options={[
                                    { id: 1, label: 'Usuário' },
                                    { id: 2, label: 'Admin' },
                                    { id: 3, label: 'Convidado' },
                                ]}
                                onSelect={onChange}
                                selectedValue={value}
                                labelClass="text-left"
                                isRequire
                                error={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={methods?.control}
                        name="service"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CustomSelectDropdownComponent 
                                label="Serviço"
                                placeholder="Selecione uma opção"
                                leftIcon="Services"
                                rightActionIcon="Services"
                                onRightActionPress={() => openModal?.("SERVICE")}
                                options={[
                                    { id: 1, label: 'Luzes' },
                                    { id: 2, label: 'Chapinha' },
                                    { id: 3, label: 'Corte' },
                                    { id: 4, label: 'Hidratação' },
                                    { id: 5, label: 'Manutenção de alongamento' },
                                    { id: 6, label: 'Alisamento' },
                                    { id: 7, label: 'Escova' },
                                    { id: 8, label: 'Coloração' },
                                    { id: 9, label: 'Tonalização' },
                                    { id: 10, label: 'Reconstrução' },
                                ]}
                                onSelect={onChange}
                                selectedValue={value}
                                labelClass="text-left"
                                isRequire
                                error={error?.message}
                            />
                        )}
                    />

                    <View className={`w-full justify-between flex-row`}>
                        <View className={`w-[48%]`}>
                            <TimeSelectDropdown 
                                label="Tempo de serviço" 
                                hours={selectedServiceTime?.hours} 
                                minutes={selectedServiceTime?.minutes} 
                                onTimeChange={() => {}}         
                            />
                        </View>
                        <View className={`w-[48%]`}>
                            <TimeSelectDropdown 
                                label="Tempo de serviço" 
                                hours={selectedServiceTime?.hours} 
                                minutes={selectedServiceTime?.minutes} 
                                onTimeChange={() => {}}                
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </FormProvider>
    );
}
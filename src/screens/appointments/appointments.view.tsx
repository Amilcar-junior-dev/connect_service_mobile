import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomSelectDropdownComponent } from "~/components/inputs/selectInput/CustomSelectDropdown.view";
import { CustomSelectOption } from "~/components/inputs/selectInput/customSelectDropdown.scheme";
import { useModalStore } from "~/store/useModalStore";
import { TimeSelectDropdown } from "~/components/inputs/timeSelect/TimeSelectDropdown.view";
import { Controller, useFormContext, useForm, FormProvider } from "react-hook-form";
import Close from "~/assets/svg/Close.svg";
import { useActiveTheme } from "~/hooks/colorScheme";
import { AppointmentFormValues, ServiceTime } from "./appointmentScreen.scheme";



export default function ApointmentScreen() {
    const {colors, vars} = useActiveTheme();
    const openModal = useModalStore((state) => state?.openModal);


    const [ selectedServiceTime, setSelectedServiceTime ] = useState<ServiceTime>({ hours: 0, minutes: 0 });

    const context = useFormContext<AppointmentFormValues>();
    const localMethods = useForm<AppointmentFormValues>({
        defaultValues: {
            client: null,
            services: [],
        }
    });
    const methods = context || localMethods;
    const { watch, setValue } = methods;

    const selectedClient = watch?.("client");
    const services = watch?.("services") || [];

    const clientsList = useMemo<CustomSelectOption[]>(() => [
        { id: 1, label: 'Roberto Carlos' },
        { id: 2, label: 'Ana Julia' },
        { id: 3, label: 'Marcos Paulo' },
    ], []);

    const servicesList = useMemo<CustomSelectOption[]>(() => [
        { id: 1, label: 'Luzes', price: 250.00, duration: { hours: 2, minutes: 0 } },
        { id: 2, label: 'Chapinha', price: 50.00, duration: { hours: 0, minutes: 45 } },
        { id: 3, label: 'Corte', price: 80.00, duration: { hours: 1, minutes: 0 } },
        { id: 4, label: 'Hidratação', price: 120.00, duration: { hours: 1, minutes: 15 } },
        { id: 5, label: 'Manutenção de alongamento', price: 300.00, duration: { hours: 2, minutes: 30 } },
        { id: 6, label: 'Alisamento', price: 400.00, duration: { hours: 3, minutes: 0 } },
        { id: 7, label: 'Escova', price: 60.00, duration: { hours: 0, minutes: 45 } },
        { id: 8, label: 'Coloração', price: 180.00, duration: { hours: 1, minutes: 45 } },
        { id: 9, label: 'Tonalização', price: 150.00, duration: { hours: 1, minutes: 15 } },
        { id: 10, label: 'Reconstrução', price: 220.00, duration: { hours: 1, minutes: 30 } },
        { id: 11, label: 'Botox', price: 350.00, duration: { hours: 1, minutes: 30 } },
    ], []);

    const totalDuration = useMemo(() => {
        let totalMinutes = 0;
        services?.forEach((s: CustomSelectOption) => {
            const h = s?.duration?.hours || 0;
            const m = s?.duration?.minutes || 0;
            totalMinutes += h * 60 + m;
        });
        const hours = Math?.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
    }, [services]);

    const totalPrice = useMemo(() => {
        return services?.reduce((sum: number, s: CustomSelectOption) => sum + (s?.price || 0), 0) || 0;
    }, [services]);

    return (
        <FormProvider {...methods}>
            <View style={[vars]} className={`flex-1 bg-surface pl-4 pr-4`}>
                <SafeAreaView className={`flex-1`}>
                    <ScrollView className={`flex-1`} >
                            <Controller
                                control={methods?.control}
                                name="client"
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <CustomSelectDropdownComponent 
                                        label="Cliente"
                                        placeholder="Selecione uma opção"
                                        leftIcon="User"
                                        rightActionIcon="Contact"
                                        onRightActionPress={() => openModal?.("CLIENT")}
                                        options={clientsList}
                                        onSelect={onChange}
                                        selectedValue={selectedClient}
                                        labelClass="text-left"
                                        isRequire
                                        error={error?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={methods?.control}
                                name="services"
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <View className={`mb-4`}>
                                        <CustomSelectDropdownComponent 
                                            label="Serviço"
                                            placeholder="Adicionar um Serviço"
                                            leftIcon="Services"
                                            cardIcon="Services"
                                            rightActionIcon="Services"
                                            onRightActionPress={() => openModal?.("SERVICE")}
                                            options={servicesList}
                                            onSelect={onChange}
                                            selectedValue={services}
                                            labelClass="text-left"
                                            isRequire
                                            typeDropdown="checkBox"
                                            multiLabelSingular="serviço"
                                            multiLabelPlural="serviços"
                                            error={error?.message}
                                        />

                                        {/* Selected Services Container */}
                                        {services?.length > 0 && (
                                            <View className={`bg-stone/10 p-3 rounded-2xl mb-4 border border-divider`}>
                                                {services?.map((item: CustomSelectOption) => {
                                                    const formattedPrice = item?.price?.toLocaleString?.('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    });
                                                    const durationText = `${item?.duration?.hours ? `${item?.duration?.hours} h ` : ''}${item?.duration?.minutes ? `${item?.duration?.minutes} min` : ''}`;

                                                    return (
                                                        <View 
                                                            key={item?.id} 
                                                            className={`relative bg-surface p-4 rounded-xl border border-divider mb-3 shadow-sm `}
                                                        >
                                                            <View className={`absolute left-0 top-0 bottom-0 w-1.5 bg-accent`} />
                                                            
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    const updated = services?.filter((s: CustomSelectOption) => s?.id !== item?.id);
                                                                    setValue?.("services", updated);
                                                                }}
                                                                className={`absolute -top-2 -left-2 border-2 border-danger bg-surface rounded-full p-1 z-10 active:opacity-80`}
                                                            >
                                                                <Close color={colors?.danger} width={8} height={8} />
                                                            </TouchableOpacity>

                                                            <View className={`flex-row justify-between items-center pl-2`}>
                                                                <View className={`flex-1 mr-2`}>
                                                                    <Text className={`text-ink text-base font-bold mb-1`}>
                                                                        {item?.label}
                                                                    </Text>
                                                                    <Text className={`text-ink text-sm font-semibold`}>
                                                                        {formattedPrice}
                                                                    </Text>
                                                                </View>
                                                                <View className={`items-end`}>
                                                                    <Text className={`text-muted text-xs`}>
                                                                        Tempo Estimado: <Text className={`text-ink font-bold`}>{durationText}</Text>
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    );
                                                })}

                                                <View className={`flex-row justify-between items-center pt-2 border-t border-divider px-2`}>
                                                    <Text className={`text-ink text-sm font-bold`}>
                                                        Tempo Total: {totalDuration?.hours ? `${totalDuration?.hours} Hr(s) ` : ''}{totalDuration?.minutes ? `${totalDuration?.minutes} min` : ''}
                                                    </Text>
                                                    <Text className={`text-ink text-sm font-bold`}>
                                                        R$: {totalPrice?.toFixed?.(2)?.replace?.('.', ',')}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                    </View>
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

                    </ScrollView>
                </SafeAreaView>
            </View>
        </FormProvider>
    );
}
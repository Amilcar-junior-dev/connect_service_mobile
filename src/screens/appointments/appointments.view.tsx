import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomSelectDropdownComponent } from "~/components/inputs/selectInput/CustomSelectDropdown.view";
import { CustomSelectOption } from "~/components/inputs/selectInput/customSelectDropdown.scheme";
import { useModalStore } from "~/store/useModalStore";
import { Controller, useFormContext, useForm, FormProvider } from "react-hook-form";
import Close from "~/assets/svg/Close.svg";
import CalendarIcon from "~/assets/svg/Calendar.svg";
import { useActiveTheme } from "~/hooks/colorScheme";
import { AppointmentFormValues } from "./appointmentScreen.scheme";
import dayjs from "dayjs";
import { cn } from "~/utils/cx";
import { useAppointmentViewModel } from "./appointmentsViewModel";
import { TextInputComponent } from "~/components/inputs/textInput/CustomTextInput.view";

import ArrowBack from "~/assets/svg/ArrowLeft.svg"



export default function ApointmentScreen() {
    const {colors, vars} = useActiveTheme();
    const openModal = useModalStore((state) => state?.openModal);

    const vm = useAppointmentViewModel()

    const selectedClient = vm.watch?.("client");
    const services = vm.watch?.("services") || [];
    const repeat = vm.watch?.("repeat");

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
        {id: 10, label: 'Reconstrução', price: 220.00, duration: { hours: 1, minutes: 30 } },
        { id: 11, label: 'Botox', price: 350.00, duration: { hours: 1, minutes: 30 } },
    ], []);

    const RepeatList = useMemo<CustomSelectOption[]>(() => [
        { id: 1, label: 'Segunda-Feira', },
        { id: 2, label: 'Terça-Feira' },
        { id: 3, label: 'Quarta-Feira' },
        { id: 4, label: 'Quinta-Feira' },
        { id: 5, label: 'Sexta-Feira' },
        { id: 6, label: 'Sábado' },
        { id: 7, label: 'Domingo' },
    ], []);

    const reminderList = useMemo<CustomSelectOption[]>(() => [
        { id: 1, label: '1 Hora antes' },
        { id: 2, label: '2 Hora antes' },
        { id: 3, label: '3 Hora antes' },
        { id: 4, label: 'Não lembrar' },
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
        <FormProvider {...vm.methods}>
            <View style={[vars]} className={`flex-1 bg-surface pl-4 pr-4`}>
                <SafeAreaView className={`flex-1`}>
                    <View className={`w-full flex-row items-center justify-center relative`}>
                        <Text className={`text-lg font-semibold`}>Novo Agendamento</Text>
                    </View>

                    <ScrollView className={`flex-1 mt-4`} contentContainerStyle={{paddingBottom: 50}} showsVerticalScrollIndicator={false}>
                            <Controller
                                control={vm.methods?.control}
                                name="client"
                                rules={{ required: "Selecione um cliente" }}
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

                            {/* Nota */}
                            <TextInputComponent
                                name="notes"
                                label="Nota"
                                placeholder="Digite aqui alguma observação"
                                multiline
                                maxLength={200}
                            />

                            <Controller
                                control={vm.methods?.control}
                                name="services"
                                rules={{ 
                                    required: "Selecione pelo menos um serviço",
                                    validate: (value) => (value && value?.length > 0) || "Selecione pelo menos um serviço"
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <View>
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
                                                            className={`relative bg-surface p-4 rounded-lg border border-divider mb-3 shadow-sm `}
                                                        >
                                                            <View className={`absolute -left-1 top-0 bottom-0 w-1.5 bg-accent rounded-l-xl`} />
                                                            
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    const updated = services?.filter((s: CustomSelectOption) => s?.id !== item?.id);
                                                                    vm.setValue?.("services", updated);
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

                             {/* Seletor de Data e Hora */}
                             <Controller
                                 control={vm.methods.control}
                                 name="date"
                                 rules={{ required: "Selecione a data e hora do agendamento",  }}
                                 render={({ field: { value: dateValue }, fieldState: { error } }) => {
                                     const timeValue = vm.watch("time");
                                     const displayText = dateValue && timeValue 
                                        ? `${dayjs(dateValue).format('DD/MM/YYYY')} às ${timeValue}`
                                        : "Selecionar data e hora";

                                     return (
                                         <View className={`mb-4 w-full`}>
                                             <Text className={`text-sm font-normal text-ink mb-1`}>
                                                 Data e Hora do Agendamento *
                                             </Text>
                                             <TouchableOpacity
                                                 onPress={() => {
                                                     openModal('SELECT_DATE_TIME', {
                                                         totalDuration,
                                                         onSelect: (date: string, time: string) => {
                                                             vm.setValue("date", date, { shouldValidate: true });
                                                             vm.setValue("time", time, { shouldValidate: true });
                                                         }
                                                     });
                                                 }}
                                                 activeOpacity={0.7}
                                                 className={cn(
                                                     `h-12 flex-row w-full px-4 rounded-xl border bg-stone/20 items-center`,
                                                     error ? `border-danger` : `border-stone`
                                                 )}
                                             >
                                                 <View className={`mr-3`}>
                                                     <CalendarIcon color={ colors.ink} width={20} height={20} />
                                                 </View>
                                                 <Text className={cn(
                                                     `text-base`,
                                                     dateValue ? `text-ink font-semibold` : `text-muted`
                                                 )}>
                                                     {displayText}
                                                 </Text>
                                             </TouchableOpacity>
                                             {error && <Text className={`text-xs text-danger border-danger mt-1`}>{error.message}</Text>}
                                         </View>
                                     );
                                 }}
                             />
                             {/* Repetir */}
                             <Controller
                                control={vm.methods?.control}
                                name="repeat"
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <View>
                                        <CustomSelectDropdownComponent 
                                            label="Repetir"
                                            placeholder="Adicionar um Serviço"
                                            leftIcon="Repeat"
                                            options={RepeatList}
                                            onSelect={onChange}
                                            selectedValue={repeat}
                                            labelClass="text-left"
                                            typeDropdown="checkBox"
                                            multiLabelSingular="dia"
                                            multiLabelPlural="dias"
                                            error={error?.message}
                                        />
                                    </View>
                                )}
                            />

                             {/* Enviar Lembrete */}
                             <Controller
                                 control={vm.methods.control}
                                 name="reminder"
                                 render={({ field: { onChange, value }, fieldState: { error } }) => (
                                     <CustomSelectDropdownComponent
                                         label="Enviar lembrete"
                                         placeholder="Selecione um lembrete"
                                         leftIcon="Reminder"
                                         options={reminderList}
                                         onSelect={onChange}
                                         selectedValue={value}
                                         typeDropdown="radioButton"
                                         error={error?.message}
                                     />
                                 )}
                             />



                             {/* Botão de Salvar Agendamento */}
                             <TouchableOpacity
                                 onPress={vm.onSubmit}
                                 className={`bg-tintBlue h-12 items-center justify-center rounded-xl mb-10 s`}
                             >
                                 <Text className={`font-bold text-ink text-base`}>
                                     Salvar Agendamento
                                 </Text>
                             </TouchableOpacity>

                    </ScrollView>
                </SafeAreaView>
            </View>
        </FormProvider>
    );
}
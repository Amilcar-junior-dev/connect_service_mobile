import { useForm, useFormContext } from "react-hook-form";
import { AppointmentFormValues } from "./appointmentScreen.scheme";
import { Alert } from "react-native";
import dayjs from "dayjs";

export function useAppointmentViewModel() {

    const context = useFormContext<AppointmentFormValues>();
    const localMethods = useForm<AppointmentFormValues>({
        defaultValues: {
            client: null,
            services: [],
            date: null,
            time: null,
            reminder: null,
            repeat: null,
        }
    });

    const methods = context || localMethods;
    const { watch, setValue } = methods;

    const onSubmit = methods.handleSubmit(
        (data) => {
            console.log("✅ Agendamento pronto para salvar:", data);
            Alert.alert(
                "Agendamento Confirmado",
                `Cliente: ${data.client?.label}\nData: ${dayjs(data.date).format('DD/MM/YYYY')}\nHora: ${data.time}\nLembrete: ${data.reminder?.label || 'Não definido'}`
            );
        },
        (errors) => {
            console.log("❌ Erros de validação do agendamento:", errors);
        }
    );
    return {
        onSubmit,
        watch,
        setValue,
        methods,
    }
}
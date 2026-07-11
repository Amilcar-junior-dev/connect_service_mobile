import { useForm, useFormContext } from "react-hook-form";
import { AppointmentFormValues } from "./appointmentScreen.scheme";
import { Alert } from "react-native";
import dayjs from "dayjs";
import { useAppointmentStore } from "~/store/useAppointmentStore";
import { router } from "expo-router";

export function useAppointmentViewModel() {
    const addAppointment = useAppointmentStore((state) => state.addAppointment);

    const context = useFormContext<AppointmentFormValues>();
    const localMethods = useForm<AppointmentFormValues>({
        defaultValues: {
            client: null,
            services: [],
            date: null,
            time: null,
            reminder: null,
            repeat: null,
            notes: "",
        }
    });

    const methods = context || localMethods;
    const { watch, setValue } = methods;

    const onSubmit = methods.handleSubmit(
        (data) => {
            if (!data.client || !data.date || !data.time || !data.services?.length) {
                Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            const [startH, startM] = data.time.split(':').map(Number);
            let totalMinutes = 0;
            data.services.forEach((s) => {
                const h = s.duration?.hours || 0;
                const m = s.duration?.minutes || 0;
                totalMinutes += h * 60 + m;
            });

            const startTotalMinutes = startH * 60 + startM;
            const endTotalMinutes = startTotalMinutes + totalMinutes;
            const endH = Math.floor(endTotalMinutes / 60) % 24;
            const endM = endTotalMinutes % 60;
            const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

            const totalPrice = data.services.reduce((sum, s) => sum + (s.price || 0), 0);

            addAppointment({
                client_id: String(data.client.id),
                service_ids: data.services.map((s) => String(s.id)),
                clientName: data.client.label,
                serviceName: data.services.map((s) => s.label).join(', '),
                appointment_date: dayjs(data.date).format('YYYY-MM-DD'),
                startTime: data.time,
                endTime: endTimeStr,
                price: totalPrice,
                status: 'confirmed',
                notes: data.notes,
                reminder: data.reminder?.label,
                repeat: data.repeat?.label,
                created_at: new Date().toISOString(),
            });

            console.log("✅ Agendamento salvo com sucesso");

            Alert.alert(
                "Agendamento Confirmado",
                `Cliente: ${data.client.label}\nData: ${dayjs(data.date).format('DD/MM/YYYY')}\nHora: ${data.time}\nLembrete: ${data.reminder?.label || 'Não definido'}\nNota: ${data.notes || 'Nenhuma'}`
            );

            // Reseta o formulário
            methods.reset({
                client: null,
                services: [],
                date: null,
                time: null,
                reminder: null,
                repeat: null,
                notes: "",
            });

            // Redireciona para a Home
            router.push('/(private)/(tabs)/home');
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
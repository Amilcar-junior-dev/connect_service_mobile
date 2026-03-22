import { View, Text, TouchableOpacity } from 'react-native';
import { useActiveTheme } from '~/hooks/colorScheme';
import { Appointment } from '~/models/appointment.model';
import { useAppointmentCardViewModel } from '~/components/appointmentCard/appointmentCard.viewModel';

// Ícones (Ajuste os caminhos se necessário)
import EditIcon from '~/assets/svg/Edit.svg';
import TrashIcon from '~/assets/svg/Trash.svg';

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { colors } = useActiveTheme();
  const vm = useAppointmentCardViewModel(appointment);

  return (
    <View className={`w-full flex-row items-center bg-[#DCE4E8] rounded-lg p-3 mt-2`}>
      
      {/* 1. Pílula de Status (Canto esquerdo) */}
      <View 
        className={`w-1.5 h-full rounded-full mr-3`} 
        style={{ backgroundColor: vm.statusColor }} 
      />
      {/* <View 
        className={`w-1.5 h-4 rounded-tl-lg rounded-b-lg rounded-r-none absolute left-0 top-0`} 
        style={{ backgroundColor: vm.statusColor }} 
      /> */}

      {/* 2. Informações do Cliente e Serviço */}
      <View className={`flex-[2] justify-center`}>
        <Text 
          className={`text-base font-robotoBold text-textPrimary ${vm.isCanceled ? 'line-through opacity-50' : ''}`}
          numberOfLines={1}
        >
          {appointment.clientName}
        </Text>
        <Text 
          className={`text-sm font-robotoRegular text-textPrimary opacity-70 mt-0.5`}
          numberOfLines={1}
        >
          {appointment.serviceName}
        </Text>
      </View>

      {/* 3. Horário (Centro) */}
      <View className={`flex-[2] items-center justify-center`}>
        <Text className={`text-base font-robotoMedium text-textPrimary ${vm.isCanceled ? 'opacity-50' : ''}`}>
          {appointment.startTime} às {appointment.endTime}
        </Text>
      </View>

      {/* 4. Ações: Editar e Excluir (Direita) */}
      <View className={`flex-[1] flex-row items-center justify-end gap-3`}>
        <TouchableOpacity 
            onPress={vm.handleEdit}
            activeOpacity={0.7}
            className={`p-1`}
        >
          <EditIcon height={15} width={15} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={vm.handleDelete}
            activeOpacity={0.7}
            className={`p-1`}
        >
          <TrashIcon height={20} width={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

    </View>
  );
}
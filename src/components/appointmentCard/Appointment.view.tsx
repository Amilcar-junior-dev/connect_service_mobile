import { View, Text, TouchableOpacity } from 'react-native';
import { useActiveTheme } from '~/hooks/colorScheme';
import { Appointment } from '~/models/appointment.model';
import { useAppointmentCardViewModel } from '~/components/appointmentCard/appointmentCard.viewModel';

import EditIcon from '~/assets/svg/Edit.svg';
import TrashIcon from '~/assets/svg/Trash.svg';

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { colors } = useActiveTheme();
  const vm = useAppointmentCardViewModel(appointment);

  return (
    <View className={`w-full flex-row items-center bg-surface rounded-lg p-3 mt-2`}>
      
      <View 
        className={`w-1.5 h-full rounded-full mr-3`} 
        style={{ backgroundColor: vm.statusColor }} 
      />

      <View className={`flex-[2] justify-center`}>
        <Text 
          className={`text-base font-robotoBold text-ink ${vm.isCanceled ? 'line-through opacity-50' : ''}`}
          numberOfLines={1}
        >
          {appointment.clientName}
        </Text>
        <Text 
          className={`text-sm font-robotoRegular text-ink opacity-70 mt-0.5`}
          numberOfLines={1}
        >
          {appointment.serviceName}
        </Text>
      </View>

      <View className={`flex-[2] items-center justify-center`}>
        <Text className={`text-base font-robotoMedium text-ink ${vm.isCanceled ? 'opacity-50' : ''}`}>
          {appointment.startTime} às {appointment.endTime}
        </Text>
      </View>

      <View 
          className={`p-1`}
      >
        <Text className={`text-base font-robotoMedium text-ink ${vm.isCanceled ? 'opacity-50' : ''}`}>
          {vm.formattedAppoitmentValue}
        </Text>
      </View>
      <View className={`flex-[1] flex-row items-center justify-end gap-3`}>

        <TouchableOpacity 
            onPress={vm.handleDelete}
            activeOpacity={0.7}
            className={`p-1`}
        >
          <TrashIcon height={20} width={20} color={colors.ink} />
        </TouchableOpacity>
      </View>

    </View>
  );
}
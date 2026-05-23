import { Appointment, AppointmentStatus } from '~/models/appointment.model';

export function useAppointmentCardViewModel(appointment: Appointment) {
  
  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed': return '#3B82F6';
      case 'completed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'canceled': return '#EF4444';
      case 'no_show': return '#1F2937';
      default: return '#3B82F6';
    }
  };

  const statusColor = getStatusColor(appointment.status);
  const isCanceled = appointment.status === 'canceled';

  const handleEdit = () => {
    console.log('Navegar para edição do agendamento:', appointment.id);
  };

  const handleDelete = () => {
    console.log('Abrir alerta de confirmação para excluir:', appointment.id);
  };

  const formattedAppoitmentValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(appointment?.price);

  return {
    statusColor,
    isCanceled,
    formattedAppoitmentValue,
    handleEdit,
    handleDelete,
  };
}
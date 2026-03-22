import { Appointment, AppointmentStatus } from '~/models/appointment.model';

export function useAppointmentCardViewModel(appointment: Appointment) {
  
  // Mapeamento de cores baseado no status
  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed': return '#3B82F6'; // Azul
      case 'completed': return '#10B981'; // Verde
      case 'pending': return '#F59E0B';   // Laranja
      case 'canceled': return '#EF4444';  // Vermelho
      case 'no_show': return '#1F2937';   // Chumbo escuro (como na sua imagem)
      default: return '#3B82F6';
    }
  };

  const statusColor = getStatusColor(appointment.status);
  const isCanceled = appointment.status === 'canceled';

  // Lógicas de Ação dos botões
  const handleEdit = () => {
    console.log('Navegar para edição do agendamento:', appointment.id);
  };

  const handleDelete = () => {
    console.log('Abrir alerta de confirmação para excluir:', appointment.id);
  };

  return {
    statusColor,
    isCanceled,
    handleEdit,
    handleDelete,
  };
}
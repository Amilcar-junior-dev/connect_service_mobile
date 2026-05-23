export type AppointmentStatus = 'confirmed' | 'completed' | 'pending' | 'canceled' | 'no_show';

export interface Appointment {
  id: string;
  clientName: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  price: number;
  status: AppointmentStatus;
}

export interface DailyAgenda {
  id: string;
  formattedDate: string;
  totalEvents: number;
  totalValue: number;
  appointments: Appointment[];
}
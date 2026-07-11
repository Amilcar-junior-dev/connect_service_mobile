export type AppointmentStatus = 'confirmed' | 'completed' | 'pending' | 'canceled' | 'no_show';

export interface Appointment {
  id: string;
  
  // Relacionamentos reais para back-end / banco de dados
  client_id: string;
  service_ids: string[];
  
  // Dados de exibição direta (consumidos pelas views atuais)
  clientName: string;       // Concatenado: first_name + last_name
  serviceName: string;      // Concatenado se múltiplos: "Corte, Chapinha"
  
  // Tempo e Datas
  appointment_date: string; // Formato "YYYY-MM-DD"
  startTime: string;        // Formato "HH:MM", ex: "09:30"
  endTime: string;          // Formato "HH:MM", ex: "10:30"
  
  // Valores e Configurações
  price: number;            // Soma dos valores de todos os serviços selecionados
  status: AppointmentStatus;
  notes?: string;           // Notas/observações
  reminder?: string;        // Lembrete (opcional)
  repeat?: string;          // Repetição (opcional)
  
  created_at: string;       // Timestamp ISO de criação
}

export interface DailyAgenda {
  id: string;
  formattedDate: string;
  totalEvents: number;
  totalValue: number;
  appointments: Appointment[];
}
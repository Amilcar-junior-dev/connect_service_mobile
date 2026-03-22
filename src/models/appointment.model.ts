// src/models/appointment.model.ts

export type AppointmentStatus = 'confirmed' | 'completed' | 'pending' | 'canceled' | 'no_show';

export interface Appointment {
  id: string;
  clientName: string;
  serviceName: string;
  startTime: string; // Ex: "08:00"
  endTime: string;   // Ex: "09:30"
  price: number;     // Ex: 590.00
  status: AppointmentStatus;
}

export interface DailyAgenda {
  id: string;                  // Ex: "2026-12-19" (Usaremos isso para saber qual dia o botão (+) vai adicionar)
  formattedDate: string;       // Ex: "Sexta-feira, 19 de Dezembro"
  totalEvents: number;         // Ex: 15
  totalValue: number;          // Ex: 590.00
  appointments: Appointment[]; // A lista de todos os clientes desse dia
}
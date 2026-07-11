import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Appointment } from '~/models/appointment.model';
import { mmkvStorage } from './mmkvStorage';

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  removeAppointment: (id: string) => void;
  clearAppointments: () => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set) => ({
      appointments: [],
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [
            ...state.appointments,
            {
              ...appointment,
              id: String(Date.now()), // Gera ID único temporário
            },
          ],
        })),
      removeAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((app) => app.id !== id),
        })),
      clearAppointments: () => set({ appointments: [] }),
    }),
    {
      name: 'appointment-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

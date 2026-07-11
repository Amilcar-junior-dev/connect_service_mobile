import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Service } from '~/models/service.model';
import { mmkvStorage } from './mmkvStorage';

interface ServiceState {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  clearServices: () => void;
}

export const useServiceStore = create<ServiceState>()(
  persist(
    (set) => ({
      services: [],
      addService: (service) =>
        set((state) => ({
          services: [
            ...state.services,
            {
              ...service,
              id: String(Date.now()), // Gera ID único temporário
            },
          ],
        })),
      clearServices: () => set({ services: [] }),
    }),
    {
      name: 'service-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

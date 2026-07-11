import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Client } from '~/models/client.model';
import { mmkvStorage } from './mmkvStorage';

interface ClientState {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  clearClients: () => void;
}

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      clients: [],
      addClient: (client) =>
        set((state) => ({
          clients: [
            ...state.clients,
            {
              ...client,
              id: String(Date.now()), // Gera ID único temporário
            },
          ],
        })),
      clearClients: () => set({ clients: [] }),
    }),
    {
      name: 'client-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

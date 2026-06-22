import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export interface User {
  name: string;
  email: string;
}

export const useAuthStore = create(
  combine(
    {
      token: null as string | null,
      user: null as User | null,
    },
    (set) => ({
      setToken: (token: string | null) => set({ token }),
      setUser: (user: User | null) => set({ user }),
      logout: () => set({ token: null, user: null }),
    })
  )
);

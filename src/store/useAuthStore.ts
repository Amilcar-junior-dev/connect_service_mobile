import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { supabase } from '~/lib/supabase';

export interface User {
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => {
        supabase.auth.signOut();
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// Escuta mudanças de autenticação no Supabase e atualiza o estado global reativamente
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    useAuthStore.getState().setToken(session.access_token);
    useAuthStore.getState().setUser({
      name: session.user.email?.split('@')[0] ?? 'Usuário',
      email: session.user.email ?? '',
    });
  } else {
    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setUser(null);
  }
});

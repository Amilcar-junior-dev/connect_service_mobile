import { useAuthStore } from './useAuthStore';
import { supabase } from '~/lib/supabase';
// @ts-ignore
import { __triggerAuthStateChange } from '~/lib/supabase';
import { act } from '@testing-library/react-native';

describe('useAuthStore', () => {
  beforeEach(async () => {
    await act(async () => {
      useAuthStore.getState().setToken(null);
      useAuthStore.getState().setUser(null);
    });
  });

  it('deve inicializar com estado nulo', () => {
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  it('deve atualizar o token ao chamar setToken', async () => {
    await act(async () => {
      useAuthStore.getState().setToken('novo-token');
    });
    expect(useAuthStore.getState().token).toBe('novo-token');
  });

  it('deve atualizar o usuário ao chamar setUser', async () => {
    const user = { name: 'João', email: 'joao@example.com' };
    await act(async () => {
      useAuthStore.getState().setUser(user);
    });
    expect(useAuthStore.getState().user).toEqual(user);
  });

  it('deve limpar os dados e deslogar do Supabase ao chamar logout', async () => {
    await act(async () => {
      useAuthStore.getState().setToken('token-ativo');
      useAuthStore.getState().setUser({ name: 'João', email: 'joao@example.com' });
    });

    await act(async () => {
      useAuthStore.getState().logout();
    });

    expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('deve sincronizar o estado quando o Supabase disparar SIGNED_IN', async () => {
    const mockSession = {
      access_token: 'supabase-jwt-token',
      user: {
        email: 'maria@example.com',
      },
    };

    await act(async () => {
      __triggerAuthStateChange('SIGNED_IN', mockSession);
    });

    expect(useAuthStore.getState().token).toBe('supabase-jwt-token');
    expect(useAuthStore.getState().user).toEqual({
      name: 'maria',
      email: 'maria@example.com',
    });
  });

  it('deve limpar o estado quando o Supabase disparar SIGNED_OUT', async () => {
    await act(async () => {
      useAuthStore.getState().setToken('token');
      useAuthStore.getState().setUser({ name: 'Maria', email: 'maria@example.com' });
    });

    await act(async () => {
      __triggerAuthStateChange('SIGNED_OUT', null);
    });

    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
});

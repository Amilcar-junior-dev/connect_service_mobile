import { jest } from '@jest/globals';

// 1. Mock do react-native-mmkv (Simulador em memória RAM para os testes)
const mockStorage = new Map();
jest.mock('react-native-mmkv', () => {
  return {
    createMMKV: jest.fn().mockImplementation(() => ({
      set: jest.fn((key, value) => {
        mockStorage.set(key, String(value));
      }),
      getString: jest.fn((key) => {
        return mockStorage.get(key) ?? undefined;
      }),
      getNumber: jest.fn((key) => {
        const val = mockStorage.get(key);
        return val ? Number(val) : undefined;
      }),
      getBoolean: jest.fn((key) => {
        const val = mockStorage.get(key);
        return val ? val === 'true' : undefined;
      }),
      remove: jest.fn((key) => {
        return mockStorage.delete(key);
      }),
      clearAll: jest.fn(() => {
        return mockStorage.clear();
      }),
    })),
  };
});

// 2. Mock do expo-router (Roteador)
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

// Mock do expo-linking
jest.mock('expo-linking', () => {
  return {
    useLinkingURL: jest.fn(),
    parse: jest.fn((url) => {
      if (!url) return { queryParams: {} };
      if (url.includes('code=')) {
        const code = url.split('code=')[1].split('&')[0];
        return { queryParams: { code } };
      }
      if (url.includes('access_token=')) {
        const access_token = url.split('access_token=')[1].split('&')[0];
        const refresh_token = url.split('refresh_token=')[1].split('&')[0];
        return { queryParams: { access_token, refresh_token } };
      }
      return { queryParams: {} };
    }),
  };
});

// 3. Mock do Cliente Supabase e Helper de Gatilho de Autenticação
const authCallbacks = [];
jest.mock('~/lib/supabase', () => {
  return {
    supabase: {
      auth: {
        signInWithPassword: jest.fn(),
        signUp: jest.fn(),
        signOut: jest.fn(),
        resetPasswordForEmail: jest.fn(),
        exchangeCodeForSession: jest.fn(),
        setSession: jest.fn(),
        getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
        updateUser: jest.fn(),
        onAuthStateChange: jest.fn().mockImplementation((callback) => {
          authCallbacks.push(callback);
          return {
            data: {
              subscription: {
                unsubscribe: jest.fn(),
              },
            },
          };
        }),
      },
    },
    // Exportamos o array de callbacks para que os arquivos de teste consigam simular eventos
    __triggerAuthStateChange: (event, session) => {
      authCallbacks.forEach((cb) => cb(event, session));
    },
  };
});

// Reseta todos os mocks antes de cada teste
beforeEach(() => {
  mockStorage.clear();
  jest.clearAllMocks();
});

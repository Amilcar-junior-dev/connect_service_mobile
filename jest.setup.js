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

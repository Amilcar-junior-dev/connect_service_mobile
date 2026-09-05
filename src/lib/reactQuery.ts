import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos de cache padrão
      gcTime: 1000 * 60 * 30, // 30 minutos de garbage collection
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

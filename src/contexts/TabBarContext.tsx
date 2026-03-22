// src/contexts/TabBarContext.tsx
import { createContext, useContext } from 'react';
import { useSharedValue, SharedValue } from 'react-native-reanimated';

interface TabBarContextType {
  // Esse valor vai de 0 (visível) até 150 (escondida para baixo)
  tabBarOffset: SharedValue<number>;
}

export const TabBarContext = createContext<TabBarContextType | null>(null);

export function TabBarProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos a barra na posição 0 (visível)
  const tabBarOffset = useSharedValue(0);

  return (
    <TabBarContext.Provider value={{ tabBarOffset }}>
      {children}
    </TabBarContext.Provider>
  );
}

// Hook para facilitar o uso
export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (!context) {
    throw new Error('useTabBar deve ser usado dentro de um TabBarProvider');
  }
  return context;
};
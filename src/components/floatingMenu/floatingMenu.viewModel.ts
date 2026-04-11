import { useState } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

export function useFloatingMenuViewModel() {
  const [isOpen, setIsOpen] = useState(false);
  
  // animationProgress vai de 0 (fechado) até 1 (aberto)
  const animationProgress = useSharedValue(0);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    
    // Agora usamos withTiming tanto para abrir quanto para fechar
    if (nextState) {
      // Abre subindo de forma suave e reta (300ms dá um tempo agradável)
      animationProgress.value = withTiming(1, { duration: 300 }); 
    } else {
      // Fecha descendo suave
      animationProgress.value = withTiming(0, { duration: 250 });
    }
  };

  // Nossas ações do menu


  const handleActionPress = (actionId: string) => {
    console.log('Clicou em:', actionId);
    toggleMenu(); // Fecha o menu após clicar
    // Aqui no futuro você navega ou abre o modal respectivo
  };

  return {
    isOpen,
    animationProgress,
    toggleMenu,
    handleActionPress,
  };
}
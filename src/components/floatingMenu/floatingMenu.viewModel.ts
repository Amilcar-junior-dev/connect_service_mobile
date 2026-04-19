import { useState } from 'react';
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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

  // 1. Overlay Unificado (Serve para iOS e Android)
  const backdropStyle = useAnimatedStyle(() => {
    return {
      // Anima a opacidade de 0 a 0.6 (60% escuro)
      opacity: interpolate(animationProgress.value, [0, 1], [0, 0.6], Extrapolation.CLAMP),
    };
  });

  const mainButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${interpolate(animationProgress.value, [0, 1], [0, 45])}deg` }]
    };
  });


  // Nossas ações do menu


  const handleActionPress = (actionId: string) => {
    console.log('Clicou em:', actionId);
    toggleMenu(); // Fecha o menu após clicar
    // Aqui no futuro você navega ou abre o modal respectivo
  };

  return {
    isOpen,
    animationProgress,
    backdropStyle,
    mainButtonStyle,
    toggleMenu,
    handleActionPress,
  };
}
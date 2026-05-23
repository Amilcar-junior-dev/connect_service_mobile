import { useState } from 'react';
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function useFloatingMenuViewModel() {
  const [isOpen, setIsOpen] = useState(false);
  
  const animationProgress = useSharedValue(0);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    
    if (nextState) {
      animationProgress.value = withTiming(1, { duration: 300 }); 
    } else {
      animationProgress.value = withTiming(0, { duration: 250 });
    }
  };

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationProgress.value, [0, 1], [0, 0.6], Extrapolation.CLAMP),
    };
  });

  const mainButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${interpolate(animationProgress.value, [0, 1], [0, 45])}deg` }]
    };
  });


  const handleActionPress = (actionId: ()=> void) => {
    console.log('Clicou em:', actionId);
    toggleMenu();
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
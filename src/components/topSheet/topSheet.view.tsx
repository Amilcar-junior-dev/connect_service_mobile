import { View, Dimensions, Text, TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  type GestureUpdateEvent,
  type PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";

import Notification from '~/assets/svg/Notification.svg';
import WeekTag from '~/assets/svg/WeekTag.svg';
import MonthTag from '~/assets/svg/MonthTag.svg';
import RealTag from '~/assets/svg/RealTag.svg';
import DolarTag from '~/assets/svg/DolarTag.svg';

import { useActiveTheme } from "~/hooks/colorScheme";

interface TopSheetProps {
  translateY: SharedValue<number>;
}

export function TopSheet({ translateY }: TopSheetProps) {
  const { height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const {colors} = useActiveTheme()
  
  const statusBarHeight = insets.top;
  const EXPANDED_HEIGHT = height * (Platform.OS === 'android' ? 0.27 :  0.25);
  const COLLAPSED_HEIGHT = 130;

  const MAX_TRANSLATE_Y = 0;
  const MIN_TRANSLATE_Y = -(EXPANDED_HEIGHT - COLLAPSED_HEIGHT);

  const context = useSharedValue(0);

  const financialAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
      [0, 1],
      Extrapolation.CLAMP
    );
   const scale = interpolate(
      translateY.value,
      [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
      [0.85, 1],
      Extrapolation.CLAMP
    )
  
    const translateYItems = interpolate(
      translateY.value,
      [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
      [-10, 0],
      Extrapolation.CLAMP
    );
  
    return {
      opacity,
      transform: [
        { translateY: translateYItems },
        { scale }
      ]
    };
  });
  const headerAnimatedStyle = useAnimatedStyle(()=> {
        
    const dinamicRange = height * 0.12

    const translateYHeader = interpolate(
        translateY.value,
        [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
        [dinamicRange, 0],
        Extrapolation.CLAMP
    )

    return {
        transform: [{translateY: translateYHeader}]
    } 
})

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      const nextTranslateY = context.value + event.translationY;

      translateY.value = Math.max(
        MIN_TRANSLATE_Y,
        Math.min(MAX_TRANSLATE_Y, nextTranslateY)
      );
    })
    .onEnd(() => {
      const midpoint = (MIN_TRANSLATE_Y + MAX_TRANSLATE_Y) / 2;

      if (translateY.value < midpoint) {
        translateY.value = withSpring(MIN_TRANSLATE_Y);
      } else {
        translateY.value = withSpring(MAX_TRANSLATE_Y);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const ResumeFinancial = [
    {
      icon: <WeekTag color={colors.ink}/>,
      colorId: 1,
      label: 'Proj. semana',
      value: 'R$ 580,00'
    },
    {
      icon: <DolarTag color={colors.forest}/>,
      colorId: 2,
      label: 'Efet. Semana',
      value: 'R$ 580,00'
    },
    {
      icon: <MonthTag color={colors.ink}/>,
      colorId: 1,
      label: 'Proj. no Mês',
      value: 'R$ 580,00'
    },
    {
      icon: <DolarTag color={colors.forest}/>,
      colorId: 2,
      label: 'Efet. no Mês',
      value: 'R$ 580,00'
    },
    {
      icon: <RealTag color={colors.ink}/>,
      colorId: 1,
      label: 'Desp. no Mês',
      value: 'R$ 580,00'
    },
    
   
  ];

  return (
    <View
      className={`absolute top-0 left-0 right-0 z-10`}
      pointerEvents={`box-none`}
      style={{backgroundColor: 'red'}}
    >
      <Animated.View 
          style={[animatedStyle, {height: EXPANDED_HEIGHT, paddingTop: statusBarHeight  }]}
          className={`absolute top-0 px-1 left-0 right-0 bg-surface rounded-b-[30px] shadow-lg`}
      >
          <GestureDetector gesture={gesture} >
              <View className={`items-center py-3 absolute -bottom-8 self-center`}>
                  <View className={`w-3.5 h-3.5 rounded-full bg-divider`} />
              </View>
          </GestureDetector>

          <View className={`w-full h-full pb-2 relative rounded-b-[15px]`}>

              <Animated.View className={`w-full h-14 flex-row`}
                  style={headerAnimatedStyle}
              >
                  <View className={`w-[20%] h-full  items-center justify-center `}>
                      <View className={`w-[45px] h-[45px] rounded-full items-center justify-center bg-tintBlue`}>
                          
                      </View>
                  </View>
                  <View className={`w-[60%] h-full `}>
                      <Text className={`text-xl text-ink`}>
                          Connect Service
                      </Text>
                  </View>
                  <View className={`w-[20%] h-full items-end `}>
                      <TouchableOpacity onPress={()=> console.log('clicou no icone de notificação')}>
                          <Notification color={colors.ink} height={20} width={20}/>
                      </TouchableOpacity>
                  </View>
              </Animated.View>
              <Animated.View className={`flex-row flex-wrap`}
                  style={financialAnimatedStyle}
              >
                  {
                      ResumeFinancial.map((resume, index)=>(
                          <View className={`w-1/2 flex-row mb-1 items-center`}
                              key={index}
                          >
                              <View className={`w-8 h-8 rounded-full items-center justify-center ${resume.colorId == 1 ? `bg-tintBlue` : `bg-tintGreen`}`}>
                                  {resume?.icon}
                              </View>
                              <View className={`flex-1 flex-row flex-wrap`} >
                                  <Text className={`text-[12px] text-ink `}>
                                      {resume?.label+":"}
                                      <Text className={`text-[12px]`}>
                                          {resume?.value}
                                      </Text>
                                  </Text>
                              </View>

                          </View>
                      ))
                  }

              </Animated.View>

          </View>
      </Animated.View>

    </View>
  );
}
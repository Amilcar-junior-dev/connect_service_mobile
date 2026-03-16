import { View, Dimensions, Text, TouchableOpacity } from "react-native";
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
  const EXPANDED_HEIGHT = height * 0.25;
  const COLLAPSED_HEIGHT = 110;

  const MAX_TRANSLATE_Y = 0;
  const MIN_TRANSLATE_Y = -(EXPANDED_HEIGHT - COLLAPSED_HEIGHT);

  // const translateY = useSharedValue(MIN_TRANSLATE_Y);
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
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateYHeader = interpolate(
      translateY.value,
      [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
      [110, 0],
      Extrapolation.CLAMP
    );
  
    return {
      transform: [{ translateY: translateYHeader }],
    };
  });

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
      icon: <WeekTag color={colors.textPrimary}/>,
      colorId: 1,
      label: 'Proj. semana',
      value: 'R$ 580,00'
    },
    {
      icon: <DolarTag color={colors.darkGreen}/>,
      colorId: 2,
      label: 'Efet. Semana',
      value: 'R$ 580,00'
    },
    {
      icon: <MonthTag color={colors.textPrimary}/>,
      colorId: 1,
      label: 'Proj. no Mês',
      value: 'R$ 580,00'
    },
    {
      icon: <DolarTag color={colors.darkGreen}/>,
      colorId: 2,
      label: 'Efet. no Mês',
      value: 'R$ 580,00'
    },
    {
      icon: <RealTag color={colors.textPrimary}/>,
      colorId: 1,
      label: 'Desp. no Mês',
      value: 'R$ 580,00'
    },
    
   
  ];

  return (
      <Animated.View
        style={[  animatedStyle,{ height: EXPANDED_HEIGHT, paddingTop: statusBarHeight },]}
        className={`absolute  top-0 px-1 left-0 right-0 bg-white rounded-b-[30px] shadow-lg `}
      >
        <GestureDetector gesture={gesture}>
            <View className={`items-center py-3 absolute -bottom-8 self-center`}>
              <View className={`w-3.5 h-3.5 bg-gray-300 rounded-full`} />
            </View>
        </GestureDetector>
        <View className={`w-full h-full pb-2 relative  rounded-b-[15px]`}>
          <Animated.View
            style={headerAnimatedStyle}
            className="w-full h-14 flex-row"
          >
           <View className={`w-[20%] h-full items-center justify-center `}> 
            <Text className={`text-textPrimary text-sm font-roboto`}>Logo</Text>
           </View>
           <View className={`w-[60%] h-full `}> 
            <Text className={`font-robotoRegular text-xl text-textPrimary`}>
             Connect Service
            </Text>
           </View>
           <View className={`w-[20%] h-full items-end `}> 
            <TouchableOpacity className={`mr-3`}>
              <Notification
                color={colors.textPrimary}
              />
            </TouchableOpacity>
           </View>
          </Animated.View>
          <Animated.View
            style={financialAnimatedStyle}
            className="flex-row flex-wrap"
          >
            {
              ResumeFinancial?.map((resume, index)=>(
                <View key={index} className={`w-1/2 flex-row mb-1 items-center`}>
                  <View  className={`w-8 h-8 rounded-full items-center justify-center ${resume.colorId == 1 ?  `bg-lightBlue` : `bg-lightGreen`}`}>
                    {resume?.icon}
                  </View>
                  <View className={`flex-1 flex-row flex-wrap`}>
                    <Text className={`text-[12px] font-robotoRegular`}>  {resume.label+': ' }
                      <Text className={`font-robotoBold`}>{resume.value}</Text> 
                    </Text>
                  </View>
                </View>
              ))
            }
          </Animated.View>
        </View>  
      </Animated.View>
  );
}
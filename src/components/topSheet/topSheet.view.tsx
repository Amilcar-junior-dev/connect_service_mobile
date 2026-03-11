import { ReactNode } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

type Props = {
  children: ReactNode;
};

export function TopSheet({ children }: Props) {
  const EXPANDED_HEIGHT = height * 0.35;
  const COLLAPSED_HEIGHT = 80;

  const MAX_TRANSLATE_Y = 0;
  const MIN_TRANSLATE_Y = -(EXPANDED_HEIGHT - COLLAPSED_HEIGHT);

  const translateY = useSharedValue(MIN_TRANSLATE_Y);
  const context = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event) => {
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

  return (
      <Animated.View
        style={[
            animatedStyle,
          {
              height: EXPANDED_HEIGHT,
            },
        ]}
        className="absolute top-0 left-0 right-0 bg-white rounded-b-[30px] shadow-lg"
      >

        {children}
        <GestureDetector gesture={gesture}>
            <View className="items-center py-3 absolute -bottom-8 self-center">
            <View className="w-14 h-1.5 bg-gray-300 rounded-full" />
            </View>
        </GestureDetector>
      </Animated.View>
  );
}
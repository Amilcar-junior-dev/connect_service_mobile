import React from 'react';
import { Dimensions,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { useActiveTheme } from '~/hooks/colorScheme';
import { TopSheet } from '~/components/topSheet/topSheet.view';
import { ExpandableCalendarScreen } from '~/components/calendar/ExpandableCalendar.view';
import { FloatingMenu } from '~/components/floatingMenu/FloatingMenu.view';


export const HomeView: React.FC = () => {
    const theme = useActiveTheme();
    const { height } = Dimensions.get("window");

    const EXPANDED_HEIGHT = height * 0.25;
    const COLLAPSED_HEIGHT = 110;
    const MIN_TRANSLATE_Y = -(EXPANDED_HEIGHT - COLLAPSED_HEIGHT);

    const translateY = useSharedValue(MIN_TRANSLATE_Y);

    const contentAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });


    return (
        <LinearGradient
            colors={[theme.colors.accent, theme.colors.surface]}
            style={[{ flex: 1 }]}
        >
            <SafeAreaView className={`flex-1`}>
                <TopSheet translateY={translateY} />
                
                <Animated.View 
                    className={`px-2`}
                    style={[
                        contentAnimatedStyle, 
                        { marginTop: EXPANDED_HEIGHT, }
                    ]}
                >
                    <ExpandableCalendarScreen />
                </Animated.View>
                <FloatingMenu />
            </SafeAreaView>
        </LinearGradient>
    );
}
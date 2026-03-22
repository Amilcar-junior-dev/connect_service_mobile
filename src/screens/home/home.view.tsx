// src/views/home/home.view.tsx
import React from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { useActiveTheme } from '~/hooks/colorScheme';
import { TopSheet } from '~/components/topSheet/topSheet.view';
import { ExpandableCalendarScreen } from '~/components/calendar/calendar.view';

export const HomeView: React.FC = () => {
    const theme = useActiveTheme();
    const { height } = Dimensions.get("window");

    // Medidas exatas do seu TopSheet
    const EXPANDED_HEIGHT = height * 0.25;
    const COLLAPSED_HEIGHT = 110;
    const MIN_TRANSLATE_Y = -(EXPANDED_HEIGHT - COLLAPSED_HEIGHT);

    // O valor compartilhado da animação agora mora aqui na Home!
    const translateY = useSharedValue(MIN_TRANSLATE_Y);

    // Estilo animado para o conteúdo (Calendário) subir e descer junto com o TopSheet
    const contentAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <LinearGradient
            colors={[theme.colors.primaryBlue, theme.colors.background]}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="flex-1">
                {/* Passamos o translateY como propriedade para o TopSheet */}
                <TopSheet translateY={translateY} />
                
                {/* View animada que segura o calendário e o resto da tela */}
                <Animated.View 
                    className={`px-2`}
                    style={[
                        contentAnimatedStyle, 
                        // Colocamos uma margem no topo do exato tamanho do TopSheet aberto
                        { marginTop: EXPANDED_HEIGHT, }
                    ]}
                >
                    <ExpandableCalendarScreen />
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
}
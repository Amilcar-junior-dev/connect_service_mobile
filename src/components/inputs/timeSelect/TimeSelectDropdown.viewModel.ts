import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    cancelAnimation,
    interpolate,
    Easing,
    Extrapolation
} from 'react-native-reanimated';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { TimeSelectDropdownProps, ITEM_HEIGHT } from './timeSelectDropdown.scheme';

export function useTimeSelectViewModel({ hours, minutes, onTimeChange }: Partial<TimeSelectDropdownProps>) {
    const [isOpen, setIsOpen] = useState(false);

    const animation = useSharedValue(0);

    const hoursArray = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
    const minutesArray = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

    useEffect(() => {
        animation.value = withTiming(isOpen ? 1 : 0, {
            duration: 400,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
    }, [isOpen]);

    useEffect(() => {
        return () => cancelAnimation(animation);
    }, []);

    const dropdownStyle = useAnimatedStyle(() => ({
        opacity: animation.value,
        height: interpolate(animation.value, [0, 1], [0, 120], Extrapolation.CLAMP),
    }));
    const arrowStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: withTiming(isOpen ? '180deg' : '0deg', { duration: 300 }) }],
    }));

    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

    const handleScroll = useCallback((
        event: NativeSyntheticEvent<NativeScrollEvent>,
        type: 'hours' | 'minutes'
    ) => {
        const y = event.nativeEvent.contentOffset.y;
        const index = Math.round(y / ITEM_HEIGHT);

        if (type === 'hours') {
            const newHour = hoursArray[index] ?? 0;
            if (newHour !== hours) {
                onTimeChange?.({ hours: newHour, minutes: minutes ?? 0 });
            }
        } else {
            const newMinute = minutesArray[index] ?? 0;
            if (newMinute !== minutes) {
                onTimeChange?.({ hours: hours ?? 0, minutes: newMinute });
            }
        }
    }, [hours, minutes, onTimeChange, hoursArray, minutesArray]);

    const formatValue = (val: number) => val.toString().padStart(2, '0');

    const getItemLayout = (_: ArrayLike<number> | null | undefined, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

    return {
        isOpen,
        toggleOpen,
        animatedStyle: {
            dropdownStyle,
            arrowStyle
        },
        hoursArray,
        minutesArray,
        handleScroll,
        formatValue,
        getItemLayout
    };
}
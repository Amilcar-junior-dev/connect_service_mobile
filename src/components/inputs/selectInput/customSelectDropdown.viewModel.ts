import { useState, useMemo, useEffect, useCallback } from 'react';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    cancelAnimation,
    interpolate,
    Easing,
    Extrapolation
} from 'react-native-reanimated';
import { CustomSelectDropdownProps } from './customSelectDropdown.scheme';

export function useCustomPickerViewModel({ options, onSelect, typeDropdown = 'select', selectedValue }: Partial<CustomSelectDropdownProps>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const animation = useSharedValue(0);

    useEffect(() => {
        if (isOpen) {
            animation.value = withTiming(1, {
                duration: 500,
                easing: Easing.out(Easing.quad)
            });
        } else {
            animation.value = withTiming(0, {
                duration: 500,
                easing: Easing.out(Easing.quad)
            });
        }
    }, [isOpen]);
    const arrowStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: withTiming(isOpen ? '180deg' : '0deg', { duration: 500 }) }],
    }));

    useEffect(() => {
        return () => cancelAnimation(animation);
    }, []);



    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

    const filteredOptions = useMemo(() => {
        if (!searchQuery) return options || [];
        return (options || [])?.filter(opt =>
            opt?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
    }, [options, searchQuery]);

    const dropdownStyle = useAnimatedStyle(() => {

        const hasResults = filteredOptions?.length > 0;
        const targetHeight = hasResults ? 250 : 70;

        return {
            height: interpolate(animation.value, [0, 1], [0, targetHeight], Extrapolation.CLAMP),
            opacity: animation.value,
        };
    }, [filteredOptions]);

    const handleSelect = useCallback((item: any) => {
        if (typeDropdown === 'checkBox') {
            const currentSelected = Array?.isArray(selectedValue) ? selectedValue : [];
            const isAlreadySelected = currentSelected?.some((x: any) => x?.id === item?.id);
            let newSelected;
            if (isAlreadySelected) {
                newSelected = currentSelected?.filter((x: any) => x?.id !== item?.id);
            } else {
                newSelected = [...currentSelected, item];
            }
            onSelect?.(newSelected);
        } else {
            onSelect?.(item);
            setIsOpen(false);
            setSearchQuery('');
        }
    }, [onSelect, typeDropdown, selectedValue]);

    return {
        isOpen,
        toggleOpen,
        searchQuery,
        setSearchQuery,
        filteredOptions,
        handleSelect,
        dropdownStyle,
        arrowStyle,
    };
}
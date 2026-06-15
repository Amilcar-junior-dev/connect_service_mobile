import { useMemo, useEffect, useRef } from 'react';
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ITEM_HEIGHT } from './timeSelectDropdown.scheme';
import { TimeWheelPickerProps } from './timeWheelPicker.scheme';

export function useTimeWheelPickerViewModel({
  hours,
  minutes,
  onTimeChange,
  minuteInterval,
}: Required<TimeWheelPickerProps>) {
  const hoursArray = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const minutesArray = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i += minuteInterval) {
      arr.push(i);
    }
    return arr;
  }, [minuteInterval]);

  const hoursRef = useRef<ScrollView>(null);
  const minutesRef = useRef<ScrollView>(null);

  const findClosestIndex = (val: number, arr: number[]) => {
    let closestIdx = 0;
    let minDiff = Infinity;
    for (let i = 0; i < arr.length; i++) {
      const diff = Math.abs(arr[i] - val);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    return closestIdx;
  };

  useEffect(() => {
    const hIndex = hoursArray.indexOf(hours);
    if (hIndex !== -1) {
      const timer = setTimeout(() => {
        hoursRef.current?.scrollTo({ y: hIndex * ITEM_HEIGHT, animated: false });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [hours, hoursArray]);

  useEffect(() => {
    const closestIdx = findClosestIndex(minutes, minutesArray);
    const timer = setTimeout(() => {
      minutesRef.current?.scrollTo({ y: closestIdx * ITEM_HEIGHT, animated: false });
    }, 50);
    return () => clearTimeout(timer);
  }, [minutes, minutesArray]);

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    type: 'hours' | 'minutes'
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);

    if (type === 'hours') {
      const newHour = hoursArray[index];
      if (newHour !== undefined && newHour !== hours) {
        onTimeChange({ hours: newHour, minutes });
      }
    } else {
      const newMinute = minutesArray[index];
      if (newMinute !== undefined && newMinute !== minutes) {
        onTimeChange({ hours, minutes: newMinute });
      }
    }
  };

  const formatValue = (val: number) => val.toString().padStart(2, '0');

  return {
    hoursArray,
    minutesArray,
    hoursRef,
    minutesRef,
    handleScroll,
    formatValue,
  };
}

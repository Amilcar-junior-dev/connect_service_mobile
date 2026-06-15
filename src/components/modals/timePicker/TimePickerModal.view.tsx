import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useActiveTheme } from '~/hooks/colorScheme';
import Close from '~/assets/svg/Close.svg';
import { TimeWheelPicker } from '~/components/inputs/timeSelect/TimeWheelPicker.view';
import { TimePickerModalProps } from './timePickerModal.scheme';
import { useTimePickerModalViewModel } from './TimePickerModal.viewModel';

export function TimePickerModal({
  visible,
  onClose,
  hours,
  minutes,
  onTimeChange,
  minuteInterval = 15,
}: TimePickerModalProps) {
  const { colors } = useActiveTheme();
  const vm = useTimePickerModalViewModel({
    hours,
    minutes,
    onTimeChange,
    onClose,
    visible,
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType={`fade`}
      onRequestClose={onClose}
    >
      <View className={`flex-1 bg-black/50 justify-center items-center px-4`}>
        <View className={`bg-surface w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-divider relative`}>
          {/* Header */}
          <View className={`w-full flex-row justify-center items-center mb-4`}>
            <Text className={`text-xl font-bold text-ink font-robotoBold`}>
              Selecione um horário
            </Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className={`absolute right-0 top-0`}
            >
              <Close color={colors.ink} height={24} width={24} />
            </TouchableOpacity>
          </View>

          {/* Time Picker Wheel Container */}
          <View className={`h-40 w-full items-center justify-center`}>
            <TimeWheelPicker
              hours={vm.tempHours}
              minutes={vm.tempMinutes}
              onTimeChange={vm.handleTimeChange}
              minuteInterval={minuteInterval}
            />
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={vm.handleConfirm}
            activeOpacity={0.7}
            className={`bg-tabBar mt-6 h-11 items-center justify-center rounded-lg w-full active:opacity-80`}
          >
            <Text className={`font-bold text-surface text-sm font-robotoBold`}>
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}


import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Calendar, DateData } from 'react-native-calendars';
import dayjs from 'dayjs';

import { useModalSelectDateTimeViewModel } from './modalSelectDateTime.viewModel';
import Close from '~/assets/svg/Close.svg';
import { useActiveTheme } from '~/hooks/colorScheme';
import { cn } from '~/utils/cx';
import { DayState } from '~/components/calendar/expandableCalendar.scheme';

interface ModalSelectDateTimeProps {
  data?: Record<string, unknown> | null;
}

export const ModalSelectDateTime = memo(function ModalSelectDateTime({ data }: ModalSelectDateTimeProps) {
  const { colors } = useActiveTheme();
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const vm = useModalSelectDateTimeViewModel();

  const MAX_MODAL_HEIGHT = SCREEN_HEIGHT * 0.92;

  // Custom Day Component for the Calendar inside the Modal
  const renderCustomDay = useCallback(({ date, state, onPress }: { date?: DateData; state?: any; onPress?: (date?: DateData) => void }) => {
    if (!date) return null;
  
    const dateString = date.dateString;
    const isSelected = dateString === vm.selectedDate;
    const isToday = dateString === dayjs().format('YYYY-MM-DD');
    const isDisabled = state === DayState.DISABLED;

    let bgClass = `bg-transparent`;
    let textClass = `text-ink`;

    if (isSelected) {
      bgClass = `bg-accent rounded-full`; // Highlight in light blue/cyan (accent)
      textClass = `text-white font-bold`;
    } else if (isToday) {
      bgClass = `bg-tintBlue rounded-full`;
      textClass = `text-accent font-bold`;
    } else if (isDisabled) {
      textClass = `text-stone/60`;
    }

    return (
      <TouchableOpacity
        onPress={() => !isDisabled && onPress?.(date)}
        activeOpacity={0.7}
        disabled={isDisabled}
        className={cn(`w-9 h-9 items-center justify-center`, bgClass)}
      >
        <Text className={cn(`text-sm font-robotoMedium`, textClass)}>
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  }, [vm.selectedDate, colors]);

  const formattedHeaderDate = dayjs(vm.selectedDate).format('DD [de] MMMM YYYY');

  return (
    <Modalize
      ref={vm.modalRef}
      modalHeight={MAX_MODAL_HEIGHT}
      handlePosition="inside"
      keyboardAvoidingBehavior="padding"
      tapGestureEnabled={false}
      panGestureEnabled={false}
      closeOnOverlayTap={false}
      withHandle={false}
      modalStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.surface,
      }}
      HeaderComponent={
        <View className={`w-full px-5 pt-6 pb-2 relative flex-row justify-between items-center border-b border-divider`}>
          <Text className={`text-xl text-ink font-bold self-center flex-1 text-center`}>
            Selecione data e hora
          </Text>
          <TouchableOpacity 
            onPress={vm.handleClose} 
            className={`absolute right-5 top-5 p-1 rounded-full active:bg-divider`}
          >
            <Close color={colors.ink} height={24} width={24} />
          </TouchableOpacity>
        </View>
      }
      onClosed={vm.closeModal}
    >
      <View className={`flex-1 px-4 pt-4`}>
        {/* Sub-header Date Indicator */}
        <View className={`flex-row items-center justify-center mb-4`}>
          <Text className={`text-base text-ink font-bold capitalize`}>
            {formattedHeaderDate}
          </Text>
        </View>

        {/* Modal Calendar Component */}
        <View className={`mb-6 rounded-2xl overflow-hidden border border-divider`}>
          <Calendar
            current={vm.selectedDate}
            onDayPress={(day) => vm.handleDayPress(day.dateString)}
            dayComponent={({ date, state }: any) => 
              renderCustomDay({ 
                date, 
                state, 
                onPress: (d) => d && vm.handleDayPress(d.dateString) 
              })
            }
            firstDay={1}
            theme={{
              calendarBackground: colors.surface,
              textSectionTitleColor: colors.muted,
              monthTextColor: colors.ink,
              arrowColor: colors.ink,
              textMonthFontFamily: 'Roboto_700Bold',
              textDayHeaderFontFamily: 'Roboto_700Bold',
            }}
          />
        </View>

        {/* Divider */}
        <View className={`h-[1px] bg-divider mb-6 w-full`} />

        {/* Time Slots Title */}
        <Text className={`text-base font-bold text-ink mb-4`}>
          Horários Disponíveis (Duração: {vm.totalDuration} min)
        </Text>

        {/* Time Slots Grid */}
        <View className={`flex-row flex-wrap justify-between mb-8`}>
          {vm.timeSlots.map((slot) => {
            const isSelected = vm.selectedTime === slot.time;
            const isDisabled = !slot.available;

            let slotStyle = `border border-stone bg-surface`;
            let textStyle = `text-ink font-semibold`;

            if (isSelected) {
              slotStyle = `bg-tabBar border border-tabBar`; // Solid dark blue (tabBar)
              textStyle = `text-white font-bold`;
            } else if (isDisabled) {
              slotStyle = `bg-stone/30 border border-stone/30`; // Greyed out
              textStyle = `text-muted font-normal`;
            }

            return (
              <TouchableOpacity
                key={slot.time}
                disabled={isDisabled}
                onPress={() => vm.setSelectedTime(slot.time)}
                activeOpacity={0.7}
                className={cn(
                  `w-[23%] py-2.5 mb-3 items-center justify-center rounded-xl transition-all duration-150`,
                  slotStyle
                )}
              >
                <Text className={cn(`text-sm`, textStyle)}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          disabled={!vm.selectedTime}
          onPress={vm.handleConfirm}
          className={cn(
            `w-full h-12 items-center justify-center rounded-xl mb-12 shadow-sm`,
            vm.selectedTime ? `bg-tabBar active:opacity-90` : `bg-stone/50`
          )}
        >
          <Text className={`font-bold text-surface text-base`}>
            Confirmar Horário
          </Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
});

import { useCallback, } from 'react';
import { TouchableOpacity, View, Text,   } from 'react-native';

import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';

import { CalendarProvider, ExpandableCalendar, LocaleConfig,  } from 'react-native-calendars';

import { ScrollView } from 'react-native-gesture-handler';

import { useActiveTheme } from '~/hooks/colorScheme';
import { useCalendarViewModel } from './useCalendarViewModel';

import { useTabBar } from '~/contexts/TabBarContext';

import { DailyAgendaAccordion } from '../dailyAgendaAccordion/DailyAgendaAccordion';
import {  DayState,  ExactDayProps } from './expandableCalendar.scheme';
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';





export  function ExpandableCalendarScreen() {

  const { tabBarOffset } = useTabBar();
  const lastScrollY = useSharedValue(0);
  const { colors } = useActiveTheme();
  const AnimatedGHScrollView = Animated.createAnimatedComponent(ScrollView);
  const vm = useCalendarViewModel();


  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;

      const contentHeight = event.contentSize.height;
      const screenHeight = event.layoutMeasurement.height;

      if (contentHeight <= screenHeight) return;
      
      if (currentY < 0) return; 

      const scrollDifference = currentY - lastScrollY.value;

      if (scrollDifference > 15) {
        tabBarOffset.value = withTiming(150, { duration: 300 }); 
        lastScrollY.value = currentY;
      } 
      else if (scrollDifference < -15) {
        tabBarOffset.value = withTiming(0, { duration: 300 });
        lastScrollY.value = currentY;
      }
    },
  });
    
  const renderCustomDay = useCallback((props: ExactDayProps) => {
    const { date, state, onPress } = props;

    const isSelected = state == DayState.SELECTED; 
    const isToday = state == DayState.TODAY;
    const isDisabled = state == DayState.DISABLED;

    const dayStyles = {
      selected: { bg: colors.ink, text: 'text-surface', border: 'border border-ink' },
      today:    { bg: colors.accent, text: 'text-surface', border: 'border border-accent' },
      disabled: { bg: colors.divider, text: 'text-stone', border: 'border border-stone' },
      inactive: { bg: colors.tintBlue, text: 'text-ink', border: 'border border-ink' },
      default:  { bg: colors.tintBlue, text: 'text-ink', border: 'border border-ink' },
    };

    const currentStyle = dayStyles[state || 'default'];

    let bgClass = `bg-transparent`; 
    let textClass = `text-ink`; 
    let borderClass = `border border-ink`;

    if (isSelected) {
      bgClass = `bg-ink`; 
      textClass = `text-surface`; 
      borderClass = `border border-ink`;
    } else if (isToday) {
      bgClass = `bg-accent`; 
      textClass = `text-surface`; 
      borderClass = `border border-accent`;
    } else if (!isDisabled && !isToday) {
      bgClass = `bg-tintBlue`;
    } else if (isDisabled) {
      textClass = `text-stone`;
      borderClass = `border border-stone`;
      bgClass = `bg-divider`;
    }

    return (
      <TouchableOpacity
        onPress={() => onPress?.(date)} 
        activeOpacity={0.7}
        className={`w-9 h-9 items-center justify-center rounded-lg shadow-sm ${bgClass} ${borderClass}`}
      >
        <Text className={`${textClass} text-sm font-robotoMedium`}>
          {date?.day}
        </Text>
      </TouchableOpacity>
    );
  }, []);
  


  return (
      <View className={`flex-1 bg-red-600`}>
          <CalendarProvider 
            date={vm.initialDate}
            onDateChanged={vm.handleDayPress}
            style={{borderRadius:12, paddingLeft: 0, paddingRight: 0}}
          >
          
              <View 
                className={`bg-transparent rounded-[20px]`}
                style={{
                  height:800
                }}
              > 
                <ExpandableCalendar 
                  firstDay={1} 
                  style={{borderRadius:12,}}
                  dayComponent={renderCustomDay}
                  disableWeekScroll
                  onCalendarToggled={vm.handleCalendarToggled}
                  theme={{
                      dayTextColor: colors.ink,
                      textDisabledColor: colors.stone,
                      todayTextColor: colors.surface, 
                      todayBackgroundColor: colors.accent,
                      selectedDayBackgroundColor: colors.ink,
                      selectedDayTextColor: colors.surface,
                      textDayFontFamily: 'Roboto_400Regular',
                      textMonthFontFamily: 'Roboto_700Bold',
                      textDayHeaderFontFamily: 'Roboto_700Bold',
                      monthTextColor: colors.ink,
                      arrowColor: colors.ink,
                  }}
                  disablePan={false} 
                />
                <AnimatedGHScrollView
                  className={`flex-1`} 
                  contentContainerStyle={{paddingBottom:200}} 
                  showsVerticalScrollIndicator={false}
                  onScroll={scrollHandler}
                  scrollEventThrottle={16}
                >
                  {vm.mockDailyAgendas.length === 0 ? (
                    <View className={`items-center justify-center mt-10`}>
                      <Text className={`text-muted text-base font-robotoMedium`}>
                        Nenhum agendamento encontrado.
                      </Text>
                    </View>
                  ) : (
                    vm.mockDailyAgendas.map((dia) => (
                      <DailyAgendaAccordion key={dia.id} agenda={dia} />
                    ))
                  )}
                </AnimatedGHScrollView>
              </View> 
          </CalendarProvider>
      </View>
      

  );
}
// src/components/calendar/calendar.view.tsx
import React, { useCallback, useRef } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { CalendarProvider, ExpandableCalendar, LocaleConfig, WeekCalendar } from 'react-native-calendars';
import { useActiveTheme } from '~/hooks/colorScheme';
import { useCalendarViewModel } from '~/viewModels/components/calendar/calendarViewModel';

import Today from '~/assets/svg/Today.svg';
// Configuração básica
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export  function ExpandableCalendarScreen() {
    const { colors } = useActiveTheme();
    const vm = useCalendarViewModel();

  // Referência para controlar o calendário manualmente
  const calendarRef = useRef<any>(null);

  // Função para abrir/fechar quando clicar na nossa bolinha


    
  const renderCustomDay = useCallback((props: any) => {
    // A biblioteca avisa o estado pelo contexto!
    const { date, state, onPress } = props;

    // O CalendarProvider gerencia quem está selecionado nativamente
    const isSelected = state === 'selected'; 
    const isToday = state === 'today';
    const isDisabled = state === 'disabled';

    let bgClass = 'bg-transparent'; 
    let textClass = 'text-textPrimary'; 
    let borderClass = 'border border-textPrimary';

    if (isSelected) {
      bgClass = 'bg-textPrimary'; 
      textClass = 'text-background'; 
      borderClass = 'border border-textPrimary';
    } else if (isToday) {
      bgClass = 'bg-primaryBlue'; 
      textClass = 'text-background'; 
      borderClass = 'border border-primaryBlue';
    } else if (!isDisabled && !isToday) {
      bgClass = 'bg-lightBlue';
    } else if (isDisabled) {
      textClass = 'text-neutral';
      borderClass = 'border border-neutral';
      bgClass = 'bg-border';
    }

    return (
      <TouchableOpacity
        onPress={() => onPress(date)} 
        activeOpacity={0.7}
        className={`w-9 h-9 items-center justify-center rounded-lg shadow-sm ${bgClass} ${borderClass}`}
      >
        <Text className={`${textClass} text-sm font-robotoMedium`}>
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  }, []); // Array VAZIO!

  return (
    // ⚠️ O SEGREDO AQUI: Tiramos o flex: 1 e forçamos uma altura fixa de 350 pixels 
    // com um fundo vermelho só para você enxergar a caixa dele!
      
      <CalendarProvider 
         date={vm.initialDate}
        onDateChanged={vm.handleDayPress}
        style={{ borderRadius:12, paddingLeft: 0, paddingRight: 0 }}
      >
        <View 
            className="bg-transparent rounded-[20px] shadow-sm  h-[350px]"
        >
            <ExpandableCalendar 
            firstDay={1} 
            style={{borderRadius:12, }}
            // Usamos o nosso componente de dia quadrado em vez do padrão
            dayComponent={renderCustomDay}
            // ⚠️ ADICIONE ESTA LINHA: É ela que avisa o dayComponent quem está selecionado
            disableWeekScroll
            // ⚠️ A SOLUÇÃO AQUI: Impede o calendário de fechar sozinho ao clicar num dia
            // Retorna true se o calendario estiver aberto e false caso não
            onCalendarToggled={vm.handleCalendarToggled}
            theme={{
                // Cor dos dias normais do mês atual
                dayTextColor: colors.textPrimary,
                // Cor dos dias de fora do mês (opacos)
                textDisabledColor: colors.neutral,
                
                // Cor exclusiva para o dia de "Hoje"
                todayTextColor: colors.background, 
                // Cor de fundo do dia de hoje
                todayBackgroundColor: colors.primaryBlue,
                // Cor de fundo do dia selecionado
                selectedDayBackgroundColor: colors.textPrimary,
                // Cor do texto do dia selecionado
                selectedDayTextColor: colors.background,
                // Customizando a tipografia
                textDayFontFamily: 'Roboto_400Regular',
                textMonthFontFamily: 'Roboto_700Bold',
                textDayHeaderFontFamily: 'Roboto_700Bold',
                
                // Cores do cabeçalho
                monthTextColor: colors.textPrimary,
                arrowColor: colors.textPrimary,
                // expandableKnobColor: colors.neutral,
            }}
            disablePan={false} 
            />
            {/* {!vm.isSelectedToday && vm.isExpanded && (
                <View className="items-start mt-4"> 
                <TouchableOpacity
                    onPress={vm.goToToday}
                    activeOpacity={0.7}
                    className="flex-row items-center bg-white px-4 py-2 rounded-full shadow-sm"
                    style={{ elevation: 3 }}
                >
                    <Today height={20} width={20} color={colors.textPrimary}/>
                    <Text className="text-textPrimary font-robotoBold text-sm ml-1">
                     Hoje
                    </Text>
                </TouchableOpacity>
                </View>
            )} */}
       
        </View>
      </CalendarProvider>

  );
}
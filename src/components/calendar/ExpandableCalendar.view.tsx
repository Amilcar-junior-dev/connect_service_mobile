// src/components/calendar/calendar.view.tsx
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

  const { tabBarOffset } = useTabBar(); // Pegamos a conexão com a barra
  const lastScrollY = useSharedValue(0); // Memória para saber se está subindo ou descendo
  const { colors } = useActiveTheme();
  const AnimatedGHScrollView = Animated.createAnimatedComponent(ScrollView);
  const vm = useCalendarViewModel();


  // O "Espião" corrigido para acumular o scroll lento
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;

      //contentSize (tamanho de todos os cards somados)
      const contentHeight = event.contentSize.height;
      //layoutMeasurement (tamanho da tela disponível) para saber se a tela é "rolável" ou não.
      const screenHeight = event.layoutMeasurement.height;

      // 1. A MÁGICA AQUI: Se a altura de todos os cards juntos for MENOR 
      // ou igual ao tamanho da tela, não tem scroll real. Então ignora a TabBar!
      if (contentHeight <= screenHeight) return;
      
      // Ignora o "pulo" elástico do scroll no iOS quando chega no topo
      if (currentY < 0) return; 

      // Calculamos a diferença exata desde a última vez que a barra se mexeu
      const scrollDifference = currentY - lastScrollY.value;

      // Se rolou mais de 15 pixels PARA BAIXO (Lendo a lista) -> ESCONDE
      if (scrollDifference > 15) {
        tabBarOffset.value = withTiming(150, { duration: 300 }); 
        lastScrollY.value = currentY; // Só reseta a âncora quando a ação acontece!
      } 
      // Se rolou mais de 15 pixels PARA CIMA (Voltando) -> MOSTRA
      else if (scrollDifference < -15) {
        tabBarOffset.value = withTiming(0, { duration: 300 });
        lastScrollY.value = currentY; // Só reseta a âncora quando a ação acontece!
      }
    },
  });
    
  const renderCustomDay = useCallback((props: ExactDayProps) => {
    // A biblioteca avisa o estado pelo contexto!
    const { date, state, onPress } = props;

    // O CalendarProvider gerencia quem está selecionado nativamente
    const isSelected = state == DayState.SELECTED; 
    const isToday = state == DayState.TODAY
    const isDisabled = state == DayState.DISABLED;

    const dayStyles = {
      selected: { bg: colors.ink, text: 'text-surface', border: 'border border-ink' },
      today:    { bg: colors.accent, text: 'text-surface', border: 'border border-accent' },
      disabled: { bg: colors.divider, text: 'text-stone', border: 'border border-stone' },
      inactive: { bg: colors.tintBlue, text: 'text-ink', border: 'border border-ink' },
      default:  { bg: colors.tintBlue, text: 'text-ink', border: 'border border-ink' },
    };

    const currentStyle = dayStyles[state || 'default'];

    let bgClass = 'bg-transparent'; 
    let textClass = 'text-ink'; 
    let borderClass = 'border border-ink';

    if (isSelected) {
      bgClass = 'bg-ink'; 
      textClass = 'text-surface'; 
      borderClass = 'border border-ink';
    } else if (isToday) {
      bgClass = 'bg-accent'; 
      textClass = 'text-surface'; 
      borderClass = 'border border-accent';
    } else if (!isDisabled && !isToday) {
      bgClass = 'bg-tintBlue';
    } else if (isDisabled) {
      textClass = 'text-stone';
      borderClass = 'border border-stone';
      bgClass = 'bg-divider';
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
      // <TouchableOpacity
      //   onPress={() => onPress?.(date )} 
      //   activeOpacity={0.7}
      //   // 3. Injeta as classes diretamente aqui de forma muito mais limpa!
      //   className={`w-9 h-9 items-center justify-center rounded-lg shadow-sm ${currentStyle.bg} ${currentStyle.border}`}
      // >
      //   <Text className={`${currentStyle.text} text-sm font-robotoMedium`}>
      //     {date?.day}
      //   </Text>
      // </TouchableOpacity>
    );
  }, []); // Array VAZIO!
  



  return (
    // ⚠️ O SEGREDO AQUI: Tiramos o flex: 1 e forçamos uma altura fixa de 350 pixels 
    // com um fundo vermelho só para você enxergar a caixa dele!
      <View className='flex-1 '
      >
          <CalendarProvider 
            date={vm.initialDate}
            onDateChanged={vm.handleDayPress}
            style={{borderRadius:12, paddingLeft: 0, paddingRight: 0,
              // height:800,

             }}
          >
          
               <View 
                className="bg-transparent rounded-[20px]"
                style={{
                  height:800
                }}
              > 
                <ExpandableCalendar 
                  firstDay={1} 
                  style={{borderRadius:12,}}
                  // Usamos o nosso componente de dia quadrado em vez do padrão
                  dayComponent={renderCustomDay}
                  // ⚠️ ADICIONE ESTA LINHA: É ela que avisa o dayComponent quem está selecionado
                  disableWeekScroll
                  // ⚠️ A SOLUÇÃO AQUI: Impede o calendário de fechar sozinho ao clicar num dia
                  // Retorna true se o calendario estiver aberto e false caso não
                  onCalendarToggled={vm.handleCalendarToggled}
                  theme={{
                      // Cor dos dias normais do mês atual
                      dayTextColor: colors.ink,
                      // Cor dos dias de fora do mês (opacos)
                      textDisabledColor: colors.stone,
                      
                      // Cor exclusiva para o dia de "Hoje"
                      todayTextColor: colors.surface, 
                      // Cor de fundo do dia de hoje
                      todayBackgroundColor: colors.accent,
                      // Cor de fundo do dia selecionado
                      selectedDayBackgroundColor: colors.ink,
                      // Cor do texto do dia selecionado
                      selectedDayTextColor: colors.surface,
                      // Customizando a tipografia
                      textDayFontFamily: 'Roboto_400Regular',
                      textMonthFontFamily: 'Roboto_700Bold',
                      textDayHeaderFontFamily: 'Roboto_700Bold',
                      
                      // Cores do cabeçalho
                      monthTextColor: colors.ink,
                      arrowColor: colors.ink,
                      // expandableKnobColor: colors.stone,
                  }}
                  disablePan={false} 
                  />
                  {/* NÃO CRIAR ESSE COMPONENTE AGORA*/}
                  <AnimatedGHScrollView
                    className={`flex-1`} 
                    contentContainerStyle={{paddingBottom:200, 
                      // zIndex:1000
                    }} 
                    showsVerticalScrollIndicator={false}
                    // nestedScrollEnabled
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}

                    // bounces={false} // Remove o efeito de elastico quando faz o scroll com os cards fechados.
                    // overScrollMode="never"
                  >
                    {vm.mockDailyAgendas.map((dia) => (
                      <DailyAgendaAccordion key={dia.id} agenda={dia} />
                    ))}
                  </AnimatedGHScrollView>
              </View> 
          
          </CalendarProvider>
      </View>
      

  );
}
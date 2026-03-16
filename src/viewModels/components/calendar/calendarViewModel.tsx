// src/viewModels/components/calendarViewModel/calendar.viewModel.ts
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export function useCalendarViewModel() {
  const todayString = dayjs().format('YYYY-MM-DD');
  
  // 1. A SOLUÇÃO: Criamos uma data inicial fixa que não muda nunca
  const initialDate = useRef(todayString).current; 

  // 2. O estado que muda quando clicamos (continua igual)
  const [selectedDate, setSelectedDate] = useState(todayString);
  // 1. Criamos o estado para saber se está no modo mensal (expandido)
  // O padrão do ExpandableCalendar geralmente é fechado (false), a menos que você passe initialPosition
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isSelectedToday = selectedDate === todayString;

  const handleDayPress = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const goToToday = () => {
    setSelectedDate(todayString);
  };
  const handleCalendarToggled = (isOpen: boolean) => {
    setIsExpanded(isOpen);
  };


  return {
    initialDate, // Exportamos a data fixa
    selectedDate,
    isExpanded,
    isSelectedToday,
    handleCalendarToggled,
    handleDayPress,
    goToToday,
  };
}
import { useState } from 'react';
import { DailyAgenda } from '~/models/appointment.model';

export function useDailyAgendaViewModel(agenda: DailyAgenda) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleAddPress = () => {
    console.log('Abrir modal de novo evento para o dia:', agenda.id);
  };

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(agenda?.totalValue);

  return {
    isExpanded,
    formattedValue,
    toggleAccordion,
    handleAddPress,
  };
}
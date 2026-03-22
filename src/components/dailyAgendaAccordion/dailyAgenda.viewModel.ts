// src/viewModels/components/agenda/dailyAgenda.viewModel.ts
import { useState } from 'react';
import { DailyAgenda } from '~/models/appointment.model'; // Ajuste o caminho do seu model

export function useDailyAgendaViewModel(agenda: DailyAgenda) {
  // Estado que controla se a sanfona está aberta ou fechada
  const [isExpanded, setIsExpanded] = useState(false);

  // Ação de clicar no corpo principal do componente
  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  // Ação de clicar no botão (+)
  const handleAddPress = () => {
    // Aqui no futuro chamaremos a navegação para a tela de Novo Agendamento
    // Já passamos o ID (data) para a próxima tela saber em qual dia cadastrar!
    console.log('Abrir modal de novo evento para o dia:', agenda.id);
  };

  // Formatação Profissional do Valor (transforma 590 em R$ 590,00)
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
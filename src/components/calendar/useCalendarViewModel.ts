import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useRef, useState } from 'react';
import { Appointment, DailyAgenda } from '~/models/appointment.model';

dayjs.locale('pt-br');

export function useCalendarViewModel() {
  const todayString = dayjs().format('YYYY-MM-DD');
  const initialDate = useRef(todayString).current;

  const [selectedDate, setSelectedDate] = useState(todayString);
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


  const mockDailyAgendas: DailyAgenda[] = [
    {
      id: '2026-12-19',
      formattedDate: 'Sexta-feira, 19 de Dezembro',
      totalEvents: 15, // Conforme você pediu para o teste visual
      totalValue: 590.00, // Conforme você pediu para o teste visual
      appointments: [
        {
          id: '1',
          clientName: 'Roberto Carlos',
          serviceName: 'Corte Cabelo e Barba',
          startTime: '09:00',
          endTime: '10:00',
          price: 80.00,
          status: 'confirmed', 
        },
        {
          id: '2',
          clientName: 'Ana Julia',
          serviceName: 'Coloração e Escova',
          startTime: '10:30',
          endTime: '12:30',
          price: 250.00,
          status: 'no_show', 
        },
        {
          id: '3',
          clientName: 'Marcos Paulo',
          serviceName: 'Pezinho',
          startTime: '14:00',
          endTime: '14:15',
          price: 15.00,
          status: 'canceled', 
        }
      ]
    },
    {
      id: '2026-12-20',
      formattedDate: 'Sábado, 20 de Dezembro',
      totalEvents: 2,
      totalValue: 180.00,
      appointments: [
        {
          id: '4',
          clientName: 'João Silva',
          serviceName: 'Corte Social',
          startTime: '10:00',
          endTime: '10:45',
          price: 50.00,
          status: 'completed', // Status verdinho
        },
        {
          id: '5',
          clientName: 'Maria Oliveira',
          serviceName: 'Manicure',
          startTime: '11:00',
          endTime: '12:00',
          price: 130.00,
          status: 'pending', // Status amarelo/laranja
        }
      ]
    }
  ];

  return {
    initialDate,
    selectedDate,
    isExpanded,
    isSelectedToday,
    mockDailyAgendas,
    handleCalendarToggled,
    handleDayPress,
    goToToday,
  };
}

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
      totalEvents: 5, 
      totalValue: 425.00, 
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
        },
        {
          id: '4',
          clientName: 'Felipe Santos',
          serviceName: 'Corte Degradê',
          startTime: '15:00',
          endTime: '15:45',
          price: 45.00,
          status: 'completed', 
        },
        {
          id: '5',
          clientName: 'Camila Rocha',
          serviceName: 'Design de Sobrancelha',
          startTime: '16:00',
          endTime: '16:30',
          price: 35.00,
          status: 'pending', 
        }
      ]
    },
    {
      id: '2026-12-20',
      formattedDate: 'Sábado, 20 de Dezembro',
      totalEvents: 4,
      totalValue: 330.00,
      appointments: [
        {
          id: '6',
          clientName: 'João Silva',
          serviceName: 'Corte Social',
          startTime: '10:00',
          endTime: '10:45',
          price: 50.00,
          status: 'completed',
        },
        {
          id: '7',
          clientName: 'Maria Oliveira',
          serviceName: 'Unhas de Gel',
          startTime: '11:00',
          endTime: '12:30',
          price: 130.00,
          status: 'pending',
        },
        {
          id: '8',
          clientName: 'Thiago Martins',
          serviceName: 'Barboterapia',
          startTime: '13:00',
          endTime: '13:45',
          price: 60.00,
          status: 'confirmed', 
        },
        {
          id: '9',
          clientName: 'Letícia Lima',
          serviceName: 'Hidratação Profunda',
          startTime: '14:30',
          endTime: '15:30',
          price: 90.00,
          status: 'canceled',
        },
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

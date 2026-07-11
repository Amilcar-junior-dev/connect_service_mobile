import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useMemo, useRef, useState } from 'react';
import { Appointment, DailyAgenda } from '~/models/appointment.model';
import { useAppointmentStore } from '~/store/useAppointmentStore';

dayjs.locale('pt-br');

export function useCalendarViewModel() {
  const todayString = dayjs().format('YYYY-MM-DD');
  const initialDate = useRef(todayString).current;

  const [selectedDate, setSelectedDate] = useState(todayString);
  const [isExpanded, setIsExpanded] = useState(false);

  const isSelectedToday = selectedDate === todayString;

  const storeAppointments = useAppointmentStore((state) => state.appointments);

  const handleDayPress = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const goToToday = () => {
    setSelectedDate(todayString);
  };

  const handleCalendarToggled = (isOpen: boolean) => {
    setIsExpanded(isOpen);
  };

  const mockDailyAgendas = useMemo<DailyAgenda[]>(() => {
    const groups: Record<string, Appointment[]> = {};

    storeAppointments.forEach((app) => {
      const dateKey = app.appointment_date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(app);
    });

    const sortedDates = Object.keys(groups).sort((a, b) => a.localeCompare(b));

    return sortedDates.map((dateString) => {
      const dayAppointments = groups[dateString].sort((a, b) => a.startTime.localeCompare(b.startTime));
      const totalValue = dayAppointments.reduce((sum, app) => sum + app.price, 0);

      const rawFormat = dayjs(dateString).format('dddd, D [de] MMMM');
      const formattedDate = rawFormat.charAt(0).toUpperCase() + rawFormat.slice(1);

      return {
        id: dateString,
        formattedDate,
        totalEvents: dayAppointments.length,
        totalValue,
        appointments: dayAppointments,
      };
    });
  }, [storeAppointments]);

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

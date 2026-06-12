import { useEffect, useRef, useState, useMemo } from 'react';
import { Modalize } from 'react-native-modalize';
import dayjs from 'dayjs';
import { useModalStore } from '~/store/useModalStore';

export interface TimeSlot {
  time: string;
  available: boolean;
}

// Mock de agendamentos existentes para simular colisões
const MOCK_BOOKED_APPOINTMENTS: Record<string, Array<{ startTime: string; endTime: string }>> = {
  '2026-06-07': [
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '14:00', endTime: '14:30' },
  ],
  '2026-06-08': [
    { startTime: '10:30', endTime: '12:30' },
    { startTime: '15:00', endTime: '15:45' },
    { startTime: '16:00', endTime: '16:30' },
  ],
  // Agenda da home (para testes com as datas de dezembro do mock existente)
  '2026-12-19': [
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '10:30', endTime: '12:30' },
    { startTime: '14:00', endTime: '14:15' },
    { startTime: '15:00', endTime: '15:45' },
    { startTime: '16:00', endTime: '16:30' },
  ],
  '2026-12-20': [
    { startTime: '10:00', endTime: '10:45' },
    { startTime: '11:00', endTime: '12:30' },
    { startTime: '13:00', endTime: '13:45' },
    { startTime: '14:30', endTime: '15:30' },
  ]
};

export function useModalSelectDateTimeViewModel() {
  const modalRef = useRef<Modalize>(null);
  const { closeModal, modalData } = useModalStore();

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format('YYYY-MM-DD')
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Extrai informações passadas para a modal
  const totalDuration = useMemo(() => {
    const duration = modalData?.totalDuration as { hours?: number; minutes?: number } | undefined;
    const hours = duration?.hours || 0;
    const minutes = duration?.minutes || 0;
    const totalMin = hours * 60 + minutes;
    return totalMin > 0 ? totalMin : 60; // Padrão: 60 minutos (1 hora)
  }, [modalData]);

  const onSelectCallback = useMemo(() => {
    return modalData?.onSelect as ((date: string, time: string) => void) | undefined;
  }, [modalData]);

  useEffect(() => {
    modalRef.current?.open();
  }, []);

  const handleClose = () => {
    modalRef.current?.close();
  };

  const handleDayPress = (dateString: string) => {
    setSelectedDate(dateString);
    setSelectedTime(null); // Reseta a hora selecionada ao mudar de dia
  };

  // Definições da Grade de Atendimento (8:00 às 18:00)
  const startTimeLimit = '08:00';
  const endTimeLimit = '18:00';
  const slotIntervalMinutes = 15;

  // Geração dinâmica de slots baseada no dia e duração do serviço
  const timeSlots = useMemo<TimeSlot[]>(() => {
    const slots: TimeSlot[] = [];
    const todayStr = dayjs().format('YYYY-MM-DD');

    let current = dayjs(`${selectedDate}T${startTimeLimit}`);
    const end = dayjs(`${selectedDate}T${endTimeLimit}`);

    const booked = MOCK_BOOKED_APPOINTMENTS[selectedDate] || [];

    while (current.isBefore(end) || current.isSame(end)) {
      const slotTimeStr = current.format('HH:mm');
      const candidateStart = current;
      const candidateEnd = current.add(totalDuration, 'minute');

      let isAvailable = true;

      // Regra 1: O slot + duração não pode ultrapassar o horário final de expediente
      if (candidateEnd.isAfter(end)) {
        isAvailable = false;
      }

      // Regra 2: Se for o dia atual, não permitir horários passados (antecedência)
      if (selectedDate === todayStr && candidateStart.isBefore(dayjs().add(1, 'hour'))) {
        isAvailable = false;
      }

      // Regra 3: Checar colisão com agendamentos existentes
      if (isAvailable) {
        for (const appt of booked) {
          const bookedStart = dayjs(`${selectedDate}T${appt.startTime}`);
          const bookedEnd = dayjs(`${selectedDate}T${appt.endTime}`);

          // Intersecção: candidateStart < bookedEnd AND candidateEnd > bookedStart
          if (candidateStart.isBefore(bookedEnd) && candidateEnd.isAfter(bookedStart)) {
            isAvailable = false;
            break;
          }
        }
      }

      slots.push({
        time: slotTimeStr,
        available: isAvailable,
      });

      current = current.add(slotIntervalMinutes, 'minute');
    }

    return slots;
  }, [selectedDate, totalDuration]);

  const handleConfirm = () => {
    if (selectedDate && selectedTime && onSelectCallback) {
      onSelectCallback(selectedDate, selectedTime);
      handleClose();
    }
  };

  return {
    modalRef,
    selectedDate,
    selectedTime,
    setSelectedTime,
    timeSlots,
    totalDuration,
    handleDayPress,
    handleConfirm,
    handleClose,
    closeModal,
  };
}

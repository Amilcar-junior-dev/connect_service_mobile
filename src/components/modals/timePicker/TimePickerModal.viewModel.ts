import { useState, useEffect } from 'react';

interface UseTimePickerModalViewModelProps {
  hours: number;
  minutes: number;
  onTimeChange: (time: { hours: number; minutes: number }) => void;
  onClose: () => void;
  visible: boolean;
}

export function useTimePickerModalViewModel({
  hours,
  minutes,
  onTimeChange,
  onClose,
  visible,
}: UseTimePickerModalViewModelProps) {
  const [tempHours, setTempHours] = useState(hours);
  const [tempMinutes, setTempMinutes] = useState(minutes);

  // Sync state when modal becomes visible
  useEffect(() => {
    if (visible) {
      setTempHours(hours);
      setTempMinutes(minutes);
    }
  }, [visible, hours, minutes]);

  const handleTimeChange = ({ hours: newHours, minutes: newMinutes }: { hours: number; minutes: number }) => {
    setTempHours(newHours);
    setTempMinutes(newMinutes);
  };

  const handleConfirm = () => {
    onTimeChange({ hours: tempHours, minutes: tempMinutes });
    onClose();
  };

  return {
    tempHours,
    tempMinutes,
    handleTimeChange,
    handleConfirm,
  };
}

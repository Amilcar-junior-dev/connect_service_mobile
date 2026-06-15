export interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  hours: number;
  minutes: number;
  onTimeChange: (time: { hours: number; minutes: number }) => void;
  minuteInterval?: number;
}

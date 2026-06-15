export interface TimeWheelPickerProps {
  hours: number;
  minutes: number;
  onTimeChange: (time: { hours: number; minutes: number }) => void;
  minuteInterval?: number;
}

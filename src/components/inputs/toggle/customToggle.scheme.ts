export interface CustomToggleProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  containerClass?: string;
  label?: string;
  labelClass?: string;
}

export interface TimeSelectDropdownProps {
    label: string;
    hours: number;
    minutes: number;
    onTimeChange: (time: { hours: number; minutes: number }) => void;
    isRequire?: boolean;
    containerClass?: string;
}

export const ITEM_HEIGHT = 40;
export const VISIBLE_ITEMS = 3;
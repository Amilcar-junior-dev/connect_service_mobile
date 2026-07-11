import { ReactNode } from 'react';

export type PickerIconNames = 'User' | 'Contact' | 'Search' | 'ChevronDown' | 'UserPlus' | 'ArrowDown' | 'Services' | 'Reminder' | 'Repeat' | 'Category';
export enum typeSelectDropdown {
    SELECT = 'select',
    CHECKBOX = 'checkBox',
    RADIOBUTTON = 'radioButton'
}

export interface BaseSelectOption {
    id: string | number;
    label: string;
    img?: string;
    [key: string]: any;
}

export interface CustomSelectOption extends BaseSelectOption {
    price?: number;
    duration?: {
        hours: number;
        minutes: number;
    };
}

export interface CustomSelectDropdownProps<T extends BaseSelectOption = BaseSelectOption> {
    label: string;
    placeholder?: string;
    leftIcon?: PickerIconNames | ReactNode | null;
    cardIcon?: PickerIconNames | ReactNode | null;
    rightIcon?: PickerIconNames | ReactNode | null;
    rightActionIcon?: PickerIconNames | ReactNode | null;
    onRightActionPress?: () => void;
    options: T[];
    onSelect: (item: T | T[] | null) => void;
    selectedValue?: T | T[] | null;
    typeDropdown?: 'select' | 'checkBox' | 'radioButton';
    multiLabelSingular?: string;
    multiLabelPlural?: string;
    containerClass?: string;
    labelClass?: string;
    isRequire?: boolean;
    renderItem?: (item: T) => ReactNode;
    error?: string;
}
export interface IconProps {
    width?: number;
    heigth?: number;
}
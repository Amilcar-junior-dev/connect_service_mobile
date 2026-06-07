import { ReactNode } from 'react';

export type PickerIconNames = 'User' | 'Contact' | 'Search' | 'ChevronDown' | 'UserPlus' | 'ArrowDown' | 'Services' | 'Reminder' | 'Repeat';
export enum typeSelectDropdown {
    SELECT = 'select',
    CHECKBOX = 'checkBox',
    RADIOBUTTON = 'radioButton'
}

export interface CustomSelectOption {
    label: string;
    id: string | number;
    img?: string;
    price?: number;
    duration?: {
        hours: number;
        minutes: number;
    };
    [key: string]: any;
}

export interface CustomSelectDropdownProps {
    label: string;
    placeholder?: string;
    leftIcon?: PickerIconNames;
    cardIcon?: PickerIconNames;
    rightIcon?: PickerIconNames
    rightActionIcon?: PickerIconNames;
    onRightActionPress?: () => void;
    options: CustomSelectOption[];
    onSelect: (item: CustomSelectOption | CustomSelectOption[] | null) => void;
    selectedValue?: CustomSelectOption | CustomSelectOption[] | null;
    typeDropdown?: 'select' | 'checkBox' | 'radioButton';
    multiLabelSingular?: string;
    multiLabelPlural?: string;
    containerClass?: string;
    labelClass?: string;
    isRequire?: boolean;
    renderItem?: (item: CustomSelectOption) => ReactNode;
    error?: string;
}
export interface IconProps {
    width?: number;
    heigth?: number;
}
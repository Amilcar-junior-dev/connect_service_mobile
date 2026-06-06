import { ReactNode } from 'react';

export type PickerIconNames = 'User' | 'Contact' | 'Search' | 'ChevronDown' | 'UserPlus' | 'ArrowDown' | 'Services';

export interface CustomSelectOption {
    label: string;
    id: string | number;
    img?: string;
    [key: string]: any;
}

export interface CustomSelectDropdownProps {
    label: string;
    placeholder?: string;
    leftIcon?: PickerIconNames;
    rightIcon?: PickerIconNames
    rightActionIcon?: PickerIconNames;
    onRightActionPress?: () => void;
    options: CustomSelectOption[];
    onSelect: (item: CustomSelectOption) => void;
    selectedValue?: CustomSelectOption | null;
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
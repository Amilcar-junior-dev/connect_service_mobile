import { TextInputProps } from "react-native";

export type leftIconType = 'Calendar' | 'Phone' | 'Email'

export interface TextInputComponentProps extends TextInputProps {
    name: string;
    label: string;
    isRequire?: boolean 
    labelClass?: string
    containerClass?: string
    leftIcon?: leftIconType
    maskType?: 'currency' | 'phone' | 'date';
}
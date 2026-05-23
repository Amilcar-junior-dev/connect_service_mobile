import { TextInputProps } from "react-native";

export interface TextInputComponentProps extends TextInputProps {
    name: string;
    label: string;
    isRequire?: boolean 
    labelClass?: string
    containerClass?: string
    maskType?: 'currency' | 'phone' | 'date';
}
import { TextInputProps } from "react-native";

export interface TextInputComponentProps extends TextInputProps {
    name: string; // Única coisa obrigatória agora!
    label: string;
    isRequire?: boolean 
    labelClass?: string
    containerClass?: string
    maskType?: 'currency' | 'phone' | 'date';
}
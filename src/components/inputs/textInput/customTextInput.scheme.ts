import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export type leftIconType = 'Calendar' | 'Phone' | 'Email'

export interface TextInputComponentProps extends TextInputProps {
    name: string;
    label: string;
    isRequire?: boolean 
    labelClass?: string
    containerClass?: string
    leftIcon?: leftIconType
    rightIcon?: ReactNode
    maskType?: 'currency' | 'phone' | 'date';
}
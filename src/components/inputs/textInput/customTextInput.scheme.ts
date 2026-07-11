import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export type leftIconType = 'Calendar' | 'Phone' | 'Email'

export interface TextInputComponentProps extends TextInputProps {
    name?: string;
    label: string;
    isRequire?: boolean; 
    labelClass?: string;
    containerClass?: string;
    leftIcon?: leftIconType | ReactNode;
    rightIcon?: ReactNode;
    maskType?: 'currency' | 'phone' | 'date';
    error?: string;
}
import { typeMapIcons } from "../../shared/mapIcons";

export interface InputProps {
    type: 'primary' | 'secondary';
    label: string;
    leftIcon?: typeMapIcons;
    rightIcon?: typeMapIcons;
    heightIcon?: number;
    widthIcon?: number;
    rightIconAction?: ()=> void;
    error?:string;
}

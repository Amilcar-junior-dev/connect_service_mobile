import { Theme } from "~/styles/colors";

type ThemeColor = keyof typeof Theme.light.colors;

import Email from '~/assets/svg/Email.svg';
import Password from '~/assets/svg/Password.svg';
import EyeShow from '~/assets/svg/EyeShow.svg';
import Phone from '~/assets/svg/Phone.svg';
import { useThemeColor } from "../hooks/useColors";

export const MapIcons = {
    // apple: (color:ThemeColor)=> <Email color={useThemeColor(color)}  height={heightIcon} width={widthIcon}/>,
    email:(color:ThemeColor, heightIcon = 22, widthIcon = 22)=>  <Email color={color}  height={heightIcon} width={widthIcon}/>,
    password:(color:ThemeColor, heightIcon = 22, widthIcon = 22)=>  <Password color={color} height={heightIcon} width={widthIcon} />,
    phone:(color:ThemeColor, heightIcon = 22, widthIcon = 22)=>  <Phone color={color} height={heightIcon} width={widthIcon} />,
    eyeShow:(color:ThemeColor, heightIcon = 22, widthIcon = 22)=>  <EyeShow  color={color} height={heightIcon} width={widthIcon}/>,
}

export type typeMapIcons = keyof typeof MapIcons


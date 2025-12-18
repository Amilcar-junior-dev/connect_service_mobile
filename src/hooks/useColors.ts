import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";

export type ThemeColor = keyof typeof Theme.light.colors;

export function useThemeColor(key:ThemeColor) {
  const { colorScheme } = useColorScheme();
  return Theme[colorScheme ?? "light"].colors[key] ;
}

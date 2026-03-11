import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";

export const useActiveTheme = ()=> {
    const {colorScheme} = useColorScheme();
    const {vars, colors} = colorScheme === "dark" ? Theme.dark : Theme.light;
    return  {
        vars,
        colors
    }
}

import { vars } from "nativewind";

export const Theme = {
  light: {
    vars: vars({
      "--color-surface": "255 255 255",
      "--color-stone": "217 217 217",
      "--color-tab-bar": "1 22 39",
      "--color-ink": "21 35 59",
      "--color-muted": "162 162 167",
      "--color-danger": "234 0 27",
      "--color-warning": "247 159 26",
      "--color-accent": "109 198 227",
      "--color-tint-blue": "230 240 255",
      "--color-tint-green": "230 246 241",
      "--color-forest": "22 58 58",
      "--color-accent-deep": "75 91 152",
      "--color-deep-surface": "39 35 61",
      "--color-divider": "244 244 244",
    }),
    colors: {
      surface: "rgb(255, 255, 255)",
      stone: "rgb(217, 217, 217)",
      tabBar: "rgb(1, 22, 39)",
      ink: "rgb(21, 35, 59)",
      muted: "rgb(162, 162, 167)",
      danger: "rgb(234, 0, 27)",
      warning: "rgb(247, 159, 26)",
      tintBlue: "rgb(230, 240, 255)",
      tintGreen: "rgb(230, 246, 241)",
      forest: "rgb(22, 58, 58)",
      accent: "rgb(109, 198, 227)",
      accentDeep: "rgb(75, 91, 152)",
      deepSurface: "rgb(39, 35, 61)",
      divider: "rgb(244, 244, 244)",
    },
  },
  dark: {
    vars: vars({
      "--color-surface": "21 35 59", 
      "--color-stone": "51 65 85", 
     "--color-tab-bar": "8 14 24",
      "--color-ink": "241 245 249", 
      "--color-muted": "148 163 184", 
      "--color-danger": "248 113 113", 
      "--color-warning": "251 191 36", 
      "--color-accent": "109 198 227", 
      "--color-tint-blue": "30 58 95", 
      "--color-tint-green": "20 60 50", 
      "--color-forest": "110 210 170", 
      "--color-accent-deep": "129 140 248", 
      "--color-deep-surface": "15 23 42", 
      "--color-divider": "30 41 59", 
    }),
    colors: {
      surface: "rgb(21, 35, 59)",
      stone: "rgb(51, 65, 85)",
      tabBar: "rgb(8, 14, 24)",
      ink: "rgb(241, 245, 249)",
      muted: "rgb(148, 163, 184)",
      danger: "rgb(248, 113, 113)",
      warning: "rgb(251, 191, 36)",
      tintBlue: "rgb(30, 58, 95)",
      tintGreen: "rgb(20, 60, 50)",
      forest: "rgb(110, 210, 170)",
      accent: "rgb(109, 198, 227)",
      accentDeep: "rgb(129, 140, 248)",
      deepSurface: "rgb(15, 23, 42)",
      divider: "rgb(30, 41, 59)",
    },
  },
};

export const SERVICE_COLORS = [
  "#3B82F6", "#2563EB", "#0EA5E9", "#22C55E",
  "#16A34A", "#14B8A6", "#969E9E", "#6366F1",
  "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899",
];

export const lightColors = Theme.light.colors;
export const darkColors = Theme.dark.colors;

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
      surface: "rgba(255 255 255)",
      stone: "rgb(217, 217, 217)",
      tabBar: "rgb(1, 22, 39)",
      ink: "rgb(21,35,59)",
      muted: "rgb(162, 162, 167)",
      danger: "rgba(234 0 27)",
      warning: "rgba(247 159 26)",
      tintBlue: "rgb(230 240 255)",
      tintGreen: "rgb(230 246 241)",
      forest: "rgb(22 58 58)",
      accent: "rgba(109 198 227)",
      accentDeep: "rgba(75 91 152)",
      deepSurface: "rgb(39, 35, 61)",
      divider: "rgba(244 244 244)",
      
    },
  },
  dark: {
    vars: vars({
      // Fundo vira o azul marinho escuro elegante
      "--color-surface": "21 35 59", 
      // Cinza de bordas vira um cinza/azulado mais profundo (Slate 700)
      "--color-stone": "51 65 85", 
      // TabBar já era bem escura, mantivemos a mesma pegada
     "--color-tab-bar": "8 14 24",
      // Texto principal vira um gelo quase branco
      "--color-ink": "241 245 249", 
      // Texto secundário vira um cinza médio/claro (Slate 400)
      "--color-muted": "148 163 184", 
      // Vermelho fica um pouco mais brilhante/suave (Red 400)
      "--color-danger": "248 113 113", 
      // Laranja/Amarelo ganha mais brilho (Amber 400)
      "--color-warning": "251 191 36", 
      // A cor da marca (Azul claro) se mantém pois brilha bem no escuro
      "--color-accent": "109 198 227", 
      // Fundo de cards azuis vira um azul translúcido e profundo
      "--color-tint-blue": "30 58 95", 
      // Fundo de cards verdes vira um verde musgo translúcido
      "--color-tint-green": "20 60 50", 
      // Textos verdes que eram escuros viram um verde menta claro
      "--color-forest": "110 210 170", 
      // Roxo escuro vira um índigo mais claro e vibrante
      "--color-accent-deep": "129 140 248", 
      // Fundo profundo fica um azul "quase preto" para contrastar com a surface
      "--color-deep-surface": "15 23 42", 
      // Divisórias viram linhas finas azul-acinzentadas
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

export const lightColors = Theme.light.colors;
export const darkColors = Theme.dark.colors;

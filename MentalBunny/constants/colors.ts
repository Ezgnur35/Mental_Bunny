export type ThemeName = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  text: string;
  mutedText: string;
  primary: string;
  secondary: string;
  accent: string;
  mint: string;
  warning: string;
  success: string;
  input: string;
  border: string;
  tabBar: string;
  shadow: string;
};

export const colors: Record<ThemeName, ThemeColors> = {
  light: {
    background: "#FFF8ED",
    surface: "#FFFDF8",
    card: "#FFEAF2",
    text: "#443247",
    mutedText: "#7B6A80",
    primary: "#E99AB7",
    secondary: "#CDB7F6",
    accent: "#A8D9CE",
    mint: "#DDF4E8",
    warning: "#D96B7C",
    success: "#5FAF91",
    input: "#FFFDF8",
    border: "#F0DDE7",
    tabBar: "#FFFDF8",
    shadow: "#E7B7C9",
  },
  dark: {
    background: "#21182E",
    surface: "#2E2240",
    card: "#3A2A50",
    text: "#FFF8FF",
    mutedText: "#D9CDE4",
    primary: "#D98BAA",
    secondary: "#9EA7E8",
    accent: "#83C5BE",
    mint: "#365A58",
    warning: "#FF9AAC",
    success: "#91D5C0",
    input: "#352747",
    border: "#4F3A64",
    tabBar: "#2A1F3A",
    shadow: "#120D18",
  },
};

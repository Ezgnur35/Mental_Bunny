import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { colors, ThemeColors, ThemeName } from "../constants/colors";

type ThemeContextValue = {
  themeName: ThemeName;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_STORAGE_KEY = "mental-bunny-theme";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemTheme = useColorScheme();
  const [themeName, setThemeName] = useState<ThemeName>(systemTheme === "dark" ? "dark" : "light");

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeName(savedTheme);
      }
    }

    loadTheme();
  }, []);

  async function changeTheme(nextTheme: ThemeName) {
    setThemeName(nextTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  const value = useMemo(() => {
    const isDark = themeName === "dark";

    return {
      themeName,
      colors: colors[themeName],
      isDark,
      toggleTheme: () => changeTheme(isDark ? "light" : "dark"),
    };
  }, [themeName]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme, ThemeProvider icinde kullanilmali.");
  }

  return context;
}

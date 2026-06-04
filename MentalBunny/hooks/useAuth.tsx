import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type MentalBunnyUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  currentUser: MentalBunnyUser | null;
  rememberedUser: MentalBunnyUser | null;
  setLoggedInUser: (user: MentalBunnyUser) => Promise<void>;
  logout: () => Promise<void>;
};

const CURRENT_USER_KEY = "mental-bunny-current-user";
const REMEMBERED_USER_KEY = "mental-bunny-remembered-user";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<MentalBunnyUser | null>(null);
  const [rememberedUser, setRememberedUser] = useState<MentalBunnyUser | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const savedCurrentUser = await AsyncStorage.getItem(CURRENT_USER_KEY);
      const savedRememberedUser = await AsyncStorage.getItem(REMEMBERED_USER_KEY);

      if (savedCurrentUser) {
        setCurrentUser(JSON.parse(savedCurrentUser));
      }

      if (savedRememberedUser) {
        setRememberedUser(JSON.parse(savedRememberedUser));
      }
    }

    loadUsers();
  }, []);

  async function setLoggedInUser(user: MentalBunnyUser) {
    setCurrentUser(user);
    setRememberedUser(user);
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(REMEMBERED_USER_KEY, JSON.stringify(user));
  }

  async function logout() {
    setCurrentUser(null);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  }

  const value = useMemo(
    () => ({
      currentUser,
      rememberedUser,
      setLoggedInUser,
      logout,
    }),
    [currentUser, rememberedUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth, AuthProvider icinde kullanilmali.");
  }

  return context;
}

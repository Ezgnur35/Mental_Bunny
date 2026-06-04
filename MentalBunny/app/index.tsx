import { router } from "expo-router";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/auth/login");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return <LoadingScreen />;
}

import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import SoftButton from "../../components/SoftButton";
import { useTheme } from "../../hooks/useTheme";

export default function BreathingScreen() {
  const { colors } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("Hazır");
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!isRunning) {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 400 });
      setPhase("Hazır");
      return;
    }

    scale.value = withRepeat(
      withSequence(
        withTiming(1.25, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.25, { duration: 4000 }),
        withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    const phases = ["Nefes al", "Tut", "Nefes ver"];
    let step = 0;
    setPhase(phases[step]);

    const timer = setInterval(() => {
      step = (step + 1) % phases.length;
      setPhase(phases[step]);
    }, 4000);

    return () => clearInterval(timer);
  }, [isRunning, scale]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Nefes Egzersizi</Text>
      <Animated.View style={[styles.circle, { backgroundColor: colors.secondary, shadowColor: colors.shadow }, animatedCircleStyle]}>
        <Text style={styles.circleText}>{phase}</Text>
      </Animated.View>
      <Text style={[styles.text, { color: colors.mutedText }]}>Burnundan yavaşça nefes al. Kısa bir an tut. Sonra omuzlarını gevşeterek ver.</Text>
      <View style={styles.buttons}>
        <SoftButton title={isRunning ? "Durdur" : "Başlat"} onPress={() => setIsRunning(!isRunning)} />
        <SoftButton title="Geri dön" variant="ghost" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 22 },
  title: { fontSize: 30, fontWeight: "900", textAlign: "center" },
  circle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 4,
  },
  circleText: { color: "#FFFFFF", fontSize: 28, fontWeight: "900" },
  text: { fontSize: 16, lineHeight: 24, textAlign: "center" },
  buttons: { width: "100%", gap: 12 },
});

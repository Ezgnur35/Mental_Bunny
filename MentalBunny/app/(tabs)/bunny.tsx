import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import BunnyCard from "../../components/BunnyCard";
import SoftButton from "../../components/SoftButton";
import { useTheme } from "../../hooks/useTheme";

export default function BunnyScreen() {
  const { colors } = useTheme();
  const messages = [
    "Bugün küçük bir adım da yeter.",
    "Duyguların geçerli ve önemli.",
    "Kendine nazik davranmayı hak ediyorsun.",
    "Yorulduysan durmak da ilerlemektir.",
  ];
  const missions = [
    "Bir bardak su iç ve omuzlarını gevşet.",
    "Pencereden dışarı bakıp üç renk seç.",
    "Kendine güzel bir cümle yaz.",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [missionIndex, setMissionIndex] = useState(0);
  const sway = useSharedValue(0);

  useEffect(() => {
    sway.value = withRepeat(withSequence(withTiming(-6, { duration: 1200 }), withTiming(6, { duration: 1200 })), -1, true);
  }, [sway]);

  const bunnyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sway.value }],
  }));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Bunny</Text>
      <BunnyCard title="Ben buradayım" message="Düşüncelerin ağırlaşınca onları tek başına taşımak zorunda değilsin." />
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Animated.Text style={[styles.bigBunny, bunnyStyle]}>🐰</Animated.Text>
        <Text style={[styles.message, { color: colors.text }]}>“{messages[messageIndex]}”</Text>
        <Text style={[styles.mission, { color: colors.mutedText }]}>Mini görev: {missions[missionIndex]}</Text>
        <View style={styles.buttons}>
          <SoftButton title="Bana iyi bir şey söyle" onPress={() => setMessageIndex((messageIndex + 1) % messages.length)} />
          <SoftButton title="Bugünkü mini görevim" variant="secondary" onPress={() => setMissionIndex((missionIndex + 1) % missions.length)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 22, paddingTop: 64, gap: 18 },
  title: { fontSize: 32, fontWeight: "900" },
  card: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    gap: 14,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  bigBunny: { fontSize: 88 },
  message: { fontSize: 20, fontWeight: "800", textAlign: "center" },
  mission: { fontSize: 15, lineHeight: 22, textAlign: "center" },
  buttons: { width: "100%", gap: 12, marginTop: 4 },
});

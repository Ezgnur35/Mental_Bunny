import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import SoftButton from "../../components/SoftButton";
import { images } from "../../constants/images";
import { useTheme } from "../../hooks/useTheme";

export default function BrainDumpSuccessScreen() {
  const { colors } = useTheme();
  const moveY = useSharedValue(0);

  useEffect(() => {
    moveY.value = withRepeat(withSequence(withTiming(-10, { duration: 900 }), withTiming(0, { duration: 900 })), -1, true);
  }, [moveY]);

  const noteStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: moveY.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.note, { backgroundColor: colors.card, borderColor: colors.border }, noteStyle]}>
        <Text style={styles.noteText}>not</Text>
      </Animated.View>
      <Text style={styles.jar}>{images.jarEmoji}</Text>
      <Text style={[styles.title, { color: colors.text }]}>Kavanoza bıraktın</Text>
      <Text style={[styles.message, { color: colors.mutedText }]}>🐰 “Bunu senin için taşıyorum.”</Text>
      <SoftButton title="Ana sayfaya dön" onPress={() => router.replace("/(tabs)")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 18 },
  jar: { fontSize: 84 },
  note: { borderRadius: 16, borderWidth: 1, paddingVertical: 16, paddingHorizontal: 28 },
  noteText: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  title: { fontSize: 30, fontWeight: "900", textAlign: "center" },
  message: { fontSize: 18, lineHeight: 26, textAlign: "center" },
});

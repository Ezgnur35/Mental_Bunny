import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BunnyCard from "../../components/BunnyCard";
import SoftButton from "../../components/SoftButton";
import { images } from "../../constants/images";
import { useTheme } from "../../hooks/useTheme";

export default function BrainDumpScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Brain Dump</Text>
      <BunnyCard title="Overthinking Boşaltma" message="Aklında dönüp duran düşünceleri bir nota bırak. Tavşanın onları senin için biraz taşısın." />
      <View style={[styles.jarCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Text style={styles.jar}>{images.jarEmoji}</Text>
        <Text style={[styles.jarText, { color: colors.mutedText }]}>Notun minik bir kavanoza girecek. Şimdilik sakince ekrana bırakıyoruz.</Text>
      </View>
      <SoftButton title="Düşüncelerimi boşalt" onPress={() => router.push("/brain-dump/write")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 22, paddingTop: 64, gap: 18 },
  title: { fontSize: 32, fontWeight: "900" },
  jarCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 26,
    alignItems: "center",
    gap: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 3,
  },
  jar: { fontSize: 78 },
  jarText: { fontSize: 15, textAlign: "center", lineHeight: 22 },
});

import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMutation } from "convex/react";
import BunnyCard from "../../components/BunnyCard";
import FeatureCard from "../../components/FeatureCard";
import ThemeToggle from "../../components/ThemeToggle";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { currentUser } = useAuth();
  const saveMood = useMutation(api.mood.saveMood);
  const [selectedMood, setSelectedMood] = useState("Sakin");
  const moods = ["İyi", "Sakin", "Gergin", "Yorgun"];

  async function handleMoodPress(mood: string) {
    setSelectedMood(mood);

    if (currentUser) {
      await saveMood({ userEmail: currentUser.email, mood });
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.hello, { color: colors.mutedText }]}>Merhaba {currentUser?.name ?? ""}</Text>
          <Text style={[styles.title, { color: colors.text }]}>Bugün nasılsın?</Text>
        </View>
        <ThemeToggle />
      </View>

      <BunnyCard title="Bugün yanında olmaya geldim." message="Seçimlerin ve kayıtların Convex veritabanında saklanacak." />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ruh halin nasıl?</Text>
        <View style={styles.moodGrid}>
          {moods.map((mood) => {
            const isSelected = selectedMood === mood;

            return (
              <Pressable
                key={mood}
                style={[
                  styles.moodCard,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => handleMoodPress(mood)}
              >
                <Text style={[styles.moodText, { color: isSelected ? "#FFFFFF" : colors.text }]}>{mood}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.list}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Bugünkü destek alanların</Text>
        <FeatureCard icon="🌬️" title="Nefes Egzersizi" description="Yavaş nefeslerle bedeni sakinleştir." color={colors.secondary} onPress={() => router.push("/breathing")} />
        <FeatureCard icon="🌿" title="Grounding Techniques" description="5-4-3-2-1 yöntemiyle şu ana dön." color={colors.mint} onPress={() => router.push("/grounding")} />
        <FeatureCard icon="🫙" title="Brain Dump" description="Fazla düşünceleri kavanoza bırak." color={colors.card} onPress={() => router.push("/brain-dump")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 22, paddingTop: 64, gap: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  hello: { fontSize: 15, fontWeight: "700" },
  title: { fontSize: 30, fontWeight: "900" },
  list: { gap: 14 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "900" },
  moodGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  moodCard: { minWidth: "47%", borderRadius: 22, borderWidth: 1, paddingVertical: 16, alignItems: "center" },
  moodText: { fontSize: 16, fontWeight: "800" },
});

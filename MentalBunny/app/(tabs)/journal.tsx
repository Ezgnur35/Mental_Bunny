import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useMutation } from "convex/react";
import SoftButton from "../../components/SoftButton";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function JournalScreen() {
  const { colors } = useTheme();
  const { currentUser } = useAuth();
  const saveJournalEntry = useMutation(api.journal.saveJournalEntry);
  const moods = ["İyi", "Sakin", "Gergin", "Yorgun"];
  const [selectedMood, setSelectedMood] = useState("Sakin");
  const [journalText, setJournalText] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const today = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function handleSave() {
    if (!currentUser || !journalText.trim()) {
      return;
    }

    try {
      setIsSaving(true);
      await saveJournalEntry({
        userEmail: currentUser.email,
        mood: selectedMood,
        note: journalText.trim(),
      });
      setJournalText("");
      setSavedMessage("Günlüğün Convex veritabanına kaydedildi.");
    } catch {
      setSavedMessage("Kayıt sırasında sorun oldu. Convex bağlantını kontrol et.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Günlük</Text>
      <Text style={[styles.subtitle, { color: colors.mutedText }]}>{today}</Text>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Bugün ruh halin?</Text>
        <View style={styles.chips}>
          {moods.map((mood) => {
            const active = selectedMood === mood;

            return (
              <Pressable
                key={mood}
                style={[
                  styles.chip,
                  { backgroundColor: active ? colors.primary : colors.input, borderColor: active ? colors.primary : colors.border },
                ]}
                onPress={() => setSelectedMood(mood)}
              >
                <Text style={[styles.chipText, { color: active ? "#FFFFFF" : colors.text }]}>{mood}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={[styles.cardText, { color: colors.mutedText }]}>Şu an kendime ne söylemeye ihtiyacım var?</Text>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.input, borderColor: colors.border }]}
          placeholder="Bugün içimden geçenler..."
          placeholderTextColor={colors.mutedText}
          value={journalText}
          onChangeText={setJournalText}
          multiline
          textAlignVertical="top"
        />
        <SoftButton title={isSaving ? "Kaydediliyor..." : "Günlüğü Kaydet"} onPress={handleSave} disabled={!journalText.trim() || isSaving} />
        {savedMessage ? <Text style={[styles.saved, { color: colors.success }]}>{savedMessage}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 22, paddingTop: 64, gap: 16 },
  title: { fontSize: 32, fontWeight: "900" },
  subtitle: { fontSize: 15, lineHeight: 21 },
  card: {
    borderRadius: 26,
    borderWidth: 1,
    padding: 18,
    gap: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 20, fontWeight: "800" },
  cardText: { fontSize: 15, lineHeight: 22 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: { borderWidth: 1, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 14 },
  chipText: { fontSize: 14, fontWeight: "800" },
  input: { minHeight: 170, borderWidth: 1, borderRadius: 20, padding: 14, fontSize: 16, lineHeight: 23 },
  saved: { fontSize: 15, fontWeight: "800", textAlign: "center" },
});

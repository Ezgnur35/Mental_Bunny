import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useMutation } from "convex/react";
import SoftButton from "../../components/SoftButton";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function BrainDumpWriteScreen() {
  const { colors } = useTheme();
  const { currentUser } = useAuth();
  const saveBrainDumpNote = useMutation(api.brainDump.saveBrainDumpNote);
  const [note, setNote] = useState("");
  const [warning, setWarning] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit() {
    if (!note.trim()) {
      setWarning("Kavanoza bırakmak için önce bir şeyler yaz.");
      return;
    }

    if (!currentUser) {
      setWarning("Kaydetmek için önce giriş yapmalısın.");
      return;
    }

    try {
      setIsSaving(true);
      await saveBrainDumpNote({ userEmail: currentUser.email, text: note.trim() });
      setWarning("");
      router.push("/brain-dump/success");
    } catch {
      setWarning("Not kaydedilemedi. Convex bağlantını kontrol et.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Notunu Yaz</Text>
      <TextInput
        style={[styles.note, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
        placeholder="Bugün aklımdan geçenler..."
        placeholderTextColor={colors.mutedText}
        value={note}
        onChangeText={setNote}
        multiline
        textAlignVertical="top"
      />
      {warning ? <Text style={[styles.warning, { color: colors.warning }]}>{warning}</Text> : null}
      <SoftButton title={isSaving ? "Kaydediliyor..." : "Kavanoza bırak"} onPress={handleSubmit} disabled={isSaving} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, paddingTop: 64, gap: 18 },
  title: { fontSize: 30, fontWeight: "900" },
  note: { minHeight: 280, borderRadius: 26, borderWidth: 1, padding: 18, fontSize: 16, lineHeight: 24 },
  warning: { fontSize: 14, fontWeight: "700" },
});

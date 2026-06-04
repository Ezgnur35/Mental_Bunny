import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useMutation } from "convex/react";
import BunnyCard from "../../components/BunnyCard";
import SoftButton from "../../components/SoftButton";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

const bunnyMessages = [
  "Harika yaptın. Şimdi ayaklarının yere değdiğini fark et.",
  "Bunları benimle paylaştığın için teşekkür ederim.",
  "Şu an buradasın ve güvendesin. Bir nefes daha alalım.",
];

export default function GroundingScreen() {
  const { colors } = useTheme();
  const { currentUser } = useAuth();
  const saveGroundingEntry = useMutation(api.grounding.saveGroundingEntry);
  const [fiveSee, setFiveSee] = useState("");
  const [fourFeel, setFourFeel] = useState("");
  const [threeHear, setThreeHear] = useState("");
  const [twoSmell, setTwoSmell] = useState("");
  const [oneTaste, setOneTaste] = useState("");
  const [bunnyMessage, setBunnyMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!currentUser) {
      setStatus("Kayıt için önce giriş yapmalısın.");
      return;
    }

    if (!fiveSee.trim() || !fourFeel.trim() || !threeHear.trim() || !twoSmell.trim() || !oneTaste.trim()) {
      setStatus("Lütfen tüm küçük alanları doldur.");
      return;
    }

    const nextMessage = bunnyMessages[Math.floor(Math.random() * bunnyMessages.length)];

    try {
      setIsSaving(true);
      await saveGroundingEntry({
        userEmail: currentUser.email,
        fiveSee: fiveSee.trim(),
        fourFeel: fourFeel.trim(),
        threeHear: threeHear.trim(),
        twoSmell: twoSmell.trim(),
        oneTaste: oneTaste.trim(),
        bunnyMessage: nextMessage,
      });
      setBunnyMessage(nextMessage);
      setStatus("Grounding kaydın Convex veritabanına eklendi.");
    } catch {
      setStatus("Kayıt sırasında sorun oldu. Convex bağlantını kontrol et.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Grounding Techniques</Text>
      <BunnyCard title="5-4-3-2-1 alanı" message="Dikkatini yavaşça bulunduğun ana getirelim. Yazdıkların veritabanına kaydedilir." />

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <GroundingInput title="5 şey gör" value={fiveSee} onChangeText={setFiveSee} placeholder="Örn: masa, perde, kalem..." />
        <GroundingInput title="4 şey hisset" value={fourFeel} onChangeText={setFourFeel} placeholder="Örn: yastık, koltuk..." />
        <GroundingInput title="3 şey duy" value={threeHear} onChangeText={setThreeHear} placeholder="Örn: saat, rüzgar..." />
        <GroundingInput title="2 şey kokla" value={twoSmell} onChangeText={setTwoSmell} placeholder="Örn: kahve, sabun..." />
        <GroundingInput title="1 şey tat" value={oneTaste} onChangeText={setOneTaste} placeholder="Örn: su, nane..." />
        <SoftButton title={isSaving ? "Kaydediliyor..." : "Bunny'e bırak"} onPress={handleSave} disabled={isSaving} />
        {status ? <Text style={[styles.status, { color: colors.success }]}>{status}</Text> : null}
      </View>

      {bunnyMessage ? <BunnyCard title="Bunny geldi" message={bunnyMessage} /> : null}
    </ScrollView>
  );
}

type GroundingInputProps = {
  title: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
};

function GroundingInput({ title, value, placeholder, onChangeText }: GroundingInputProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputTitle, { color: colors.text }]}>{title}</Text>
      <TextInput
        style={[styles.input, { color: colors.text, backgroundColor: colors.input, borderColor: colors.border }]}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 22, paddingTop: 64, gap: 16 },
  title: { fontSize: 30, fontWeight: "900" },
  card: {
    borderRadius: 26,
    borderWidth: 1,
    padding: 18,
    gap: 14,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  inputGroup: { gap: 8 },
  inputTitle: { fontSize: 16, fontWeight: "900" },
  input: { borderWidth: 1, borderRadius: 18, padding: 13, fontSize: 15 },
  status: { fontSize: 14, lineHeight: 20, fontWeight: "800", textAlign: "center" },
});

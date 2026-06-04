import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "convex/react";
import SoftButton from "../../components/SoftButton";
import ThemeToggle from "../../components/ThemeToggle";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

type BrainDumpHistory = {
  _id: string;
  text: string;
  createdAt: number;
};

type JournalHistory = {
  _id: string;
  mood: string;
  note: string;
  createdAt: number;


};

type GroundingHistory = {
  _id: string;
  fiveSee: string;
  bunnyMessage: string;
  createdAt: number;
};

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { currentUser, rememberedUser, logout } = useAuth();
  const profile = currentUser ?? rememberedUser;
  const queryArgs = profile ? { userEmail: profile.email } : "skip";
  const brainDumpNotes = useQuery(api.brainDump.listBrainDumpNotes, queryArgs) as BrainDumpHistory[] | undefined;
  const journalEntries = useQuery(api.journal.listJournalEntries, queryArgs) as JournalHistory[] | undefined;
  const groundingEntries = useQuery(api.grounding.listGroundingEntries, queryArgs) as GroundingHistory[] | undefined;

  async function handleLogout() {
    await logout();
    router.replace("/auth/login");
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Ayarlar</Text>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Profil</Text>
        <Text style={[styles.cardText, { color: colors.mutedText }]}>Ad: {profile?.name ?? "Henüz giriş yapılmadı"}</Text>
        <Text style={[styles.cardText, { color: colors.mutedText }]}>E-posta: {profile?.email ?? "-"}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Tema</Text>
        <Text style={[styles.cardText, { color: colors.mutedText }]}>Uygulamayı ışığına göre kullan.</Text>
        <ThemeToggle />
      </View>

      <HistoryCard title="Brain Dump Notları" emptyText="Henüz brain dump notun yok." items={brainDumpNotes?.map((item) => ({
        id: item._id,
        title: formatDate(item.createdAt),
        text: item.text,
      }))} />

      <HistoryCard title="Günlük Kayıtları" emptyText="Henüz günlük kaydın yok." items={journalEntries?.map((item) => ({
        id: item._id,
        title: `${item.mood} • ${formatDate(item.createdAt)}`,
        text: item.note,
      }))} />

      <HistoryCard title="Grounding Kayıtları" emptyText="Henüz grounding kaydın yok." items={groundingEntries?.map((item) => ({
        id: item._id,
        title: formatDate(item.createdAt),
        text: `Gördüğün şeylerden biri: ${item.fiveSee}\nBunny: ${item.bunnyMessage}`,
      }))} />

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Uygulama Bilgisi</Text>
        <Text style={[styles.cardText, { color: colors.mutedText }]}>Mental Bunny, okul projesi için hazırlanmış bir mental sağlık uygulamasıdır.</Text>
        <Text style={[styles.disclaimer, { color: colors.warning }]}>Bu uygulama profesyonel destek yerine geçmez.</Text>
      </View>

      <View style={styles.logoutBox}>
        <SoftButton title="Çıkış Yap" variant="ghost" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}

type HistoryItem = {
  id: string;
  title: string;
  text: string;
};

type HistoryCardProps = {
  title: string;
  emptyText: string;
  items?: HistoryItem[];
};

function HistoryCard({ title, emptyText, items }: HistoryCardProps) {
  const { colors } = useTheme();
  const list = items ?? [];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
      {items === undefined ? <Text style={[styles.cardText, { color: colors.mutedText }]}>Yükleniyor...</Text> : null}
      {items !== undefined && list.length === 0 ? <Text style={[styles.cardText, { color: colors.mutedText }]}>{emptyText}</Text> : null}
      {list.map((item) => (
        <View key={item.id} style={[styles.historyItem, { backgroundColor: colors.input, borderColor: colors.border }]}>
          <Text style={[styles.historyTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.historyText, { color: colors.mutedText }]}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
}

function formatDate(value: number) {
  return new Date(value).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 22, paddingTop: 64, gap: 16 },
  title: { fontSize: 32, fontWeight: "900" },
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
  historyItem: { borderWidth: 1, borderRadius: 18, padding: 12, gap: 5 },
  historyTitle: { fontSize: 14, fontWeight: "900" },
  historyText: { fontSize: 14, lineHeight: 20 },
  disclaimer: { fontSize: 14, lineHeight: 21, fontWeight: "800" },
  logoutBox: { marginTop: 6 },
});

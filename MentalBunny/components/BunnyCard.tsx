import { StyleSheet, Text, View } from "react-native";
import { images } from "../constants/images";
import { useTheme } from "../hooks/useTheme";

type BunnyCardProps = {
  title: string;
  message: string;
  small?: boolean;
};

export default function BunnyCard({ title, message, small = false }: BunnyCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
      <Text style={[styles.emoji, small && styles.smallEmoji]}>{images.bunnyEmoji}</Text>
      <View style={styles.textBox}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.message, { color: colors.mutedText }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 3,
  },
  emoji: {
    fontSize: 42,
  },
  smallEmoji: {
    fontSize: 32,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
});

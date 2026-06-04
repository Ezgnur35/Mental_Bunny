import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
  color?: string;
};

export default function FeatureCard({ icon, title, description, onPress, color }: FeatureCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}
      onPress={onPress}
    >
      <View style={[styles.iconBox, { backgroundColor: color ?? colors.mint }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.mutedText }]}>{description}</Text>
      </View>
      <Text style={[styles.arrow, { color: colors.primary }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 24,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  arrow: {
    fontSize: 30,
    fontWeight: "600",
  },
});

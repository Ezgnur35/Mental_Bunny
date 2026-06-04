import { StyleSheet, Text, View } from "react-native";
import { images } from "../constants/images";
import { useTheme } from "../hooks/useTheme";

export default function LoadingScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.bunny}>{images.bunnyEmoji}</Text>
      <Text style={[styles.title, { color: colors.text }]}>Mental Bunny</Text>
      <Text style={[styles.subtitle, { color: colors.mutedText }]}>Zihnini yumuşakça toparla.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  bunny: {
    fontSize: 72,
    marginBottom: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});

import { Pressable, StyleSheet, Text } from "react-native";
import { images } from "../constants/images";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <Pressable
      style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        {isDark ? images.sunEmoji : images.moonEmoji} {isDark ? "Aydınlık" : "Karanlık"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 22,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
  },
});

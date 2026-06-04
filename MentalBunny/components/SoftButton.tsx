import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

type SoftButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
};

export default function SoftButton({ title, onPress, variant = "primary", disabled = false }: SoftButtonProps) {
  const { colors } = useTheme();
  const backgroundColor = variant === "primary" ? colors.primary : variant === "secondary" ? colors.secondary : colors.surface;
  const textColor = variant === "ghost" ? colors.text : "#FFFFFF";

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor, borderColor: colors.border, opacity: disabled ? 0.6 : 1 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});

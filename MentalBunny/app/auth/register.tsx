import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useMutation } from "convex/react";
import BunnyCard from "../../components/BunnyCard";
import SoftButton from "../../components/SoftButton";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { setLoggedInUser } = useAuth();
  const registerUser = useMutation(api.users.registerUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage("Lütfen tüm alanları doldur.");
      return;
    }

    if (password.length < 4) {
      setMessage("Şifre en az 4 karakter olmalı.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }

    try {
      setIsLoading(true);
      const user = await registerUser({ name: name.trim(), email: email.trim(), password });
      await setLoggedInUser({ name: user.name, email: user.email });
      setMessage("");
      router.replace("/(tabs)");
    } catch {
      setMessage("Kayıt oluşturulamadı. Bu e-posta kullanılıyor olabilir.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <BunnyCard title="Aramıza katıl" message="Kullanıcı bilgilerin Convex veritabanına kaydedilecek." />
      <View style={[styles.formBox, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Text style={[styles.title, { color: colors.text }]}>Kayıt Ol</Text>
        <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.input, borderColor: colors.border }]} placeholder="Adın" placeholderTextColor={colors.mutedText} value={name} onChangeText={setName} />
        <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.input, borderColor: colors.border }]} placeholder="E-posta" placeholderTextColor={colors.mutedText} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.input, borderColor: colors.border }]} placeholder="Şifre" placeholderTextColor={colors.mutedText} value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.input, borderColor: colors.border }]} placeholder="Şifre tekrar" placeholderTextColor={colors.mutedText} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        {message ? <Text style={[styles.warning, { color: colors.warning }]}>{message}</Text> : null}
        <SoftButton title={isLoading ? "Kaydediliyor..." : "Hesap Oluştur"} onPress={handleRegister} disabled={isLoading} />
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.link, { color: colors.primary }]}>Zaten hesabım var</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 22,
    gap: 18,
  },
  formBox: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
    gap: 14,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
  },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 15,
    fontSize: 15,
  },
  warning: { fontSize: 14, fontWeight: "700" },
  link: { textAlign: "center", fontSize: 15, fontWeight: "800", paddingVertical: 4 },
});

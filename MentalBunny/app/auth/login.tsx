import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useMutation } from "convex/react";
import BunnyCard from "../../components/BunnyCard";
import SoftButton from "../../components/SoftButton";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function LoginScreen() {
  const { colors } = useTheme();
  const { rememberedUser, setLoggedInUser } = useAuth();
  const loginUser = useMutation(api.users.loginUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (rememberedUser) {
      setEmail(rememberedUser.email);
    }
  }, [rememberedUser]);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setMessage("Lütfen e-posta ve şifre alanlarını doldur.");
      return;
    }

    try {
      setIsLoading(true);
      const user = await loginUser({ email: email.trim(), password });
      await setLoggedInUser({ name: user.name, email: user.email });
      setMessage("");
      router.replace("/(tabs)");
    } catch {
      setMessage("Giriş yapılamadı. Convex bağlantını ve bilgilerini kontrol et.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <BunnyCard title="Tekrar hoş geldin" message="Küçük tavşanın seni bekliyordu. Bilgilerini hatırladım, sen sadece şifreni yaz." />
      <View style={[styles.formBox, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Text style={[styles.title, { color: colors.text }]}>Giriş Yap</Text>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.input, borderColor: colors.border }]}
          placeholder="E-posta"
          placeholderTextColor={colors.mutedText}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.input, borderColor: colors.border }]}
          placeholder="Şifre"
          placeholderTextColor={colors.mutedText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {message ? <Text style={[styles.warning, { color: colors.warning }]}>{message}</Text> : null}
        <SoftButton title={isLoading ? "Kontrol ediliyor..." : "Giriş Yap"} onPress={handleLogin} disabled={isLoading} />
        <Pressable onPress={() => router.push("/auth/register")}>
          <Text style={[styles.link, { color: colors.primary }]}>Hesabım yok, kayıt olmak istiyorum</Text>
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
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 15,
    fontSize: 15,
  },
  warning: {
    fontSize: 14,
    fontWeight: "700",
  },
  link: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
    paddingVertical: 4,
  },
});

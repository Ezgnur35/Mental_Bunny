import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Ana Sayfa", tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text> }} />
      <Tabs.Screen name="journal" options={{ title: "Günlük", tabBarIcon: ({ color }) => <Text style={{ color }}>📝</Text> }} />
      <Tabs.Screen name="bunny" options={{ title: "Bunny", tabBarIcon: ({ color }) => <Text style={{ color }}>🐰</Text> }} />
      <Tabs.Screen name="settings" options={{ title: "Ayarlar", tabBarIcon: ({ color }) => <Text style={{ color }}>⚙️</Text> }} />
    </Tabs>
  );
}

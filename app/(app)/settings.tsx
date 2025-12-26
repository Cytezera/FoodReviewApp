import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useNavigation } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { signOut } = useSession();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const handleSignOut = () => {
    console.log("works here");
    signOut();
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.cardBackground || "#FFFFFF", borderBottomColor: theme.border || "#E5E5E5" }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IconSymbol size={28} name="arrow-back" color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        {/* Placeholder to keep title centered */}
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* General Section */}
        <Text style={[styles.sectionTitle, { color: theme.secondaryText || "#6B7280" }]}>General</Text>
        <View style={[styles.card, { backgroundColor: theme.cardBackground || "#FFFFFF" }]}>
          <SettingItem label="Location" theme={theme} />
          <Divider theme={theme} />
          <SettingItem label="Language" theme={theme} />
        </View>

        {/* Help Section */}
        <Text style={[styles.sectionTitle, { color: theme.secondaryText || "#6B7280" }]}>Help</Text>
        <View style={[styles.card, { backgroundColor: theme.cardBackground || "#FFFFFF" }]}>
          <SettingItem label="Terms of Agreement" theme={theme} />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable Setting Row */
const SettingItem = ({ label, theme }: { label: string; theme: any }) => (
  <TouchableOpacity style={styles.item}>
    <Text style={[styles.itemText, { color: theme.text }]}>{label}</Text>
    <Text style={[styles.chevron, { color: theme.secondaryText || "#9CA3AF" }]}>›</Text>
  </TouchableOpacity>
);

const Divider = ({ theme }: { theme: any }) => (
  <View style={[styles.divider, { backgroundColor: theme.border || "#E5E7EB" }]} />
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  /* Header */
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  backButton: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    width: 56,
  },
  /* Content */
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  chevron: {
    fontSize: 20,
  },
  divider: {
    height: 1,
    marginLeft: 16,
  },
  /* Logout */
  logoutButton: {
    marginTop: 32,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#EF4444",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
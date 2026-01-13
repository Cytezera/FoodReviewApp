import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Loading } from "@/components/ui/Loading";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter()
  const { user , session , isLoading } = useSession()
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  if (isLoading){
    return <Loading/>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <Button variant="secondary" onPress={() => router.push("/settings")} style={{ backgroundColor: theme.secondaryBackground }}>
            <IconSymbol name="settings" size={24} color={theme.text} />
          </Button>
          <Button variant="secondary" onPress={() => {}} style={{ backgroundColor: theme.secondaryBackground }}>
            <IconSymbol name="notifications" size={24} color={theme.text} />
          </Button>
        </View>

        {/* Profile Row */}
        <Pressable style={[styles.profileRow, { backgroundColor: theme.cardBackground || "#fff" }]}  onPress={()=> router.push("/edit-profile")}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: theme.text }]}>{user.name || "hey"} </Text>
            <Text style={[styles.email, { color: theme.secondaryText || "#666" }]}>{user.email}</Text>
          </View>
        </Pressable>

        {/* Points Card */}
<Card style={[styles.pointsCard, { backgroundColor: theme.heavy || "#fff" }]}>
  {/* Top Row: Title and avatar */}
  <View style={styles.cardTopRow}>
    <View style={{ flex: 1 }}>
      <Text style={[styles.cardTitle, { color: theme.cardText }]}>Gold Tier</Text>
      <Text style={[styles.cardSubtitle, { color: theme.cardText || "#666" }]}>
        300 pts away to Platinum Tier
      </Text>
    </View>
    <Image
      source={{ uri: "https://via.placeholder.com/50" }}
      style={styles.cardAvatar}
    />
  </View>

  {/* Progress + Points */}
  <View style={styles.progressContainer}>
    <Text style={[styles.pointsNumber, { color: theme.cardText }]}>3000</Text>
    <View style={[styles.progressBarBackground, { backgroundColor: theme.tint }]}>
      <View style={[styles.progressBarFill, { width: "50%", backgroundColor: theme.cardText }]} />
    </View>
    <Text style={[styles.pointsSuffix, { color: theme.cardText }]}>pts</Text>
  </View>
</Card>

        {/* Bottom placeholder */}
        <View style={styles.bottomPlaceholder}>
          <Text style={{ color: theme.secondaryText || "#aaa" }}>More features coming soon...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ddd",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  pointsTextContaier:{
    marginTop: 9,
    marginBottom:0
  },
  pointsText: {
    marginLeft: 0,
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 0,
  },
  bottomPlaceholder: {
    alignItems: "center",
    paddingVertical: 24,
  },

cardTopRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

cardTitle: {
  fontSize: 25,
  fontWeight: "600",
},

cardSubtitle: {
  fontSize: 14,
  marginTop: 4,
},

cardAvatar: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#ddd",
},

progressBarFill: {
  height: "100%",
  borderRadius: 5,
},
progressBarBackground: {
  width: "100%",
  height: 10,
  borderRadius: 5,
  backgroundColor: "#eee",
  overflow: "hidden",
  marginTop: 0,
  marginBottom: 20
  
},


viewRewards: {
  marginTop: 12,
  fontWeight: "600",
  fontSize: 14,
  textAlign: "center",
},

pointsCard: {
  padding: 24, // more padding
  borderRadius: 16,
  flexDirection: "column",
  gap: 16,
},

progressContainer: {
  marginTop: 35,
  marginBottom: 16,
  position: "relative",
},

pointsNumber: {
  position: "absolute",
  left: 0,           // aligns with start of progress bar
  bottom: 12,        // slightly above the bar
  fontSize: 30,
  fontWeight: "600",
},

pointsSuffix: {
  position: "absolute",
  right: 0,          // aligns with end of progress bar
  bottom: 12,
  fontSize: 16,
  fontWeight: "600",
},

progressBarBackground: {
  width: "100%",
  height: 10,
  borderRadius: 5,
  backgroundColor: "#eee",
  overflow: "hidden",
  marginTop: 16,
},

});

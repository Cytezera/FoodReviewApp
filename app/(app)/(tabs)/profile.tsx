import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading } from "@/components/ui/Loading";

const TIER_GOAL = 3000;

const ACTIVITY = [
  { icon: "edit" as const, title: "Reviewed Noodl Bar", sub: "2 days ago · ★ 5", pts: "+50" },
  { icon: "local-offer" as const, title: "Claimed promo at The Bean", sub: "4 days ago", pts: "+20" },
  { icon: "casino" as const, title: "Spun the wheel — KFC", sub: "6 days ago", pts: "+10" },
  { icon: "favorite-border" as const, title: "Liked Tako House", sub: "1 week ago", pts: "+5" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isLoading, signOut } = useSession();
  const colorScheme = useColorScheme() ?? "light";
  const c = Colors[colorScheme];

  if (isLoading) return <Loading />;
  if (!user) return null;

  const points = Number(user.points) || 0;
  const pct = Math.min((points / TIER_GOAL) * 100, 100);
  const initials = (user.name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.background }} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.pageTitle, { color: c.text }]}>Profile</Text>
          <View style={styles.headerBtns}>
            <Pressable style={[styles.iconBtn, { backgroundColor: c.cardBackground, borderColor: c.border }]}
              onPress={() => router.push("/settings")}>
              <MaterialIcons name="settings" size={18} color={c.boldText} />
            </Pressable>
          </View>
        </View>

        {/* Identity */}
        <View style={styles.identity}>
          <View style={[styles.avatar, { backgroundColor: c.heavy }]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={[styles.name, { color: c.text }]}>{user.name}</Text>
              {user.title && (
                <View style={[styles.tierBadge, { backgroundColor: c.muted }]}>
                  <Text style={[styles.tierBadgeText, { color: c.heavy }]}>{user.title.toUpperCase()}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.email, { color: c.secondaryText }]}>{user.email}</Text>
            <View style={styles.statsRow}>
              <Stat n="48" l="reviews" c={c} />
              <Stat n="2.1k" l="followers" c={c} />
              <Stat n="312" l="following" c={c} />
            </View>
          </View>
        </View>

        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={[styles.pointsCardInner, { backgroundColor: c.heavy }]}>
            {/* decorative rings */}
            <View style={styles.ring1} />
            <View style={styles.ring2} />
            <View style={styles.pointsTopRow}>
              <Text style={styles.pointsLabel}>PEEKA POINTS</Text>
              <View style={styles.rewardsRow}>
                <MaterialIcons name="card-giftcard" size={14} color="#fff" />
                <Text style={styles.rewardsText}>Rewards</Text>
              </View>
            </View>
            <Text style={styles.pointsNumber}>{points.toLocaleString()}</Text>
            <Text style={styles.pointsSuffix}>pts</Text>
            <View style={styles.progressSection}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressTierText}>{user.title || "Explorer"}</Text>
                <Text style={styles.progressTierText}>
                  {Math.max(0, TIER_GOAL - points)} pts to <Text style={{ fontWeight: "800" }}>Connoisseur</Text>
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${pct}%` as any }]} />
              </View>
            </View>
            <View style={styles.cardBtns}>
              <Pressable style={[styles.cardBtnPrimary, { backgroundColor: "#fff" }]}>
                <Text style={[styles.cardBtnPrimaryText, { color: c.heavy }]}>Redeem</Text>
              </Pressable>
              <Pressable style={styles.cardBtnSecondary}>
                <Text style={styles.cardBtnSecondaryText}>How to earn</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Perks Row */}
        <View style={styles.perksRow}>
          <PerkCard icon="local-offer" n="12" l="Promos saved" c={c} />
          <PerkCard icon="bookmark-border" n="34" l="Bookmarks" c={c} />
          <PerkCard icon="check-circle-outline" n="7" l="Streak days" c={c} />
        </View>

        {/* Achievements */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Achievements</Text>
          <Text style={[styles.seeAll, { color: c.heavy }]}>View all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.achievementsRow}>
          <AchievementBadge color={c.tint} label="First Bite" sub="Earned" />
          <AchievementBadge color={c.heavy} label="Promo Hunter" sub="20 promos" />
          <AchievementBadge color="#78716C" label="Reviewer" sub="50 reviews" muted />
          <AchievementBadge color="#A8A29E" label="Explorer" sub="Locked" muted />
        </ScrollView>

        {/* Activity */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Recent Activity</Text>
        </View>
        <View style={[styles.listCard, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
          {ACTIVITY.map((item, i) => (
            <View key={i} style={[styles.activityRow, i < ACTIVITY.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.border }]}>
              <View style={[styles.activityIcon, { backgroundColor: c.muted }]}>
                <MaterialIcons name={item.icon} size={16} color={c.heavy} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.activityTitle, { color: c.text }]}>{item.title}</Text>
                <Text style={[styles.activitySub, { color: c.secondaryText }]}>{item.sub}</Text>
              </View>
              <Text style={[styles.activityPts, { color: c.heavy }]}>{item.pts}</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={[styles.listCard, styles.settingsCard, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
          <SettingsRow icon="person-outline" label="Edit profile" c={c} onPress={() => router.push("/edit-profile")} />
          <SettingsRow icon="notifications-none" label="Notifications" right="On" c={c} />
          <SettingsRow icon="place" label="Saved places" right="34" c={c} />
          <SettingsRow icon="tune" label="Preferences" c={c} onPress={() => router.push("/settings")} />
          <SettingsRow icon="logout" label="Sign out" danger c={c} onPress={signOut} last />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ n, l, c }: { n: string; l: string; c: typeof Colors.light }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statN, { color: c.text }]}>{n}</Text>
      <Text style={[styles.statL, { color: c.secondaryText }]}>{l}</Text>
    </View>
  );
}

function PerkCard({ icon, n, l, c }: { icon: keyof typeof MaterialIcons.glyphMap; n: string; l: string; c: typeof Colors.light }) {
  return (
    <View style={[styles.perkCard, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
      <View style={[styles.perkIconWrap, { backgroundColor: c.muted }]}>
        <MaterialIcons name={icon} size={15} color={c.heavy} />
      </View>
      <Text style={[styles.perkN, { color: c.text }]}>{n}</Text>
      <Text style={[styles.perkL, { color: c.secondaryText }]}>{l}</Text>
    </View>
  );
}

function AchievementBadge({ color, label, sub, muted }: { color: string; label: string; sub: string; muted?: boolean }) {
  return (
    <View style={styles.badge}>
      <View style={[styles.badgeCircle, { backgroundColor: muted ? "#E7E5E4" : color, opacity: muted ? 0.7 : 1 }]}>
        <MaterialIcons name="verified" size={28} color="#fff" />
      </View>
      <Text style={[styles.badgeLabel, { opacity: muted ? 0.6 : 1 }]}>{label}</Text>
      <Text style={styles.badgeSub}>{sub}</Text>
    </View>
  );
}

function SettingsRow({
  icon, label, right, danger, c, onPress, last,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  right?: string;
  danger?: boolean;
  c: typeof Colors.light;
  onPress?: () => void;
  last?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.settingsRow, !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.border }]}
    >
      <MaterialIcons name={icon} size={18} color={danger ? c.error : c.boldText} />
      <Text style={[styles.settingsLabel, { color: danger ? c.error : c.text }]}>{label}</Text>
      {right && <Text style={[styles.settingsRight, { color: c.secondaryText }]}>{right}</Text>}
      <MaterialIcons name="chevron-right" size={18} color={c.border} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 4,
  },
  pageTitle: { fontSize: 22, fontWeight: "800", letterSpacing: -0.5 },
  headerBtns: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: "center", justifyContent: "center", borderWidth: 1,
  },
  identity: {
    flexDirection: "row", gap: 14, paddingHorizontal: 18,
    paddingTop: 18, paddingBottom: 6, alignItems: "center",
  },
  avatar: {
    width: 70, height: 70, borderRadius: 35,
    alignItems: "center", justifyContent: "center",
    borderWidth: 3, borderColor: "#fff",
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "800", letterSpacing: -1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  name: { fontSize: 18, fontWeight: "700" },
  tierBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 99 },
  tierBadgeText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  email: { fontSize: 13, marginTop: 2 },
  statsRow: { flexDirection: "row", gap: 16, marginTop: 8 },
  stat: { flexDirection: "row", gap: 4, alignItems: "baseline" },
  statN: { fontSize: 14, fontWeight: "700" },
  statL: { fontSize: 12 },
  pointsCard: { paddingHorizontal: 18, marginTop: 18 },
  pointsCardInner: {
    borderRadius: 22, padding: 18, overflow: "hidden",
    shadowColor: "#EA580C", shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35, shadowRadius: 20, elevation: 8,
  },
  ring1: {
    position: "absolute", width: 160, height: 160, borderRadius: 80,
    borderWidth: 2, borderColor: "rgba(255,255,255,0.12)",
    right: -40, top: -40,
  },
  ring2: {
    position: "absolute", width: 100, height: 100, borderRadius: 50,
    borderWidth: 2, borderColor: "rgba(255,255,255,0.08)",
    right: 20, bottom: -20,
  },
  pointsTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pointsLabel: { color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: "700", letterSpacing: 1.6 },
  rewardsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  rewardsText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  pointsNumber: { color: "#fff", fontSize: 44, fontWeight: "800", letterSpacing: -1.5, marginTop: 8 },
  pointsSuffix: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: -8, marginLeft: 2 },
  progressSection: { marginTop: 14 },
  progressLabels: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progressTierText: { color: "rgba(255,255,255,0.95)", fontSize: 11 },
  progressTrack: {
    height: 8, borderRadius: 99, backgroundColor: "rgba(255,255,255,0.25)", overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#fff", borderRadius: 99 },
  cardBtns: { flexDirection: "row", gap: 8, marginTop: 14 },
  cardBtnPrimary: {
    flex: 1, padding: 10, borderRadius: 12, alignItems: "center",
  },
  cardBtnPrimaryText: { fontWeight: "700", fontSize: 13 },
  cardBtnSecondary: {
    flex: 1, padding: 10, borderRadius: 12, alignItems: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.4)",
  },
  cardBtnSecondaryText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  perksRow: { flexDirection: "row", gap: 10, paddingHorizontal: 18, marginTop: 14 },
  perkCard: {
    flex: 1, borderRadius: 14, padding: 12, borderWidth: 1,
  },
  perkIconWrap: {
    width: 28, height: 28, borderRadius: 8,
    alignItems: "center", justifyContent: "center",
  },
  perkN: { fontSize: 18, fontWeight: "800", marginTop: 8, letterSpacing: -0.5 },
  perkL: { fontSize: 11, marginTop: -2 },
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "baseline",
    paddingHorizontal: 18, marginTop: 22, marginBottom: 12,
  },
  sectionTitle: { fontSize: 19, fontWeight: "700", letterSpacing: -0.3 },
  seeAll: { fontSize: 13, fontWeight: "600" },
  achievementsRow: { paddingHorizontal: 18, gap: 12 },
  badge: { width: 92, alignItems: "center" },
  badgeCircle: {
    width: 70, height: 70, borderRadius: 18,
    alignItems: "center", justifyContent: "center",
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3,
  },
  badgeLabel: { fontSize: 12, fontWeight: "700", marginTop: 8, textAlign: "center" },
  badgeSub: { fontSize: 10, color: "#78716C", marginTop: 1, textAlign: "center" },
  listCard: {
    marginHorizontal: 18, borderRadius: 16, borderWidth: 1, overflow: "hidden",
  },
  settingsCard: { marginTop: 20 },
  activityRow: {
    flexDirection: "row", alignItems: "center", gap: 12, padding: 12,
  },
  activityIcon: {
    width: 34, height: 34, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  activityTitle: { fontSize: 13, fontWeight: "600" },
  activitySub: { fontSize: 11, marginTop: 1 },
  activityPts: { fontSize: 12, fontWeight: "700" },
  settingsRow: {
    flexDirection: "row", alignItems: "center", gap: 12, padding: 14,
  },
  settingsLabel: { flex: 1, fontSize: 14, fontWeight: "600" },
  settingsRight: { fontSize: 12 },
});

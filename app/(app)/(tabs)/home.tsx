import { Colors } from "@/constants/theme";
import { useLocationContext } from "@/contexts/LocationContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { RestaurantModal, RestaurantPreview } from "@/components/ui/RestaurantModal";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const activePromos = [
  {
    id: 101,
    name: "Burger Joint",
    cuisine: "American",
    promoTag: "20% OFF",
    promo: "20% off all burgers today",
    rating: 4.8,
    dist: "1.2 mi",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    id: 102,
    name: "Sushi Ko",
    cuisine: "Japanese",
    promoTag: "FREE ROLL",
    promo: "Free spring roll with any combo",
    rating: 4.9,
    dist: "0.8 mi",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
  },
  {
    id: 103,
    name: "Mama's Pizza",
    cuisine: "Italian",
    promoTag: "BOGO",
    promo: "Buy 1 get 1 free pizza",
    rating: 4.5,
    dist: "2.5 mi",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  },
];

const trendingRestaurants = [
  {
    id: 5,
    name: "Burger Joint",
    cuisine: "American",
    price: "$$",
    priceRange: "$8 – $22",
    distance: "1.2 mi",
    rating: 4.8,
    reviewCount: 512,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    promoTag: "20% OFF",
    status: "open",
    hours: "Mon–Sun · 10:00 AM – 11:00 PM",
    about: "A no-fuss burger spot known for hand-smashed patties, crispy edges, and house-made sauces. A local favourite for a reason.",
    categories: ["Burgers", "American", "Takeaway", "Quick Bite"],
    offers: [
      { tag: "20% OFF", title: "20% off all burgers", sub: "Daily 2pm – 6pm" },
      { tag: "COMBO", title: "Burger + fries + drink combo", sub: "$14.90 all day" },
    ],
  },
  {
    id: 2,
    name: "Sushi Ko",
    cuisine: "Japanese",
    price: "$$$",
    priceRange: "$18 – $65",
    distance: "0.8 mi",
    rating: 4.9,
    reviewCount: 1204,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    promoTag: undefined,
    status: "open",
    hours: "Tue–Sun · 12:00 PM – 10:30 PM",
    about: "Intimate sushi bar serving nigiri, maki, and omakase sets with daily-fresh fish. Known for clean flavours and attentive service.",
    categories: ["Sushi", "Japanese", "Omakase", "Date Night"],
    offers: [
      { tag: "FREE GYOZA", title: "Free gyoza with any set", sub: "Weekday lunches only" },
    ],
  },
  {
    id: 3,
    name: "Mama's Pizza",
    cuisine: "Italian",
    price: "$$",
    priceRange: "$12 – $34",
    distance: "2.5 mi",
    rating: 4.5,
    reviewCount: 388,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    promoTag: undefined,
    status: "closed",
    hours: "Wed–Mon · 11:00 AM – 9:30 PM",
    about: "Family-run pizzeria firing 48-hour cold-fermented Neapolitan pies in a wood oven. Cosy dining room, great for groups.",
    categories: ["Pizza", "Italian", "Family", "Dine-in"],
    offers: [
      { tag: "BOGO", title: "Buy 1 get 1 free pizza", sub: "Every Tuesday" },
      { tag: "15% OFF", title: "15% off pickup orders", sub: "Order in-app" },
    ],
  },
];

const nearbyRestaurants = [
  {
    id: 1,
    name: "Green Bowl",
    cuisine: "Healthy",
    price: "$$",
    distance: "0.3 mi",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    isOpen: true,
    friendsCount: 12,
  },
  {
    id: 2,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    price: "$",
    distance: "1.5 mi",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    isOpen: true,
    closesSoon: true,
    tags: ["🌮 Tacos", "🍹 Drinks"],
  },
];

const CHIPS = ["For You", "Promos", "Trending", "New", "Café", "Asian"];

export default function DiscoverScreen() {
  const { errorMsg, loading, address, refetchLocation } =
    useLocationContext();
  const [activeChip, setActiveChip] = useState("For You");
  const [detailPlace, setDetailPlace] = useState<RestaurantPreview | null>(null);

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={["top"]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View style={styles.locationRow}>
          <View style={styles.locationInfo}>
            <Text style={[styles.locationLabel, { color: theme.secondaryText }]}>
              DELIVER TO
            </Text>
            <Pressable style={styles.locationButton} onPress={refetchLocation}>
              <MaterialIcons name="place" size={16} color={theme.heavy} />
              {loading ? (
                <Text style={[styles.locationText, { color: theme.text }]}>Loading…</Text>
              ) : errorMsg ? (
                <Text style={[styles.locationText, { color: theme.text }]}>{errorMsg}</Text>
              ) : (
                <Text style={[styles.locationText, { color: theme.text }]}>
                  {address?.city ?? address?.subregion ?? "Unknown"}
                </Text>
              )}
              <MaterialIcons name="keyboard-arrow-down" size={18} color={theme.secondaryText} />
            </Pressable>
          </View>
          <Pressable style={[styles.iconBtn, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <MaterialIcons name="notifications-none" size={22} color={theme.boldText} />
            <View style={[styles.notifDot, { backgroundColor: theme.heavy }]} />
          </Pressable>
        </View>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          <MaterialIcons name="search" size={20} color={theme.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search restaurants or dishes"
            placeholderTextColor={theme.secondaryText}
          />
          <MaterialIcons name="tune" size={20} color={theme.secondaryText} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          {CHIPS.map((chip) => {
            const active = chip === activeChip;
            return (
              <Pressable
                key={chip}
                onPress={() => setActiveChip(chip)}
                style={[
                  styles.chip,
                  active
                    ? { backgroundColor: theme.heavy, borderColor: theme.heavy }
                    : { backgroundColor: theme.cardBackground, borderColor: theme.border },
                ]}
              >
                <Text style={[styles.chipText, { color: active ? "#fff" : theme.boldText }]}>
                  {chip}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Active Promos Rail */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🔥 Active Promos</Text>
          <Text style={[styles.seeAll, { color: theme.heavy }]}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {activePromos.map((promo) => (
            <Pressable
              key={promo.id}
              style={[styles.promoCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
              onPress={() => setDetailPlace({ name: promo.name, image: promo.image, rating: promo.rating, cuisine: promo.cuisine, address: promo.dist, promo: promo.promo })}
            >
              <View style={styles.promoImageWrap}>
                <Image source={{ uri: promo.image }} style={styles.promoImage} />
                <View style={styles.promoBadge}>
                  <View style={styles.promoDot} />
                  <Text style={styles.promoBadgeText}>{promo.promoTag}</Text>
                </View>
                <View style={styles.promoRating}>
                  <MaterialIcons name="star" size={11} color="#F5A524" />
                  <Text style={styles.promoRatingText}>{promo.rating}</Text>
                </View>
              </View>
              <View style={styles.promoInfo}>
                <Text style={[styles.promoName, { color: theme.text }]}>{promo.name}</Text>
                <Text style={[styles.promoText, { color: theme.heavy }]} numberOfLines={1}>{promo.promo}</Text>
                <Text style={[styles.promoMeta, { color: theme.secondaryText }]}>{promo.cuisine} · {promo.dist}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Promo Banner */}
        <View style={[styles.promoBanner, { backgroundColor: theme.muted, borderColor: theme.heavyBorder }]}>
          <View style={[styles.promoBannerIcon, { backgroundColor: theme.heavy }]}>
            <MaterialIcons name="card-giftcard" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.promoBannerTitle, { color: theme.text }]}>12 promos near you right now</Text>
            <Text style={[styles.promoBannerSub, { color: theme.secondaryText }]}>Tap the map to see them all</Text>
          </View>
          <Pressable
            style={[styles.promoBannerBtn, { backgroundColor: theme.heavy }]}
            onPress={() => router.push("/(app)/(tabs)/explore")}
          >
            <Text style={styles.promoBannerBtnText}>View map</Text>
          </Pressable>
        </View>

        {/* Trending */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Trending Near You</Text>
          <Text style={[styles.seeAll, { color: theme.heavy }]}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {trendingRestaurants.map((r) => (
            <Pressable
              key={r.id}
              style={styles.trendingCard}
              onPress={() => setDetailPlace({
                name: r.name,
                image: r.image,
                rating: r.rating,
                reviewCount: r.reviewCount,
                priceRange: r.priceRange,
                cuisine: r.cuisine,
                distance: r.distance,
                status: r.status,
                hours: r.hours,
                description: r.about,
                promoTag: r.promoTag,
                categories: r.categories,
                offers: r.offers,
              })}
            >
              <View style={styles.trendingImageWrap}>
                <Image source={{ uri: r.image }} style={styles.trendingImage} />
                <View style={[styles.ratingPill, { backgroundColor: "rgba(255,255,255,0.92)" }]}>
                  <MaterialIcons name="star" size={12} color={theme.heavy} />
                  <Text style={[styles.ratingPillText, { color: theme.text }]}>{r.rating}</Text>
                </View>
                {r.promoTag && (
                  <View style={styles.trendingPromoBadge}>
                    <View style={styles.promoDot} />
                    <Text style={styles.promoBadgeText}>{r.promoTag}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.cardName, { color: theme.text }]}>{r.name}</Text>
              <Text style={[styles.cardMeta, { color: theme.secondaryText }]}>{r.cuisine} · {r.price}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Recommended For You */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recommended For You</Text>
        </View>
        <View style={styles.nearbyList}>
          {nearbyRestaurants.map((r) => (
            <Pressable
              key={r.id}
              style={[styles.nearbyCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
              onPress={() => setDetailPlace({ name: r.name, image: r.image, rating: r.rating, priceRange: r.price, cuisine: r.cuisine, address: r.distance, status: r.isOpen ? (r.closesSoon ? "closes soon" : "open") : "closed" })}
            >
              <Image source={{ uri: r.image }} style={styles.nearbyImage} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={styles.nearbyHeader}>
                  <Text style={[styles.cardName, { color: theme.text }]}>{r.name}</Text>
                  {r.isOpen && (
                    <Text style={[styles.openBadge, { color: r.closesSoon ? "#EAB308" : theme.success }]}>
                      ● {r.closesSoon ? "CLOSES SOON" : "OPEN"}
                    </Text>
                  )}
                </View>
                <Text style={[styles.cardMeta, { color: theme.secondaryText }]}>
                  {r.cuisine} · {r.price} · {r.distance}
                </Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons name="star" size={13} color={theme.heavy} />
                  <Text style={[styles.ratingRowText, { color: theme.heavy }]}>{r.rating}</Text>
                  {r.friendsCount && (
                    <Text style={[styles.friendsText, { color: theme.secondaryText }]}>
                      · {r.friendsCount} friends tried this
                    </Text>
                  )}
                </View>
                {r.tags && (
                  <View style={styles.tagsRow}>
                    {r.tags.map((tag, i) => (
                      <View key={i} style={[styles.tag, { backgroundColor: theme.muted, borderColor: theme.border }]}>
                        <Text style={[styles.tagText, { color: theme.boldText }]}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <RestaurantModal place={detailPlace} onClose={() => setDetailPlace(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  locationInfo: { flex: 1 },
  locationLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: 2,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: { fontSize: 16, fontWeight: "700" },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 8,
    borderWidth: 1,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: "500" },
  chipsContainer: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 99,
    justifyContent: "center",
    borderWidth: 1,
  },
  chipText: { fontSize: 13, fontWeight: "600" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 18,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 19, fontWeight: "700", letterSpacing: -0.3 },
  seeAll: { fontSize: 13, fontWeight: "600" },
  horizontalList: { paddingLeft: 18, paddingRight: 18, gap: 12 },
  promoCard: {
    width: 230,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  promoImageWrap: { position: "relative" },
  promoImage: { width: "100%", height: 120 },
  promoBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EA580C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  promoDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#fff" },
  promoBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  promoRating: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 99,
  },
  promoRatingText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  promoInfo: { padding: 12, gap: 2 },
  promoName: { fontSize: 14, fontWeight: "700" },
  promoText: { fontSize: 12, fontWeight: "600" },
  promoMeta: { fontSize: 11, marginTop: 4 },
  promoBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 18,
    marginTop: 18,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  promoBannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  promoBannerTitle: { fontSize: 13, fontWeight: "700" },
  promoBannerSub: { fontSize: 12, marginTop: 1 },
  promoBannerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  promoBannerBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  trendingCard: { width: 170 },
  trendingImageWrap: {
    width: "100%",
    height: 130,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  trendingImage: { width: "100%", height: "100%" },
  ratingPill: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 99,
    gap: 3,
  },
  ratingPillText: { fontSize: 11, fontWeight: "700" },
  trendingPromoBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EA580C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cardName: { fontSize: 14, fontWeight: "700", marginTop: 8 },
  cardMeta: { fontSize: 12, marginTop: 1 },
  nearbyList: { paddingHorizontal: 18, gap: 12 },
  nearbyCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  nearbyImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    flexShrink: 0,
  },
  nearbyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  openBadge: { fontSize: 10, fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  ratingRowText: { fontSize: 12, fontWeight: "700" },
  friendsText: { fontSize: 11 },
  tagsRow: { flexDirection: "row", gap: 6, marginTop: 6, flexWrap: "wrap" },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1 },
  tagText: { fontSize: 11, fontWeight: "500" },
});

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useLocationContext } from "@/contexts/LocationContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
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

const trendingRestaurants = [
  {
    id: 1,
    name: "Burger Joint",
    cuisine: "American",
    price: "$$",
    distance: "1.2 mi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    id: 2,
    name: "Sushi Ko",
    cuisine: "Japanese",
    price: "$$$",
    distance: "0.8 mi",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
  },
  {
    id: 3,
    name: "Mama's Pizza",
    cuisine: "Italian",
    price: "$$",
    distance: "2.5 mi",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
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

const filterChips = [
  { id: 1, label: "Trending", icon: "fire", active: true },
  { id: 2, label: "Open Now", active: false },
  { id: 3, label: "Under 1km", active: false },
  { id: 4, label: "Top Rated", icon: "star-fill", active: false },
  { id: 5, label: "Italian", active: false },
];

export default function DiscoverScreen() {
  const { errorMsg, loading, location, address, refetchLocation } =
    useLocationContext();

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        {/* Location & Profile */}
        <View style={styles.locationRow}>
          <View style={styles.locationInfo}>
            <Text style={[styles.locationLabel, { color: theme.boldText }]}>
              LOCATION
            </Text>
            <Pressable
              style={styles.locationButton}
              onPress={() => refetchLocation()}
            >
              {loading ? (
                <Text style={[styles.locationText, { color: theme.text }]}>
                  Loading
                </Text>
              ) : errorMsg ? (
                <Text style={[styles.locationText, { color: theme.text }]}>
                  {errorMsg}
                </Text>
              ) : (
                <Text style={[styles.locationText, { color: theme.text }]}>
                  {address?.city ?? address?.subregion ?? "Unknown city"},
                  {address?.region ?? "Unknown region"}
                </Text>
              )}

              <IconSymbol name="chevron.down" size={20} color="#D65F00" />
            </Pressable>
          </View>
          <Pressable
            style={[
              styles.notificationButton,
              {
                backgroundColor: theme.cardBackground,
                borderWidth: 1,
                borderColor: theme.border,
              },
            ]}
          >
            <IconSymbol name="bell" size={24} color={theme.text} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.cardBackground,
              borderWidth: 1,
              borderColor: theme.border,
            },
          ]}
        >
          <IconSymbol
            name="search"
            size={24}
            color={theme.buttonBackground}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search tacos, sushi, burgers..."
            placeholderTextColor={theme.secondaryText}
          />
          <Pressable style={styles.filterButton}>
            <IconSymbol name="filter" size={20} color={theme.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
          style={styles.chipsScroll}
        >
          {filterChips.map((chip) => (
            <Pressable
              key={chip.id}
              style={[
                styles.chip,
                chip.active
                  ? styles.chipActive
                  : [
                      styles.chipInactive,
                      {
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.border,
                      },
                    ],
              ]}
            >
              {chip.icon && (
                <IconSymbol
                  name={chip.icon === "fire" ? "fire" : "star.fill"}
                  size={18}
                  color={chip.active ? "#fff" : theme.text}
                />
              )}
              <Text
                style={[
                  styles.chipText,
                  { color: chip.active ? "#fff" : theme.text },
                ]}
              >
                {chip.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Trending Near You
            </Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {trendingRestaurants.map((restaurant) => (
              <Pressable key={restaurant.id} style={styles.trendingCard}>
                <View style={styles.trendingImageContainer}>
                  <Image
                    source={{ uri: restaurant.image }}
                    style={styles.trendingImage}
                  />
                  <View
                    style={[
                      styles.ratingBadge,
                      {
                        backgroundColor: isDark
                          ? "rgba(0,0,0,0.6)"
                          : "rgba(255,255,255,0.9)",
                      },
                    ]}
                  >
                    <Text style={[styles.ratingText, { color: theme.text }]}>
                      {restaurant.rating}
                    </Text>
                    <IconSymbol name="star.fill" size={14} color="#D65F00" />
                  </View>
                </View>
                <View style={styles.trendingInfo}>
                  <Text style={[styles.restaurantName, { color: theme.text }]}>
                    {restaurant.name}
                  </Text>
                  <Text
                    style={[
                      styles.restaurantMeta,
                      { color: theme.secondaryText },
                    ]}
                  >
                    {restaurant.cuisine} • {restaurant.price} •{" "}
                    {restaurant.distance}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Favorites */}
        <View style={[styles.section, styles.nearbySection]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Nearby Favorites
          </Text>
          {nearbyRestaurants.map((restaurant) => (
            <Pressable
              key={restaurant.id}
              style={[
                styles.nearbyCard,
                {
                  backgroundColor: theme.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.nearbyImageContainer}>
                <Image
                  source={{ uri: restaurant.image }}
                  style={styles.nearbyImage}
                />
                {restaurant.isOpen && (
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: isDark
                          ? "rgba(30,31,31,0.9)"
                          : "rgba(255,255,255,0.9)",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor: restaurant.closesSoon
                            ? "#EAB308"
                            : "#22C55E",
                        },
                      ]}
                    />
                    <Text style={[styles.statusText, { color: theme.text }]}>
                      {restaurant.closesSoon ? "CLOSES SOON" : "OPEN NOW"}
                    </Text>
                  </View>
                )}
                <Pressable style={styles.favoriteButton}>
                  <IconSymbol name="heart" size={20} color="#fff" />
                </Pressable>
              </View>
              <View style={styles.nearbyInfo}>
                <View style={styles.nearbyHeader}>
                  <Text style={[styles.restaurantName, { color: theme.text }]}>
                    {restaurant.name}
                  </Text>
                  <View style={styles.ratingBadgeInline}>
                    <Text
                      style={[styles.ratingTextSmall, { color: "#D65F00" }]}
                    >
                      {restaurant.rating}
                    </Text>
                    <IconSymbol name="star.fill" size={14} color="#D65F00" />
                  </View>
                </View>
                <Text
                  style={[
                    styles.restaurantMeta,
                    { color: theme.secondaryText },
                  ]}
                >
                  {restaurant.cuisine} • {restaurant.price} •{" "}
                  {restaurant.distance} away
                </Text>
                {restaurant.friendsCount && (
                  <View style={styles.friendsContainer}>
                    <View style={styles.avatarGroup}>
                      <View style={[styles.avatar, styles.avatar1]} />
                      <View style={[styles.avatar, styles.avatar2]} />
                      <View style={[styles.avatar, styles.avatarCount]}>
                        <Text style={styles.avatarCountText}>
                          +{restaurant.friendsCount}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.friendsText,
                        { color: theme.secondaryText },
                      ]}
                    >
                      friends tried this
                    </Text>
                  </View>
                )}
                {restaurant.tags && (
                  <View style={styles.tagsContainer}>
                    {restaurant.tags.map((tag, index) => (
                      <View
                        key={index}
                        style={[
                          styles.tag,
                          {
                            backgroundColor: theme.cardBackground,
                            borderWidth: 1,
                            borderColor: theme.border,
                          },
                        ]}
                      >
                        <Text style={[styles.tagText, { color: theme.text }]}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 2,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "700",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D65F00",
    borderWidth: 2,
    borderColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  chipsScroll: {
    marginTop: 8,
  },
  chipsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 12,
  },
  chip: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 8,
  },
  chipActive: {
    backgroundColor: "#D65F00",
  },
  chipInactive: {
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D65F00",
  },
  horizontalList: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 16,
  },
  trendingCard: {
    width: 240,
    gap: 12,
  },
  trendingImageContainer: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  trendingImage: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
  },
  trendingInfo: {
    gap: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "700",
  },
  restaurantMeta: {
    fontSize: 14,
  },
  nearbySection: {
    paddingHorizontal: 20,
  },
  nearbyCard: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 24,
  },
  nearbyImageContainer: {
    width: "100%",
    height: 192,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  nearbyImage: {
    width: "100%",
    height: "100%",
  },
  statusBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  nearbyInfo: {
    paddingTop: 12,
    paddingHorizontal: 4,
    gap: 8,
  },
  nearbyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  ratingBadgeInline: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(214,95,0,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  ratingTextSmall: {
    fontSize: 12,
    fontWeight: "700",
  },
  friendsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  avatarGroup: {
    flexDirection: "row",
    marginLeft: -8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ddd",
    borderWidth: 2,
    borderColor: "#fff",
    marginLeft: -8,
  },
  avatar1: {
    backgroundColor: "#f59e0b",
  },
  avatar2: {
    backgroundColor: "#3b82f6",
  },
  avatarCount: {
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCountText: {
    fontSize: 8,
    fontWeight: "700",
    color: "#6b7280",
  },
  friendsText: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  navLabelActive: {
    color: "#D65F00",
    fontWeight: "700",
  },
  fabContainer: {
    marginTop: -48,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D65F00",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#D65F00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});

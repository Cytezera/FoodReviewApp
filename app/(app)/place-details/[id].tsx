import { Colors } from "@/constants/theme";
import { useGetPlaceById } from "@/services/hooks/places";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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
import { Loading } from "@/components/ui/Loading";
import { SafeAreaView } from "react-native-safe-area-context";

const TABS = ["Overview", "Offers", "Reviews", "Info"] as const;
type Tab = (typeof TABS)[number];

const STATIC_OFFERS = [
  { tag: "20% OFF", title: "20% off Lunch Menu", sub: "Valid Mon–Fri until 3 PM" },
  { tag: "FREEBIE", title: "Free drink with any main", sub: "Weekdays only" },
];

const STATIC_REVIEWS = [
  { initials: "SM", name: "Sophia M.", stars: 5, text: "The food was absolutely divine. Best meal I've had this month!" },
  { initials: "JW", name: "James W.", stars: 4, text: "Great atmosphere, slightly slow at lunch. Worth it for the deal." },
  { initials: "PN", name: "Priya N.", stars: 5, text: "Their seasonal menu is always worth checking. Lovely staff too." },
];

export default function RestaurantDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const placeId = Number(id) || 5;
  const { data: place, isLoading } = useGetPlaceById(placeId);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const colorScheme = useColorScheme() ?? "light";
  const c = Colors[colorScheme];

  if (isLoading || !place) return <Loading />;

  const primaryImage = place.images?.find((img: any) => img.isPrimary)?.url ?? place.images?.[0]?.url;
  const gallery: string[] = place.images?.map((img: any) => img.url) ?? (primaryImage ? [primaryImage] : []);
  const categories = (place.categories as any[])?.map((cat) => cat?.category?.name).filter(Boolean) ?? [];
  const isOpen = place.status?.toLowerCase() === "open";

  const priceCount = place.priceRange?.replace(/[^$]/g, "").length ?? 2;

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* GALLERY */}
        <View style={styles.gallery}>
          {gallery.length > 0 ? (
            <Image source={{ uri: gallery[galleryIdx] }} style={styles.galleryImage} />
          ) : (
            <View style={[styles.galleryImage, { backgroundColor: c.muted }]} />
          )}
          {/* Back + Save buttons */}
          <SafeAreaView edges={["top"]} style={styles.galleryOverlay}>
            <Pressable style={styles.galleryBtn} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={20} color="#1C1917" />
            </Pressable>
            <Pressable style={styles.galleryBtn} onPress={() => setSaved(!saved)}>
              <MaterialIcons
                name={saved ? "bookmark" : "bookmark-border"}
                size={20}
                color={saved ? c.heavy : "#1C1917"}
              />
            </Pressable>
          </SafeAreaView>
          {/* Gallery dots + counter */}
          {gallery.length > 1 && (
            <>
              <View style={styles.galleryDots}>
                {gallery.map((_, i) => (
                  <Pressable
                    key={i}
                    onPress={() => setGalleryIdx(i)}
                    style={[styles.dot, i === galleryIdx ? styles.dotActive : styles.dotInactive]}
                  />
                ))}
              </View>
              <View style={styles.galleryCounter}>
                <Text style={styles.galleryCounterText}>{galleryIdx + 1} / {gallery.length}</Text>
              </View>
            </>
          )}
          {/* Thumbnail strip */}
          {gallery.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailStrip} contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingTop: 10 }}>
              {gallery.map((uri, i) => (
                <Pressable key={i} onPress={() => setGalleryIdx(i)}
                  style={[styles.thumbnail, { borderColor: i === galleryIdx ? c.heavy : "transparent" }]}>
                  <Image source={{ uri }} style={styles.thumbnailImage} />
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

        {/* HEADER INFO */}
        <View style={[styles.headerCard, { backgroundColor: c.background }]}>
          <View style={styles.headerTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.placeName, { color: c.text }]}>{place.name}</Text>
              <Text style={[styles.placeMeta, { color: c.secondaryText }]}>
                {place.priceRange} · {place.address?.split(",")[0]}
              </Text>
            </View>
            <View style={[styles.ratingBlock, { backgroundColor: c.muted, borderColor: c.heavyBorder }]}>
              <View style={styles.ratingBlockRow}>
                <MaterialIcons name="star" size={13} color={c.heavy} />
                <Text style={[styles.ratingBlockNum, { color: c.text }]}>{place.rating?.toFixed(1)}</Text>
              </View>
              <Text style={[styles.ratingBlockSub, { color: c.secondaryText }]}>reviews</Text>
            </View>
          </View>

          {/* Status */}
          <View style={styles.statusRow}>
            <Text style={[styles.statusText, { color: isOpen ? c.success : c.error }]}>
              ● {isOpen ? "Open now" : "Closed"}
            </Text>
            <Text style={[styles.statusDivider, { color: c.secondaryText }]}>·</Text>
            <Text style={[styles.statusHours, { color: c.secondaryText }]}>Mon–Sun · 10am – 10pm</Text>
          </View>

          {/* Categories */}
          {categories.length > 0 && (
            <View style={styles.categoriesRow}>
              {categories.map((cat) => (
                <View key={cat} style={[styles.catPill, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
                  <Text style={[styles.catPillText, { color: c.boldText }]}>{cat}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Quick actions */}
          <View style={styles.actionsRow}>
            <Pressable style={[styles.dirBtn, { backgroundColor: c.heavy }]}>
              <MaterialIcons name="directions" size={16} color="#fff" />
              <Text style={styles.dirBtnText}>Directions</Text>
            </Pressable>
            <Pressable style={[styles.iconCircle, { borderColor: c.border, backgroundColor: c.cardBackground }]}>
              <MaterialIcons name="share" size={18} color={c.boldText} />
            </Pressable>
            <Pressable style={[styles.iconCircle, { borderColor: c.border, backgroundColor: c.cardBackground }]}>
              <MaterialIcons name="favorite-border" size={18} color={c.boldText} />
            </Pressable>
          </View>
        </View>

        {/* TABS */}
        <View style={[styles.tabBar, { borderBottomColor: c.border }]}>
          {TABS.map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tabItem}>
              <Text style={[styles.tabLabel, {
                color: activeTab === tab ? c.heavy : c.secondaryText,
                fontWeight: activeTab === tab ? "700" : "600",
              }]}>
                {tab}{tab === "Offers" && STATIC_OFFERS.length ? ` · ${STATIC_OFFERS.length}` : ""}
              </Text>
              <View style={[styles.tabUnderline, { backgroundColor: activeTab === tab ? c.heavy : "transparent" }]} />
            </Pressable>
          ))}
        </View>

        {/* TAB CONTENT */}
        <View style={styles.tabContent}>
          {activeTab === "Overview" && (
            <OverviewTab place={place} priceCount={priceCount} c={c} onOffersPress={() => setActiveTab("Offers")} />
          )}
          {activeTab === "Offers" && <OffersTab offers={STATIC_OFFERS} c={c} />}
          {activeTab === "Reviews" && <ReviewsTab place={place} reviews={STATIC_REVIEWS} c={c} />}
          {activeTab === "Info" && <InfoTab place={place} c={c} />}
        </View>
      </ScrollView>

      {/* Bottom review bar */}
      <View style={[styles.bottomBar, { backgroundColor: c.cardBackground, borderTopColor: c.border }]}>
        <TextInput
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="Add a review…"
          style={[styles.reviewInput, { backgroundColor: c.muted, color: c.text }]}
          placeholderTextColor={c.secondaryText}
        />
        <Pressable style={[styles.postBtn, { backgroundColor: c.heavy }]}>
          <Text style={styles.postBtnText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}

function OverviewTab({ place, priceCount, c, onOffersPress }: {
  place: any; priceCount: number; c: typeof Colors.light; onOffersPress: () => void;
}) {
  return (
    <View style={{ gap: 12 }}>
      <Text style={[styles.overviewSectionTitle, { color: c.text }]}>About</Text>
      <Text style={[styles.overviewAbout, { color: c.boldText }]}>
        {place.description || "A neighbourhood favourite known for fresh ingredients, friendly staff, and a cozy atmosphere."}
      </Text>

      {/* Price range */}
      <View style={[styles.infoBlock, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
        <View>
          <Text style={[styles.infoBlockLabel, { color: c.secondaryText }]}>PRICE RANGE</Text>
          <Text style={[styles.infoBlockVal, { color: c.text }]}>{place.priceRange}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 2 }}>
          {["$", "$", "$", "$"].map((s, i) => (
            <Text key={i} style={[styles.priceDollar, { color: i < priceCount ? c.heavy : c.border }]}>{s}</Text>
          ))}
        </View>
      </View>

      {/* Featured offer */}
      <Pressable style={[styles.featuredOffer, { backgroundColor: c.muted, borderColor: c.heavyBorder }]} onPress={onOffersPress}>
        <View style={styles.featuredOfferHeader}>
          <MaterialIcons name="card-giftcard" size={15} color={c.heavy} />
          <Text style={[styles.featuredOfferTag, { color: c.heavy }]}>FEATURED OFFER</Text>
        </View>
        <Text style={[styles.featuredOfferTitle, { color: c.text }]}>{STATIC_OFFERS[0].title}</Text>
        <Text style={[styles.featuredOfferSub, { color: c.secondaryText }]}>{STATIC_OFFERS[0].sub}</Text>
        {STATIC_OFFERS.length > 1 && (
          <Text style={[styles.moreOffers, { color: c.heavy }]}>+{STATIC_OFFERS.length - 1} more offer →</Text>
        )}
      </Pressable>

      {/* Mini grid */}
      <View style={styles.miniGrid}>
        <View style={[styles.miniCard, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
          <MaterialIcons name="access-time" size={13} color={c.heavy} />
          <Text style={[styles.miniCardLabel, { color: c.secondaryText }]}>HOURS</Text>
          <Text style={[styles.miniCardVal, { color: c.text }]}>
            {place.status?.toLowerCase() === "open" ? "Open now" : "Closed"}
          </Text>
        </View>
        <View style={[styles.miniCard, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
          <MaterialIcons name="place" size={13} color={c.heavy} />
          <Text style={[styles.miniCardLabel, { color: c.secondaryText }]}>ADDRESS</Text>
          <Text style={[styles.miniCardVal, { color: c.text }]} numberOfLines={2}>
            {place.address?.split(",").slice(0, 2).join(",") ?? "—"}
          </Text>
        </View>
      </View>
    </View>
  );
}

function OffersTab({ offers, c }: { offers: typeof STATIC_OFFERS; c: typeof Colors.light }) {
  if (offers.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={[styles.emptyTitle, { color: c.secondaryText }]}>No active offers right now.</Text>
        <Text style={[styles.emptySub, { color: c.border }]}>Check back later or set an alert.</Text>
      </View>
    );
  }
  return (
    <View style={{ gap: 10 }}>
      {offers.map((o, i) => (
        <View key={i} style={[styles.offerCard, { backgroundColor: c.cardBackground, borderColor: c.heavyBorder }]}>
          <View style={styles.offerCardTop}>
            <View style={styles.offerBadge}>
              <View style={styles.offerBadgeDot} />
              <Text style={styles.offerBadgeText}>{o.tag}</Text>
            </View>
            <Text style={[styles.offerSub, { color: c.secondaryText }]}>· {o.sub}</Text>
          </View>
          <Text style={[styles.offerTitle, { color: c.text }]}>{o.title}</Text>
          <Pressable style={[styles.claimBtn, { backgroundColor: c.heavy }]}>
            <Text style={styles.claimBtnText}>Claim offer</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

function ReviewsTab({ place, reviews, c }: { place: any; reviews: typeof STATIC_REVIEWS; c: typeof Colors.light }) {
  const rating = place.rating ?? 4.5;
  return (
    <View style={{ gap: 14 }}>
      <View style={[styles.ratingOverview, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.bigRating, { color: c.text }]}>{rating.toFixed(1)}</Text>
          <View style={{ flexDirection: "row", gap: 1 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <MaterialIcons key={i} name="star" size={12} color={i <= Math.round(rating) ? "#F5A524" : c.border} />
            ))}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {[5, 4, 3, 2, 1].map((s) => {
            const pct = s === 5 ? 70 : s === 4 ? 20 : s === 3 ? 6 : s === 2 ? 3 : 1;
            return (
              <View key={s} style={styles.ratingBar}>
                <Text style={[styles.ratingBarLabel, { color: c.secondaryText }]}>{s}</Text>
                <View style={[styles.ratingBarTrack, { backgroundColor: c.border }]}>
                  <View style={[styles.ratingBarFill, { width: `${pct}%` as any, backgroundColor: c.tint }]} />
                </View>
              </View>
            );
          })}
        </View>
      </View>
      {reviews.map((r, i) => (
        <View key={i} style={[styles.reviewCard, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
          <View style={styles.reviewHeader}>
            <View style={[styles.reviewAvatar, { backgroundColor: c.muted }]}>
              <Text style={[styles.reviewAvatarText, { color: c.heavy }]}>{r.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.reviewName, { color: c.text }]}>{r.name}</Text>
              <View style={{ flexDirection: "row", gap: 1 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <MaterialIcons key={s} name="star" size={11} color={s <= r.stars ? "#F5A524" : c.border} />
                ))}
              </View>
            </View>
          </View>
          <Text style={[styles.reviewText, { color: c.boldText }]}>{r.text}</Text>
        </View>
      ))}
      <Pressable style={[styles.writeReview, { borderColor: c.border, backgroundColor: c.cardBackground }]}>
        <Text style={[styles.writeReviewText, { color: c.text }]}>Write a review</Text>
      </Pressable>
    </View>
  );
}

function InfoTab({ place, c }: { place: any; c: typeof Colors.light }) {
  return (
    <View style={[styles.infoList, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
      <InfoListRow icon="place" label="Address" val={place.address ?? "—"} c={c} />
      <InfoListRow icon="access-time" label="Hours" val="Mon–Sun · 10am – 10pm" c={c} />
      <InfoListRow icon="phone" label="Phone" val="+60 12 345 6789" c={c} />
      <InfoListRow icon="attach-money" label="Price range" val={place.priceRange ?? "—"} c={c} last />
    </View>
  );
}

function InfoListRow({ icon, label, val, c, last }: {
  icon: keyof typeof MaterialIcons.glyphMap; label: string; val: string; c: typeof Colors.light; last?: boolean;
}) {
  return (
    <View style={[styles.infoListRow, !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.border }]}>
      <View style={[styles.infoListIcon, { backgroundColor: c.muted }]}>
        <MaterialIcons name={icon} size={15} color={c.heavy} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.infoListLabel, { color: c.secondaryText }]}>{label}</Text>
        <Text style={[styles.infoListVal, { color: c.text }]}>{val}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gallery: { position: "relative" },
  galleryImage: { width: "100%", height: 260 },
  galleryOverlay: {
    position: "absolute", top: 0, left: 0, right: 0,
    flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 14,
  },
  galleryBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 4, elevation: 3,
  },
  galleryDots: {
    position: "absolute", bottom: 14, alignSelf: "center",
    flexDirection: "row", gap: 6,
  },
  dot: { height: 6, borderRadius: 3 },
  dotActive: { width: 22, backgroundColor: "#fff" },
  dotInactive: { width: 6, backgroundColor: "rgba(255,255,255,0.6)" },
  galleryCounter: {
    position: "absolute", bottom: 14, right: 14,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99,
  },
  galleryCounterText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  thumbnailStrip: { backgroundColor: "transparent" },
  thumbnail: { borderRadius: 10, borderWidth: 2, padding: 1 },
  thumbnailImage: { width: 72, height: 56, borderRadius: 8 },
  headerCard: { padding: 18 },
  headerTopRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  placeName: { fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  placeMeta: { fontSize: 13, marginTop: 4 },
  ratingBlock: {
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1,
    alignItems: "center",
  },
  ratingBlockRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingBlockNum: { fontSize: 15, fontWeight: "800" },
  ratingBlockSub: { fontSize: 10, marginTop: 1 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 },
  statusText: { fontSize: 12, fontWeight: "700" },
  statusDivider: { fontSize: 12 },
  statusHours: { fontSize: 12 },
  categoriesRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 12 },
  catPill: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, borderWidth: 1,
  },
  catPillText: { fontSize: 11, fontWeight: "600" },
  actionsRow: { flexDirection: "row", gap: 8, marginTop: 14 },
  dirBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 6, paddingVertical: 14, borderRadius: 14,
  },
  dirBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  iconCircle: {
    width: 48, height: 48, borderRadius: 99, borderWidth: 1,
    alignItems: "center", justifyContent: "center",
  },
  tabBar: {
    flexDirection: "row", borderBottomWidth: StyleSheet.hairlineWidth, paddingHorizontal: 4,
  },
  tabItem: { flex: 1, alignItems: "center", paddingVertical: 12 },
  tabLabel: { fontSize: 13 },
  tabUnderline: { position: "absolute", bottom: 0, left: 8, right: 8, height: 2, borderRadius: 99 },
  tabContent: { padding: 16 },
  overviewSectionTitle: { fontSize: 15, fontWeight: "700" },
  overviewAbout: { fontSize: 13, lineHeight: 20 },
  infoBlock: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    padding: 14, borderRadius: 14, borderWidth: 1,
  },
  infoBlockLabel: { fontSize: 10, letterSpacing: 1, fontWeight: "600" },
  infoBlockVal: { fontSize: 16, fontWeight: "700", marginTop: 2 },
  priceDollar: { fontSize: 18, fontWeight: "800" },
  featuredOffer: { padding: 14, borderRadius: 14, borderWidth: 1, borderStyle: "dashed" },
  featuredOfferHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  featuredOfferTag: { fontSize: 11, fontWeight: "800", letterSpacing: 0.6 },
  featuredOfferTitle: { fontSize: 15, fontWeight: "700", marginTop: 4 },
  featuredOfferSub: { fontSize: 11, marginTop: 2 },
  moreOffers: { fontSize: 11, fontWeight: "700", marginTop: 8 },
  miniGrid: { flexDirection: "row", gap: 8 },
  miniCard: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1, gap: 2 },
  miniCardLabel: { fontSize: 9, letterSpacing: 0.8, fontWeight: "600" },
  miniCardVal: { fontSize: 13, fontWeight: "700", marginTop: 2 },
  emptyState: { padding: 32, alignItems: "center" },
  emptyTitle: { fontSize: 13 },
  emptySub: { fontSize: 12, marginTop: 4 },
  offerCard: { padding: 14, borderRadius: 14, borderWidth: 1 },
  offerCardTop: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  offerBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#EA580C", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6,
  },
  offerBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#fff" },
  offerBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  offerSub: { fontSize: 11 },
  offerTitle: { fontSize: 15, fontWeight: "700" },
  claimBtn: { marginTop: 10, padding: 8, borderRadius: 10, alignSelf: "flex-start", paddingHorizontal: 12 },
  claimBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  ratingOverview: {
    flexDirection: "row", alignItems: "center", gap: 14,
    padding: 14, borderRadius: 14, borderWidth: 1,
  },
  bigRating: { fontSize: 32, fontWeight: "800", letterSpacing: -1 },
  ratingBar: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 3 },
  ratingBarLabel: { fontSize: 10, width: 8 },
  ratingBarTrack: { flex: 1, height: 4, borderRadius: 99, overflow: "hidden" },
  ratingBarFill: { height: "100%", borderRadius: 99 },
  reviewCard: { padding: 14, borderRadius: 14, borderWidth: 1 },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  reviewAvatar: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: "center", justifyContent: "center",
  },
  reviewAvatarText: { fontSize: 12, fontWeight: "700" },
  reviewName: { fontSize: 13, fontWeight: "700" },
  reviewText: { fontSize: 13, lineHeight: 19, marginTop: 8 },
  writeReview: { padding: 12, borderRadius: 12, borderWidth: 1, alignItems: "center" },
  writeReviewText: { fontSize: 13, fontWeight: "700" },
  infoList: { borderRadius: 14, borderWidth: 1, overflow: "hidden" },
  infoListRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  infoListIcon: { width: 32, height: 32, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  infoListLabel: { fontSize: 11, fontWeight: "600" },
  infoListVal: { fontSize: 13, fontWeight: "600", marginTop: 1 },
  bottomBar: {
    flexDirection: "row", padding: 12, borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: "center", gap: 10,
  },
  reviewInput: {
    flex: 1, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14,
  },
  postBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 },
  postBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});

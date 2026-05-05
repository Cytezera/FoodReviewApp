import { Colors } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

// ---------- types ----------

export type RestaurantOffer = {
  tag: string;
  title: string;
  sub: string;
};

export type RestaurantReview = {
  name: string;
  stars: number;
  text: string;
};

export type RestaurantPreview = {
  name: string;
  image?: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
  address?: string;
  distance?: string;
  status?: string;
  hours?: string;
  phone?: string;
  cuisine?: string;
  promo?: string;
  promoTag?: string;
  description?: string;
  categories?: string[];
  offers?: RestaurantOffer[];
  reviews?: RestaurantReview[];
};

// ---------- fallback data ----------

const FALLBACK_REVIEWS: RestaurantReview[] = [
  { name: "Sara K.",   stars: 5, text: "Cozy spot, the food was amazing. Promo was easy to claim." },
  { name: "Marcus R.", stars: 4, text: "Solid food, slightly slow at lunch. Worth it for the deal." },
  { name: "Priya N.",  stars: 5, text: "Their seasonal menu changes every month — always worth checking." },
];

// ---------- constants ----------

const c = Colors.light;
type TabKey = "overview" | "offers" | "reviews" | "info";

// ---------- component ----------

type Props = {
  place: RestaurantPreview | null;
  onClose: () => void;
};

export function RestaurantModal({ place, onClose }: Props) {
  const { height: screenHeight } = useWindowDimensions();
  const [tab, setTab] = useState<TabKey>("overview");
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (place) {
      setTab("overview");
      setGalleryIdx(0);
      setSaved(false);
    }
  }, [place?.name]);

  const gallery = place?.images?.length
    ? place.images
    : place?.image
    ? [place.image]
    : [];
  const offers  = place?.offers   ?? [];
  const reviews = place?.reviews  ?? FALLBACK_REVIEWS;
  const cats    = place?.categories ?? [];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "offers",   label: offers.length ? `Offers · ${offers.length}` : "Offers" },
    { key: "reviews",  label: "Reviews" },
    { key: "info",     label: "Info" },
  ];

  return (
    <Modal
      visible={!!place}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* overlay — tapping dark area closes */}
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* sheet — inner presses should not propagate to overlay */}
        <View
          style={[styles.sheet, { height: screenHeight * 0.92 }]}
          onStartShouldSetResponder={() => true}
        >
          {!place ? null : (
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

              {/* ── HERO GALLERY ── */}
              <View style={styles.gallery}>
                {gallery.length > 0 ? (
                  <Image source={{ uri: gallery[galleryIdx] }} style={styles.galleryImg} />
                ) : (
                  <View style={[styles.galleryImg, styles.galleryPlaceholder]}>
                    <MaterialIcons name="restaurant" size={56} color={c.border} />
                  </View>
                )}

                {/* close */}
                <TouchableOpacity style={[styles.galleryBtn, { right: 14 }]} onPress={onClose}>
                  <MaterialIcons name="close" size={18} color={c.text} />
                </TouchableOpacity>

                {/* save */}
                <TouchableOpacity
                  style={[styles.galleryBtn, { right: 58 }]}
                  onPress={() => setSaved((s) => !s)}
                >
                  <MaterialIcons
                    name={saved ? "bookmark" : "bookmark-border"}
                    size={18}
                    color={saved ? c.heavy : c.text}
                  />
                </TouchableOpacity>

                {/* promo badge */}
                {place.promoTag && (
                  <View style={styles.galleryPromo}>
                    <View style={styles.promoDot} />
                    <Text style={styles.promoBadgeText}>{place.promoTag}</Text>
                  </View>
                )}

                {/* dot indicators */}
                {gallery.length > 1 && (
                  <View style={styles.galleryDots}>
                    {gallery.map((_, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => setGalleryIdx(i)}
                        style={[styles.dot, i === galleryIdx && styles.dotActive]}
                      />
                    ))}
                  </View>
                )}

                {/* counter */}
                {gallery.length > 1 && (
                  <View style={styles.galleryCounter}>
                    <Text style={styles.galleryCounterText}>
                      {galleryIdx + 1} / {gallery.length}
                    </Text>
                  </View>
                )}
              </View>

              {/* ── THUMBNAIL STRIP ── */}
              {gallery.length > 1 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbStrip}
                >
                  {gallery.map((img, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => setGalleryIdx(i)}
                      style={[styles.thumbWrap, i === galleryIdx && styles.thumbWrapActive]}
                    >
                      <Image source={{ uri: img }} style={styles.thumb} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              {/* ── HEADER INFO ── */}
              <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{place.name}</Text>
                  <Text style={styles.metaLine}>
                    {[place.cuisine, place.priceRange, place.distance && `${place.distance} away`]
                      .filter(Boolean)
                      .join(" · ")}
                  </Text>
                </View>
                {place.rating != null && (
                  <View style={styles.ratingBox}>
                    <View style={styles.ratingInner}>
                      <MaterialIcons name="star" size={13} color="#F5A524" />
                      <Text style={styles.ratingScore}>{place.rating}</Text>
                    </View>
                    {place.reviewCount != null && (
                      <Text style={styles.reviewCountText}>{place.reviewCount} reviews</Text>
                    )}
                  </View>
                )}
              </View>

              {/* ── STATUS ROW ── */}
              {place.status ? (
                <View style={styles.statusRow}>
                  <Text
                    style={[
                      styles.statusText,
                      { color: place.status === "open" ? c.success : c.error },
                    ]}
                  >
                    ● {place.status === "open" ? "Open now" : "Closed"}
                  </Text>
                  {place.hours ? (
                    <>
                      <Text style={styles.statusDot}>·</Text>
                      <Text style={styles.hoursText}>{place.hours}</Text>
                    </>
                  ) : null}
                </View>
              ) : null}

              {/* ── CATEGORIES ── */}
              {cats.length > 0 && (
                <View style={styles.catsRow}>
                  {cats.map((cat) => (
                    <View key={cat} style={styles.catChip}>
                      <Text style={styles.catChipText}>{cat}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* ── QUICK ACTIONS ── */}
              <View style={styles.quickActions}>
                <TouchableOpacity style={styles.dirBtn}>
                  <MaterialIcons name="place" size={16} color="#fff" />
                  <Text style={styles.dirBtnText}>Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleBtn}>
                  <MaterialIcons name="share" size={18} color={c.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleBtn}>
                  <MaterialIcons name="favorite-border" size={18} color={c.text} />
                </TouchableOpacity>
              </View>

              {/* ── TABS ── */}
              <View style={styles.tabBar}>
                {tabs.map(({ key, label }) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.tabBtn}
                    onPress={() => setTab(key)}
                  >
                    <Text style={[styles.tabLabel, tab === key && styles.tabLabelActive]}>
                      {label}
                    </Text>
                    {tab === key && <View style={styles.tabUnderline} />}
                  </TouchableOpacity>
                ))}
              </View>

              {/* ── TAB CONTENT ── */}
              <View style={styles.tabContent}>
                {tab === "overview" && (
                  <OverviewTab place={place} offers={offers} onShowOffers={() => setTab("offers")} />
                )}
                {tab === "offers" && <OffersTab offers={offers} />}
                {tab === "reviews" && (
                  <ReviewsTab
                    rating={place.rating ?? 0}
                    reviewCount={place.reviewCount ?? reviews.length * 80}
                    reviews={reviews}
                  />
                )}
                {tab === "info" && <InfoTab place={place} />}
              </View>

            </ScrollView>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

// ─────────────────────────── Sub-tabs ───────────────────────────

function OverviewTab({
  place,
  offers,
  onShowOffers,
}: {
  place: RestaurantPreview;
  offers: RestaurantOffer[];
  onShowOffers: () => void;
}) {
  const priceLevel = (place.priceRange?.match(/\$/g) ?? []).length;

  return (
    <View style={{ gap: 12 }}>
      {/* About */}
      <View>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={[styles.aboutText, !place.description && styles.aboutTextEmpty]}>
          {place.description ?? "This restaurant has not set an about."}
        </Text>
      </View>

      {/* Price range strip */}
      {place.priceRange ? (
        <View style={styles.priceCard}>
          <View>
            <Text style={styles.priceLabel}>PRICE RANGE</Text>
            <Text style={styles.priceValue}>{place.priceRange}</Text>
          </View>
          <View style={styles.priceDollars}>
            {["$", "$", "$", "$"].map((s, i) => (
              <Text
                key={i}
                style={[
                  styles.priceDollar,
                  { color: i < priceLevel ? c.heavy : c.border },
                ]}
              >
                {s}
              </Text>
            ))}
          </View>
        </View>
      ) : null}

      {/* Featured offer */}
      {offers[0] ? (
        <TouchableOpacity style={styles.featuredOffer} onPress={onShowOffers}>
          <View style={styles.featuredOfferHeader}>
            <MaterialIcons name="card-giftcard" size={16} color={c.heavy} />
            <Text style={styles.featuredOfferLabel}>FEATURED OFFER</Text>
          </View>
          <Text style={styles.featuredOfferTitle}>{offers[0].title}</Text>
          <Text style={styles.featuredOfferSub}>{offers[0].sub}</Text>
          {offers.length > 1 && (
            <Text style={styles.featuredOfferMore}>
              +{offers.length - 1} more offer{offers.length > 2 ? "s" : ""} →
            </Text>
          )}
        </TouchableOpacity>
      ) : null}

      {/* Mini info grid */}
      <View style={styles.miniGrid}>
        {place.hours ? (
          <View style={styles.miniCard}>
            <View style={styles.miniCardHeader}>
              <MaterialIcons name="schedule" size={13} color={c.heavy} />
              <Text style={styles.miniCardLabel}>HOURS</Text>
            </View>
            <Text style={styles.miniCardVal}>{place.status === "open" ? "Open now" : "Closed"}</Text>
          </View>
        ) : null}
        {place.distance ? (
          <View style={styles.miniCard}>
            <View style={styles.miniCardHeader}>
              <MaterialIcons name="place" size={13} color={c.heavy} />
              <Text style={styles.miniCardLabel}>DISTANCE</Text>
            </View>
            <Text style={styles.miniCardVal}>{place.distance}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function OffersTab({ offers }: { offers: RestaurantOffer[] }) {
  if (offers.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No active offers right now.</Text>
        <Text style={styles.emptySub}>Check back later or set an alert.</Text>
      </View>
    );
  }
  return (
    <View style={{ gap: 10 }}>
      {offers.map((o, i) => (
        <View key={i} style={styles.offerCard}>
          <View style={styles.offerTopRow}>
            <View style={styles.offerBadge}>
              <View style={styles.promoDot} />
              <Text style={styles.promoBadgeText}>{o.tag}</Text>
            </View>
            <Text style={styles.offerSub}>· {o.sub}</Text>
          </View>
          <Text style={styles.offerTitle}>{o.title}</Text>
          {/* <TouchableOpacity style={styles.claimBtn}> */}
            {/* <Text style={styles.claimBtnText}>Claim offer</Text> */}
          {/* </TouchableOpacity> */}
        </View>
      ))}
    </View>
  );
}

function ReviewsTab({
  rating,
  reviewCount,
  reviews,
}: {
  rating: number;
  reviewCount: number;
  reviews: RestaurantReview[];
}) {
  const BARS = [
    { stars: 5, pct: 70 },
    { stars: 4, pct: 20 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 3 },
    { stars: 1, pct: 1 },
  ];
  return (
    <View style={{ gap: 14 }}>
      {/* Summary */}
      <View style={styles.reviewSummary}>
        <View style={styles.reviewBigRating}>
          <Text style={styles.reviewBigScore}>{rating || "–"}</Text>
          <View style={styles.reviewStarRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <MaterialIcons
                key={i}
                name="star"
                size={11}
                color={i <= Math.round(rating) ? "#F5A524" : c.border}
              />
            ))}
          </View>
          <Text style={styles.reviewCountSmall}>{reviewCount} reviews</Text>
        </View>
        <View style={{ flex: 1, gap: 3 }}>
          {BARS.map(({ stars, pct }) => (
            <View key={stars} style={styles.barRow}>
              <Text style={styles.barLabel}>{stars}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${pct}%` as any }]} />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Review cards */}
      {reviews.map((r, i) => (
        <View key={i} style={styles.reviewCard}>
          <View style={styles.reviewCardTop}>
            <View style={styles.reviewAvatar}>
              <Text style={styles.reviewAvatarText}>
                {r.name.split(" ").map((w) => w[0]).join("")}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.reviewName}>{r.name}</Text>
              <View style={styles.reviewStarRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <MaterialIcons
                    key={i}
                    name="star"
                    size={11}
                    color={i <= r.stars ? "#F5A524" : c.border}
                  />
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.reviewText}>{r.text}</Text>
        </View>
      ))}

      {/* Write review CTA */}
      <TouchableOpacity style={styles.writeReviewBtn}>
        <Text style={styles.writeReviewText}>Write a review</Text>
      </TouchableOpacity>
    </View>
  );
}

function InfoTab({ place }: { place: RestaurantPreview }) {
  const rows = (
    [
      { icon: "place"    as const, label: "Address",     val: place.address },
      { icon: "schedule" as const, label: "Hours",       val: place.hours },
      { icon: "phone"    as const, label: "Phone",       val: place.phone },
      { icon: "sell"     as const, label: "Price range", val: place.priceRange },
    ] as { icon: keyof typeof MaterialIcons.glyphMap; label: string; val?: string }[]
  ).filter((r) => r.val);

  if (rows.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No info available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.infoCard}>
      {rows.map((row, i) => (
        <View
          key={row.label}
          style={[styles.infoRow, i < rows.length - 1 && styles.infoRowBorder]}
        >
          <View style={styles.infoIconWrap}>
            <MaterialIcons name={row.icon} size={15} color={c.heavy} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoVal}>{row.val}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// ─────────────────────────── Styles ───────────────────────────

const GALLERY_H = 240;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: c.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },

  // gallery
  gallery: { height: GALLERY_H, position: "relative" },
  galleryImg: { width: "100%", height: GALLERY_H },
  galleryPlaceholder: { backgroundColor: c.muted, alignItems: "center", justifyContent: "center" },
  galleryBtn: {
    position: "absolute",
    top: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  galleryPromo: {
    position: "absolute",
    left: 14,
    bottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: c.heavy,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  galleryDots: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  dotActive: { width: 22, backgroundColor: "#fff" },
  galleryCounter: {
    position: "absolute",
    bottom: 14,
    right: 14,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  galleryCounterText: { color: "#fff", fontSize: 11, fontWeight: "600" },

  // thumbnails
  thumbStrip: { paddingHorizontal: 18, paddingTop: 12, gap: 8 },
  thumbWrap: { borderRadius: 10, borderWidth: 2, borderColor: "transparent", padding: 1 },
  thumbWrapActive: { borderColor: c.heavy },
  thumb: { width: 72, height: 56, borderRadius: 8 },

  // header
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  name: { fontSize: 24, fontWeight: "800", color: c.text, letterSpacing: -0.5 },
  metaLine: { fontSize: 13, color: c.secondaryText, marginTop: 4 },
  ratingBox: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: c.heavyMuted,
    borderWidth: 1,
    borderColor: c.heavyBorder,
    alignItems: "center",
  },
  ratingInner: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingScore: { fontSize: 14, fontWeight: "800", color: c.text },
  reviewCountText: { fontSize: 10, color: c.secondaryText, marginTop: 1 },

  // status
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    marginTop: 10,
  },
  statusText: { fontSize: 12, fontWeight: "700" },
  statusDot: { fontSize: 12, color: c.secondaryText },
  hoursText: { fontSize: 12, color: c.secondaryText },

  // categories
  catsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingHorizontal: 18,
    marginTop: 12,
  },
  catChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: c.cardBackground,
    borderWidth: 1,
    borderColor: c.border,
  },
  catChipText: { fontSize: 11, fontWeight: "600", color: c.boldText },

  // quick actions
  quickActions: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 4,
  },
  dirBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: c.heavy,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dirBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  circleBtn: {
    width: 48,
    height: 48,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  // tabs
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    paddingHorizontal: 18,
    marginTop: 4,
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: "relative",
  },
  tabLabel: { fontSize: 13, fontWeight: "700", color: c.secondaryText },
  tabLabelActive: { color: c.heavy },
  tabUnderline: {
    position: "absolute",
    bottom: -1,
    left: 12,
    right: 12,
    height: 2,
    borderRadius: 2,
    backgroundColor: c.heavy,
  },
  tabContent: { padding: 16, paddingHorizontal: 18, paddingBottom: 40 },

  // overview
  sectionTitle: { fontSize: 15, fontWeight: "700", color: c.text, marginBottom: 6 },
  aboutText: { fontSize: 13, lineHeight: 20, color: c.boldText },
  aboutTextEmpty: { color: c.secondaryText, fontStyle: "italic" },
  priceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: c.cardBackground,
    borderWidth: 1,
    borderColor: c.border,
  },
  priceLabel: {
    fontSize: 11,
    color: c.secondaryText,
    letterSpacing: 1,
    fontWeight: "600",
  },
  priceValue: { fontSize: 16, fontWeight: "700", color: c.text, marginTop: 2 },
  priceDollars: { flexDirection: "row", gap: 4 },
  priceDollar: { fontSize: 18, fontWeight: "800" },
  featuredOffer: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: c.heavyMuted,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: c.heavyBorder,
    gap: 4,
  },
  featuredOfferHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  featuredOfferLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: c.heavy,
    letterSpacing: 0.6,
  },
  featuredOfferTitle: { fontSize: 15, fontWeight: "700", color: c.text },
  featuredOfferSub: { fontSize: 11, color: c.secondaryText },
  featuredOfferMore: { fontSize: 11, fontWeight: "700", color: c.heavy, marginTop: 4 },
  miniGrid: { flexDirection: "row", gap: 8 },
  miniCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: c.cardBackground,
    borderWidth: 1,
    borderColor: c.border,
    gap: 4,
  },
  miniCardHeader: { flexDirection: "row", alignItems: "center", gap: 4 },
  miniCardLabel: {
    fontSize: 10,
    color: c.secondaryText,
    letterSpacing: 0.8,
    fontWeight: "600",
  },
  miniCardVal: { fontSize: 13, fontWeight: "700", color: c.text },

  // offers
  offerCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: c.cardBackground,
    borderWidth: 1,
    borderColor: c.heavyBorder,
    gap: 6,
  },
  offerTopRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  offerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: c.heavy,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  offerSub: { fontSize: 11, color: c.secondaryText },
  offerTitle: { fontSize: 15, fontWeight: "700", color: c.text },
  claimBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: c.heavy,
    marginTop: 4,
  },
  claimBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" },

  // reviews
  reviewSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 14,
    backgroundColor: c.cardBackground,
    borderWidth: 1,
    borderColor: c.border,
  },
  reviewBigRating: { alignItems: "center" },
  reviewBigScore: {
    fontSize: 32,
    fontWeight: "800",
    color: c.text,
    letterSpacing: -1,
  },
  reviewStarRow: { flexDirection: "row", gap: 1, marginTop: 2 },
  reviewCountSmall: { fontSize: 10, color: c.secondaryText, marginTop: 2 },
  barRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  barLabel: { fontSize: 10, width: 8, color: c.secondaryText },
  barTrack: {
    flex: 1,
    height: 4,
    borderRadius: 99,
    backgroundColor: c.border,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 99, backgroundColor: c.tint },
  reviewCard: {
    padding: 14,
    backgroundColor: c.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: c.border,
    gap: 8,
  },
  reviewCardTop: { flexDirection: "row", alignItems: "center", gap: 8 },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: c.heavyMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarText: { fontSize: 12, fontWeight: "700", color: c.heavy },
  reviewName: { fontSize: 13, fontWeight: "700", color: c.text },
  reviewText: { fontSize: 13, color: c.boldText, lineHeight: 19 },
  writeReviewBtn: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.cardBackground,
    alignItems: "center",
  },
  writeReviewText: { fontSize: 13, fontWeight: "700", color: c.text },

  // info
  infoCard: {
    borderRadius: 14,
    backgroundColor: c.cardBackground,
    borderWidth: 1,
    borderColor: c.border,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: c.border },
  infoIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: c.heavyMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: { fontSize: 11, color: c.secondaryText, fontWeight: "600" },
  infoVal: { fontSize: 13, fontWeight: "600", color: c.text, marginTop: 1 },

  // shared badge bits
  promoDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#fff" },
  promoBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },

  // empty state
  emptyState: { paddingVertical: 32, alignItems: "center" },
  emptyTitle: { fontSize: 13, color: c.secondaryText },
  emptySub: { fontSize: 12, color: c.border, marginTop: 4 },
});

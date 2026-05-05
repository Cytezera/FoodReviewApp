import { RestaurantModal, RestaurantPreview } from "@/components/ui/RestaurantModal";
import { Colors } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

type WheelPlace = {
  id: string;
  label: string; // short label shown on the wheel segment
  name: string;
  priceRange: string;
  address: string;
  rating: number;
  status: string;
  image: string;
};

const STATIC_PLACES: WheelPlace[] = [
  { id: "1", label: "Burger",  name: "Burger Joint",  priceRange: "$$",  address: "12 Main St",    rating: 4.8, status: "open",   image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
  { id: "2", label: "Sushi",   name: "Sushi Ko",      priceRange: "$$$", address: "8 River Rd",    rating: 4.9, status: "open",   image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400" },
  { id: "3", label: "Pizza",   name: "Mama's Pizza",  priceRange: "$$",  address: "45 Oak Ave",    rating: 4.5, status: "open",   image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
  { id: "4", label: "Salad",   name: "Green Bowl",    priceRange: "$$",  address: "3 Park Lane",   rating: 4.9, status: "open",   image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
  { id: "5", label: "Taco",    name: "Taco Fiesta",   priceRange: "$",   address: "77 Spice St",   rating: 4.2, status: "closed", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400" },
  { id: "6", label: "Noodle",  name: "Noodl Bar",     priceRange: "$$",  address: "22 Broth Blvd", rating: 4.7, status: "open",   image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400" },
];

// Placeholder suggestions — will be replaced with backend data later
const FIXED_SUGGESTIONS: WheelPlace[] = [
  { id: "s1",  label: "McDonald's",  name: "McDonald's",    priceRange: "$",   address: "Various locations", rating: 3.8, status: "open", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400" },
  { id: "s2",  label: "KFC",         name: "KFC",           priceRange: "$",   address: "Various locations", rating: 3.9, status: "open", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400" },
  { id: "s3",  label: "Burger King", name: "Burger King",   priceRange: "$",   address: "Various locations", rating: 3.7, status: "open", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
  { id: "s4",  label: "Subway",      name: "Subway",        priceRange: "$",   address: "Various locations", rating: 3.8, status: "open", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400" },
  { id: "s5",  label: "Pizza Hut",   name: "Pizza Hut",     priceRange: "$$",  address: "Various locations", rating: 3.9, status: "open", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
  { id: "s6",  label: "Domino's",    name: "Domino's",      priceRange: "$$",  address: "Various locations", rating: 4.0, status: "open", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
  { id: "s7",  label: "Popeyes",     name: "Popeyes",       priceRange: "$",   address: "Various locations", rating: 4.1, status: "open", image: "https://images.unsplash.com/photo-1626093136544-42c7f5db70e9?w=400" },
  { id: "s8",  label: "Shake Shack", name: "Shake Shack",   priceRange: "$$",  address: "Various locations", rating: 4.3, status: "open", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400" },
  { id: "s9",  label: "Five Guys",   name: "Five Guys",     priceRange: "$$",  address: "Various locations", rating: 4.4, status: "open", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400" },
  { id: "s10", label: "Wendy's",     name: "Wendy's",       priceRange: "$",   address: "Various locations", rating: 3.8, status: "open", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400" },
  { id: "s11", label: "Chipotle",    name: "Chipotle",      priceRange: "$$",  address: "Various locations", rating: 4.1, status: "open", image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=400" },
  { id: "s12", label: "Taco Bell",   name: "Taco Bell",     priceRange: "$",   address: "Various locations", rating: 3.6, status: "open", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400" },
  { id: "s13", label: "Panda",       name: "Panda Express", priceRange: "$",   address: "Various locations", rating: 3.7, status: "open", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400" },
  { id: "s14", label: "Chick-fil-A", name: "Chick-fil-A",   priceRange: "$",   address: "Various locations", rating: 4.5, status: "open", image: "https://images.unsplash.com/photo-1626093136544-42c7f5db70e9?w=400" },
  { id: "s15", label: "Nando's",     name: "Nando's",       priceRange: "$$",  address: "Various locations", rating: 4.3, status: "open", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400" },
  { id: "s16", label: "Tim Hortons", name: "Tim Hortons",   priceRange: "$",   address: "Various locations", rating: 3.9, status: "open", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" },
];

const { width } = Dimensions.get("window");
const WHEEL_SIZE = 300;
const c = Colors.light;
const COLORS = ["#F97316", "#FB923C", "#EA580C"]; // Orange-500, Orange-400, Orange-600

export default function SpinToEat() {
  const [segments, setSegments] = useState<WheelPlace[]>(STATIC_PLACES);
  const wheelAngle = 360 / segments.length;

  const [editVisible, setEditVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customInput, setCustomInput] = useState("");

  const currentAngle = useRef(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const uiTranslate = useRef(new Animated.Value(0)).current;
  const uiOpacity = useRef(new Animated.Value(1)).current;

  const [spinning, setSpinning] = useState(false);
  const [recent, setRecent] = useState<WheelPlace[]>([]);
  const [winner, setWinner] = useState<WheelPlace | null>(null);
  const [detailPlace, setDetailPlace] = useState<RestaurantPreview | null>(null);

  // --- segment management ---

  const addSegment = (place: WheelPlace) => {
    if (segments.find((s) => s.id === place.id)) return;
    setSegments((prev) => [...prev, place]);
  };

  const removeSegment = (id: string) => {
    if (segments.length <= 2) return;
    setSegments((prev) => prev.filter((s) => s.id !== id));
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    addSegment({
      id: `custom_${Date.now()}`,
      label: trimmed,
      name: trimmed,
      priceRange: "",
      address: "",
      rating: 0,
      status: "unknown",
      image: "",
    });
    setCustomInput("");
  };

  const filteredSuggestions = FIXED_SUGGESTIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !segments.find((seg) => seg.id === s.id)
  );

  // --- spin logic ---

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    Animated.parallel([
      Animated.timing(uiTranslate, {
        toValue: 80,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(uiOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(startSpin);
  };

  const startSpin = () => {
    const winningIndex = Math.floor(Math.random() * segments.length);
    const segAngle = 360 / segments.length;

    // Pointer is at 12 o'clock (270° in SVG coords where 0° = 3 o'clock).
    // Center of segment i sits at (i + 0.5) * segAngle from 0°.
    // Rotate until that center aligns with 270°.
    const targetAngle = ((270 - (winningIndex + 0.5) * segAngle) % 360 + 360) % 360;
    const currentVisual = ((currentAngle.current % 360) + 360) % 360;
    const delta = ((targetAngle - currentVisual) + 360) % 360 || 360;
    const finalAngle = currentAngle.current + delta + 360 * 6;

    currentAngle.current = finalAngle;
    setWinner(segments[winningIndex]);

    Animated.timing(rotation, {
      toValue: finalAngle,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => finishSpin());
  };

  const finishSpin = () => {
    Animated.parallel([
      Animated.timing(uiTranslate, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(uiOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setSpinning(false));
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const arc = (start: number, end: number, r: number) => {
    const rad = (d: number) => (Math.PI * d) / 180;
    const x1 = r + r * Math.cos(rad(start));
    const y1 = r + r * Math.sin(rad(start));
    const x2 = r + r * Math.cos(rad(end));
    const y2 = r + r * Math.sin(rad(end));
    return `M${r},${r} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z`;
  };

  // --- render ---

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spin to Eat</Text>
        {!spinning && (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditVisible(true)}
          >
            <MaterialIcons name="edit" size={18} color="#f45925" />
            <Text style={styles.editBtnText}>Edit Wheel</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* WHEEL */}
        <View style={styles.wheelArea}>
          <View style={styles.pointer}>
            <MaterialIcons name="arrow-drop-down" size={36} color="#f45925" />
          </View>

          <Animated.View style={{ transform: [{ rotate }] }}>
            <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
              {segments.map((s, i) => {
                const start = i * wheelAngle;
                const mid = (i + 0.5) * wheelAngle;
                const midRad = (mid * Math.PI) / 180;
                const r = WHEEL_SIZE / 2;
                const textR = r * 0.62;
                const tx = r + textR * Math.cos(midRad);
                const ty = r + textR * Math.sin(midRad);
                return (
                  <G key={s.id}>
                    <Path
                      d={arc(start, start + wheelAngle, r)}
                      fill={COLORS[i % 3]}
                    />
                    <SvgText
                      x={tx}
                      y={ty}
                      fill="#fff"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                      rotation={mid + 90}
                      origin={`${tx},${ty}`}
                    >
                      {s.label}
                    </SvgText>
                  </G>
                );
              })}
            </Svg>
            <View style={styles.center}>
              <MaterialIcons name="restaurant" size={32} color="#f45925" />
            </View>
          </Animated.View>
        </View>

        {/* BELOW WHEEL */}
        <Animated.View
          style={[
            styles.ui,
            { transform: [{ translateY: uiTranslate }], opacity: uiOpacity },
          ]}
        >
          <Text style={styles.title}>What are we eating?</Text>
          <Text style={styles.subtitle}>Spin the wheel to decide your destiny</Text>

          <TouchableOpacity
            style={styles.spinButton}
            onPress={spin}
            disabled={spinning}
          >
            <Text style={styles.spinText}>
              {spinning ? "SPINNING…" : "SPIN NOW"}
            </Text>
          </TouchableOpacity>

          {winner && (
            <View style={styles.winnerWrapper}>
              <Text style={styles.section}>Winner 🎉</Text>
              <View style={styles.winnerCard}>
                <View style={styles.row}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: winner.image }}
                      style={styles.winnerImage}
                    />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.winner_title} numberOfLines={1}>
                      {winner.name}
                    </Text>
                    <Text style={styles.winner_subtitle} numberOfLines={1}>
                      {winner.priceRange} • {winner.address}
                    </Text>
                    <View style={styles.meta}>
                      <Text style={styles.winner_rating}>⭐ {winner.rating}</Text>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.status}>{winner.status}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.primaryBtn}>
                    <Text style={styles.primaryText}>Navigate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => setDetailPlace({ name: winner.name, image: winner.image, rating: winner.rating, priceRange: winner.priceRange, address: winner.address, status: winner.status })}
                  >
                    <Text style={styles.secondaryText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <Text style={styles.section}>Recent Winners</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {recent.map((r, i) => (
              <TouchableOpacity key={i} style={styles.card} onPress={() => setDetailPlace({ name: r.name, image: r.image, rating: r.rating, priceRange: r.priceRange, status: r.status })}>
                <Image
                  source={{ uri: r.image }}
                  style={styles.image}
                />
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={14} color={c.tint} />
                  <Text>{r.rating}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{r.name}</Text>
                  <Text style={styles.cardSub}>{r.priceRange} • {r.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </ScrollView>

      {/* EDIT WHEEL MODAL */}
      <Modal
        visible={editVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalSheet}
          >
            {/* drag handle */}
            <View style={styles.dragHandle} />

            {/* header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Wheel</Text>
              <TouchableOpacity onPress={() => setEditVisible(false)}>
                <MaterialIcons name="close" size={24} color={c.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* current segments */}
              <Text style={styles.modalSectionLabel}>
                On Wheel{" "}
                <Text style={styles.modalSectionHint}>
                  (min 2)
                </Text>
              </Text>
              <View style={styles.chipRow}>
                {segments.map((s) => (
                  <View key={s.id} style={styles.chip}>
                    <Text style={styles.chipText}>{s.label}</Text>
                    <TouchableOpacity
                      onPress={() => removeSegment(s.id)}
                      disabled={segments.length <= 2}
                    >
                      <MaterialIcons
                        name="close"
                        size={14}
                        color={segments.length <= 2 ? c.border : c.text}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <View style={styles.divider} />

              {/* suggested restaurants */}
              <Text style={styles.modalSectionLabel}>Suggested Restaurants</Text>
              <Text style={styles.suggestionsHint}>
                Curated list — more suggestions coming soon
              </Text>

              <View style={styles.searchRow}>
                <MaterialIcons name="search" size={18} color={c.secondaryText} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search restaurants..."
                  placeholderTextColor={c.secondaryText}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              {filteredSuggestions.length === 0 ? (
                <Text style={styles.emptyHint}>
                  {searchQuery ? "No matches" : "All suggestions already on wheel"}
                </Text>
              ) : (
                filteredSuggestions.map((s) => (
                  <TouchableOpacity
                    key={s.id}
                    style={styles.suggestionRow}
                    onPress={() => addSegment(s)}
                  >
                    <Text style={styles.suggestionText}>{s.name}</Text>
                    <MaterialIcons name="add-circle-outline" size={22} color={c.heavy} />
                  </TouchableOpacity>
                ))
              )}

              <View style={styles.divider} />

              {/* manual entry */}
              <Text style={styles.modalSectionLabel}>Add Your Own</Text>
              <View style={styles.customNotice}>
                <MaterialIcons name="info-outline" size={14} color={c.tint} />
                <Text style={styles.customNoticeText}>
                  You're adding this yourself — not a verified restaurant
                </Text>
              </View>
              <View style={styles.customRow}>
                <TextInput
                  style={styles.customInput}
                  placeholder="e.g. Grandma's Kitchen"
                  placeholderTextColor={c.secondaryText}
                  value={customInput}
                  onChangeText={setCustomInput}
                  onSubmitEditing={addCustom}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  style={[
                    styles.customAddBtn,
                    !customInput.trim() && styles.customAddBtnDisabled,
                  ]}
                  onPress={addCustom}
                  disabled={!customInput.trim()}
                >
                  <Text style={styles.customAddText}>Add</Text>
                </TouchableOpacity>
              </View>

              <View style={{ height: 32 }} />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <RestaurantModal place={detailPlace} onClose={() => setDetailPlace(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.background },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontWeight: "700", fontSize: 18, color: c.text },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: c.heavyMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.heavyBorder,
  },
  editBtnText: {
    color: c.heavy,
    fontWeight: "700",
    fontSize: 13,
  },

  wheelArea: { alignItems: "center", marginTop: 8 },
  pointer: { position: "absolute", top: -12, zIndex: 10 },
  center: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: c.background,
    alignItems: "center",
    justifyContent: "center",
    left: WHEEL_SIZE / 2 - 35,
    top: WHEEL_SIZE / 2 - 35,
  },

  ui: { alignItems: "center", paddingTop: 16 },
  title: { fontSize: 28, fontWeight: "800", color: c.text },
  subtitle: { color: c.secondaryText, marginBottom: 20 },

  spinButton: {
    backgroundColor: c.heavy,
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 999,
    marginBottom: 24,
  },
  spinText: { color: c.background, fontWeight: "900", fontSize: 16 },

  section: {
    alignSelf: "flex-start",
    marginLeft: 16,
    marginBottom: 12,
    fontWeight: "700",
    fontSize: 18,
    color: c.text,
  },

  card: {
    width: 200,
    backgroundColor: c.background,
    borderRadius: 16,
    marginLeft: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: 120 },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: c.background,
    borderRadius: 12,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  cardBody: { padding: 10 },
  cardTitle: { fontWeight: "700", color: c.text },
  cardSub: { color: c.secondaryText, fontSize: 12 },

  winnerWrapper: { alignItems: "center", marginBottom: 32 },
  winnerCard: {
    width: width * 0.9,
    borderRadius: 32,
    backgroundColor: c.background,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  row: { flexDirection: "row", gap: 12 },
  imageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: c.border,
  },
  winnerImage: { width: "100%", height: "100%" },
  details: { flex: 1, justifyContent: "space-between" },
  winner_title: { fontSize: 18, fontWeight: "700", color: c.text },
  winner_subtitle: { fontSize: 14, color: c.secondaryText, marginTop: 4 },
  meta: { flexDirection: "row", gap: 6, marginTop: 6 },
  winner_rating: { fontWeight: "600", color: c.text },
  dot: { color: c.border },
  status: { fontWeight: "600", color: c.success },
  actions: { flexDirection: "row", gap: 12, marginTop: 16 },
  primaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: 24,
    backgroundColor: c.buttonBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { color: c.buttonText, fontWeight: "700" },
  secondaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: 24,
    backgroundColor: c.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: { fontWeight: "700", color: c.text },

  // modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: c.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    paddingTop: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: c.border,
    alignSelf: "center",
    marginBottom: 12,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "800", color: c.text },

  modalSectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: c.text,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  modalSectionHint: {
    fontSize: 12,
    fontWeight: "400",
    color: c.secondaryText,
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: c.heavyMuted,
    borderWidth: 1,
    borderColor: c.heavyBorder,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: { fontSize: 13, fontWeight: "600", color: c.heavy },

  divider: {
    height: 1,
    backgroundColor: c.border,
    marginHorizontal: 16,
    marginVertical: 16,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: c.muted,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: c.text,
  },

  suggestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  suggestionText: { fontSize: 15, color: c.text },

  emptyHint: {
    textAlign: "center",
    color: c.secondaryText,
    fontSize: 13,
    paddingVertical: 16,
  },

  suggestionsHint: {
    fontSize: 12,
    color: c.secondaryText,
    marginBottom: 8,
    marginHorizontal: 16,
  },

  customNotice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: c.warningBackground,
    borderWidth: 1,
    borderColor: c.warningBorder,
    borderRadius: 8,
    padding: 8,
  },
  customNoticeText: { fontSize: 12, color: c.warningText, flex: 1 },

  customRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 8,
  },
  customInput: {
    flex: 1,
    backgroundColor: c.muted,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: c.text,
  },
  customAddBtn: {
    backgroundColor: c.heavy,
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  customAddBtnDisabled: {
    backgroundColor: c.heavyBorder,
  },
  customAddText: { color: c.background, fontWeight: "700", fontSize: 14 },

});

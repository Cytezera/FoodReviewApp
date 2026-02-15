import { useSession } from "@/contexts/AuthContext";
import { fetchAllPlaces, fetchWheelHistory } from "@/services/placeService";
import { Place } from "@/types/place";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const WHEEL_SIZE = 300;

const SEGMENTS = ["Pizza", "Sushi", "Burger", "Tacos", "Salad", "Pasta"];
const COLORS = ["#f45925", "#ff8a65"];
const ANGLE = 360 / SEGMENTS.length;

const INITIAL_WINNERS: Place[] = [];

export default function SpinToEat() {
  const { user, isLoading } = useSession();
  const { data: wheelHistory } = useQuery<Place[]>({
    queryKey: ["wheelHistory", user?.id],
    queryFn: () => fetchWheelHistory(Number(user?.id)),
    enabled: !!user?.id,
  });

  const { data: allPlaces } = useQuery<Place[]>({
    queryKey: ["allPlaces"],
    queryFn: fetchAllPlaces,
  });
  const places = allPlaces ?? [];

  const segmentAngle = 360 / places.length;
  const currentAngle = useRef(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const uiTranslate = useRef(new Animated.Value(0)).current;
  const uiOpacity = useRef(new Animated.Value(1)).current;

  const [spinning, setSpinning] = useState(false);
  const [recent, setRecent] = useState(INITIAL_WINNERS);
  const [winner, setWinner] = useState<Place | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    // Hide UI
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
    // const index = Math.floor(Math.random() * SEGMENTS.length);
    // const target = 360 * 5 + index * ANGLE + ANGLE / 2;

    const winningIndex = Math.floor(Math.random() * places.length);

    const winningAngle =
      360 - ((winningIndex + 1) * segmentAngle - segmentAngle / 2);

    const finalAngle =
      winningAngle +
      360 * 6 +
      currentAngle.current +
      (360 - (currentAngle.current % 360));

    currentAngle.current = finalAngle;

    setWinner(places[winningIndex]);

    Animated.timing(rotation, {
      toValue: finalAngle,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => finishSpin(winningIndex));
  };

  const finishSpin = (index: number) => {
    const food = SEGMENTS[index];

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

  const arc = (start, end, r) => {
    const rad = (d) => (Math.PI * d) / 180;
    const x1 = r + r * Math.cos(rad(start));
    const y1 = r + r * Math.sin(rad(start));
    const x2 = r + r * Math.cos(rad(end));
    const y2 = r + r * Math.sin(rad(end));
    return `M${r},${r} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} />
        <Text style={styles.headerTitle}>Spin to Eat</Text>
        <MaterialIcons name="tune" size={24} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* WHEEL (always visible) */}
        <View style={styles.wheelArea}>
          <View style={styles.pointer}>
            <MaterialIcons name="arrow-drop-down" size={36} color="#f45925" />
          </View>

          <Animated.View style={{ transform: [{ rotate }] }}>
            <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
              {SEGMENTS.map((s, i) => {
                const start = i * ANGLE;
                return (
                  <G key={i}>
                    <Path
                      d={arc(start, start + ANGLE, WHEEL_SIZE / 2)}
                      fill={COLORS[i % 2]}
                    />
                    <SvgText
                      x={WHEEL_SIZE / 2}
                      y={20}
                      fill="#fff"
                      fontSize="14"
                      fontWeight="700"
                      rotation={start + ANGLE / 2}
                      origin={`${WHEEL_SIZE / 2},${WHEEL_SIZE / 2}`}
                      textAnchor="middle"
                    >
                      {s}
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

        {/* EVERYTHING ELSE */}
        <Animated.View
          style={[
            styles.ui,
            {
              transform: [{ translateY: uiTranslate }],
              opacity: uiOpacity,
            },
          ]}
        >
          <Text style={styles.title}>What are we eating?</Text>
          <Text style={styles.subtitle}>
            Spin the wheel to decide your destiny
          </Text>

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
                {/* Handle */}

                {/* Content */}
                <View style={styles.row}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: winner.images?.[0]?.url }}
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

                {/* Actions */}
                <View style={styles.actions}>
                  <View style={styles.primaryBtn}>
                    <Text style={styles.primaryText}>Navigate</Text>
                  </View>

                  <View style={styles.secondaryBtn}>
                    <Text style={styles.secondaryText}>View Details</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* RECENT WINNERS */}
          <Text style={styles.section}>Recent Winners</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {recent.map((r, i) => (
              <View key={i} style={styles.card}>
                <Image
                  source={{ uri: r.images?.[0]?.url }}
                  style={styles.image}
                />
                <View style={styles.rating}>
                  <MaterialIcons name="star" size={14} color="#facc15" />
                  <Text>{r.rating}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{r.name}</Text>
                  <Text style={styles.cardSub}>
                    {r.priceRange} • {r.status}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f6f5" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: { fontWeight: "700", fontSize: 18 },

  wheelArea: {
    alignItems: "center",
    marginTop: 8,
  },
  pointer: {
    position: "absolute",
    top: -12,
    zIndex: 10,
  },
  center: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    left: WHEEL_SIZE / 2 - 35,
    top: WHEEL_SIZE / 2 - 35,
  },

  ui: {
    alignItems: "center",
    paddingTop: 16,
  },

  title: { fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#6b7280", marginBottom: 20 },

  spinButton: {
    backgroundColor: "#f45925",
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 999,
    marginBottom: 24,
  },
  spinText: { color: "#fff", fontWeight: "900", fontSize: 16 },

  section: {
    alignSelf: "flex-start",
    marginLeft: 16,
    marginBottom: 12,
    fontWeight: "700",
    fontSize: 18,
  },

  card: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginLeft: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: 120 },
  rating: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  cardBody: { padding: 10 },
  cardTitle: { fontWeight: "700" },
  cardSub: { color: "#6b7280", fontSize: 12 },

  winnerWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },

  winnerTitle: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 16,
  },

  winnerCard: {
    width: width * 0.9, // large & centered
    borderRadius: 32,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  handleWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  handle: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },
  imageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#DDD",
  },
  winnerImage: {
    width: "100%",
    height: "100%",
  },

  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  winner_title: {
    fontSize: 18,
    fontWeight: "700",
  },
  winner_subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  meta: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  winner_rating: {
    fontWeight: "600",
  },
  dot: {
    color: "#AAA",
  },
  status: {
    fontWeight: "600",
    color: "green",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  primaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: 24,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: 24,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    fontWeight: "700",
  },
});

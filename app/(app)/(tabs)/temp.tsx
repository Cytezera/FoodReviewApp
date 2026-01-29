import { PlaceHistoryCard } from "@/components/ui/Card";
import { useSession } from "@/contexts/AuthContext";
import { fetchAllPlaces, fetchWheelHistory } from "@/services/placeService";
import { Place } from "@/types/place";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useRef, useState } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

const WHEEL_SIZE = 300;
const SPIN_DURATION = 3000;
const COLORS = ["#ff6666", "#66ccff", "#66ff99"];

type Phase = "idle" | "spinning" | "result";

export default function SvgWheelSpinner() {
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

  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<Place | null>(null);

  const rotation = useRef(new Animated.Value(0)).current;
  const currentAngle = useRef(0);

  const bottomAnim = useRef(new Animated.Value(0)).current;

  const segmentAngle = places.length ? 360 / places.length : 0;

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const bottomTranslate = bottomAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
  });

  const spinWheel = () => {
    if (!places.length) return;

    setPhase("spinning");
    setResult(null);

    Animated.timing(bottomAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    const winningIndex = Math.floor(Math.random() * places.length);

    const winningAngle =
      360 - ((winningIndex + 1) * segmentAngle - segmentAngle / 2);

    const finalAngle =
      winningAngle +
      360 * 6 +
      currentAngle.current +
      (360 - (currentAngle.current % 360));

    currentAngle.current = finalAngle;

    Animated.timing(rotation, {
      toValue: finalAngle,
      duration: SPIN_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setResult(places[winningIndex]);
      setPhase("result");

      Animated.timing(bottomAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const createArc = (start: number, end: number) => {
    const r = WHEEL_SIZE / 2;
    const x1 = r + r * Math.cos((Math.PI * start) / 180);
    const y1 = r + r * Math.sin((Math.PI * start) / 180);
    const x2 = r + r * Math.cos((Math.PI * end) / 180);
    const y2 = r + r * Math.sin((Math.PI * end) / 180);
    const large = end - start > 180 ? 1 : 0;

    return `M${r},${r} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
  };

  const sliceColors = useMemo(
    () => places.map((_, i) => COLORS[(i * 7 + 3) % COLORS.length]),
    [places.length],
  );

  return (
    <View style={styles.container}>
      {/* Pointer */}
      <View style={styles.pointer} />

      {/* Wheel */}
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
          <G transform={`rotate(-90 ${WHEEL_SIZE / 2} ${WHEEL_SIZE / 2})`}>
            {places.map((place, i) => {
              const start = i * segmentAngle;
              const end = start + segmentAngle;

              return (
                <Path
                  key={place.id}
                  d={createArc(start, end)}
                  fill={sliceColors[i]}
                  stroke="#fff"
                  strokeWidth={1.5}
                />
              );
            })}

            {places.map((place, i) => {
              const start = i * segmentAngle;

              return (
                <SvgText
                  key={`text-${place.id}`}
                  x={WHEEL_SIZE / 2}
                  y={WHEEL_SIZE / 2}
                  fill="#000"
                  fontSize={14}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${start + segmentAngle / 2 + 90} ${
                    WHEEL_SIZE / 2
                  } ${WHEEL_SIZE / 2}) translate(0,-${WHEEL_SIZE / 4})`}
                >
                  {place.name}
                </SvgText>
              );
            })}
          </G>
        </Svg>
      </Animated.View>

      <Pressable style={styles.button} onPress={spinWheel}>
        <Text style={styles.buttonText}>SPIN NOW</Text>
      </Pressable>

      {/* Bottom Section */}
      <Animated.View
        style={[
          styles.bottomSection,
          { transform: [{ translateY: bottomTranslate }] },
        ]}
      >
        {phase === "idle" && <RecentWinners wheelHistory={wheelHistory} />}
        {phase === "result" && result && <WinnerCard result={result} />}
      </Animated.View>

      {/* Spin Button */}
    </View>
  );
}

/* ---------- Subcomponents ---------- */

const RecentWinners = ({ wheelHistory }: { wheelHistory?: Place[] }) => (
  <View>
    <Text style={styles.sectionTitle}>Recent Winners</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {/* {["Sushi", "Burger", "Tacos", "Steak"].map((item, i) => (
        <View key={i} style={styles.winnerChip}>
          <Text>{item}</Text>
        </View>
      ))} */}

      {wheelHistory?.map((place, index) => {
        return (
          <PlaceHistoryCard
            key={index}
            place={{
              name: place.place.name,
              description: "Hey",
              rating: 4.8,
              // image: "https://example.com/sushi.jpg",
              image:
                place.place.images.find((img) => img.isPrimary)?.url ??
                place.place.images[0]?.url,
            }}
          />
        );
      })}
    </ScrollView>
  </View>
);

const WinnerCard = ({ result }: { result: Place }) => (
  <View style={styles.winnerCard}>
    <Text style={styles.winnerEmoji}>🎉</Text>
    <Text style={styles.winnerText}>{result.name}</Text>
  </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#000",
    marginBottom: -10,
    zIndex: 10,
  },

  bottomSection: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,

    zIndex: 5,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  winnerChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    marginRight: 8,
  },

  winnerCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  winnerEmoji: {
    fontSize: 36,
  },

  winnerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },

  button: {
    bottom: 30,
    paddingHorizontal: 36,
    paddingVertical: 12,
    backgroundColor: "#007bff",
    borderRadius: 24,
    zIndex: 20,
    elevation: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

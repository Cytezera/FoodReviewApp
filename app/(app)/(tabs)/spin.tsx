import { Colors } from "@/constants/theme";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const ITEMS = [
  "Pizza",
  "Burger",
  "Sushi",
  "Tacos",
  "Pasta",
  "Salad",
];

const WHEEL_SIZE = 260;
const SPIN_DURATION = 3000;

export default function WheelSpinner() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const rotation = useRef(new Animated.Value(0)).current;
  const [result, setResult] = useState<string | null>(null);

  const spinWheel = () => {
    setResult(null);

    const spins = Math.floor(Math.random() * 4) + 4; // 4–7 spins
    const randomAngle = Math.random() * 360;
    const finalAngle = spins * 360 + randomAngle;

    Animated.timing(rotation, {
      toValue: finalAngle,
      duration: SPIN_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const segmentAngle = 360 / ITEMS.length;
      const index =
        ITEMS.length -
        1 -
        Math.floor((randomAngle % 360) / segmentAngle);

      setResult(ITEMS[index]);
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Pointer */}
      <View style={[styles.pointer, { borderBottomColor: theme.tint }]} />

      {/* Wheel */}
      <Animated.View
        style={[
          styles.wheel,
          {
            backgroundColor: theme.cardBackground,
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      >
        {ITEMS.map((item, index) => {
          const angle = (360 / ITEMS.length) * index;
          return (
            <View
              key={item}
              style={[
                styles.segment,
                { transform: [{ rotate: `${angle}deg` }] },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: theme.text },
                ]}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </Animated.View>

      {/* Spin Button */}
      <Pressable
        style={[
          styles.button,
          { backgroundColor: theme.buttonBackground },
        ]}
        onPress={spinWheel}
      >
        <Text style={{ color: theme.buttonText, fontWeight: "600" }}>
          SPIN
        </Text>
      </Pressable>

      {/* Result */}
      {result && (
        <Text style={[styles.result, { color: theme.boldText }]}>
          🎉 {result}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 4,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  segment: {
    position: "absolute",
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 12,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "500",
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginBottom: -10,
    zIndex: 10,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  result: {
    fontSize: 18,
    fontWeight: "700",
  },
});

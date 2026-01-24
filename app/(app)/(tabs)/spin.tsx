import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

const ITEMS = ["Steak", "Burger", "Sushi", "Tacos"];
const WHEEL_SIZE = 300;
const SPIN_DURATION = 3000;

export default function SvgWheelSpinner() {
  const currentAngle = useRef(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const [result, setResult] = useState<string | null>(null);

  // Spin the wheel
  const spinWheel = () => {
    setResult(null);
    const spins = 10;
    const winningIndex = Math.floor(Math.random() * ITEMS.length);

    const segmentAngle = 360 / ITEMS.length;
    const winningAngle =
      360 - ((winningIndex + 1) * segmentAngle - segmentAngle / 2);
    const finalAngle =
      winningAngle +
      360 * 7 +
      currentAngle.current +
      (360 - (currentAngle.current % 360));

    currentAngle.current = finalAngle;

    console.log(`current angle: ${currentAngle.current}`);
    console.log(winningIndex);
    console.log(winningAngle);
    console.log(finalAngle);
    // const finalAngle = spins * 360 + randomAngle;

    Animated.timing(rotation, {
      toValue: finalAngle,
      duration: SPIN_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setResult(ITEMS[winningIndex]);
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  //
  const createArc = (startAngle: number, endAngle: number) => {
    const radius = WHEEL_SIZE / 2;
    const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointer} />

      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
          <G>
            {/* Render all paths first */}
            {ITEMS.map((item, index) => {
              const segmentAngle = 360 / ITEMS.length;
              const start = index * segmentAngle;
              const end = start + segmentAngle;
              return (
                <Path
                  key={`path-${item}`}
                  d={createArc(start, end)}
                  fill={index % 2 === 0 ? "#ff6666" : "#66ccff"}
                />
              );
            })}

            {/* Render all text on top */}
            {ITEMS.map((item, index) => {
              const segmentAngle = 360 / ITEMS.length;
              const start = index * segmentAngle;
              return (
                <SvgText
                  key={`text-${item}`}
                  x={WHEEL_SIZE / 2}
                  y={WHEEL_SIZE / 2}
                  fill="#000"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${start + segmentAngle / 2}, ${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2}) translate(0,-${WHEEL_SIZE / 4}) `}
                >
                  {item}
                </SvgText>
              );
            })}
          </G>
        </Svg>
      </Animated.View>
      {/* <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
          <G>
            {ITEMS.map((item, index) => {
              const segmentAngle = 360 / ITEMS.length;
              const start = index * segmentAngle;
              const end = start + segmentAngle;

              return (
                <G key={item}>
                  <Path
                    d={createArc(start, end)}
                    fill={index % 2 === 0 ? "#ff6666" : "#66ccff"}
                  />
                  <SvgText
                    x={WHEEL_SIZE / 2}
                    y={WHEEL_SIZE / 2}
                    fill="#000"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    // transform={`rotate(${start + segmentAngle / 2}, ${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2}) translate(0,-${WHEEL_SIZE / 4})`}
                    transform={`rotate(${start}, ${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2}) translate(0,-${WHEEL_SIZE / 4})`}
                  >
                    {item}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View> */}

      <Pressable style={styles.button} onPress={spinWheel}>
        <Text style={styles.buttonText}>SPIN</Text>
      </Pressable>

      {result && <Text style={styles.result}>🎉 {result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#000",
    zIndex: 10,
    marginBottom: -10,
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  result: { marginTop: 20, fontSize: 20, fontWeight: "bold" },
});

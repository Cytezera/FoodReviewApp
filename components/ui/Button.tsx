import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function Button({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "secondary" && styles.secondary,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary" && styles.secondaryText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  secondary: {
    backgroundColor: "#f2f2f2",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#000",
  },
});

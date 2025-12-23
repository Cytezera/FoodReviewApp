import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";

type ButtonProps = {
  title?: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode; // <-- allow icon or custom content
};

export function Button({ title, onPress, variant = "primary", style, textStyle, children }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variant === "secondary" && styles.secondary, style]}
    >
      {children ? (
        children
      ) : (
        <Text
          style={[
            styles.text,
            variant === "secondary" && styles.secondaryText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
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

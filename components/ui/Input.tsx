import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  style?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function Input({ label, style, inputStyle, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        placeholderTextColor="#999"
        style={[styles.input, inputStyle, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    color: "#666",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    color: "#000",
  },
});

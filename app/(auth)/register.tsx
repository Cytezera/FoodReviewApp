import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSession } from '@/contexts/AuthContext';
import { registerAccount } from "@/services/registerService";
import { LoginCredential } from "@/types/user";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const { signIn } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const loginSession = async (email: string, password: string) => {
    const loginCredential: LoginCredential = {
      username: '',
      email: email,
      password: password,
    } 
    try{
      signIn(loginCredential)
    }catch(e){
      console.error("Login failed ")
    }
  }

  const handleRegister = async () => {
    const registerFormData = {
      username,
      email,
      password,
      nationality,
      dateOfBirth,
    };

    const newErrors: { [key: string]: string } = {};

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!nationality) newErrors.nationality = "Nationality is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
     const result = await registerAccount(registerFormData);

    if (!result.success) {
      const expressErrors: { [key: string]: string } = {};
      if(result.data.field){
        const field = result.data.field
       expressErrors[field] = result.data.error
      }

      setErrors(expressErrors)
      return;
    }else{
      loginSession(email,password)

    }

  };

  return (
    <SafeAreaView style={{ flex:8 }}>
          <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.form}>
        <Input
          label="Username"
          placeholder="Enter your username"
          onChangeText={setUsername}
        />
        {errors.username && <Text style={styles.error}>{errors.username}</Text>}

        <Input
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Input
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <Input
          label="Confirm Password"
          placeholder="Re-enter your password"
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}

        <Input
          label="Nationality"
          placeholder="Enter your nationality"
          onChangeText={setNationality}
        />
        {errors.nationality && (
          <Text style={styles.error}>{errors.nationality}</Text>
        )}

        <Input
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
        {errors.dateOfBirth && (
          <Text style={styles.error}>{errors.dateOfBirth}</Text>
        )}

        {isDatePickerVisible && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setIsDatePickerVisible(false);
              if (selectedDate)
                setDateOfBirth(selectedDate.toISOString().split("T")[0]);
            }}
          />
        )}

        <Button title="Create Account" onPress={handleRegister} />

        <Button
          title="Already have an account? Sign in"
          variant="secondary"
          style={styles.secondaryButton}
          onPress={() => router.push("/sign-in")}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    gap: 12,
  },
  secondaryButton: {
    marginTop: 8,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 4,
  },
});

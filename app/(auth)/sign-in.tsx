import { Input } from "@/components//ui/Input";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/contexts/AuthContext";
import { LoginCredential } from "@/types/user";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();
  
  const handleLogin = async () => {
    setError(""); // Clear previous errors
    
    const loginCredential: LoginCredential = {
      username: '',
      email: email,
      password: password,
    }
    
    const result = await signIn(loginCredential);
    
    if (!result.success) {
      setError(result.error || "Login failed. Please try again.");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>
      
      <View style={styles.form}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        
        <Input
          label="Email or Username"
          placeholder="Enter your email or username"
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button 
          title="Login"
          onPress={() => handleLogin()}
        />
        <Button
          title="Don't have an account? Sign up"
          variant="secondary"
          style={styles.secondaryButton}
          onPress={() => router.push('/register')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 24,
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
    marginBottom: 40,
  },
  form: {
    gap: 12,
  },
  errorContainer: {
    backgroundColor: "#fee",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fcc",
  },
  errorText: {
    color: "#c00",
    fontSize: 14,
    textAlign: "center",
  },
  secondaryButton: {
    marginTop: 8,
  },
});
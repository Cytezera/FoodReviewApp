import { Input } from "@/components//ui/Input";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useSession();

  const handleLogin = () => { 

    signIn(email, password);
  };


    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>

        <View style={styles.form}>
          <Input
            label="Email or Username"
            placeholder="Enter your email or username"
            onChangeText = {setEmail}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            onChangeText = {setPassword}
          />

          <Button title="Login"
            onPress={() => handleLogin()}
           />

          <Button
            title="Don’t have an account? Sign up"
            variant="secondary"
            style={styles.secondaryButton}
            onPress= { () => router.push('/register')}
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
    secondaryButton: {
      marginTop: 8,
    },
  });


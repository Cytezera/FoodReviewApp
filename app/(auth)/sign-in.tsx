import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/contexts/AuthContext";
import { LoginCredential } from "@/types/user";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

const googleClientIds = {
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || "missing-google-android-client-id",
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
};

const isGoogleConfigured = Boolean(process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID);

const oauthProviders = [
  { provider: "google", label: "Continue with Google", icon: "G" },
  { provider: "apple", label: "Continue with Apple", icon: "" },
] as const;

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  const handledGoogleTokenRef = useRef<string | null>(null);
  const { signIn, signInWithOAuth } = useSession();
  const [googleRequest, googleResponse, promptGoogleSignIn] = Google.useIdTokenAuthRequest(googleClientIds);

  useEffect(() => {
    const completeGoogleLogin = async () => {
      if (googleResponse?.type !== "success") return;

      const idToken = googleResponse.params.id_token || googleResponse.authentication?.idToken;
      if (!idToken) {
        setError("Google did not return an ID token. Please try again.");
        setIsOAuthLoading(false);
        return;
      }

      if (handledGoogleTokenRef.current === idToken) return;
      handledGoogleTokenRef.current = idToken;

      const result = await signInWithOAuth("google", idToken);
      setIsOAuthLoading(false);

      if (!result.success) {
        setError(result.error || "Google login failed. Please try again.");
      }
    };

    completeGoogleLogin();
  }, [googleResponse, signInWithOAuth]);

  const handleLogin = async () => {
    setError("");

    const loginCredential: LoginCredential = {
      username: "",
      email: email,
      password: password,
    };

    const result = await signIn(loginCredential);

    if (!result.success) {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  const handleOAuthPress = async (provider: "google" | "apple") => {
    setError("");

    if (provider === "google") {
      if (!isGoogleConfigured) {
        setError("Google login needs EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID in your app env.");
        return;
      }

      setIsOAuthLoading(true);
      const result = await promptGoogleSignIn();

      if (result.type !== "success") {
        setIsOAuthLoading(false);
      }
      return;
    }

    Alert.alert(
      "Apple sign in",
      "Apple OAuth needs expo-apple-authentication and the Apple client ID before this button can be enabled."
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Peekabox</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your account</Text>
        </View>

        <View style={styles.oauthGroup}>
          {oauthProviders.map((provider) => {
            const disabled = isOAuthLoading || (provider.provider === "google" && !googleRequest);

            return (
              <Pressable
                key={provider.label}
                accessibilityRole="button"
                accessibilityLabel={provider.label}
                disabled={disabled}
                onPress={() => handleOAuthPress(provider.provider)}
                style={({ pressed }) => [
                  styles.oauthButton,
                  pressed && styles.oauthButtonPressed,
                  disabled && styles.oauthButtonDisabled,
                ]}
              >
                <View style={styles.oauthIcon}>
                  <Text style={styles.oauthIconText}>{provider.icon}</Text>
                </View>
                <Text style={styles.oauthButtonText}>
                  {isOAuthLoading && provider.provider === "google"
                    ? "Connecting to Google..."
                    : provider.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with email</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Input
            label="Email or Username"
            placeholder="Enter your email or username"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
          <Button
            title="Don't have an account? Sign up"
            variant="secondary"
            style={styles.secondaryButton}
            onPress={() => router.push("/register")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f3ee",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  eyebrow: {
    color: "#9a6a3a",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 8,
    textTransform: "uppercase",
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
  },
  oauthGroup: {
    gap: 12,
    marginBottom: 24,
  },
  oauthButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#e4ded7",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 56,
    paddingHorizontal: 16,
  },
  oauthButtonPressed: {
    backgroundColor: "#f7f3ee",
    transform: [{ scale: 0.99 }],
  },
  oauthButtonDisabled: {
    opacity: 0.5,
  },
  oauthIcon: {
    alignItems: "center",
    backgroundColor: "#f2eee8",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    marginRight: 12,
    width: 36,
  },
  oauthIconText: {
    color: "#111",
    fontSize: 18,
    fontWeight: "700",
  },
  oauthButtonText: {
    color: "#111",
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginRight: 48,
  },
  dividerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  divider: {
    backgroundColor: "#e8e1d8",
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: "#8a8178",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
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

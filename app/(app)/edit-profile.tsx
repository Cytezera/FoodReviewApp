import { Button } from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useSession();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    nationality: user?.nationality || "",
    dob: user?.dob || null,
  });

  const handleSave = () => {
    // Handle save logic here
    console.log("Profile saved:", profile);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.cardBackground || "#fff",
            borderBottomColor: theme.border || "#e0e0e0",
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Edit Profile
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View
          style={[
            styles.profilePictureContainer,
            { backgroundColor: theme.cardBackground || "#fff" },
          ]}
        >
          <View style={styles.profilePicture}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={[styles.cameraButton, { backgroundColor: theme.tint }]}
            >
              <IconSymbol
                name="camera.fill"
                size={20}
                color={theme.background}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={[styles.changePhotoText, { color: theme.tint }]}>
              Change Profile Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View
          style={[
            styles.formContainer,
            { backgroundColor: theme.cardBackground || "#fff" },
          ]}
        >
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Name</Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme.secondaryBackground,
                  borderColor: theme.border || "#e0e0e0",
                },
              ]}
            >
              <IconSymbol
                name="person"
                size={20}
                color={theme.secondaryText || "#666"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                placeholder="Enter your name"
                placeholderTextColor={theme.secondaryText || "#999"}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Email</Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme.secondaryBackground,
                  borderColor: theme.border || "#e0e0e0",
                },
              ]}
            >
              <IconSymbol
                name="envelope"
                size={20}
                color={theme.secondaryText || "#666"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
                placeholder="Enter your email"
                placeholderTextColor={theme.secondaryText || "#999"}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Nationality Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Nationality </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme.secondaryBackground,
                  borderColor: theme.border || "#e0e0e0",
                },
              ]}
            >
              <IconSymbol
                name="phone"
                size={20}
                color={theme.secondaryText || "#666"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={profile.nationality}
                onChangeText={(text) => setProfile({ ...profile, nationality: text })}
                placeholder="Enter your nationality"
                placeholderTextColor={theme.secondaryText || "#999"}
              />
            </View>
          </View>

          {/* Date of Birth Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Date of Birth
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme.secondaryBackground,
                  borderColor: theme.border || "#e0e0e0",
                },
              ]}
            >
              <IconSymbol
                name="calendar"
                size={20}
                color={theme.secondaryText || "#666"}
                style={styles.inputIcon}
              />

              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={profile.dob}
                onChangeText={(text) =>
                  setProfile({ ...profile, dob: text })
                }
                placeholder="YYYY-MM-DD"
                placeholderTextColor={theme.secondaryText || "#999"}
              />
            </View>
          </View>
        </View>


        {/* Additional Options */}
        <View
          style={[
            styles.optionsContainer,
            { backgroundColor: theme.cardBackground || "#fff" },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.optionItem,
              { borderBottomColor: theme.border || "#f0f0f0" },
            ]}
          >
            <View style={styles.optionLeft}>
              <IconSymbol
                name="lock.fill"
                size={22}
                color={theme.secondaryText || "#666"}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>
                Change Password
              </Text>
            </View>
            <IconSymbol
              name="chevron.right"
              size={20}
              color={theme.secondaryText || "#999"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionItem, { borderBottomColor: "transparent" }]}
          >
            <View style={styles.optionLeft}>
              <IconSymbol
                name="shield.fill"
                size={22}
                color={theme.secondaryText || "#666"}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>
                Privacy Settings
              </Text>
            </View>
            <IconSymbol
              name="chevron.right"
              size={20}
              color={theme.secondaryText || "#999"}
            />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <Button
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: theme.tint }]}
        >
          <Text
            style={[
              styles.saveButtonText,
              { color: theme.buttonText || "#999" },
            ]}
          >
            Save Changes
          </Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  profilePictureContainer: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 16,
  },
  profilePicture: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e0e0e0",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  changePhotoText: {
    fontSize: 15,
    fontWeight: "500",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
  },
  textAreaContainer: {
    alignItems: "flex-start",
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontSize: 15,
  },
  saveButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  logoutButtonText: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "600",
  },
});

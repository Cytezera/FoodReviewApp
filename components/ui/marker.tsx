import { Colors } from "@/constants/theme"
import React from "react"
import { StyleSheet, useColorScheme, View } from "react-native"
import { IconSymbol } from "./icon-symbol"

export function PlaceMarker() {
  const colorScheme = useColorScheme() ?? "light"
  const theme = Colors[colorScheme]

  const styles = createStyles(theme.tint)

  return (
    <View style={styles.container}>
      {/* Pin */}
      <View style={styles.pinWrapper}>
        <View style={styles.pinHead}>
          <IconSymbol name="restaurant" size={10} color="#fff" />
        </View>
        <View style={styles.pinTail} />
      </View>

      {/* Rating Bubble (optional) */}
      {/* 
      <View style={styles.ratingBubble}>
        <Text style={styles.ratingText}>5.0 ★</Text>
      </View>
      */}
    </View>
  )
}

const createStyles = (PRIMARY: string) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      width: 30,
      height: 30,
      backgroundColor: PRIMARY,
      borderRadius: 15,
    },

    /* Pin */
    pinWrapper: {
      alignItems: "center",
    },

    pinHead: {
      width: 30,
      height: 30,
      borderRadius: 24,
      backgroundColor: PRIMARY,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      borderColor: "#ffffff",
      elevation: 6, // Android shadow
      shadowColor: PRIMARY, // iOS shadow
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },

    pinTail: {
      width: 12,
      height: 12,
      backgroundColor: PRIMARY,
      transform: [{ rotate: "45deg" }],
      marginTop: -4,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#ffffff",
    },

    /* Rating */
    ratingBubble: {
      marginTop: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: "#ffffff",
      elevation: 4,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },

    ratingText: {
      fontSize: 12,
      fontWeight: "700",
      color: PRIMARY,
    },
  })

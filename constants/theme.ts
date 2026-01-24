/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Platform } from "react-native";


const primaryLight = "#FFB800"; // Gold
const primaryDark = "#FFB800"; // Same primary for now

export const Colors = {
  light: {
    heavy: "#B35C44", // Terracotta (strong accent)
    text: "#2D2926", // Charcoal
    boldText: "#2D2926",
    secondaryText: "#6B645E", // softened charcoal
    background: "#FFFFFF", // App background
    cardBackground: "#F2EBE3", // Cream containers
    tint: primaryLight, // Primary accent
    icon: "#2D2926",
    tabIconDefault: "#6B645E",
    tabIconSelected: primaryLight,
    border: "#E0DED8",
    buttonBackground: "#FFB800", // Gold
    buttonText: "#2D2926",
    buttonSecondaryBackground: "#D1E6AD", // Sage Green
    buttonSecondaryText: "#2D2926",
    muted: "#EDE7DF",
    cardText: "#2D2926",

    tintColorLight: primaryLight,
    tintColorDark: primaryDark,
  },

  dark: {
    heavy: "#B35C44", // Terracotta
    text: "#F2EBE3", // Cream text
    boldText: "#FFB800", // Gold emphasis
    secondaryText: "#CFC6BC",
    background: "#1F1C1A", // Dark charcoal background
    cardBackground: "#2A2623",
    tint: primaryDark,
    icon: "#CFC6BC",
    tabIconDefault: "#CFC6BC",
    tabIconSelected: primaryDark,
    border: "#3A3531",
    buttonBackground: "#FFB800",
    buttonText: "#2D2926",
    buttonSecondaryBackground: "#B35C44",
    buttonSecondaryText: "#FFFFFF",
    muted: "#2A2623",
    cardText: "#F2EBE3",

    tintColorLight: primaryLight,
    tintColorDark: primaryDark,
  },
};

// const tintColorLight = "#FF8C00"; // Dark orange
// const tintColorDark = "#FFA500"; // Bright orange

// export const Colors = {
//   light: {
//     // heavy:'#D65F00',
//     heavy: "#f45925",
//     text: "#11181C", // primary text
//     boldText: "#D65F00",
//     secondaryText: "#687076", // secondary / muted text
//     background: "#FFFFFF", // main background
//     cardBackground: "#F9F9F9", // cards / surfaces
//     tint: tintColorLight, // primary accent / active color
//     icon: "#687076", // default icon color
//     tabIconDefault: "#687076", // inactive tab icon
//     tabIconSelected: tintColorLight, // active tab icon
//     border: "#E0E0E0", // borders / dividers
//     buttonBackground: "#FF8C00", // primary button - orange
//     buttonText: "#FFFFFF", // primary button text
//     buttonSecondaryBackground: "#FFF5E6", // secondary button background - light orange
//     buttonSecondaryText: "#FF8C00", // secondary button text - orange
//     muted: "#e5e5e5",
//     cardText: "#FFFFFF",
//     tintColorLight: "#FF8C00", // Dark orange
//     tintColorDark: "#FFA500", // Bright orange
//   },
//   dark: {
//     heavy: "#D65F00",
//     text: "#ECEDEE",
//     boldText: "#D65F00",
//     secondaryText: "#9BA1A6",
//     background: "#151718",
//     cardBackground: "#1E1F1F",
//     tint: tintColorDark,
//     icon: "#9BA1A6",
//     tabIconDefault: "#9BA1A6",
//     tabIconSelected: tintColorDark,
//     border: "#2C2D2E",
//     buttonBackground: "#FFA500", // primary button - bright orange
//     buttonText: "#000000",
//     buttonSecondaryBackground: "#2C2D2E",
//     buttonSecondaryText: "#FFA500", // secondary button text - orange
//     muted: "#f5f5f82a",
//     cardText: "#000000",

//     tintColorLight: "#FF8C00", // Dark orange
//     tintColorDark: "#FFA500", // Bright orange
//   },
// };

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

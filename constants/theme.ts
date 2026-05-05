/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Platform } from "react-native";


// Peeka design system — oklch values converted to hex for React Native
// --orange-400 ≈ #FB923C, --orange-500 ≈ #F97316, --orange-600 ≈ #EA580C
// --bg ≈ #FDFAF6, --surface = #ffffff
// --ink-900 ≈ #1C1917, --ink-700 ≈ #44403C, --ink-500 ≈ #78716C, --ink-300 ≈ #D6D3D1
// --hairline ≈ #E7E5E4
const primaryLight = "#FB923C"; // orange-400
const primaryDark  = "#FDBA74"; // orange-300

export const Colors = {
  light: {
    heavy: "#EA580C",              // orange-600
    heavyMuted: "#FFF7ED",         // orange-50
    heavyBorder: "#FED7AA",        // orange-200
    text: "#1C1917",               // ink-900
    boldText: "#44403C",           // ink-700
    secondaryText: "#78716C",      // ink-500
    background: "#FDFAF6",         // --bg warm near-white
    cardBackground: "#FFFFFF",     // --surface
    tint: primaryLight,
    icon: "#44403C",               // ink-700
    tabIconDefault: "#78716C",     // ink-500
    tabIconSelected: primaryLight,
    border: "#E7E5E4",             // --hairline
    buttonBackground: "#FB923C",   // orange-400
    buttonText: "#FFFFFF",
    buttonSecondaryBackground: "#FFF7ED", // orange-50
    buttonSecondaryText: "#EA580C",       // orange-600
    muted: "#FFF7ED",              // orange-50
    cardText: "#1C1917",           // ink-900
    success: "#22C55E",            // --green
    error: "#EF4444",              // --red
    warningBackground: "#FFF7ED",  // orange-50
    warningBorder: "#FDBA74",      // orange-300
    warningText: "#C2410C",        // orange-700

    tintColorLight: primaryLight,
    tintColorDark:  primaryDark,
  },

  dark: {
    heavy: "#FB923C",              // orange-400
    heavyMuted: "#2D1608",         // very dark orange tint
    heavyBorder: "#9A3412",        // orange-800
    text: "#FAFAF9",               // stone-50
    boldText: "#FDBA74",           // orange-300
    secondaryText: "#A8A29E",      // stone-400
    background: "#1C1917",         // ink-900
    cardBackground: "#292524",     // ink-800
    tint: primaryDark,
    icon: "#FDBA74",               // orange-300
    tabIconDefault: "#78716C",     // ink-500
    tabIconSelected: primaryDark,
    border: "#44403C",             // ink-700
    buttonBackground: "#FB923C",   // orange-400
    buttonText: "#1C1917",
    buttonSecondaryBackground: "#44403C",
    buttonSecondaryText: "#FDBA74",
    muted: "#292524",              // ink-800
    cardText: "#FAFAF9",
    success: "#22C55E",
    error: "#EF4444",
    warningBackground: "#2D1A00",
    warningBorder: "#7C2D12",
    warningText: "#FED7AA",        // orange-200

    tintColorLight: primaryLight,
    tintColorDark:  primaryDark,
  },
};


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

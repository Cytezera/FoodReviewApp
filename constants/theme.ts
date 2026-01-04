/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Platform } from 'react-native';

const tintColorLight = '#FF8C00';  // Dark orange
const tintColorDark = '#FFA500';   // Bright orange

export const Colors = {
  light: {
    text: '#11181C',               // primary text
    boldText: '#D65F00',
    secondaryText: '#687076',      // secondary / muted text
    background: '#FFFFFF',         // main background
    cardBackground: '#F9F9F9',     // cards / surfaces
    tint: tintColorLight,          // primary accent / active color
    icon: '#687076',               // default icon color
    tabIconDefault: '#687076',     // inactive tab icon
    tabIconSelected: tintColorLight, // active tab icon
    border: '#E0E0E0',             // borders / dividers
    buttonBackground: '#FF8C00',   // primary button - orange
    buttonText: '#FFFFFF',         // primary button text
    buttonSecondaryBackground: '#FFF5E6', // secondary button background - light orange
    buttonSecondaryText: '#FF8C00',       // secondary button text - orange
  },
  dark: {
    text: '#ECEDEE',
    boldText: '#D65F00',
    secondaryText: '#9BA1A6',
    background: '#151718',
    cardBackground: '#1E1F1F',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#2C2D2E',
    buttonBackground: '#FFA500',   // primary button - bright orange
    buttonText: '#000000',
    buttonSecondaryBackground: '#2C2D2E',
    buttonSecondaryText: '#FFA500', // secondary button text - orange
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});



// import { Platform } from 'react-native';

// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';


// export const Colors = {
//   light: {
//     text: '#11181C',               // primary text
//     secondaryText: '#687076',      // secondary / muted text
//     background: '#FFFFFF',         // main background
//     cardBackground: '#F9F9F9',     // cards / surfaces
//     tint: tintColorLight,          // primary accent / active color
//     icon: '#687076',               // default icon color
//     tabIconDefault: '#687076',     // inactive tab icon
//     tabIconSelected: tintColorLight, // active tab icon
//     border: '#E0E0E0',             // borders / dividers
//     buttonBackground: '#000000',   // primary button
//     buttonText: '#FFFFFF',         // primary button text
//     buttonSecondaryBackground: '#F2F2F2', // secondary button background
//     buttonSecondaryText: '#000000',       // secondary button text
//   },
//   dark: {
//     text: '#ECEDEE',
//     secondaryText: '#9BA1A6',
//     background: '#151718',
//     cardBackground: '#1E1F1F',
//     tint: tintColorDark,
//     icon: '#9BA1A6',
//     tabIconDefault: '#9BA1A6',
//     tabIconSelected: tintColorDark,
//     border: '#2C2D2E',
//     buttonBackground: '#FFFFFF',
//     buttonText: '#000000',
//     buttonSecondaryBackground: '#2C2D2E',
//     buttonSecondaryText: '#FFFFFF',
//   },
// };


// export const Fonts = Platform.select({
//   ios: {
//     /** iOS `UIFontDescriptorSystemDesignDefault` */
//     sans: 'system-ui',
//     /** iOS `UIFontDescriptorSystemDesignSerif` */
//     serif: 'ui-serif',
//     /** iOS `UIFontDescriptorSystemDesignRounded` */
//     rounded: 'ui-rounded',
//     /** iOS `UIFontDescriptorSystemDesignMonospaced` */
//     mono: 'ui-monospace',
//   },
//   default: {
//     sans: 'normal',
//     serif: 'serif',
//     rounded: 'normal',
//     mono: 'monospace',
//   },
//   web: {
//     sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//     serif: "Georgia, 'Times New Roman', serif",
//     rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
//     mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
//   },
// });

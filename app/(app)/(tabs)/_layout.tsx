import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_META: Record<string, { icon: keyof typeof MaterialIcons.glyphMap; label: string }> = {
  home: { icon: 'home', label: 'Home' },
  explore: { icon: 'map', label: 'Explore' },
  spin: { icon: 'casino', label: 'Spin' },
  profile: { icon: 'person', label: 'Profile' },
};

function PeekaTabBar({ state, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const c = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.bar,
      {
        backgroundColor: c.cardBackground,
        borderTopColor: c.border,
        paddingBottom: Math.max(insets.bottom, 8),
      }
    ]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const meta = TAB_META[route.name];
        const isSpin = route.name === 'spin';

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        if (isSpin) {
          return (
            <Pressable key={route.key} onPress={onPress} style={styles.spinTab}>
              <View style={[styles.spinFab, { borderColor: c.background, shadowColor: c.heavy }]}>
                <MaterialIcons name="casino" size={26} color="#fff" />
              </View>
              <Text style={[styles.label, { color: focused ? c.heavy : c.tabIconDefault, fontWeight: '700' }]}>
                Spin
              </Text>
            </Pressable>
          );
        }

        if (!meta) return null;

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tab}>
            <MaterialIcons
              name={meta.icon}
              size={24}
              color={focused ? c.tint : c.tabIconDefault}
            />
            <Text style={[styles.label, { color: focused ? c.heavy : c.tabIconDefault, fontWeight: focused ? '700' : '600' }]}>
              {meta.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <PeekaTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="spin" options={{ title: 'Spin' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  label: {
    fontSize: 11,
  },
  spinTab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  spinFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginTop: -22,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
});

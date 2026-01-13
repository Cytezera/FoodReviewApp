import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Filters } from "@/types/filter";
import Slider from "@react-native-community/slider";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

type FilterPanelProps = {
  visible: boolean;
  onClose: () => void;
  value: Filters;
  onChange?: (value: Filters) => void;

};

const CUISINES = ["Italian", "Japanese", "Mexican", "Chinese", "Thai"];
const PRICES = ["$", "$$", "$$$", "$$$$"];

export function FilterPanel({ visible, onClose, value, onChange }: FilterPanelProps) {
  const { cuisine, priceIndex, rating, openNow } = value;
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const isDark = colorScheme === "dark";


  if (!visible) return null;

  const update = (updates: Partial<Filters>) => {
    onChange?.({ ...value, ...updates})
  }

  return (
    <>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Bottom Sheet */}
      <View style={[styles.sheet, { backgroundColor: theme.cardBackground }]}>
        {/* Handle */}
        <View style={styles.handleWrapper}>
          <View
            style={[
              styles.handle,
              { backgroundColor: isDark ? "#4d3c38" : "#e6dedb" },
            ]}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.iconButton}>
            <IconSymbol name="close" size={22} color={theme.text} />
          </Pressable>

          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Filters
          </Text>

          <Pressable onPress={() => {
            update({ cuisine: [] , priceIndex: 0 , rating: 4 , openNow: true })
          }}>
            <Text style={[styles.resetText, { color: theme.heavy}]}>
              Reset
            </Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled" 
            nestedScrollEnabled
        >
          {/* Cuisine */}
          <Section title="Cuisine Type" theme={theme}>
            <View style={styles.chipWrap}>
              {CUISINES.map((item) => {
                const selected = cuisine.includes(item);
                return (
                  <Pressable
                    key={item}
                    onPress={() => 
                      update({ 
                        cuisine: selected ? cuisine.filter((c) => c !== item) : [...cuisine, item]
                      })

                    }
                    style={[
                      styles.chip,
                      {
                        backgroundColor: selected
                          ? theme.heavy
                          : theme.muted,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: selected ? "#fff" : theme.text,
                        fontWeight: "600",
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Section>

          {/* Price */}
          <Section
            title="Price Range"
            right={
              <Text
                style={[
                  styles.badge,
                  {
                    color: theme.primary,
                    backgroundColor: theme.primary + "20",
                  },
                ]}
              >
                {PRICES[priceIndex]}
              </Text>
            }
            theme={theme}
          >
            <View style={[styles.priceGroup, { backgroundColor: theme.muted }]}>
              {PRICES.map((p, i) => (
                <Pressable
                  key={p}
                  onPress={() =>
                    update({ priceIndex: i })
                   }
                  style={[
                    styles.priceButton,
                    i === priceIndex && {
                      backgroundColor: theme.cardBackground,
                    },
                  ]}
                >
                  <Text style={{ color: theme.text, fontWeight: "700" }}>
                    {p}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Section>

          {/* Rating */}
          <Section
            title="Minimum Rating"
            right={
              <Text style={{ color: theme.heavy, fontWeight: "700" }}>
                ★ {rating.toFixed(1)}+
              </Text>
            }
            theme={theme}
          >
            <Slider
              minimumValue={0}
              maximumValue={5}
              value={rating}
              onValueChange={(v) => update({ rating: parseFloat(v.toFixed(1))})}
              minimumTrackTintColor={theme.heavy}
              maximumTrackTintColor={theme.border}
              thumbTintColor={theme.heavy}
              style={{ marginHorizontal: 16 , marginTop:15}}
            />
          </Section>

          {/* Open Now */}
          <View
            style={[
              styles.toggleCard,
              { backgroundColor: theme.muted },
            ]}
          >
            <View style={styles.toggleLabel}>
              <IconSymbol name="clock" size={20} color={theme.text} />
              <Text style={{ color: theme.text, fontWeight: "600" }}>
                Open Now
              </Text>
            </View>
            <Switch value={openNow} onValueChange={(v) => update({ openNow: v})} 
              thumbColor={openNow ? theme.heavy : theme.muted }
            />
            

          </View>
        </ScrollView>

      </View>
    </>
  );
}

/* -------------------- */
/* Reusable Section */
/* -------------------- */
function Section({
  title,
  right,
  children,
  theme,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  theme: any;
}) {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {title}
        </Text>
        {right}
      </View>
      {children}
    </View>
  );
}

/* -------------------- */
/* Styles */
/* -------------------- */
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "88%",
  },

  handleWrapper: {
    alignItems: "center",
    paddingVertical: 10,
  },

  handle: {
    width: 52,
    height: 5,
    borderRadius: 999,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  resetText: {
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  sectionHeaderRow: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 16,
  },

  chip: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: "600",
  },

  priceGroup: {
    flexDirection: "row",
    margin: 16,
    borderRadius: 999,
    padding: 4,
  },

  priceButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 999,
  },

  toggleCard: {
    margin: 16,
    padding: 16,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  toggleLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
  },

  applyButton: {
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  applyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

import { FilterPanel } from "@/components/explore/filterPanel";
import { PlaceDetailCard } from "@/components/ui/Card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { PlaceMarker, SelectedPlaceMarker } from "@/components/ui/marker";
import { Colors } from "@/constants/theme";
import { useLocationContext } from "@/contexts/LocationContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { fetchAllPlaces } from "@/services/placeService";
import { Filters } from "@/types/filter";
import { Place } from "@/types/place";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

// const places = [
//   {
//     id: 1,
//     name: "Sunrise Coffee",
//     description: "Cozy coffee shop with great pastries.",
//     address: "123 Morning St, Cityville",
//     latitude: 5.965418758200848,
//     longitude: 116.09353617558172,
//     priceRange: "$$",
//     status: "Open",
//     rating: 4.5,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     images: [
//       {
//         id: 1,
//         url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
//         isPrimary: true,
//         order: 1,
//       },
//       {
//         id: 2,
//         url: "https://picsum.photos/400/300?random=2",
//         isPrimary: false,
//         order: 2,
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "The Green Garden",
//     description: "Vegetarian-friendly cafe with organic dishes.",
//     address: "456 Leaf Ave, Townsville",
//     latitude: 5.963939157055727,
//     longitude: 116.09410798364631,
//     priceRange: "$$$",
//     status: "Closed",
//     rating: 3,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     images: [
//       {
//         id: 3,
//         url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
//         isPrimary: true,
//         order: 1,
//       },
//       {
//         id: 4,
//         url: "https://picsum.photos/400/300?random=4",
//         isPrimary: false,
//         order: 2,
//       },
//       {
//         id: 5,
//         url: "https://picsum.photos/400/300?random=5",
//         isPrimary: false,
//         order: 3,
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Oceanview Diner",
//     description: "Seafood restaurant with a scenic ocean view.",
//     address: "789 Bay Rd, Seaville",
//     latitude: 5.964766902408113,
//     longitude: 116.09300850264972,
//     priceRange: "$$$$",
//     status: "Open",
//     rating: 5.0,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     images: [
//       {
//         id: 6,
//         url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=4006",
//         isPrimary: true,
//         order: 1,
//       },
//       {
//         id: 7,
//         url: "https://picsum.photos/400/300?random=7",
//         isPrimary: false,
//         order: 2,
//       },
//     ],
//   },
// ];

export default function App() {
  const { data, error, isLoading } = useQuery<Place[], Error>({
    queryKey: ["allPlaces"],
    queryFn: fetchAllPlaces,
  });

  const places = data ?? [];

  const { location, loading } = useLocationContext();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Filters>({
    cuisine: [],
    priceIndex: 1,
    rating: 4,
    openNow: true,
  });

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  const selectedPlace = useMemo(
    () => places.find((p) => Number(p.id) === selectedId),
    [selectedId],
  );

  // if (loading || !location) {
  //   return <View style={styles.container} />;
  // }

  if (loading || !location) {
    return (
      <View style={styles.content}>
        {/* Illustration Card */}
        <View style={styles.illustrationCard}>
          {/* Decorative Lines */}
          <View style={styles.decorativeLineSmall} />
          <View style={styles.decorativeLineMedium} />
          <View style={styles.decorativeLineTiny} />

          <View style={styles.iconWrapper}>
            <MaterialIcons
              name="person-search"
              size={120}
              color="rgba(45,41,38,0.8)"
            />

            <View style={styles.badge}>
              <MaterialIcons name="question-mark" size={24} color="#2D2926" />
            </View>
          </View>
        </View>

        <Text style={styles.error_title}>Oops! We can't find you</Text>

        <Text style={styles.error_subtitle}>
          We're having trouble getting your location. Please check your GPS
          settings or try again.
        </Text>

        <TouchableOpacity style={styles.primaryButton}>
          <MaterialIcons name="refresh" size={20} color="#2D2926" />
          <Text style={styles.primaryButtonText}>Refresh Location</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.secondaryAction}>Enter Location Manually</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={[
          { featureType: "poi", stylers: [{ visibility: "off" }] }, // remove points of interest
          //  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] }, // map background
          // { elementType: "labels", stylers: [{ visibility: "off" }] }, // remove all labels
          // { featureType: "road", stylers: [{ visibility: "off" }] }, // remove roads
          // { featureType: "transit", stylers: [{ visibility: "off" }] }, // remove transit lines
          // { featureType: "water", stylers: [{ color: "#c9c9c9" }] }, // optional water color
        ]}
        onPress={() => setSelectedId(null)}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            onPress={() => setSelectedId(place.id)}
            anchor={{ x: 0.5, y: 1 }}
          >
            {selectedId === Number(place.id) ? (
              <View style={{ transform: [{ scale: 1.0 }] }}>
                <SelectedPlaceMarker />
              </View>
            ) : (
              <View style={{ transform: [{ scale: 0.7 }] }}>
                <PlaceMarker />
              </View>
            )}
            {/* {selectedId === place.id ? <SelectedPlaceMarker /> : <PlaceMarker />} */}
          </Marker>
        ))}
      </MapView>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.cardBackground,
            borderWidth: 1,
            borderColor: theme.border,
          },
        ]}
      >
        <IconSymbol
          name="search"
          size={24}
          color={theme.buttonBackground}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Serach for places"
          style={[styles.searchInput, { color: theme.text }]}
          placeholderTextColor={theme.secondaryText}
        />
        <Pressable
          style={styles.filterButton}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <IconSymbol name="filter" size={20} color={theme.text} />
        </Pressable>
      </View>

      {selectedPlace && (
        <View style={styles.bottomCard}>
          <PlaceDetailCard
            place={{
              name: selectedPlace.name,
              description: selectedPlace.description,
              rating: selectedPlace.rating,
              priceRange: selectedPlace.priceRange,
              status: selectedPlace.status,
              image:
                selectedPlace.images.find((img) => img.isPrimary)?.url ??
                selectedPlace.images[0]?.url,
            }}
          />
        </View>
      )}

      <FilterPanel
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        value={filterValues}
        onChange={setFilterValues}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },

  bottomCard: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rating: {
    fontWeight: "600",
  },

  price: {
    fontWeight: "600",
  },

  status: {
    fontWeight: "600",
    color: "green",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 10,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },

  error_container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 96,
  },

  illustrationCard: {
    width: 320,
    height: 320,
    backgroundColor: "#F2EBE3",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    overflow: "hidden",
  },

  decorativeLineSmall: {
    position: "absolute",
    top: 40,
    left: 40,
    width: 120,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#2D2926",
    opacity: 0.1,
  },

  decorativeLineMedium: {
    position: "absolute",
    top: 80,
    left: 80,
    width: 180,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#2D2926",
    opacity: 0.1,
  },

  decorativeLineTiny: {
    position: "absolute",
    bottom: 80,
    left: 40,
    width: 90,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#2D2926",
    opacity: 0.1,
  },

  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFB800",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    elevation: 6,
  },

  error_title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2D2926",
    marginBottom: 16,
    textAlign: "center",
  },

  error_subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
    marginBottom: 32,
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: "100%",
    maxWidth: 280,
    backgroundColor: "#FFB800",
    borderRadius: 999,
    gap: 8,
    elevation: 4,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D2926",
  },

  secondaryAction: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  navItem: {
    alignItems: "center",
    gap: 4,
  },

  navLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "500",
  },

  navLabelActive: {
    color: "#f45925",
    fontWeight: "700",
  },

  activeNavIcon: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(244,89,37,0.1)",
  },
});

import { FilterPanel } from "@/components/explore/filterPanel";
import { PlaceDetailCard } from "@/components/ui/Card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { PlaceMarker, SelectedPlaceMarker } from "@/components/ui/marker";
import { Colors } from "@/constants/theme";
import { useLocationContext } from "@/contexts/LocationContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Filters } from "@/types/filter";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const places = [
  {
    id: 1,
    name: "Sunrise Coffee",
    description: "Cozy coffee shop with great pastries.",
    address: "123 Morning St, Cityville",
    latitude: 5.965418758200848,
    longitude: 116.09353617558172,
    priceRange: "$$",
    status: "Open",
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        isPrimary: true,
        order: 1,
      },
      {
        id: 2,
        url: "https://picsum.photos/400/300?random=2",
        isPrimary: false,
        order: 2,
      },
    ],
  },
  {
    id: 2,
    name: "The Green Garden",
    description: "Vegetarian-friendly cafe with organic dishes.",
    address: "456 Leaf Ave, Townsville",
    latitude: 5.963939157055727,
    longitude: 116.09410798364631,
    priceRange: "$$$",
    status: "Closed",
    rating: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
        isPrimary: true,
        order: 1,
      },
      {
        id: 4,
        url: "https://picsum.photos/400/300?random=4",
        isPrimary: false,
        order: 2,
      },
      {
        id: 5,
        url: "https://picsum.photos/400/300?random=5",
        isPrimary: false,
        order: 3,
      },
    ],
  },
  {
    id: 3,
    name: "Oceanview Diner",
    description: "Seafood restaurant with a scenic ocean view.",
    address: "789 Bay Rd, Seaville",
    latitude: 5.964766902408113,
    longitude: 116.09300850264972,
    priceRange: "$$$$",
    status: "Open",
    rating: 5.0,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=4006",
        isPrimary: true,
        order: 1,
      },
      {
        id: 7,
        url: "https://picsum.photos/400/300?random=7",
        isPrimary: false,
        order: 2,
      },
    ],
  },
];

export default function App() {
  const { location, loading } = useLocationContext();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [ filterValues, setFilterValues] = useState<Filters>({
    cuisine: [],
    priceIndex: 1,
    rating: 4,
    openNow: true
  });

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  const selectedPlace = useMemo(
    () => places.find((p) => p.id === selectedId),
    [selectedId]
  );

  if (loading || !location) {
    return <View style={styles.container} />;
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
            {selectedId === place.id ? (
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
        <Pressable style={styles.filterButton} onPress={() => setFilterVisible(!filterVisible)}>
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
                selectedPlace.images[0].url,
            }}
          />
        </View>
      )}

      <FilterPanel
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        value = {filterValues}
        onChange = {setFilterValues}
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
});

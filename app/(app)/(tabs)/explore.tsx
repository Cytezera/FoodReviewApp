import { PlaceDetailCard } from "@/components/ui/Card";
import { PlaceMarker } from "@/components/ui/marker";
import { useLocationContext } from "@/contexts/LocationContext";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
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
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
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
            <PlaceMarker />
          </Marker>
        ))}
      </MapView>

      {selectedPlace && (
        <View style={styles.bottomCard}>
          <PlaceDetailCard
            place={{
              name: selectedPlace.name,
              description: selectedPlace.description,
              rating: selectedPlace.rating,
              priceRange: selectedPlace.priceRange,
              status: selectedPlace.status,
              image: selectedPlace.images.find((img) => img.isPrimary)?.url ?? selectedPlace.images[0].url,

            }}
          />
        </View>
      )}
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
});

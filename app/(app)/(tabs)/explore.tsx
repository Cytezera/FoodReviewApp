import { PlaceDetailCard } from "@/components/ui/Card"
import { PlaceMarker } from "@/components/ui/marker"
import { useLocationContext } from "@/contexts/LocationContext"
import React, { useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"
import MapView, { Marker } from "react-native-maps"

const places = [
  {
    id: 1,
    name: "Coffee Shop",
    description: "Coffee & pastries",
    address: "what",
    latitude: 5.964766902408113,
    longitude: 116.09300850264972,
    priceRange: "$$5",
    status: "Open",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Florist",
    description: "Flowers & more",
    address: "what",
    latitude: 5.965418758200848,
    longitude: 116.09353617558172,
    priceRange: "$$5",
    status: "Open",
    rating: 3.2,
  },
  {
    id: 3,
    name: "Bookstore",
    description: "Books & stationery",
    address: "what",
    latitude: 5.963939157055727,
    longitude: 116.09410798364631,
    priceRange: "$$5",
    status: "Open",
    rating: 5.0,
  },
]

export default function App() {
  const { location, loading } = useLocationContext()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selectedPlace = useMemo(
    () => places.find(p => p.id === selectedId),
    [selectedId]
  )

  if (loading || !location) {
    return <View style={styles.container} />
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
        {places.map(place => (
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

        {selectedPlace &&(
          <View style={styles.bottomCard}>
            <PlaceDetailCard place={{name: selectedPlace.name, description:selectedPlace.description, rating:selectedPlace.rating, priceRange:selectedPlace.priceRange, status:selectedPlace.status}} />
          </View>

        )}
        

    </View>
  )
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
})

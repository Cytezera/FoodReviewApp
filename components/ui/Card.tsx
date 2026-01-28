import { Image, StyleSheet, Text, View, ViewProps } from "react-native";

type CardProps = ViewProps & {
  children: React.ReactNode;
};

export function Card({ children, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,

    // subtle shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    // elevation (Android)
    elevation: 3,
  },
});

type Props = {
  place: {
    name: string;
    description: string;
    rating: number;
    priceRange: string;
    status: string;
    image: string;
  };
};

export function PlaceDetailCard({ place }: Props) {
  return (
    <View style={placeStyles.wrapper}>
      <Card style={placeStyles.card}>
        {/* Handle */}
        <View style={placeStyles.handleWrapper}>
          <View style={placeStyles.handle} />
        </View>

        {/* Content */}
        <View style={placeStyles.row}>
          <View style={placeStyles.image}>
            <Image source={{ uri: place.image }} style={placeStyles.image} />
          </View>

          <View style={placeStyles.details}>
            <Text style={placeStyles.title} numberOfLines={1}>
              {place.name}
            </Text>

            <Text style={placeStyles.subtitle} numberOfLines={1}>
              {place.description} • {place.priceRange}
            </Text>

            <View style={placeStyles.meta}>
              <Text style={placeStyles.rating}>⭐ {place.rating}</Text>
              <Text style={placeStyles.dot}>•</Text>
              <Text style={placeStyles.status}>{place.status}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={placeStyles.actions}>
          <View style={placeStyles.primaryBtn}>
            <Text style={placeStyles.primaryText}>Navigate</Text>
          </View>

          <View style={placeStyles.secondaryBtn}>
            <Text style={placeStyles.secondaryText}>View Details</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}
const placeStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    marginBottom: 0,
  },
  card: {
    borderRadius: 32,
  },
  handleWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  handle: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 20,
    backgroundColor: "#DDD",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  meta: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  rating: {
    fontWeight: "600",
  },
  dot: {
    color: "#AAA",
  },
  status: {
    fontWeight: "600",
    color: "green",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  primaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    fontWeight: "700",
  },
});

type PlaceHistoryProps = {
  place: {
    name: string;
    description: string;
    rating: number;
    image: string;
  };
};

export function PlaceHistoryCard({ place }: PlaceHistoryProps) {
  return (
    <Card style={historyStyles.card}>
      <View style={historyStyles.row}>
        {/* Image with rating badge */}
        <View style={historyStyles.imageWrapper}>
          <Image source={{ uri: place.image }} style={historyStyles.image} />
          <View style={historyStyles.ratingBadge}>
            <Text style={historyStyles.ratingText}>⭐ {place.rating}</Text>
          </View>
        </View>

        {/* Name & description */}
        <View style={historyStyles.details}>
          <Text style={historyStyles.name} numberOfLines={1}>
            {place.name}
          </Text>
          <Text style={historyStyles.description} numberOfLines={2}>
            {place.description}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const historyStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: "#DDD",
  },
  ratingBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

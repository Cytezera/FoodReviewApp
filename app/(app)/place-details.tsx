import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function RestaurantDetailsScreen() {
  return (
    <View style={styles.container}>
      {/* Top Nav */}
      <View style={styles.navbar}>
        <MaterialIcons name="arrow-back" size={24} color="#181611" />
        <Text style={styles.navTitle}>Restaurant Details</Text>
        <MaterialIcons name="favorite-border" size={24} color="#181611" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <ImageBackground
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJVpLEHK7XAaEM6Nc5fu75NBxJNZYPNQ1acsZmu3pjsp9McW0ysmJ2yJbtHBRHYA5gPsnzgcSypbPYa6qIUoJx0eAJIHXBPcrheJ-AGyQXjN5Ywn8YRlHP649a3UtZ6OBCwBOTqx1Uz2iVfBTvXASP9DrAdYBpVVoPQYgkFMZzlw0eYytHz3zUKk_-gXqvAl9RT03neg-nh-PHilAEwtpvDx4EfzInJ8UHmeU3HF17F00AlEtZ6IjSlhQy5HoKfiV0pvfjtfjbC0Zx",
          }}
          style={styles.headerImage}
        >
          <View style={styles.carouselDots}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </ImageBackground>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View>
              <Text style={styles.restaurantName}>La Dolce Vita</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.star}>★★★★☆</Text>
                <Text style={styles.ratingText}>4.5 (128 reviews)</Text>
              </View>
            </View>
            <Text style={styles.price}>$$</Text>
          </View>

          <View style={styles.openRow}>
            <View style={styles.openBadge}>
              <View style={styles.greenDot} />
              <Text style={styles.openText}>Open Now</Text>
            </View>
            <Text style={styles.openTime}>until 10:00 PM</Text>
          </View>

          <View style={styles.tags}>
            <Text style={styles.tag}>ITALIAN</Text>
            <Text style={styles.tag}>PIZZA</Text>
            <Text style={styles.tag}>PASTA</Text>
          </View>
        </View>

        {/* Special Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>

          <View style={styles.offerCard}>
            <View>
              <Text style={styles.offerTitle}>20% Off Lunch Menu</Text>
              <Text style={styles.offerSubtitle}>
                Valid Monday to Friday until 3 PM
              </Text>
            </View>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Claim Offer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <Text style={styles.link}>See All</Text>
          </View>

          <View style={styles.reviewCard}>
            <Text style={styles.reviewName}>Sophia Martinez</Text>
            <Text style={styles.reviewText}>
              The Truffle Pizza was absolutely divine. 🍕
            </Text>
          </View>

          <View style={styles.reviewCard}>
            <Text style={styles.reviewName}>James Wilson</Text>
            <Text style={styles.reviewText}>
              Great atmosphere for a date night. Amazing wine selection.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TextInput
          placeholder="Add a review..."
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  navbar: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  navTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#181611",
  },

  headerImage: {
    height: 280,
    justifyContent: "flex-end",
  },

  carouselDots: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 16,
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  infoCard: {
    backgroundColor: "#F2EBE3",
    marginHorizontal: 16,
    marginTop: -32,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },

  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  restaurantName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#181611",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  star: {
    color: "#FFB800",
    fontSize: 14,
  },

  ratingText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "600",
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    opacity: 0.6,
  },

  openRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  openBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1E6AD",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2d400d",
    marginRight: 6,
  },

  openText: {
    fontWeight: "700",
    fontSize: 12,
  },

  openTime: {
    marginLeft: 10,
    fontSize: 12,
    color: "#666",
  },

  tags: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
  },

  tag: {
    borderWidth: 1,
    borderColor: "#D1E6AD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 10,
    fontWeight: "700",
  },

  section: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  offerCard: {
    borderWidth: 2,
    borderColor: "#B35C44",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  offerTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  offerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  offerButton: {
    backgroundColor: "#f9b406",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },

  offerButtonText: {
    fontWeight: "700",
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    color: "#f9b406",
    fontWeight: "700",
  },

  reviewCard: {
    backgroundColor: "#F2EBE3",
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },

  reviewName: {
    fontWeight: "700",
    marginBottom: 6,
  },

  reviewText: {
    fontSize: 14,
    color: "#444",
  },

  bottomBar: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  postButton: {
    backgroundColor: "#f9b406",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },

  postText: {
    fontWeight: "700",
  },
});

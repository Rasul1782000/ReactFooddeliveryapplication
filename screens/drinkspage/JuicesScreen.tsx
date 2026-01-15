import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const JuicePageScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Juices");

  const categories: string[] = [
    "Soft Drinks",
    "Juices",
    "Smoothies",
    "Coffee",
    "Tea",
    "Energy",
  ];

  const juices = [
    {
      id: 1,
      name: "Pure Orange",
      description: "100% Squeezed Citrus",
      price: 2.48,
      image: "https://plus.unsplash.com/premium_photo-1667543228378-ec4478ab2845?w=600",
      rating: "4.9",
    },
    {
      id: 2,
      name: "Tropical Mango",
      description: "Velvety & Honey-Sweet",
      price: 2.75,
      image: "https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?w=600",
      rating: "4.8",
    },
    {
      id: 3,
      name: "Crisp Apple",
      description: "Naturally Sweet & Tart",
      price: 2.75,
      image: "https://plus.unsplash.com/premium_photo-1724711441081-5c4199721ad7?w=600",
      rating: "4.7",
    },
    {
      id: 4,
      name: "Ruby Cherry",
      description: "Balanced Sweet & Tart",
      price: 2.75,
      image: "https://plus.unsplash.com/premium_photo-1687977547550-9eec1b522b40?w=600",
      rating: "4.9",
    },
    {
      id: 5,
      name: "Wild Grape",
      description: "Hydrating Superfruit",
      price: 2.75,
      image: "https://images.unsplash.com/photo-1713774786475-95a1e13b5572?w=600",
      rating: "4.6",
    },
    {
      id: 6,
      name: "Energy Banana",
      description: "Creamy Potassium Boost",
      price: 2.75,
      image: "https://images.unsplash.com/photo-1707219811295-0f283760668b?w=600",
      rating: "4.5",
    },
    {
      id: 7,
      name: "Summer Berry",
      description: "Juicy Fragrant Strawberry",
      price: 2.75,
      image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600",
      rating: "4.8",
    },
    {
      id: 8,
      name: "Zesty Kiwi",
      description: "Vibrant Vitamin C Pack",
      price: 2.75,
      image: "https://plus.unsplash.com/premium_photo-1695035006994-20ae722d8665?w=600",
      rating: "4.7",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.tagline}>NATURAL BLENDS 🍊</Text>
          <Text style={styles.title}>Premium Juices</Text>
        </View>

        <View style={styles.searchSection}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search freshly squeezed..."
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setActiveCategory(category)}
              style={[
                styles.categoryItem,
                activeCategory === category && styles.categoryItemActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {juices.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={styles.card}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.ratingBadge}>
                  <Text style={styles.star}>⭐ </Text>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.itemPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                  <View style={styles.addButton}>
                    <Text style={styles.plusSign}>+</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E12",
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 12,
  },
  tagline: {
    color: "#f97316",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 4,
    letterSpacing: -0.5,
  },
  searchSection: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#161B22",
    borderRadius: 16,
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#232931",
    height: 56,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    color: "white",
    paddingHorizontal: 12,
    fontSize: 15,
    fontWeight: "500",
  },
  categoryScroll: {
    marginTop: 24,
    maxHeight: 50,
  },
  categoryContent: {
    paddingRight: 20,
  },
  categoryItem: {
    backgroundColor: "#161B22",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#232931",
  },
  categoryItemActive: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },
  categoryText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "700",
  },
  categoryTextActive: {
    color: "white",
  },
  grid: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#111418",
    borderRadius: 24,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1F242B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  imageContainer: {
    height: 160,
    width: "100%",
    backgroundColor: "#1C2128",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 10,
  },
  ratingText: {
    color: "white",
    fontWeight: "900",
    fontSize: 11,
  },
  infoContainer: {
    padding: 14,
  },
  itemName: {
    color: "white",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  itemDescription: {
    color: "#8E949D",
    fontSize: 12,
    marginTop: 5,
    lineHeight: 16,
    height: 32,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  itemPrice: {
    color: "white",
    fontSize: 19,
    fontWeight: "900",
  },
  addButton: {
    backgroundColor: "#1F242B",
    width: 36,
    height: 36,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f97316",
  },
  plusSign: {
    color: "#f97316",
    fontWeight: "bold",
    fontSize: 22,
    marginTop: -2, // Optical alignment
  },
});

export default JuicePageScreen;
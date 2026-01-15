import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/** * Navigation Param List 
 * This ensures TypeScript knows which routes are valid.
 */
export type RootStackParamList = {
  SoftDrinksPage: undefined;
  JuicePage: undefined;
  SmoothiesPage: undefined;
  CoffeePage: undefined;
  TeaPage: undefined;
  DrinksPage: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const SmoothiesPageScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  
  // State for active category highlighting
  const [activeCategory, setActiveCategory] = useState("Smoothies");

  const categories: string[] = ["Soft Drinks", "Juices", "Smoothies", "Coffee", "Tea", "Energy"];
  
  const categoryRouteMap: Record<string, keyof RootStackParamList> = {
    "Soft Drinks": "SoftDrinksPage",
    "Juices": "JuicePage",
    "Smoothies": "SmoothiesPage",
    "Coffee": "CoffeePage",
    "Tea": "TeaPage",
    "Energy": "DrinksPage",
  };

  const smoothieItems = [
    { id: 1, name: "Tropical Glow", desc: "Mango & Coconut", price: 5.99, cal: "210 kcal", img: "https://images.unsplash.com/photo-1544145945-f904253d0c71?w=400" },
    { id: 2, name: "Berry Blast", desc: "Blueberry & Yogurt", price: 6.49, cal: "185 kcal", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400" },
    { id: 3, name: "Green Detox", desc: "Spinach & Apple", price: 5.75, cal: "140 kcal", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
    { id: 4, name: "Protein Punch", desc: "Banana & Whey", price: 7.25, cal: "320 kcal", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400" },
    { id: 5, name: "Midnight Acai", desc: "Acai & Granola", price: 8.50, cal: "280 kcal", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400" },
    { id: 6, name: "Sunset Peach", desc: "Peach & Oats", price: 6.25, cal: "195 kcal", img: "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=400" }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0E12" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        
        {/* HEADER */}
        <View style={{ marginTop: 12 }}>
          <Text style={{ color: "#f97316", fontSize: 14, fontWeight: "700", letterSpacing: 1 }}>
            HEALTHY BLENDS 🌿
          </Text>
          <Text style={{ color: "white", fontSize: 28, fontWeight: "900" }}>Smoothies</Text>
        </View>

        {/* SEARCH BAR */}
        <View style={{ 
          marginTop: 20, 
          flexDirection: 'row', 
          backgroundColor: "#1C1F26", 
          borderRadius: 15, 
          alignItems: 'center', 
          paddingHorizontal: 15, 
          borderWidth: 1, 
          borderColor: "#2D3139" 
        }}>
          <Text style={{ fontSize: 18 }}>🔍</Text>
          <TextInput 
            placeholder="Search your blend..." 
            placeholderTextColor="#6B7280" 
            style={{ flex: 1, color: "white", paddingVertical: 12, paddingHorizontal: 10 }} 
          />
        </View>

        {/* CATEGORIES CHIPS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 24 }}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => {
                setActiveCategory(cat);
                // Use type assertion 'as never' to handle navigation route safety if needed
                navigation.navigate(categoryRouteMap[cat] as never);
              }} 
              style={{ 
                backgroundColor: activeCategory === cat ? "#f97316" : "#1C1F26", 
                paddingVertical: 10, 
                paddingHorizontal: 20, 
                borderRadius: 25, 
                marginRight: 10 
              }}
            >
              <Text style={{ color: activeCategory === cat ? "white" : "#9CA3AF", fontWeight: "700" }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* GRID ITEMS */}
        <View style={{ marginTop: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {smoothieItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              activeOpacity={0.8}
              style={{ 
                width: CARD_WIDTH, 
                backgroundColor: "#15181E", 
                borderRadius: 20, 
                marginBottom: 20, 
                overflow: 'hidden', 
                borderWidth: 1, 
                borderColor: "#23262E" 
              }}
            >
              <View>
                <Image source={{ uri: item.img }} style={{ width: "100%", height: 160 }} />
                <View style={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10, 
                  backgroundColor: 'rgba(11, 14, 18, 0.7)', 
                  paddingHorizontal: 8, 
                  paddingVertical: 4, 
                  borderRadius: 10 
                }}>
                  <Text style={{ color: '#f97316', fontWeight: '800', fontSize: 12 }}>{item.cal}</Text>
                </View>
              </View>
              <View style={{ padding: 12 }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "800" }} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }} numberOfLines={1}>
                  {item.desc}
                </Text>
                <Text style={{ color: "#f97316", fontSize: 18, fontWeight: "900", marginTop: 8 }}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SmoothiesPageScreen;
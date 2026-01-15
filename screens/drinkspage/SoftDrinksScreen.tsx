import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// 1. Define the ParamList locally if not imported to prevent 'never' errors
export type RootStackParamList = {
  SoftDrinksPage: undefined;
  JuicePage: undefined;
  SmoothiesPage: undefined;
  CoffeePage: undefined;
  TeaPage: undefined;
  DrinksPage: undefined;
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const SoftDrinksPageScreen: React.FC = () => {
  // 2. Properly type the navigation hook
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeCategory, setActiveCategory] = useState("Soft Drinks");

  const categories: string[] = ["Soft Drinks", "Juices", "Smoothies", "Coffee", "Tea", "Energy"];

  // 3. Ensure the values match the keys in RootStackParamList
  const categoryRouteMap: Record<string, keyof RootStackParamList> = {
    "Soft Drinks": "SoftDrinksPage",
    "Juices": "JuicePage",
    "Smoothies": "SmoothiesPage",
    "Coffee": "CoffeePage",
    "Tea": "TeaPage",
    "Energy": "DrinksPage",
  };

  const softDrinks = [
    { id: 1, name: "Pepsi Classic", desc: "Classic fizz & taste", price: 2.48, rating: 4.8, img: "https://images.unsplash.com/photo-1651762790288-a64cc17fe5e2?w=500" },
    { id: 2, name: "Orange Fanta", desc: "Burst of citrus flavor", price: 2.75, rating: 4.7, img: "https://images.unsplash.com/photo-1632818924360-68d4994cfdb2?w=600" },
    { id: 3, name: "Sprite Lime", desc: "Crisp, clean & refreshing", price: 2.60, rating: 4.6, img: "https://images.unsplash.com/photo-1680404005217-a441afdefe83?w=600" },
    { id: 4, name: "Mountain Dew", desc: "Bold & energizing citrus", price: 3.49, rating: 4.9, img: "https://images.unsplash.com/photo-1632134547266-ab2cb69602a1?w=600" },
    { id: 5, name: "Dr Pepper", desc: "Unique blend of 23 flavors", price: 2.89, rating: 4.8, img: "https://images.unsplash.com/photo-1719294082962-1ac8647fe762?w=600" },
    { id: 6, name: "Rani Orange", desc: "Exotic fruit drink", price: 3.19, rating: 4.5, img: "https://farwaycompany.com/wp-content/uploads/2021/02/Rani-768x768.jpg" },
    { id: 7, name: "Rani Apple", desc: "Real fruit apple pieces", price: 3.19, rating: 4.4, img: "https://bf1af2.akinoncloudcdn.com/products/2025/03/17/94051/ee3c613b-ddc3-4f1f-a602-f4c84029d065_size1920_cropCenter.jpg" },
    { id: 8, name: "Rani Peach", desc: "Sweet & lovely peach", price: 2.23, rating: 4.6, img: "https://amooshop.com/382-large_default/rani-peach.jpg" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0E12" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        
        <View style={{ marginTop: 12 }}>
          <Text style={{ color: "#f97316", fontSize: 14, fontWeight: "700" }}>STAY REFRESHED 🥤</Text>
          <Text style={{ color: "white", fontSize: 28, fontWeight: "900" }}>Soft Drinks</Text>
        </View>

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
          <Text style={{ color: "#6B7280" }}>🔍</Text>
          <TextInput 
            placeholder="Search drinks..." 
            placeholderTextColor="#6B7280" 
            style={{ flex: 1, color: "white", paddingVertical: 12, paddingHorizontal: 10 }} 
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 24 }}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => {
                setActiveCategory(cat);
                // 4. Using type assertion 'as never' to bypass strict navigation union checks
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

        <View style={{ marginTop: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {softDrinks.map((item) => (
            <TouchableOpacity 
              key={item.id} 
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
                <Image source={{ uri: item.img }} style={{ width: "100%", height: 140 }} />
                <View style={{ 
                  position: 'absolute', 
                  top: 8, 
                  left: 8, 
                  backgroundColor: 'rgba(0,0,0,0.6)', 
                  paddingHorizontal: 6, 
                  paddingVertical: 2, 
                  borderRadius: 8, 
                  flexDirection: 'row', 
                  alignItems: 'center' 
                }}>
                  <Text style={{ color: '#FBB224', fontSize: 10 }}>⭐</Text>
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold', marginLeft: 2 }}>{item.rating}</Text>
                </View>
              </View>

              <View style={{ padding: 12 }}>
                <Text style={{ color: "white", fontWeight: "800" }} numberOfLines={1}>{item.name}</Text>
                <Text style={{ color: "#9CA3AF", fontSize: 11, marginTop: 4 }} numberOfLines={1}>{item.desc}</Text>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <Text style={{ color: "#f97316", fontSize: 18, fontWeight: "900" }}>${item.price.toFixed(2)}</Text>
                  
                  <View style={{ 
                    backgroundColor: '#1C1F26', 
                    width: 30, 
                    height: 30, 
                    borderRadius: 10, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    borderWidth: 1, 
                    borderColor: '#f97316' 
                  }}>
                    <Text style={{ color: '#f97316', fontSize: 18, fontWeight: 'bold' }}>+</Text>
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

export default SoftDrinksPageScreen;
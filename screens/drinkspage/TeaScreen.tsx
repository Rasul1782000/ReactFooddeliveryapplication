import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

const TeaPageScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeCategory, setActiveCategory] = useState("Tea");

  const categories: string[] = ["Soft Drinks", "Juices", "Smoothies", "Coffee", "Tea", "Energy"];
  
  const categoryRouteMap: Record<string, keyof RootStackParamList> = {
    "Soft Drinks": "SoftDrinksPage",
    "Juices": "JuicePage",
    "Smoothies": "SmoothiesPage",
    "Coffee": "CoffeePage",
    "Tea": "TeaPage",
    "Energy": "DrinksPage",
  };

  const teaItems = [
    { id: 1, name: "Matcha Latte", desc: "Ceremonial Matcha", price: 5.50, rating: 4.9, img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400" },
    { id: 2, name: "Earl Grey", desc: "Bergamot Blend", price: 3.25, rating: 4.7, img: "https://images.unsplash.com/photo-1594631252845-59fc395ac956?w=400" },
    { id: 3, name: "Hibiscus Ice", desc: "Tart & Floral", price: 4.00, rating: 4.8, img: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400" },
    { id: 4, name: "Chamomile", desc: "Calming Herbal", price: 3.50, rating: 4.6, img: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?w=400" }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0E12" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        
        <View style={{ marginTop: 12 }}>
          <Text style={{ color: "#f97316", fontSize: 14, fontWeight: "700", letterSpacing: 1 }}>CALM & SOOTHE 🍵</Text>
          <Text style={{ color: "white", fontSize: 28, fontWeight: "900", marginTop: 4 }}>Tea Collections</Text>
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
            placeholder="Find your favorite leaf..." 
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
          {teaItems.map((item) => (
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
              <Image source={{ uri: item.img }} style={{ width: "100%", height: 140 }} />
              <View style={{ padding: 12 }}>
                <Text style={{ color: "white", fontWeight: "800" }} numberOfLines={1}>{item.name}</Text>
                <Text style={{ color: "#9CA3AF", fontSize: 11, marginTop: 2 }} numberOfLines={1}>{item.desc}</Text>
                
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

export default TeaPageScreen;
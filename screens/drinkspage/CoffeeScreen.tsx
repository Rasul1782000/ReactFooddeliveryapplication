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

const CoffeePageScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeCategory, setActiveCategory] = useState("Coffee");

  const categories: string[] = ["Soft Drinks", "Juices", "Smoothies", "Coffee", "Tea", "Energy"];
  
  const categoryRouteMap: Record<string, keyof RootStackParamList> = {
    "Soft Drinks": "SoftDrinksPage",
    "Juices": "JuicePage",
    "Smoothies": "SmoothiesPage",
    "Coffee": "CoffeePage",
    "Tea": "TeaPage",
    "Energy": "DrinksPage",
  };

  const coffeeItems = [
    { id: 1, name: "Iced Caramel", desc: "Espresso & Caramel", price: 4.50, img: "https://images.unsplash.com/photo-1572442388796-11668a67e13a?w=400" },
    { id: 2, name: "Vanilla Latte", desc: "Creamy Steamed Milk", price: 4.25, img: "https://images.unsplash.com/photo-1595434066389-99c307323bc0?w=400" },
    { id: 3, name: "Dark Espresso", desc: "Bold Intense Roast", price: 3.50, img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400" },
    { id: 4, name: "Mocha Frappe", desc: "Choco & Cream", price: 5.25, img: "https://images.unsplash.com/photo-1572286258217-215cf996c561?w=400" },
    { id: 5, name: "Cappuccino", desc: "Rich Foam & Cinnamon", price: 4.00, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400" },
    { id: 6, name: "Cold Brew", desc: "12-hour Steeped Coffee", price: 4.75, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0E12" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        
        <View style={{ marginTop: 12 }}>
          <Text style={{ color: "#f97316", fontSize: 14, fontWeight: "700", letterSpacing: 1 }}>
            BREWED FRESH ☕
          </Text>
          <Text style={{ color: "white", fontSize: 28, fontWeight: "900", marginTop: 4 }}>
            Coffee Selection
          </Text>
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
            placeholder="Search your roast..." 
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
                // Use 'as never' to handle the string-to-route-name transition smoothly
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
          {coffeeItems.map((item) => (
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
                <Text style={{ color: "#9CA3AF", fontSize: 11, marginTop: 4 }} numberOfLines={1}>{item.desc}</Text>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <Text style={{ color: "#f97316", fontSize: 18, fontWeight: "900" }}>
                    ${item.price.toFixed(2)}
                  </Text>
                  <View style={{ 
                    backgroundColor: '#f97316', 
                    width: 28, 
                    height: 28, 
                    borderRadius: 8, 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
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

export default CoffeePageScreen;
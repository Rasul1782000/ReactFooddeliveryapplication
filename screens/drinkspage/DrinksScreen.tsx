import React, { FC, useState } from "react";
import { Dimensions, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  YStack,
  XStack,
  Text,
  ScrollView,
  Image,
  View,
  Button,
  Theme,
  styled,
  Circle,
} from "tamagui";
import {
  Search,
  Plus,
  Star,
  ChevronLeft,
  ShoppingBag,
} from "@tamagui/lucide-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2; // Adjusted for better margins

export type RootStackParamList = {
  DrinksPage: undefined;
  SoftDrinksPage: undefined;
  JuicePage: undefined;
  SmoothiesPage: undefined;
  CoffeePage: undefined;
  TeaPage: undefined;
  EnergyPage: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const categoryRouteMap: Record<string, keyof RootStackParamList> = {
  "Soft Drinks": "SoftDrinksPage",
  Juices: "JuicePage",
  Smoothies: "SmoothiesPage",
  Coffee: "CoffeePage",
  Tea: "TeaPage",
  Energy: "DrinksPage",
};

const CompactCard = styled(YStack, {
  width: CARD_WIDTH,
  backgroundColor: "#1A1D23",
  borderRadius: "$8",
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "#2D3139",
  marginBottom: "$4",
  pressStyle: { scale: 0.96 },
});

const DrinksPageScreen: FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["Soft Drinks", "Juices", "Smoothies", "Coffee", "Tea", "Energy"];

  const popularItems = [
    {
      id: 1,
      name: "Coca-Cola",
      description: "Classic • Refreshing",
      price: 2.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1603505404454-5f67e1995b37?w=600",
    },
    {
      id: 2,
      name: "Orange Juice",
      description: "Cold-pressed • Fresh",
      price: 4.49,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1689066117649-0ca9762fc92c?w=600",
    },
    {
      id: 3,
      name: "Iced Latte",
      description: "Smooth • Espresso",
      price: 4.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1578314674380-1fafbe9e3530?w=600",
    },
    {
      id: 4,
      name: "Berry Smoothie",
      description: "Mixed • Yogurt",
      price: 5.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=600",
    },
  ];

  return (
    <Theme name="dark">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0E12" }}>
        {/* Header Section */}
        <XStack paddingHorizontal="$4" paddingVertical="$3" justifyContent="space-between" alignItems="center">
          <Button 
            circular 
            size="$5" // Increased size for better tap target
            backgroundColor="#1C1F26" 
            icon={<ChevronLeft size={24} color="white" />} // Increased Icon Size
            onPress={() => navigation.goBack()} 
            elevation="$2"
          />
          <YStack alignItems="center">
            <Text color="#f97316" fontSize="$2" fontWeight="800" textTransform="uppercase" letterSpacing={2}>THIRSTY? 🥤</Text>
            <Text color="white" fontSize="$6" fontWeight="900">Find Drinks</Text>
          </YStack>
          <Circle size={50} backgroundColor="#1C1F26" elevation="$2">
             <ShoppingBag size={22} color="white" /> 
          </Circle>
        </XStack>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <YStack paddingHorizontal="$4">
            {/* Search Bar */}
            <XStack 
              marginTop="$4" 
              backgroundColor="#1C1F26" 
              borderRadius="$10" 
              alignItems="center" 
              paddingHorizontal="$4" 
              borderWidth={1} 
              borderColor="#2D3139"
            >
              <Search size={22} color="#9CA3AF" />
              <TextInput
                placeholder={"Search drinks or cafés"}
                placeholderTextColor="#6B7280"
                style={{
                  flex: 1,
                  color: "white",
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  fontSize: 16,
                }}
              />
            </XStack>

            {/* Categories */}
            <YStack marginTop="$6" gap="$4">
              <Text color="white" fontSize="$5" fontWeight="800">Drink Types</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <XStack gap="$3">
                  {categories.map((c) => (
                    <TouchableOpacity
                      key={c}
                      onPress={() => {
                        setActiveCategory(c);
                        navigation.navigate(categoryRouteMap[c] as any);
                      }}
                      style={{
                        backgroundColor: activeCategory === c ? "#f97316" : "#1C1F26",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 25,
                        borderWidth: 1,
                        borderColor: activeCategory === c ? "#f97316" : "#2D333B",
                      }}
                    >
                      <Text color={activeCategory === c ? "white" : "#9CA3AF"} fontWeight="700" fontSize="$3">{c}</Text>
                    </TouchableOpacity>
                  ))}
                </XStack>
              </ScrollView>
            </YStack>

            {/* Grid Section */}
            <YStack marginTop="$7">
              <XStack justifyContent="space-between" alignItems="flex-end" marginBottom="$4">
                <YStack>
                  <Text color="white" fontSize="$5" fontWeight="800">Popular Drinks</Text>
                  <Text color="#6B7280" fontSize="$2">Cool, refreshing favorites</Text>
                </YStack>
                <Text color="#f97316" fontWeight="700">See All</Text>
              </XStack>
              
              <XStack flexWrap="wrap" justifyContent="space-between">
                {popularItems.map((item) => (
                  <CompactCard key={item.id}>
                    <View height={150} width="100%">
                      <Image source={{ uri: item.image }} width="100%" height="100%" resizeMode="cover" />
                      <XStack 
                        position="absolute" 
                        top={10} 
                        right={10} // Moved to right for better balance
                        backgroundColor="rgba(0,0,0,0.7)" 
                        paddingHorizontal="$2.5" 
                        paddingVertical="$1.5" 
                        borderRadius="$4" 
                        alignItems="center" 
                        gap="$1"
                      >
                        <Star size={12} color="#FBB224" fill="#FBB224" />
                        <Text color="white" fontSize="$1" fontWeight="bold">{item.rating}</Text>
                      </XStack>
                    </View>

                    <YStack padding="$3.5" gap="$1">
                      <Text color="white" fontSize="$4" fontWeight="800" numberOfLines={1}>{item.name}</Text>
                      <Text color="#9CA3AF" fontSize="$2" numberOfLines={1}>{item.description}</Text>
                      
                      <XStack justifyContent="space-between" alignItems="center" marginTop="$3">
                        <Text color="white" fontSize="$5" fontWeight="900">${item.price.toFixed(2)}</Text>
                        <Circle 
                          size={38} 
                          backgroundColor="#f97316" 
                          pressStyle={{ opacity: 0.8, scale: 0.9 }}
                          elevation="$2"
                        >
                          <Plus size={20} color="white" strokeWidth={3} />
                        </Circle>
                      </XStack>
                    </YStack>
                  </CompactCard>
                ))}
              </XStack>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Theme>
  );
};

export default DrinksPageScreen;
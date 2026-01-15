import React, { FC } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const SnacksPageScreen: FC = () => {
  const categories: string[] = ["Pizza", "Burgers", "Drinks", "Desserts", "Snacks"]; 

  const popularItems = [

    {
      id: 2,
      name: "Classic Beef Burger",
      description: "Juicy · Fresh veggies",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
      id: 3,
      name: "Vegan Salad Bowl",
      description: "Fresh greens · Healthy",
      price: 8.49,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    },
    {
      id: 4,
      name: "Chocolate Lava Cake",
      description: "Warm · Gooey center",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
      id: 5,
      name: "Sushi Platter",
      description: "Fresh · Assorted",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1609732858591-725d6f2af10b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
        style={{ paddingHorizontal: 18 }}
      >
        {/* HEADER */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "#f97316", fontSize: 13, fontWeight: "600" }}>Welcome back 👋</Text>
          <Text style={{ color: "white", fontSize: 26, fontWeight: "800", marginTop: 4 }}>
            Find your favorite food
          </Text>
        </View>

        {/* SEARCH */}
        <View style={{ marginTop: 14 }}>
          <View
            style={{
              backgroundColor: "#0d0d0d",
              borderRadius: 18,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: "#1f1f1f"
            }}
          >
            <TextInput
              placeholder="Search for food or restaurants"
              placeholderTextColor="#888"
              style={{ color: "white", fontSize: 14 }}
            />
          </View>
        </View>

        {/* CATEGORIES */}
        <View style={{ marginTop: 22 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: 4 }}>Categories</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {categories.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={{
                    backgroundColor: "#f97316",
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 9999
                  }}
                >
                  <Text style={{ color: "#000", fontWeight: "700" }}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* POPULAR */}
        <View style={{ marginTop: 22 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>Popular Near You</Text>
          <Text style={{ color: "#aaaaaa", fontSize: 12 }}>Hand‑picked meals you’ll love</Text>
        </View>

        {/* CARDS */}
        <View style={{ marginTop: 14, gap: 16 }}>
          {popularItems.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "#0d0d0d",
                borderRadius: 22,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#1f1f1f"
              }}
            >
              <Image source={{ uri: item.image }} style={{ width: "100%", height: 170 }} />

              <View style={{ padding: 14 }}>
                <Text style={{ color: "white", fontWeight: "800", fontSize: 14 }}>{item.name}</Text>
                <Text style={{ color: "#9ca3af", marginTop: 4 }}>{item.description}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                  <Text style={{ color: "white", fontWeight: "900" }}>${item.price.toFixed(2)}</Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#f97316",
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 16
                    }}
                  >
                    <Text style={{ color: "black", fontWeight: "800" }}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SnacksPageScreen;

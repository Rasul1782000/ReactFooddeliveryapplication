import React, { FC, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView
} from "react-native";

const { width, height } = Dimensions.get("window");

// Dessert extras with images and prices
const extrasData = [
  { name: "Fruit", price: 1, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&auto=format&fit=crop&q=60" },
  { name: "Caramel", price: 0.75, image: "https://images.unsplash.com/photo-1611516081814-55d97d5a7488?w=500&auto=format&fit=crop&q=60" },
  { name: "Ice Cream Scoop", price: 2, image: "https://images.unsplash.com/photo-1625234969503-49c7f28bc6ec?w=500&auto=format&fit=crop&q=60" },
  { name: "Chocolate Chips", price: 1, image: "https://images.unsplash.com/photo-1585503100597-d70e5dc45d81?w=500&auto=format&fit=crop&q=60" },
  { name: "Whipped Cream", price: 0.75, image: "https://images.unsplash.com/photo-1590917840205-c1969cffd568?w=500&auto=format&fit=crop&q=60" },
  { name: "Nuts", price: 1, image: "https://images.unsplash.com/photo-1731970820254-b433f531be25?w=500&auto=format&fit=crop&q=60" }
];

// Popular desserts
const popularDesserts = [
  {
    id: 1,
    name: "Chocolate Lava Cake",
    description: "Warm, gooey chocolate center",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake with fresh strawberries",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1622622008494-60c9e6b41996?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate syrup",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1657225953401-5f95007fc8e0?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Fruit Tart",
    description: "Seasonal fruits on a crispy tart shell",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1570145820404-cf22b115b06f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Orange Cake",
    description: "Seasonal Orange delight",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1702745100328-fe7a353d11e9?w=500&auto=format&fit=crop&q=60"
  }
];

// Toggle options with images
const toggleOptionsData = [
  { label: "Extra Chocolate", price: 1, image: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=500&auto=format&fit=crop&q=60" },
  { label: "Whipped Cream", price: 0.75, image: "https://images.unsplash.com/photo-1659007747376-3811b34e458f?w=500&auto=format&fit=crop&q=60" },
  { label: "Sprinkles", price: 0.5, image: "https://images.unsplash.com/photo-1516746924755-babd21844370?w=500&auto=format&fit=crop&q=60" },
  { label: "Nuts", price: 1, image: "https://plus.unsplash.com/premium_photo-1726768984120-f476b15835f2?w=500&auto=format&fit=crop&q=60" }
];

const DessertPageScreen: FC = () => {
  const [size, setSize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "Extra Chocolate": false,
    "Whipped Cream": false,
    "Sprinkles": false,
    "Nuts": false
  });
  const [extras, setExtras] = useState<string[]>([]);

  const toggleOption = (label: string) => {
    setToggleStates(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleExtra = (item: string) => {
    setExtras(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  const selectDessert = (dessert: typeof popularDesserts[0]) => {
    // Reset all
    setToggleStates({
      "Extra Chocolate": false,
      "Whipped Cream": false,
      "Sprinkles": false,
      "Nuts": false
    });
    setExtras([]);

    // Auto-select based on dessert
    if (dessert.name.includes("Chocolate")) toggleOption("Extra Chocolate");
    if (dessert.name.includes("Sundae") || dessert.name.includes("Cheesecake")) toggleOption("Whipped Cream");
    if (dessert.name.includes("Sundae")) toggleOption("Sprinkles");
    if (dessert.name.includes("Tart")) toggleOption("Nuts");
  };

  // Price calculation
  const basePrice = 5.99;
  const sizeUpcharge = size === "Small" ? 0 : size === "Medium" ? 1.5 : 3;
  const togglePrice = Object.entries(toggleStates).reduce((acc, [key, value]) => {
    const option = toggleOptionsData.find(o => o.label === key);
    return value && option ? acc + option.price : acc;
  }, 0);
  const extrasPrice = extras.reduce((acc, item) => {
    const extraItem = extrasData.find(e => e.name === item);
    return extraItem ? acc + extraItem.price : acc;
  }, 0);

  const total = (basePrice + sizeUpcharge + togglePrice + extrasPrice).toFixed(2);
  const cardWidth = width * 0.7;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0B0B" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE */}
        <Image
          source={{ uri: "https://plus.unsplash.com/premium_photo-1705433052895-752216a6a0f5?w=500&auto=format&fit=crop&q=60" }}
          style={{ width, height: height * 0.3 }}
        />

        <View style={{ padding: 20, gap: 20 }}>
          {/* TITLE */}
          <View>
            <Text style={{ color: "#f97316", fontWeight: "700", fontSize: 14 }}>DESSERT DELIGHTS 🍰</Text>
            <Text style={{ color: "white", fontSize: 28, fontWeight: "900", marginTop: 4 }}>
              Build Your Perfect Dessert
            </Text>
            <Text style={{ color: "#9ca3af", marginTop: 6 }}>
              Customize everything — toppings, sauces, and extras.
            </Text>
          </View>

          {/* POPULAR DESSERTS */}
          <View>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Popular Desserts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ gap: 16 }}>
              {popularDesserts.map(item => (
                <TouchableOpacity key={item.id} onPress={() => selectDessert(item)}>
                  <View
                    style={{
                      backgroundColor: "#111",
                      borderRadius: 20,
                      width: cardWidth,
                      marginRight: 16,
                      overflow: "hidden",
                      shadowColor: "#000",
                      shadowOpacity: 0.2,
                      shadowRadius: 10,
                      shadowOffset: { width: 0, height: 5 }
                    }}
                  >
                    <Image source={{ uri: item.image }} style={{ width: "100%", height: 160 }} />
                    <View style={{ padding: 16, gap: 6 }}>
                      <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>{item.name}</Text>
                      <Text style={{ color: "#9ca3af", fontSize: 12 }}>{item.description}</Text>
                      <Text style={{ color: "white", fontWeight: "900", fontSize: 16, marginTop: 6 }}>${item.price.toFixed(2)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* SIZE SELECT */}
          <View style={{ backgroundColor: "#111", padding: 16, borderRadius: 16 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "800" }}>Choose Portion Size</Text>
            <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
              {["Small", "Medium", "Large"].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setSize(s as any)}
                  style={{
                    backgroundColor: size === s ? "#f97316" : "#1a1a1a",
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 9999
                  }}
                >
                  <Text style={{ color: size === s ? "black" : "white", fontWeight: "800" }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* TOGGLE OPTIONS WITH IMAGES */}
          <View style={{ gap: 12 }}>
            {toggleOptionsData.map(option => (
              <TouchableOpacity
                key={option.label}
                onPress={() => toggleOption(option.label)}
                style={{
                  backgroundColor: toggleStates[option.label] ? "#f97316" : "#1a1a1a",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Image source={{ uri: option.image }} style={{ width: 30, height: 30, borderRadius: 6 }} />
                  <Text style={{ color: toggleStates[option.label] ? "black" : "white", fontWeight: "800" }}>
                    {option.label} (+${option.price})
                  </Text>
                </View>
                {toggleStates[option.label] && <Text style={{ color: "black", fontWeight: "900" }}>✔</Text>}
              </TouchableOpacity>
            ))}
          </View>

          {/* EXTRAS / TOPPINGS */}
          <View>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "800", marginBottom: 12 }}>Toppings</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {extrasData.map(item => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => toggleExtra(item.name)}
                  style={{
                    backgroundColor: extras.includes(item.name) ? "#f97316" : "#1a1a1a",
                    padding: 12,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  {extras.includes(item.name) && <Text style={{ color: "black", fontWeight: "800" }}>✔</Text>}
                  <Image source={{ uri: item.image }} style={{ width: 36, height: 36, borderRadius: 8 }} />
                  <Text style={{ color: extras.includes(item.name) ? "black" : "white", fontWeight: "800" }}>
                    {item.name} (+${item.price})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* TOTAL & ADD TO CART */}
          <View style={{ marginTop: 20, backgroundColor: "#111", padding: 16, borderRadius: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: "#9ca3af" }}>Total</Text>
              <Text style={{ color: "white", fontWeight: "900", fontSize: 18 }}>${total}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: "#f97316", paddingVertical: 14, borderRadius: 16, marginTop: 16 }}>
              <Text style={{ textAlign: "center", color: "black", fontWeight: "900", fontSize: 16 }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DessertPageScreen;

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

// Extras with images and prices
const extrasData = [
  { name: "Bun", price: 0.5, image: "https://images.unsplash.com/photo-1718397172443-48185c6bb4e1?w=500&auto=format&fit=crop&q=60" },
  { name: "Onions", price: 0.5, image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=500&auto=format&fit=crop&q=60" },
  { name: "Pickles", price: 0.5, image: "https://images.unsplash.com/photo-1650072395437-223b4906207d?w=500&auto=format&fit=crop&q=60" },
  { name: "Bacon", price: 1, image: "https://images.unsplash.com/photo-1591745952765-071aa8677b2b?w=500&auto=format&fit=crop&q=60" },
  { name: "Lettuce", price: 0.5, image: "https://plus.unsplash.com/premium_photo-1701964643904-ed5788b634d8?w=500&auto=format&fit=crop&q=60" },
  { name: "Jalapeños", price: 0.5, image: "https://images.unsplash.com/photo-1597115580039-b849ed2d6398?w=500&auto=format&fit=crop&q=60" }
];

// Popular burgers
const popularBurgers = [
  {
    id: 1,
    name: "Classic Burger",
    price: 8.99,
    image: "https://plus.unsplash.com/premium_photo-1664392115681-28de35ca10a7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Bacon Burger",
    price: 10.49,
    image: "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Chicken Burger",
    price: 9.99,
    image: "https://plus.unsplash.com/premium_photo-1683655058728-415f4f2674bf?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Veggie Burger",
    price: 8.49,
    image: "https://plus.unsplash.com/premium_photo-1664648063566-404eabc07ea0?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Double Cheeseburger",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1766589220989-7fa0e4d9fa77?w=600&auto=format&fit=crop&q=60"
  }
];

const BurgerPageScreen: FC = () => {
  const [selectedBurger, setSelectedBurger] = useState(popularBurgers[0]);
  const [size, setSize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [cheese, setCheese] = useState(true);
  const [fries, setFries] = useState(false);
  const [tomatoSauce, setTomatoSauce] = useState(false);
  const [extraChicken, setExtraChicken] = useState(false);
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (item: string) => {
    setExtras(prev =>
      prev.includes(item)
        ? prev.filter(x => x !== item)
        : [...prev, item]
    );
  };

  const selectBurger = (burger: typeof popularBurgers[0]) => {
    setSelectedBurger(burger);
    // Reset options when the burger changes
    setCheese(true);
    setFries(false);
    setTomatoSauce(false);
    setExtraChicken(false);
    setExtras([]);
  };

  // Prices
  const basePrice = selectedBurger.price;
  const sizeUpcharge = size === "Small" ? 0 : size === "Medium" ? 1.5 : 3;
  const cheesePrice = cheese ? 1 : 0;
  const friesPrice = fries ? 1.5 : 0;
  const tomatoPrice = tomatoSauce ? 0.75 : 0;
  const chickenPrice = extraChicken ? 2 : 0;

  const extrasPrice = extras.reduce((acc, item) => {
    const extraItem = extrasData.find(e => e.name === item);
    return extraItem ? acc + extraItem.price : acc;
  }, 0);

  const total = (
    basePrice +
    sizeUpcharge +
    cheesePrice +
    friesPrice +
    tomatoPrice +
    chickenPrice +
    extrasPrice
  ).toFixed(2);

  const cardWidth = width * 0.7;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0B0B" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE */}
        <Image
          source={{ uri: selectedBurger.image }}
          style={{ width, height: height * 0.3 }}
        />

        <View style={{ padding: 20, gap: 20 }}>
          {/* TITLE */}
          <View>
            <Text style={{ color: "#f97316", fontWeight: "700", fontSize: 14 }}>
              BURGER HOUSE 🍔
            </Text>
            <Text style={{ color: "white", fontSize: 28, fontWeight: "900", marginTop: 4 }}>
              Build Your Perfect Burger
            </Text>
            <Text style={{ color: "#9ca3af", marginTop: 6 }}>
              Customize everything — buns, cheese, toppings and more.
            </Text>
          </View>

          {/* POPULAR BURGERS */}
          <View>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Popular Burgers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ gap: 16 }}>
              {popularBurgers.map(burger => (
                <TouchableOpacity key={burger.id} onPress={() => selectBurger(burger)}>
                  <View
                    style={{
                      backgroundColor: selectedBurger.id === burger.id ? "#f97316" : "#111",
                      borderRadius: 20,
                      width: cardWidth,
                      marginRight: 16,
                      overflow: "hidden"
                    }}
                  >
                    <Image source={{ uri: burger.image }} style={{ width: "100%", height: 160 }} />
                    <View style={{ padding: 16 }}>
                      <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>{burger.name}</Text>
                      <Text style={{ color: "white", fontWeight: "900", fontSize: 16, marginTop: 6 }}>${burger.price.toFixed(2)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* SIZE SELECT */}
          <View style={{ backgroundColor: "#111", padding: 16, borderRadius: 16 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "800" }}>Choose Size</Text>
            <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
              {["Small", "Medium", "Large"].map(s => (
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

          {/* TOGGLE OPTIONS */}
          <View style={{ gap: 12 }}>
            {[
              { label: "Cheese", state: cheese, setState: setCheese, price: 1 },
              { label: "Fries", state: fries, setState: setFries, price: 1.5 },
              { label: "Tomato Sauce", state: tomatoSauce, setState: setTomatoSauce, price: 0.75 },
              { label: "Extra Chicken", state: extraChicken, setState: setExtraChicken, price: 2 }
            ].map(option => (
              <TouchableOpacity
                key={option.label}
                onPress={() => option.setState(!option.state)}
                style={{
                  backgroundColor: option.state ? "#f97316" : "#1a1a1a",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ color: option.state ? "black" : "white", fontWeight: "800" }}>
                  {option.state ? `✔ ${option.label} (+$${option.price})` : option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* EXTRAS */}
          <View>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "800", marginBottom: 12 }}>Extras</Text>
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

export default BurgerPageScreen;

import React, { FC, useState } from "react"
import { ScrollView, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  YStack,
  XStack,
  Text,
  Input,
  View,
  Card,
  Image,
  Button,
  Theme,
  styled,
  Circle,
  Spinner,
} from "tamagui"
import {
  Search,
  Pizza,
  Beef,
  CupSoda,
  IceCream,
  Heart,
  Star,
  Home,
  LayoutGrid,
  ShoppingBag,
  User,
  SlidersHorizontal,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Flame,
  Clock,
  ChevronRight,
  Utensils,
  Bell,
} from "@tamagui/lucide-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useGetCategoriesQuery, useGetPopularItemsQuery, Category, FoodItem as DBFoodItem } from "@/store/foodApi"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

// --- TYPES ---
type RootStackParamList = {
  Dashboard: undefined;
  PizzaPage: undefined;
  BurgerPage: undefined;
  DrinksPage: undefined;
  DessertsPage: undefined;
  Details: { id: number };
}

// Icon Mapping
const IconMap: Record<string, any> = {
  Pizza: Pizza,
  Beef: Beef,
  CupSoda: CupSoda,
  IceCream: IceCream,
  Utensils: Utensils,
};

// --- STYLED COMPONENTS ---
const ModernCard = styled(Card, {
  backgroundColor: "#1E1E1E",
  borderRadius: 24,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.05)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  pressStyle: { scale: 0.98 },
})

const GlassNav = styled(XStack, {
  backgroundColor: "rgba(20, 20, 20, 0.9)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.08)",
  borderRadius: 30,
  height: 70,
  paddingHorizontal: 20,
  alignItems: "center",
  justifyContent: "space-between",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 20,
})

// --- SUB-COMPONENTS ---

const CategoryPill = ({ category, isActive, onPress }: { category: Category, isActive: boolean, onPress: () => void }) => {
  const Icon = IconMap[category.icon_name] || Utensils;
  return (
    <YStack alignItems="center" gap="$2" marginHorizontal="$2" onPress={onPress}>
      <View
        width={70}
        height={70}
        borderRadius={24}
        backgroundColor={isActive ? "#F97316" : "#1A1A1A"}
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor={isActive ? "#F97316" : "rgba(255,255,255,0.05)"}
      >
        <Icon size={28} color={isActive ? "white" : "#6B7280"} />
      </View>
      <Text 
        color={isActive ? "white" : "#6B7280"} 
        fontSize="$3" 
        fontWeight={isActive ? "700" : "500"}
      >
        {category.name}
      </Text>
    </YStack>
  )
}

const FoodCardLarge: FC<{ item: DBFoodItem }> = ({ item }) => (
  <ModernCard width={width * 0.7} height={340} marginRight="$5">
    {/* Image Section */}
    <View height={200} width="100%" position="relative">
      <Image 
        source={{ uri: item.image_url }} 
        width="100%" 
        height="100%" 
        resizeMode="cover"
      />
      
      {/* Overlay Gradient */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80 }}
      />

      {/* Tags */}
      <XStack
        position="absolute"
        top={16}
        left={16}
        backgroundColor="rgba(0,0,0,0.6)"
        paddingHorizontal="$3"
        paddingVertical="$1.5"
        borderRadius={12}
        alignItems="center"
        gap="$1.5"
      >
        <Clock size={12} color="#FBBF24" />
        <Text color="white" fontSize="$2" fontWeight="700">{item.prep_time || '20 min'}</Text>
      </XStack>

      <Circle 
        position="absolute" 
        top={16} 
        right={16} 
        backgroundColor="rgba(255,255,255,0.9)" 
        size={36}
        shadowColor="#000"
        shadowOpacity={0.2}
        shadowRadius={5}
      >
        <Heart size={18} color="#EF4444" />
      </Circle>
    </View>

    {/* Content */}
    <YStack padding="$4" flex={1} justifyContent="space-between" backgroundColor="#1A1A1A">
      <YStack gap="$1">
        <XStack justifyContent="space-between" alignItems="flex-start">
          <Text color="white" fontWeight="800" fontSize="$6" numberOfLines={1} flex={1} marginRight="$2">
            {item.name}
          </Text>
          <XStack alignItems="center" gap="$1" backgroundColor="rgba(251, 191, 36, 0.1)" paddingHorizontal="$2" paddingVertical="$1" borderRadius={8}>
            <Star size={12} color="#FBBF24" fill="#FBBF24" />
            <Text color="#FBBF24" fontSize="$2" fontWeight="800">{item.rating}</Text>
          </XStack>
        </XStack>
        
        <Text color="#9CA3AF" fontSize="$3" numberOfLines={2}>
          Delicious hand-crafted dish with premium ingredients.
        </Text>
      </YStack>

      <XStack justifyContent="space-between" alignItems="center" marginTop="$2">
        <XStack alignItems="baseline" gap="$1">
          <Text color="#F97316" fontSize="$4" fontWeight="600">$</Text>
          <Text color="white" fontWeight="900" fontSize="$8">{item.price.toFixed(2)}</Text>
        </XStack>
        <Button 
          circular 
          size="$4" 
          backgroundColor="#F97316" 
          pressStyle={{ scale: 0.9 }}
          icon={<ShoppingBag size={20} color="white" />} 
        />
      </XStack>
    </YStack>
  </ModernCard>
)

const DashboardScreen: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [activeTab, setActiveTab] = useState("home")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  
  const { data: categories = [], isLoading: isCatsLoading } = useGetCategoriesQuery();
  const { data: popularItems = [], isLoading: isItemsLoading } = useGetPopularItemsQuery();

  const isLoading = isCatsLoading || isItemsLoading;

  return (
    <Theme name="dark">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#050505" }}>
        
        {/* Background Gradient */}
        <LinearGradient
          colors={['#101010', '#000000']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}
        />

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          <YStack padding="$5" gap="$6">
            
            {/* Header */}
            <XStack justifyContent="space-between" alignItems="center">
              <YStack gap="$1">
                <Text color="#9CA3AF" fontSize="$3" fontWeight="600" textTransform="uppercase" letterSpacing={1}>
                  Deliver to
                </Text>
                <XStack alignItems="center" gap="$2">
                  <Text color="#F97316" fontSize="$7" fontWeight="900">Home •</Text>
                  <Text color="white" fontSize="$7" fontWeight="500">Brooklyn, NY</Text>
                  <ChevronRight size={18} color="#6B7280" />
                </XStack>
              </YStack>
              <Circle size={50} backgroundColor="#1A1A1A" borderWidth={1} borderColor="#333">
                <Bell size={22} color="white" />
                <Circle position="absolute" top={12} right={14} size={10} backgroundColor="#EF4444" borderWidth={2} borderColor="#1A1A1A" />
              </Circle>
            </XStack>

            {/* Search */}
            <XStack gap="$3">
              <XStack 
                flex={1} 
                height={56} 
                backgroundColor="#1A1A1A" 
                borderRadius={18} 
                alignItems="center" 
                paddingHorizontal="$4"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.05)"
              >
                <Search size={22} color="#6B7280" />
                <Input
                  flex={1}
                  unstyled
                  placeholder="What are you craving?"
                  placeholderTextColor="#6B7280"
                  fontSize="$4"
                  marginLeft="$3"
                  color="white"
                />
              </XStack>
              <Button 
                height={56} 
                width={56} 
                borderRadius={18} 
                backgroundColor="#F97316" 
                pressStyle={{ opacity: 0.9 }}
                icon={<SlidersHorizontal size={22} color="white" />}
              />
            </XStack>

            {/* Promo Banner */}
            <YStack 
              height={190} 
              borderRadius={28} 
              overflow="hidden" 
              position="relative"
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, padding: 24, flexDirection: 'row' }}
              >
                <YStack flex={1} justifyContent="center" gap="$2" zIndex={10}>
                  <View backgroundColor="rgba(255,255,255,0.2)" alignSelf="flex-start" paddingHorizontal="$2" paddingVertical="$1" borderRadius={8}>
                     <Text color="white" fontSize="$2" fontWeight="800">PROMO</Text>
                  </View>
                  <Text color="white" fontSize="$9" fontWeight="900" lineHeight={36}>
                    30% OFF{"\n"}Pizza Day
                  </Text>
                  <Text color="rgba(255,255,255,0.8)" fontSize="$3" fontWeight="600" marginBottom="$2">
                    Valid until Sunday
                  </Text>
                  <Button 
                    size="$3" 
                    borderRadius="$10" 
                    backgroundColor="white" 
                    pressStyle={{ scale: 0.95 }}
                  >
                    <Text color="#EA580C" fontWeight="800">Claim Now</Text>
                  </Button>
                </YStack>
                
                {/* Decorative Elements */}
                <Circle 
                  position="absolute" 
                  right={-20} 
                  bottom={-40} 
                  size={180} 
                  backgroundColor="rgba(255,255,255,0.1)" 
                />
                <Image 
                  source={{ uri: "https://static.vecteezy.com/system/resources/previews/024/589/160/original/top-view-pizza-transparent-background-free-png.png" }}
                  width={160}
                  height={160}
                  position="absolute"
                  right={-30}
                  bottom={-20}
                  style={{ transform: [{ rotate: '15deg' }] }}
                />
              </LinearGradient>
            </YStack>

            {isLoading ? (
               <YStack height={200} alignItems="center" justifyContent="center">
                 <Spinner size="large" color="#F97316" />
                 <Text color="$gray10" marginTop="$4">Curating menu...</Text>
               </YStack>
            ) : (
              <>
                {/* Categories */}
                <YStack gap="$4">
                  <XStack justifyContent="space-between" alignItems="center" paddingHorizontal="$1">
                    <Text color="white" fontSize="$6" fontWeight="800">Categories</Text>
                    <Text color="#F97316" fontWeight="600">See all</Text>
                  </XStack>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                    {categories.map((c) => (
                      <CategoryPill 
                        key={c.id} 
                        category={c} 
                        isActive={selectedCategory === c.id} 
                        onPress={() => {
                            if (c.route) {
                                navigation.navigate(c.route as any);
                            }
                            setSelectedCategory(c.id);
                        }} 
                      />
                    ))}
                  </ScrollView>
                </YStack>

                {/* Popular Items */}
                <YStack gap="$4">
                  <Text color="white" fontSize="$6" fontWeight="800" paddingHorizontal="$1">Popular Near You</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                    {popularItems.map((item) => <FoodCardLarge key={item.id} item={item} />)}
                  </ScrollView>
                </YStack>
              </>
            )}

          </YStack>
        </ScrollView>

        {/* Floating Bottom Navigation */}
        <YStack position="absolute" bottom={40} alignSelf="center" width="90%">
          <GlassNav>
            <NavTab Icon={Home} active={activeTab === "home"} onPress={() => setActiveTab("home")} />
            <NavTab Icon={LayoutGrid} active={activeTab === "menu"} onPress={() => setActiveTab("menu")} />
            
            <View marginTop={-40}>
              <View 
                width={64} 
                height={64} 
                borderRadius={32} 
                backgroundColor="#F97316" 
                alignItems="center" 
                justifyContent="center"
                shadowColor="#F97316"
                shadowOpacity={0.5}
                shadowRadius={15}
                shadowOffset={{ width: 0, height: 8 }}
              >
                <ShoppingBag color="white" size={26} />
              </View>
            </View>

            <NavTab Icon={User} active={activeTab === "profile"} onPress={() => setActiveTab("profile")} />
            <NavTab Icon={SlidersHorizontal} active={activeTab === "settings"} onPress={() => setActiveTab("settings")} />
          </GlassNav>
        </YStack>

      </SafeAreaView>
    </Theme>
  )
}

const NavTab = ({ Icon, active, onPress }: { Icon: any, active: boolean, onPress: () => void }) => (
  <YStack onPress={onPress} alignItems="center" justifyContent="center" width={50} height={50} borderRadius={25} backgroundColor={active ? "rgba(255,255,255,0.05)" : "transparent"}>
    <Icon size={24} color={active ? "#F97316" : "#6B7280"} strokeWidth={active ? 2.5 : 2} />
  </YStack>
)

export default DashboardScreen
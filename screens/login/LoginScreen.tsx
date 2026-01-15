import React, { useState, FC } from "react";
import { Alert, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TamaguiProvider,
  YStack,
  XStack,
  Paragraph,
  Heading,
  Button,
  Input,
  Theme,
  View,
  styled,
  Separator,
  AnimatePresence,
  Text,
} from "tamagui";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import config from "@/tamagui.config";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Dashboard: undefined;
};

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

interface Props {
  navigation: Nav;
}

const { width } = Dimensions.get("window");

// Glass Card
const GlassCard = styled(YStack, {
  backgroundColor: "rgba(30, 30, 30, 0.6)",
  borderRadius: 24,
  padding: "$6",
  width: "90%",
  maxWidth: 400,
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.08)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 20 },
  shadowOpacity: 0.4,
  shadowRadius: 30,
});

// Modern Input
const ModernInput = styled(Input, {
  backgroundColor: "rgba(0,0,0,0.3)",
  height: 60,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "transparent",
  color: "white",
  paddingLeft: 48,
  fontSize: 16,
  focusStyle: {
    borderColor: "#F97316",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

const LoginScreen: FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Login Failed", error.message);
    } else {
      navigation.replace("Dashboard");
    }
    setLoading(false);
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        {/* Background Gradient */}
        <LinearGradient
          colors={["#0F172A", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
        />
        
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <YStack flex={1} justifyContent="center" alignItems="center" width="100%">
              
              {/* Logo / Brand Header */}
              <YStack alignItems="center" marginBottom="$8">
                <View 
                  width={80} 
                  height={80} 
                  backgroundColor="#F97316" 
                  borderRadius={24} 
                  transform={[{ rotate: "12deg" }]}
                  justifyContent="center"
                  alignItems="center"
                  shadowColor="#F97316"
                  shadowOpacity={0.5}
                  shadowRadius={20}
                >
                  <Heading color="white" size="$8" fontWeight="900">F</Heading>
                </View>
                <Heading color="white" size="$9" marginTop="$5" fontWeight="900" letterSpacing={1}>
                  Foodie<Text color="#F97316">.</Text>
                </Heading>
                <Paragraph color="$gray11" size="$4" marginTop="$2">
                  Taste the future of delivery
                </Paragraph>
              </YStack>

              <GlassCard>
                <YStack space="$4">
                  {/* Email Input */}
                  <View>
                    <View position="absolute" left={16} top={18} zIndex={1}>
                      <Mail size={20} color="#9CA3AF" />
                    </View>
                    <ModernInput
                      placeholder="Email Address"
                      placeholderTextColor="#6B7280"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>

                  {/* Password Input */}
                  <View>
                    <View position="absolute" left={16} top={18} zIndex={1}>
                      <Lock size={20} color="#9CA3AF" />
                    </View>
                    <ModernInput
                      placeholder="Password"
                      placeholderTextColor="#6B7280"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <Button
                      chromeless
                      circular
                      position="absolute"
                      right={8}
                      top={8}
                      onPress={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <Eye size={20} color="#9CA3AF" /> : <EyeOff size={20} color="#9CA3AF" />}
                    />
                  </View>

                  {/* Forgot Password */}
                  <XStack justifyContent="flex-end">
                    <Button chromeless size="$2" onPress={() => navigation.navigate("ForgotPassword")}>
                      <Text color="#F97316" fontWeight="600">Forgot Password?</Text>
                    </Button>
                  </XStack>

                  {/* Login Button */}
                  <Button
                    height={60}
                    borderRadius={18}
                    backgroundColor="#F97316"
                    pressStyle={{ scale: 0.97, opacity: 0.9 }}
                    onPress={handleLogin}
                    disabled={loading}
                    iconAfter={loading ? undefined : <ArrowRight size={20} color="white" />}
                    shadowColor="#F97316"
                    shadowOpacity={0.4}
                    shadowRadius={15}
                    shadowOffset={{ width: 0, height: 8 }}
                  >
                    <Text color="white" fontWeight="800" fontSize="$5">
                      {loading ? "Signing In..." : "Sign In"}
                    </Text>
                  </Button>

                  <Separator marginVertical="$3" borderColor="rgba(255,255,255,0.1)" />

                  {/* Signup Link */}
                  <XStack justifyContent="center" gap="$2" alignItems="center">
                    <Paragraph color="$gray10">New here?</Paragraph>
                    <Button chromeless onPress={() => navigation.navigate("Signup")} padding={0}>
                      <Text color="white" fontWeight="700">Create Account</Text>
                    </Button>
                  </XStack>
                </YStack>
              </GlassCard>

            </YStack>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
};

export default LoginScreen;

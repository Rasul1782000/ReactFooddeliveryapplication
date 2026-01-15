import React, { useState } from "react"
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  YStack,
  styled,
  TamaguiProvider,
  Paragraph,
  Button,
  Heading,
  Input,
  Theme,
  View,
  XStack,
  Text,
  Separator,
} from "tamagui"
import { LinearGradient } from "expo-linear-gradient"
import { ArrowLeft, User, Mail, Lock, CheckCircle } from "lucide-react-native"

import config from "@/tamagui.config"
import { supabase } from "@/lib/supabase"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

// Glass Card (Same as Login)
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

// Modern Input (Same as Login)
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

export default function SignupScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }
    if (!email || !password || !fullName) {
        Alert.alert("Error", "Please fill in all fields")
        return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      Alert.alert("Error", error.message)
    } else {
      Alert.alert("Success", "Please check your email for verification link", [
        { text: "OK", onPress: () => navigation.navigate("Login") }
      ])
    }
    setLoading(false)
  }

  return (
    <TamaguiProvider config={config} defaultTheme="dark">
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
            style={{ flex: 1 }}
          >
             <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", paddingVertical: 40 }}>
              
              {/* Back Button */}
              <Button 
                position="absolute" 
                top={10} 
                left={20} 
                circular 
                chromeless 
                onPress={() => navigation.goBack()}
                icon={<ArrowLeft size={24} color="white" />}
                zIndex={10}
              />

              <YStack alignItems="center" marginBottom="$6">
                <Heading color="white" size="$9" fontWeight="900" letterSpacing={0.5}>
                  Join Us
                </Heading>
                <Paragraph color="$gray11" size="$4" marginTop="$2">
                  Start your delicious journey
                </Paragraph>
              </YStack>

              <GlassCard>
                <YStack space="$4">
                  
                  {/* Full Name */}
                  <View>
                    <View position="absolute" left={16} top={18} zIndex={1}>
                      <User size={20} color="#9CA3AF" />
                    </View>
                    <ModernInput 
                      placeholder="Full Name" 
                      placeholderTextColor="#6B7280"
                      value={fullName}
                      onChangeText={setFullName}
                    />
                  </View>

                  {/* Email */}
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

                  {/* Password */}
                  <View>
                    <View position="absolute" left={16} top={18} zIndex={1}>
                      <Lock size={20} color="#9CA3AF" />
                    </View>
                    <ModernInput 
                      placeholder="Password" 
                      secureTextEntry 
                      placeholderTextColor="#6B7280"
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>

                  {/* Confirm Password */}
                  <View>
                    <View position="absolute" left={16} top={18} zIndex={1}>
                      <CheckCircle size={20} color="#9CA3AF" />
                    </View>
                    <ModernInput 
                      placeholder="Confirm Password" 
                      secureTextEntry 
                      placeholderTextColor="#6B7280"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                  </View>

                  {/* Register Button */}
                  <Button
                    marginTop="$2"
                    height={60}
                    borderRadius={18}
                    backgroundColor="#F97316"
                    pressStyle={{ scale: 0.97, opacity: 0.9 }}
                    onPress={handleSignup}
                    disabled={loading}
                    shadowColor="#F97316"
                    shadowOpacity={0.4}
                    shadowRadius={15}
                    shadowOffset={{ width: 0, height: 8 }}
                  >
                    <Text color="white" fontWeight="800" fontSize="$5">
                      {loading ? "Creating Account..." : "Create Account"}
                    </Text>
                  </Button>

                  <Separator marginVertical="$3" borderColor="rgba(255,255,255,0.1)" />

                  {/* Login Link */}
                  <XStack justifyContent="center" gap="$2" alignItems="center">
                    <Paragraph color="$gray10">Already have an account?</Paragraph>
                    <Button chromeless onPress={() => navigation.navigate("Login")} padding={0}>
                      <Text color="white" fontWeight="700">Sign In</Text>
                    </Button>
                  </XStack>

                </YStack>
              </GlassCard>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  )
}
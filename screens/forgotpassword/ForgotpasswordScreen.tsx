import React, { useState, FC } from "react";
import { Image, ScrollView } from "react-native";
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
  Separator,
  View,
  styled,
} from "tamagui";
import { Mail } from "lucide-react-native";
import config from "@/tamagui.config";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type ForgotNav = NativeStackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;

interface Props {
  navigation: ForgotNav;
}

// --- Styled ---

const Card = styled(YStack, {
  backgroundColor: "#1A1A1A",
  borderRadius: "$8",
  padding: "$5",
  width: "92%",
  maxWidth: 450,
  marginTop: -40,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 15 },
  shadowOpacity: 0.4,
  shadowRadius: 20,
  borderWidth: 1,
  borderColor: "#2A2A2A",
});

const CustomInput = styled(Input, {
  backgroundColor: "#0D0D0D",
  height: 55,
  borderRadius: "$10",
  borderColor: "#2A2A2A",
  color: "#FFF",
  paddingLeft: "$10",
  focusStyle: {
    borderColor: "#4F46E5",
    borderWidth: 1.5,
  },
});

const ForgotPasswordScreen: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <YStack flex={1} alignItems="center">
              
              {/* Hero */}
              <View width="100%" height={220} overflow="hidden">
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png",
                  }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>

              {/* Card */}
              <Card>
                <YStack space="$2" marginBottom="$4">
                  <Heading size="$8" color="#FFF" fontWeight="700">
                    Reset Password
                  </Heading>

                  <Paragraph color="$gray10" size="$3">
                    Enter the email associated with your account and we’ll send
                    reset instructions.
                  </Paragraph>
                </YStack>

                <Separator borderColor="#2A2A2A" marginBottom="$4" />

                {/* Email */}
                <View position="relative" marginBottom="$4">
                  <View position="absolute" left={15} top={17}>
                    <Mail size={18} color="#666" />
                  </View>

                  <CustomInput
                    placeholder="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Submit */}
                <Button
                  backgroundColor="#4F46E5"
                  height={55}
                  borderRadius="$10"
                  pressStyle={{ scale: 0.98, opacity: 0.85 }}
                  onPress={() => {}}
                >
                  <Paragraph color="white" fontWeight="700">
                    Send Instructions
                  </Paragraph>
                </Button>

                {/* Back Link */}
                <XStack justifyContent="center" marginTop="$5">
                  <Button chromeless onPress={() => navigation.goBack()}>
                    <Paragraph color="#F97316" fontWeight="700">
                      Back to login
                    </Paragraph>
                  </Button>
                </XStack>
              </Card>
            </YStack>
          </ScrollView>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
};

export default ForgotPasswordScreen;

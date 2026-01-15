import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store/store';

// Tamagui
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config'; 

// Screen Imports
import LoginScreen from './screens/login/LoginScreen';
import SignupScreen from './screens/signup/SignupScreen';
import DashboardScreen from './screens/home/HomeScreen';
import ForgotPasswordScreen from './screens/forgotpassword/ForgotpasswordScreen';
import PizzaPageScreen from './screens/pizzapage/PizzaScreen';
import SnacksPageScreen from './screens/snackspage/SnacksScreen';
import DrinksPageScreen from './screens/drinkspage/DrinksScreen';
import BurgerPageScreen from './screens/burgerpage/BurgerScreen';
import DessertPageScreen from './screens/dessertpage/DesertScreen';

// Drinks Sub-Screens
import SoftDrinksPageScreen from './screens/drinkspage/SoftDrinksScreen';
import SmoothiesPageScreen from './screens/drinkspage/SmoothiesScreen';
import CoffeePageScreen from './screens/drinkspage/CoffeeScreen';
import TeaPageScreen from './screens/drinkspage/TeaScreen';
import JuicePageScreen from './screens/drinkspage/JuicesScreen';
import EnergyPageScreen from './screens/drinkspage/EnergyScreen';

/* -------------------- Navigation Types -------------------- */

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Dashboard: undefined;
  PizzaPage: undefined;
  BurgerPage: undefined;
  DrinksPage: undefined;
  DessertsPage: undefined;
  SoftDrinksPage: undefined;
  SnacksPage: undefined;
  JuicePage: undefined;
  SmoothiesPage: undefined;
  CoffeePage: undefined;
  TeaPage: undefined;
  EnergyPage:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/* -------------------- App Component -------------------- */

const App: FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <TamaguiProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              {/* Auth Screens */}
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              
              {/* Main Menu Screens */}
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="PizzaPage" component={PizzaPageScreen} />
              <Stack.Screen name="BurgerPage" component={BurgerPageScreen} />
              <Stack.Screen name="SnacksPage" component={SnacksPageScreen} />
              <Stack.Screen name="DessertsPage" component={DessertPageScreen} />
              
              {/* Drink Section Screens */}
              <Stack.Screen name="DrinksPage" component={DrinksPageScreen} />
              <Stack.Screen name="SoftDrinksPage" component={SoftDrinksPageScreen} />
              <Stack.Screen name="JuicePage" component={JuicePageScreen} />
              <Stack.Screen name="SmoothiesPage" component={SmoothiesPageScreen} />
              <Stack.Screen name="CoffeePage" component={CoffeePageScreen} />
              <Stack.Screen name="TeaPage" component={TeaPageScreen} />
              <Stack.Screen name="EnergyPage"component={EnergyPageScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </TamaguiProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
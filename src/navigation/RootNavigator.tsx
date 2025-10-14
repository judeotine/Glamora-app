import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { AppNavigator } from './AppNavigator';
import { linking } from '@/utils/deepLinking';
import { useDeepLinking } from '@/hooks/useDeepLinking';
import { useNotifications } from '@/hooks/useNotifications';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  App: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const ONBOARDING_KEY = '@glamora_onboarding_complete';

export const RootNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const navigationRef = useRef(null);
  
  useDeepLinking();
  useNotifications();

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const onboardingComplete = await AsyncStorage.getItem(ONBOARDING_KEY);
      setInitialRoute(onboardingComplete ? 'Login' : 'Onboarding');
    } catch {
      setInitialRoute('Onboarding');
    }
  };

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="App" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


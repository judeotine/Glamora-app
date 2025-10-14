import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@/components/atoms/Icon';
import { colors } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

import {
  HomeScreen,
  AIDesignerScreen,
  GalleryScreen,
  WishlistScreen,
  ProfileScreen,
  ProductDetailScreen,
  CartScreen,
  SearchScreen,
  DesignerMarketplaceScreen,
  SocialFeedScreen,
  OrderHistoryScreen,
  HelpCenterScreen,
  SettingsScreen,
  NotificationsScreen,
  LegalScreen,
  AboutScreen,
  FeedbackScreen,
  LiveEventsScreen,
  ReferralScreen,
  DeleteAccountScreen,
  LanguageSettingsScreen,
  DesignComparisonScreen,
  DesignRemixScreen,
  ThreeDModelViewerScreen,
  MoodboardScreen,
  CalendarIntegrationScreen,
  SubscriptionScreen,
  GiftCenterScreen,
  NotificationPreferencesScreen,
  WhatIsNewScreen,
  ShowcaseGalleryScreen,
  TwoFactorAuthScreen,
  ARTryOnScreen,
} from '@/screens';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <HomeStack.Screen name="Cart" component={CartScreen} />
    <HomeStack.Screen name="Search" component={SearchScreen} />
    <HomeStack.Screen name="DesignerMarketplace" component={DesignerMarketplaceScreen} />
    <HomeStack.Screen name="ARTryOn" component={ARTryOnScreen} />
    <HomeStack.Screen name="GiftCenter" component={GiftCenterScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    <ProfileStack.Screen name="Notifications" component={NotificationsScreen} />
    <ProfileStack.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
    <ProfileStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    <ProfileStack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
    <ProfileStack.Screen name="TwoFactorAuth" component={TwoFactorAuthScreen} />
    <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <ProfileStack.Screen name="Feedback" component={FeedbackScreen} />
    <ProfileStack.Screen name="Legal" component={LegalScreen} />
    <ProfileStack.Screen name="About" component={AboutScreen} />
    <ProfileStack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <ProfileStack.Screen name="Subscription" component={SubscriptionScreen} />
    <ProfileStack.Screen name="CalendarIntegration" component={CalendarIntegrationScreen} />
    <ProfileStack.Screen name="Referral" component={ReferralScreen} />
  </ProfileStack.Navigator>
);

const AIDesignerStack = createStackNavigator();
const AIDesignerStackScreen = () => (
  <AIDesignerStack.Navigator screenOptions={{ headerShown: false }}>
    <AIDesignerStack.Screen name="AIDesignerMain" component={AIDesignerScreen} />
    <AIDesignerStack.Screen name="DesignComparison" component={DesignComparisonScreen} />
    <AIDesignerStack.Screen name="DesignRemix" component={DesignRemixScreen} />
    <AIDesignerStack.Screen name="ThreeDModelViewer" component={ThreeDModelViewerScreen} />
    <AIDesignerStack.Screen name="Moodboard" component={MoodboardScreen} />
  </AIDesignerStack.Navigator>
);

const GalleryStack = createStackNavigator();
const GalleryStackScreen = () => (
  <GalleryStack.Navigator screenOptions={{ headerShown: false }}>
    <GalleryStack.Screen name="GalleryMain" component={GalleryScreen} />
    <GalleryStack.Screen name="ShowcaseGallery" component={ShowcaseGalleryScreen} />
    <GalleryStack.Screen name="SocialFeed" component={SocialFeedScreen} />
    <GalleryStack.Screen name="LiveEvents" component={LiveEventsScreen} />
  </GalleryStack.Navigator>
);

export type MainTabParamList = {
  Home: undefined;
  AIDesigner: undefined;
  Gallery: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const { mode } = useTheme();
  const { t } = useTranslation();
  const isDark = mode === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
          borderTopColor: isDark ? colors.border.dark : colors.border.light,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDark
          ? colors.textDark.tertiary
          : colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: t('navigation.home'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AIDesigner"
        component={AIDesignerStackScreen}
        options={{
          title: t('navigation.designer'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryStackScreen}
        options={{
          title: t('navigation.gallery'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="images-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: t('navigation.wishlist'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          title: t('navigation.profile'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


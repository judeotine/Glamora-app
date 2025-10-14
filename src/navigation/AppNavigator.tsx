import { createStackNavigator } from '@react-navigation/stack';
import {
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
  ErrorStateScreen,
  MaintenanceModeScreen,
} from '@/screens';

export type AppStackParamList = {
  ProductDetail: { productId: string };
  Cart: undefined;
  Search: undefined;
  DesignerMarketplace: undefined;
  SocialFeed: undefined;
  OrderHistory: undefined;
  HelpCenter: undefined;
  Settings: undefined;
  Notifications: undefined;
  Legal: undefined;
  About: undefined;
  Feedback: undefined;
  LiveEvents: undefined;
  Referral: undefined;
  DeleteAccount: undefined;
  LanguageSettings: undefined;
  DesignComparison: { designIds: string[] };
  DesignRemix: { designId: string };
  ThreeDModelViewer: { designId: string };
  Moodboard: undefined;
  CalendarIntegration: undefined;
  Subscription: undefined;
  GiftCenter: { productId: string };
  NotificationPreferences: undefined;
  WhatIsNew: undefined;
  ShowcaseGallery: undefined;
  TwoFactorAuth: undefined;
  ARTryOn: { productId?: string };
  ErrorState: undefined;
  MaintenanceMode: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="DesignerMarketplace" component={DesignerMarketplaceScreen} />
      <Stack.Screen name="SocialFeed" component={SocialFeedScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Legal" component={LegalScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="LiveEvents" component={LiveEventsScreen} />
      <Stack.Screen name="Referral" component={ReferralScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
      <Stack.Screen name="DesignComparison" component={DesignComparisonScreen} />
      <Stack.Screen name="DesignRemix" component={DesignRemixScreen} />
      <Stack.Screen name="ThreeDModelViewer" component={ThreeDModelViewerScreen} />
      <Stack.Screen name="Moodboard" component={MoodboardScreen} />
      <Stack.Screen name="CalendarIntegration" component={CalendarIntegrationScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="GiftCenter" component={GiftCenterScreen} />
      <Stack.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
      <Stack.Screen name="WhatIsNew" component={WhatIsNewScreen} />
      <Stack.Screen name="ShowcaseGallery" component={ShowcaseGalleryScreen} />
      <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuthScreen} />
      <Stack.Screen name="ARTryOn" component={ARTryOnScreen} />
      <Stack.Screen name="ErrorState" component={ErrorStateScreen} />
      <Stack.Screen name="MaintenanceMode" component={MaintenanceModeScreen} />
    </Stack.Navigator>
  );
};


import * as Linking from 'expo-linking';
import { NavigationContainerRef } from '@react-navigation/native';

export const prefix = Linking.createURL('/');

export const linking = {
  prefixes: [prefix, 'glamora://', 'https://glamora.app'],
  config: {
    screens: {
      Onboarding: 'onboarding',
      Login: 'login',
      Register: 'register',
      Main: {
        screens: {
          Home: 'home',
          AIDesigner: 'designer',
          Gallery: 'gallery',
          Wishlist: 'wishlist',
          Profile: 'profile',
        },
      },
      ProductDetail: 'product/:id',
      DesignDetail: 'design/:id',
      ARTryOn: 'ar-tryon',
      Cart: 'cart',
      Checkout: 'checkout',
      OrderDetail: 'order/:id',
      DesignerProfile: 'designer/:id',
      SocialFeed: 'feed',
      LiveEvent: 'event/:id',
      Referral: 'ref/:code',
    },
  },
};

export const setupDeepLinking = (
  navigationRef: React.RefObject<NavigationContainerRef<any>>
) => {
  const subscription = Linking.addEventListener('url', ({ url }) => {
    handleDeepLink(url, navigationRef);
  });

  Linking.getInitialURL().then(url => {
    if (url) {
      handleDeepLink(url, navigationRef);
    }
  });

  return () => subscription.remove();
};

const handleDeepLink = (
  url: string,
  navigationRef: React.RefObject<NavigationContainerRef<any>>
) => {
  const { path, queryParams } = Linking.parse(url);
  
  if (path && navigationRef.current?.isReady()) {
    console.log('Deep link:', path, queryParams);
  }
};

export const createProductLink = (productId: string): string => {
  return `https://glamora.app/product/${productId}`;
};

export const createReferralLink = (code: string): string => {
  return `https://glamora.app/ref/${code}`;
};

export const createEventLink = (eventId: string): string => {
  return `https://glamora.app/event/${eventId}`;
};


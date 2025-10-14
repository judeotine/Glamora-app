import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';

export const useDeepLinking = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => subscription.remove();
  }, []);

  const handleDeepLink = ({ url }: { url: string }) => {
    const { hostname, path, queryParams } = Linking.parse(url);
    
    console.log('Deep link received:', { hostname, path, queryParams });

    if (path?.includes('product/')) {
      const productId = path.split('/').pop();
      console.log('Navigate to product:', productId);
    } else if (path?.includes('ref/')) {
      const referralCode = path.split('/').pop();
      console.log('Referral code:', referralCode);
    } else if (path?.includes('event/')) {
      const eventId = path.split('/').pop();
      console.log('Navigate to event:', eventId);
    }
  };

  return { handleDeepLink };
};


import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/store/slices/notificationSlice';

export const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        const { title, body, data } = notification.request.content;
        dispatch(
          addNotification({
            id: Date.now().toString(),
            type: (data?.type as any) || 'system',
            title: title || 'Notification',
            message: body || '',
            read: false,
            timestamp: new Date().toISOString(),
          })
        );
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Notification tapped:', response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return { expoPushToken };
};

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}


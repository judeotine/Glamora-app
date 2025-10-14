import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { api } from './api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class PushNotificationService {
  private expoPushToken: string | null = null;

  async initialize() {
    if (!Device.isDevice) {
      console.log('Push notifications only work on physical devices');
      return;
    }

    const token = await this.registerForPushNotifications();
    if (token) {
      this.expoPushToken = token;
      await this.sendTokenToBackend(token);
    }

    this.setupNotificationChannels();
    this.setupNotificationListeners();
  }

  private async registerForPushNotifications(): Promise<string | null> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Permission not granted for push notifications');
      return null;
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    } catch (error) {
      console.error('Failed to get push token:', error);
      return null;
    }
  }

  private async setupNotificationChannels() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('system', {
        name: 'System Notifications',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#ecab13',
      });

      await Notifications.setNotificationChannelAsync('transactional', {
        name: 'Orders & Payments',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#ecab13',
      });

      await Notifications.setNotificationChannelAsync('social', {
        name: 'Social',
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250],
        lightColor: '#ecab13',
      });

      await Notifications.setNotificationChannelAsync('reminders', {
        name: 'Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#ecab13',
      });
    }
  }

  private setupNotificationListeners() {
    Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response);
      this.handleNotificationTap(response);
    });
  }

  private handleNotificationTap(response: Notifications.NotificationResponse) {
    const data = response.notification.request.content.data;
    
    if (data?.type === 'order_update' && data?.orderId) {
      console.log('Navigate to order:', data.orderId);
    } else if (data?.type === 'design_approved' && data?.designId) {
      console.log('Navigate to design:', data.designId);
    } else if (data?.type === 'social' && data?.postId) {
      console.log('Navigate to post:', data.postId);
    }
  }

  private async sendTokenToBackend(token: string) {
    try {
      console.log('Sending push token to backend:', token);
    } catch (error) {
      console.error('Failed to send token to backend:', error);
    }
  }

  async scheduleSystemNotification(title: string, body: string, data?: any) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { ...data, type: 'system' },
        sound: true,
        badge: 1,
      },
      trigger: { seconds: 1, channelId: 'system' },
    });
  }

  async scheduleTransactionalNotification(
    title: string,
    body: string,
    data?: any
  ) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { ...data, type: 'transactional' },
        sound: true,
        badge: 1,
      },
      trigger: { seconds: 1, channelId: 'transactional' },
    });
  }

  async scheduleSocialNotification(title: string, body: string, data?: any) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { ...data, type: 'social' },
        sound: true,
      },
      trigger: { seconds: 1, channelId: 'social' },
    });
  }

  async scheduleReminderNotification(title: string, body: string, data?: any, delaySeconds: number = 3600) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { ...data, type: 'reminder' },
        sound: true,
      },
      trigger: { seconds: delaySeconds, channelId: 'reminders' },
    });
  }

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  async getBadgeCount(): Promise<number> {
    return await Notifications.getBadgeCountAsync();
  }

  async setBadgeCount(count: number) {
    await Notifications.setBadgeCountAsync(count);
  }

  getToken(): string | null {
    return this.expoPushToken;
  }
}

export const pushNotificationService = new PushNotificationService();


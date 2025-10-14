import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export interface Notification {
  id: string;
  type: 'system' | 'transactional' | 'social' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  imageUrl?: string;
  actionUrl?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  preferences: {
    system: boolean;
    transactional: boolean;
    social: boolean;
    reminders: boolean;
  };
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  preferences: {
    system: true,
    transactional: true,
    social: true,
    reminders: true,
  },
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        n => n.id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: state => {
      state.notifications.forEach(n => {
        n.read = true;
      });
      state.unreadCount = 0;
    },
    updatePreferences: (
      state,
      action: PayloadAction<Partial<NotificationState['preferences']>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  updatePreferences,
} = notificationSlice.actions;

export const selectNotifications = (state: RootState) => state.notification;
export default notificationSlice.reducer;


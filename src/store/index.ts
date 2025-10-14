import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import designReducer from './slices/designSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    design: designReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

import { selectAuth, setUser, setToken, logout as logoutAction } from '@/store/slices/authSlice';
import { api } from '@/services/api';

export const useAuth = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      return response;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await api.register(name, email, password);
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      return response;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await api.logout();
      await SecureStore.deleteItemAsync('auth_token');
      dispatch(logoutAction());
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [dispatch]);

  const authenticateWithBiometrics = useCallback(async (): Promise<boolean> => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        return false;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access Glamora',
        fallbackLabel: 'Use password',
      });

      return result.success;
    } catch (error) {
      console.error('Biometric auth error:', error);
      return false;
    }
  }, []);

  const checkBiometricAvailability = useCallback(async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    return {
      hasHardware,
      isEnrolled,
      supportedTypes,
    };
  }, []);

  return {
    ...auth,
    login,
    register,
    logout,
    authenticateWithBiometrics,
    checkBiometricAvailability,
  };
};


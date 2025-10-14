import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';

import { store } from '@/store';
import { RootNavigator } from '@/navigation/RootNavigator';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { I18nProvider } from '@/services/i18n';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { pushNotificationService } from '@/services/pushNotifications';
import { analytics } from '@/services/analytics';
import { errorTracking } from '@/services/errorTracking';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      analytics.initialize();
      errorTracking.initialize(process.env.SENTRY_DSN);
      await pushNotificationService.initialize();
      console.log('Glamora app initialized successfully');
    } catch (error) {
      console.error('App initialization error:', error);
      errorTracking.captureException(error as Error);
    }
  };

  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <I18nProvider>
                <ThemeProvider>
                  <AppContent />
                </ThemeProvider>
              </I18nProvider>
            </QueryClientProvider>
          </Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




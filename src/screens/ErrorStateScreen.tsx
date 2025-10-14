import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
}

export const ErrorStateScreen = ({
  title = 'Oops! Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  icon = 'alert-circle-outline',
  onRetry,
  onGoBack,
}: ErrorStateProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
        },
      ]}
    >
      <View style={styles.content}>
        <Icon name={icon as any} size={100} color={colors.error} />
        <Text variant="h4" style={styles.title}>
          {title}
        </Text>
        <Text
          variant="body"
          color={isDark ? colors.textDark.secondary : colors.text.secondary}
          style={styles.message}
        >
          {message}
        </Text>
        <View style={styles.actions}>
          {onRetry && (
            <Button title="Try Again" onPress={onRetry} fullWidth />
          )}
          {onGoBack && (
            <Button
              title="Go Back"
              onPress={onGoBack}
              variant="outline"
              fullWidth
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: spacing.xl,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
});


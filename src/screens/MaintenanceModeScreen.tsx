import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export const MaintenanceModeScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleRefresh = () => {
    console.log('Checking for updates...');
  };

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
        <Icon name="construct-outline" size={100} color={colors.primary} />
        <Text variant="h3" style={styles.title}>
          Under Maintenance
        </Text>
        <Text
          variant="body"
          color={isDark ? colors.textDark.secondary : colors.text.secondary}
          style={styles.message}
        >
          We're currently updating Glamora to bring you an even better experience.
          We'll be back shortly!
        </Text>
        <View style={styles.infoBox}>
          <Icon name="time-outline" size={24} color={colors.primary} />
          <Text
            variant="bodySmall"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.estimatedTime}
          >
            Estimated downtime: 30 minutes
          </Text>
        </View>
        <Button
          title="Check Status"
          onPress={handleRefresh}
          style={styles.refreshButton}
        />
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
    maxWidth: 320,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  estimatedTime: {
    fontWeight: '600',
  },
  refreshButton: {
    minWidth: 200,
  },
});


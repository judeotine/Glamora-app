import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/molecules/Card';
import { Toggle } from '@/components/molecules/Toggle';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { selectNotifications, updatePreferences } from '@/store/slices/notificationSlice';

export const NotificationPreferencesScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const { preferences } = useSelector(selectNotifications);
  const dispatch = useDispatch();

  const handleToggle = (key: keyof typeof preferences, value: boolean) => {
    dispatch(updatePreferences({ [key]: value }));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
        },
      ]}
      edges={['top']}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text variant="h5">Notification Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="megaphone-outline" size={24} color={colors.primary} />
              <Text variant="h6" style={styles.sectionTitle}>
                System Notifications
              </Text>
            </View>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              style={styles.sectionDescription}
            >
              New collections, flash sales, designer drops
            </Text>
            <Toggle
              label="Enable System Notifications"
              value={preferences.system}
              onValueChange={value => handleToggle('system', value)}
            />
          </Card>

          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="receipt-outline" size={24} color={colors.primary} />
              <Text variant="h6" style={styles.sectionTitle}>
                Transactional
              </Text>
            </View>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              style={styles.sectionDescription}
            >
              Order updates, payment confirmations, shipping
            </Text>
            <Toggle
              label="Enable Transactional Notifications"
              value={preferences.transactional}
              onValueChange={value => handleToggle('transactional', value)}
            />
          </Card>

          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="heart-outline" size={24} color={colors.primary} />
              <Text variant="h6" style={styles.sectionTitle}>
                Social
              </Text>
            </View>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              style={styles.sectionDescription}
            >
              Likes, comments, new followers
            </Text>
            <Toggle
              label="Enable Social Notifications"
              value={preferences.social}
              onValueChange={value => handleToggle('social', value)}
            />
          </Card>

          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="time-outline" size={24} color={colors.primary} />
              <Text variant="h6" style={styles.sectionTitle}>
                Reminders
              </Text>
            </View>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              style={styles.sectionDescription}
            >
              Cart reminders, wishlist price drops, events
            </Text>
            <Toggle
              label="Enable Reminders"
              value={preferences.reminders}
              onValueChange={value => handleToggle('reminders', value)}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    flex: 1,
  },
  sectionDescription: {
    marginBottom: spacing.md,
  },
});


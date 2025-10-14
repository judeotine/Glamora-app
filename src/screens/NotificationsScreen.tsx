import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { selectNotifications, markAsRead } from '@/store/slices/notificationSlice';

export const NotificationsScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const { notifications, unreadCount } = useSelector(selectNotifications);
  const dispatch = useDispatch();

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      system: 'megaphone-outline',
      transactional: 'receipt-outline',
      social: 'heart-outline',
      reminder: 'time-outline',
    };
    return icons[type] || 'notifications-outline';
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: item.read
            ? isDark
              ? colors.backgroundDark
              : colors.backgroundLight
            : isDark
            ? colors.cardDark
            : colors.cardLight,
        },
      ]}
      onPress={() => !item.read && dispatch(markAsRead(item.id))}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark
              ? colors.backgroundDark
              : colors.backgroundLight,
          },
        ]}
      >
        <Icon name={getNotificationIcon(item.type) as any} size={24} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="body" style={styles.title}>
            {item.title}
          </Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text
          variant="bodySmall"
          color={isDark ? colors.textDark.secondary : colors.text.secondary}
          numberOfLines={2}
        >
          {item.message}
        </Text>
        <Text
          variant="caption"
          color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
          style={styles.timestamp}
        >
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="notifications-off-outline" size={80} color={colors.border.light} />
      <Text variant="h5" style={styles.emptyTitle}>
        No Notifications
      </Text>
      <Text
        variant="body"
        color={isDark ? colors.textDark.secondary : colors.text.secondary}
        style={styles.emptyText}
      >
        You're all caught up!
      </Text>
    </View>
  );

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
      <View style={styles.headerContainer}>
        <Text variant="h5">Notifications</Text>
        {unreadCount > 0 && (
          <Badge label={unreadCount.toString()} variant="primary" />
        )}
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontWeight: '600',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },
  timestamp: {
    marginTop: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing['4xl'],
  },
  emptyTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    maxWidth: 250,
  },
});


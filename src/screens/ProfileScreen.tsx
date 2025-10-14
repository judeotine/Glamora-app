import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/atoms/Avatar';
import { Card } from '@/components/molecules/Card';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { selectAuth } from '@/store/slices/authSlice';

const menuItems = [
  {
    id: 'account',
    icon: 'person-outline',
    title: 'Account Settings',
    subtitle: 'Manage your profile',
  },
  {
    id: 'notifications',
    icon: 'notifications-outline',
    title: 'Notifications',
    subtitle: 'Configure alerts',
  },
  {
    id: 'language',
    icon: 'language-outline',
    title: 'Language & Region',
    subtitle: 'Change app language',
  },
  {
    id: 'orders',
    icon: 'receipt-outline',
    title: 'Order History',
    subtitle: 'View past orders',
  },
  {
    id: 'payment',
    icon: 'card-outline',
    title: 'Payment Methods',
    subtitle: 'Manage cards',
  },
  {
    id: 'security',
    icon: 'shield-checkmark-outline',
    title: 'Security',
    subtitle: '2FA and biometrics',
  },
  {
    id: 'help',
    icon: 'help-circle-outline',
    title: 'Help & Support',
    subtitle: 'Get assistance',
  },
  {
    id: 'about',
    icon: 'information-circle-outline',
    title: 'About Glamora',
    subtitle: 'Learn more',
  },
];

export const ProfileScreen = () => {
  const { t } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === 'dark';
  const { user } = useSelector(selectAuth);

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
        <Text variant="h5">{t('navigation.profile')}</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon name={isDark ? 'sunny-outline' : 'moon-outline'} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.profileSection,
            {
              backgroundColor: isDark ? colors.cardDark : colors.cardLight,
            },
          ]}
        >
          <Avatar
            imageUrl={user?.avatar}
            name={user?.name || 'User'}
            size={80}
          />
          <Text variant="h4" style={styles.userName}>
            {user?.name || 'Guest User'}
          </Text>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
          >
            {user?.email || 'guest@glamora.com'}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text variant="h4" color={colors.primary}>
              12
            </Text>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
            >
              Designs
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: colors.border[isDark ? 'dark' : 'light'] },
            ]}
          />
          <View style={styles.statItem}>
            <Text variant="h4" color={colors.primary}>
              5
            </Text>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
            >
              Orders
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: colors.border[isDark ? 'dark' : 'light'] },
            ]}
          />
          <View style={styles.statItem}>
            <Text variant="h4" color={colors.primary}>
              8
            </Text>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
            >
              Wishlist
            </Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <Card
              key={item.id}
              onPress={() => {}}
              style={styles.menuItem}
              elevated={false}
            >
              <View style={styles.menuItemContent}>
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
                  <Icon name={item.icon as any} size={24} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text variant="body" style={styles.menuTitle}>
                    {item.title}
                  </Text>
                  <Text
                    variant="caption"
                    color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                  >
                    {item.subtitle}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} />
              </View>
            </Card>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out-outline" size={20} color={colors.error} />
          <Text variant="body" color={colors.error} style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: borderRadius.xl,
  },
  userName: {
    marginTop: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  menuSection: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  menuItem: {
    marginBottom: 0,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  logoutText: {
    fontWeight: '600',
  },
});


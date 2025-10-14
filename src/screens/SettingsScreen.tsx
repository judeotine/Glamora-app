import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/molecules/Card';
import { Toggle } from '@/components/molecules/Toggle';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export const SettingsScreen = () => {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === 'dark';
  const [pushEnabled, setPushEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

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
        <Text variant="h5">Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Appearance
          </Text>
          <Card elevated={false}>
            <Toggle
              label="Dark Mode"
              value={isDark}
              onValueChange={toggleTheme}
              description="Switch between light and dark theme"
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Notifications
          </Text>
          <Card elevated={false}>
            <Toggle
              label="Push Notifications"
              value={pushEnabled}
              onValueChange={setPushEnabled}
              description="Receive updates about your orders and designs"
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Security
          </Text>
          <Card elevated={false} style={styles.card}>
            <Toggle
              label="Two-Factor Authentication"
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              description="Add an extra layer of security"
            />
            <View
              style={[
                styles.divider,
                { backgroundColor: colors.border[isDark ? 'dark' : 'light'] },
              ]}
            />
            <Toggle
              label="Biometric Login"
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              description="Use Face ID or fingerprint"
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Account
          </Text>
          <Card onPress={() => {}} elevated={false} style={styles.menuCard}>
            <View style={styles.menuItem}>
              <Icon name="person-outline" size={24} />
              <View style={styles.menuText}>
                <Text variant="body" style={styles.menuTitle}>
                  Profile Information
                </Text>
                <Text
                  variant="caption"
                  color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                >
                  Update your personal details
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} />
            </View>
          </Card>

          <Card onPress={() => {}} elevated={false} style={styles.menuCard}>
            <View style={styles.menuItem}>
              <Icon name="card-outline" size={24} />
              <View style={styles.menuText}>
                <Text variant="body" style={styles.menuTitle}>
                  Payment Methods
                </Text>
                <Text
                  variant="caption"
                  color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                >
                  Manage your cards and payments
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} />
            </View>
          </Card>

          <Card onPress={() => {}} elevated={false} style={styles.menuCard}>
            <View style={styles.menuItem}>
              <Icon name="location-outline" size={24} />
              <View style={styles.menuText}>
                <Text variant="body" style={styles.menuTitle}>
                  Shipping Addresses
                </Text>
                <Text
                  variant="caption"
                  color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                >
                  Manage delivery locations
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Support
          </Text>
          <Card onPress={() => {}} elevated={false} style={styles.menuCard}>
            <View style={styles.menuItem}>
              <Icon name="help-circle-outline" size={24} />
              <View style={styles.menuText}>
                <Text variant="body" style={styles.menuTitle}>
                  Help Center
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} />
            </View>
          </Card>

          <Card onPress={() => {}} elevated={false} style={styles.menuCard}>
            <View style={styles.menuItem}>
              <Icon name="document-text-outline" size={24} />
              <View style={styles.menuText}>
                <Text variant="body" style={styles.menuTitle}>
                  Terms & Privacy
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} />
            </View>
          </Card>
        </View>

        <View style={[styles.section, { marginBottom: spacing['2xl'] }]}>
          <TouchableOpacity
            style={[
              styles.deleteButton,
              {
                backgroundColor: isDark
                  ? `${colors.error}20`
                  : `${colors.error}10`,
              },
            ]}
          >
            <Icon name="trash-outline" size={20} color={colors.error} />
            <Text variant="body" color={colors.error} style={styles.deleteText}>
              Delete Account
            </Text>
          </TouchableOpacity>
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
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  card: {
    marginBottom: 0,
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
  menuCard: {
    marginBottom: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  deleteText: {
    fontWeight: '600',
  },
});


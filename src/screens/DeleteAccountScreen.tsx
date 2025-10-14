import { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Toggle } from '@/components/molecules/Toggle';
import { Card } from '@/components/molecules/Card';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export const DeleteAccountScreen = () => {
  const [downloadData, setDownloadData] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you absolutely sure? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Account deleted'),
        },
      ]
    );
  };

  const handleDownloadData = () => {
    console.log('Downloading user data...');
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.warningSection}>
            <Icon name="warning-outline" size={60} color={colors.error} />
            <Text variant="h4" style={styles.warningTitle}>
              Delete Account
            </Text>
            <Text
              variant="body"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
              style={styles.warningText}
            >
              This will permanently delete your account and all associated data. This action cannot be undone.
            </Text>
          </View>

          <Card style={styles.dataCard}>
            <Text variant="h6" style={styles.cardTitle}>
              What will be deleted:
            </Text>
            <View style={styles.dataItem}>
              <Icon name="person-outline" size={20} color={colors.error} />
              <Text variant="bodySmall">Profile information</Text>
            </View>
            <View style={styles.dataItem}>
              <Icon name="sparkles-outline" size={20} color={colors.error} />
              <Text variant="bodySmall">All your designs</Text>
            </View>
            <View style={styles.dataItem}>
              <Icon name="heart-outline" size={20} color={colors.error} />
              <Text variant="bodySmall">Wishlist and favorites</Text>
            </View>
            <View style={styles.dataItem}>
              <Icon name="receipt-outline" size={20} color={colors.error} />
              <Text variant="bodySmall">Order history (limited)</Text>
            </View>
          </Card>

          <Card style={styles.gdprCard}>
            <View style={styles.gdprHeader}>
              <Icon name="shield-checkmark-outline" size={32} color={colors.primary} />
              <Text variant="h6" style={styles.gdprTitle}>
                GDPR Rights
              </Text>
            </View>
            <Text
              variant="bodySmall"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
              style={styles.gdprText}
            >
              Before deleting your account, you can download all your personal data. This complies with GDPR regulations.
            </Text>
            <Button
              title="Download My Data"
              onPress={handleDownloadData}
              variant="outline"
              fullWidth
              size="sm"
            />
          </Card>

          <Card style={styles.confirmCard}>
            <Toggle
              label="I understand this action is permanent"
              value={confirmDelete}
              onValueChange={setConfirmDelete}
              description="Check this box to confirm"
            />
          </Card>

          <Button
            title="Delete My Account"
            onPress={handleDelete}
            disabled={!confirmDelete}
            fullWidth
            style={[styles.deleteButton, { backgroundColor: colors.error }]}
          />

          <Text
            variant="caption"
            color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
            style={styles.helpText}
          >
            Need help? Contact support before deleting your account
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  warningSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  warningTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.error,
  },
  warningText: {
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 22,
  },
  dataCard: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    marginBottom: spacing.md,
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  gdprCard: {
    marginBottom: spacing.lg,
  },
  gdprHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  gdprTitle: {
    flex: 1,
  },
  gdprText: {
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  confirmCard: {
    marginBottom: spacing.lg,
  },
  deleteButton: {
    marginBottom: spacing.md,
  },
  helpText: {
    textAlign: 'center',
  },
});


import { View, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/molecules/Card';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export const ReferralScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const referralCode = 'GLAM2024XYZ';
  const referralLink = `https://glamora.app/ref/${referralCode}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Glamora and get $50 off your first purchase! Use my code: ${referralCode}\n${referralLink}`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const copyToClipboard = () => {
    console.log('Code copied to clipboard');
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
        <Text variant="h5">Invite Friends</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Icon name="gift-outline" size={80} color={colors.primary} />
            <Text variant="h4" style={styles.heroTitle}>
              Give $50, Get $50
            </Text>
            <Text
              variant="body"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
              style={styles.heroSubtitle}
            >
              Invite friends to Glamora and you'll both receive $50 credit
            </Text>
          </View>

          <Card style={styles.codeCard}>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              style={styles.codeLabel}
            >
              Your Referral Code
            </Text>
            <View style={styles.codeContainer}>
              <Text variant="h4" color={colors.primary} style={styles.code}>
                {referralCode}
              </Text>
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                <Icon name="copy-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text variant="h3" color={colors.primary}>
                12
              </Text>
              <Text
                variant="caption"
                color={isDark ? colors.textDark.secondary : colors.text.secondary}
              >
                Friends Invited
              </Text>
            </View>
            <View
              style={[
                styles.statDivider,
                { backgroundColor: colors.border[isDark ? 'dark' : 'light'] },
              ]}
            />
            <View style={styles.statBox}>
              <Text variant="h3" color={colors.primary}>
                $600
              </Text>
              <Text
                variant="caption"
                color={isDark ? colors.textDark.secondary : colors.text.secondary}
              >
                Earned
              </Text>
            </View>
          </View>

          <View style={styles.howItWorks}>
            <Text variant="h6" style={styles.howItWorksTitle}>
              How it Works
            </Text>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text variant="body" style={styles.stepNumberText}>
                  1
                </Text>
              </View>
              <Text
                variant="body"
                color={isDark ? colors.textDark.secondary : colors.text.secondary}
              >
                Share your unique referral code
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text variant="body" style={styles.stepNumberText}>
                  2
                </Text>
              </View>
              <Text
                variant="body"
                color={isDark ? colors.textDark.secondary : colors.text.secondary}
              >
                Your friend signs up and makes a purchase
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text variant="body" style={styles.stepNumberText}>
                  3
                </Text>
              </View>
              <Text
                variant="body"
                color={isDark ? colors.textDark.secondary : colors.text.secondary}
              >
                You both get $50 credit!
              </Text>
            </View>
          </View>

          <Button
            title="Share Referral Code"
            onPress={handleShare}
            fullWidth
            style={styles.shareButton}
          />
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
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    textAlign: 'center',
    maxWidth: 300,
  },
  codeCard: {
    marginBottom: spacing.lg,
  },
  codeLabel: {
    marginBottom: spacing.sm,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  code: {
    fontWeight: '700',
    letterSpacing: 2,
  },
  copyButton: {
    padding: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
  },
  howItWorks: {
    marginBottom: spacing.xl,
  },
  howItWorksTitle: {
    marginBottom: spacing.lg,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: colors.backgroundDark,
    fontWeight: '700',
  },
  shareButton: {
    marginBottom: spacing.xl,
  },
});


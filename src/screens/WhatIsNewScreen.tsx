import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/molecules/Card';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const updates = [
  {
    version: '1.5.0',
    date: 'Jan 15, 2024',
    features: [
      {
        title: 'Enhanced AR Try-On',
        description: 'More accurate face detection and improved jewelry placement',
        icon: 'camera-outline',
      },
      {
        title: 'New AI Styles',
        description: 'Added Art Nouveau and Futuristic design styles',
        icon: 'sparkles-outline',
      },
      {
        title: 'Performance Improvements',
        description: '40% faster loading times across the app',
        icon: 'speedometer-outline',
      },
    ],
  },
  {
    version: '1.4.0',
    date: 'Dec 20, 2023',
    features: [
      {
        title: 'Social Feed',
        description: 'Share your designs with the community',
        icon: 'people-outline',
      },
      {
        title: 'Live Events',
        description: 'Join exclusive jewelry design events',
        icon: 'videocam-outline',
      },
    ],
  },
];

export const WhatIsNewScreen = () => {
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
      edges={['top']}
    >
      <View style={styles.header}>
        <Text variant="h5">What's New</Text>
        <TouchableOpacity>
          <Icon name="close" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {updates.map((update, idx) => (
            <View key={update.version} style={styles.updateSection}>
              <View style={styles.versionHeader}>
                <View>
                  <View style={styles.versionRow}>
                    <Text variant="h5">Version {update.version}</Text>
                    {idx === 0 && (
                      <Badge label="LATEST" variant="success" style={styles.latestBadge} />
                    )}
                  </View>
                  <Text
                    variant="caption"
                    color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                  >
                    {update.date}
                  </Text>
                </View>
              </View>

              {update.features.map((feature, featureIdx) => (
                <Card key={featureIdx} style={styles.featureCard}>
                  <View style={styles.featureContent}>
                    <View
                      style={[
                        styles.featureIcon,
                        {
                          backgroundColor: `${colors.primary}20`,
                        },
                      ]}
                    >
                      <Icon name={feature.icon as any} size={24} color={colors.primary} />
                    </View>
                    <View style={styles.featureText}>
                      <Text variant="body" style={styles.featureTitle}>
                        {feature.title}
                      </Text>
                      <Text
                        variant="bodySmall"
                        color={isDark ? colors.textDark.secondary : colors.text.secondary}
                      >
                        {feature.description}
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Button title="Got It!" onPress={() => {}} fullWidth />
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
  updateSection: {
    marginBottom: spacing.xl,
  },
  versionHeader: {
    marginBottom: spacing.lg,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  latestBadge: {
    marginBottom: 0,
  },
  featureCard: {
    marginBottom: spacing.md,
  },
  featureContent: {
    flexDirection: 'row',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});


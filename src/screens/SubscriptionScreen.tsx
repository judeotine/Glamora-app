import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/molecules/Card';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    features: [
      '5 AI designs per month',
      'Basic AR try-on',
      'Community gallery access',
      'Email support',
    ],
    color: colors.text.secondary,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    period: 'month',
    features: [
      'Unlimited AI designs',
      'Advanced AR features',
      'Priority support',
      'Exclusive designer access',
      'Custom materials',
      '10% discount on purchases',
    ],
    color: colors.primary,
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    period: 'month',
    features: [
      'Everything in Pro',
      'White-label solutions',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      '20% discount on purchases',
    ],
    color: colors.primaryDark,
  },
];

export const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
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
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text variant="h5">Subscription Plans</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.subtitle}
          >
            Choose the plan that best fits your creative needs
          </Text>

          {plans.map(plan => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.8}
            >
              <Card
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && {
                    borderWidth: 2,
                    borderColor: colors.primary,
                  },
                ]}
              >
                {plan.isPopular && (
                  <View style={styles.popularBadge}>
                    <Text variant="caption" style={styles.popularText}>
                      MOST POPULAR
                    </Text>
                  </View>
                )}

                <View style={styles.planHeader}>
                  <Text variant="h5" style={[styles.planName, { color: plan.color }]}>
                    {plan.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text variant="h3" style={{ color: plan.color }}>
                      ${plan.price}
                    </Text>
                    <Text
                      variant="body"
                      color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                    >
                      /{plan.period}
                    </Text>
                  </View>
                </View>

                <View style={styles.features}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Icon
                        name="checkmark-circle"
                        size={20}
                        color={colors.success}
                      />
                      <Text variant="bodySmall" style={styles.featureText}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                {selectedPlan === plan.id && plan.id !== 'free' && (
                  <Button
                    title="Subscribe Now"
                    onPress={() => {}}
                    fullWidth
                    size="sm"
                    style={styles.subscribeButton}
                  />
                )}
              </Card>
            </TouchableOpacity>
          ))}
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
  subtitle: {
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  planCard: {
    marginBottom: spacing.lg,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    zIndex: 1,
  },
  popularText: {
    color: colors.backgroundDark,
    fontWeight: '700',
  },
  planHeader: {
    marginBottom: spacing.lg,
  },
  planName: {
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  features: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    flex: 1,
  },
  subscribeButton: {
    marginTop: spacing.md,
  },
});


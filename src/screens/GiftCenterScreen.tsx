import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/molecules/Card';
import { Toggle } from '@/components/molecules/Toggle';
import { Input } from '@/components/atoms/Input';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export const GiftCenterScreen = () => {
  const [addGiftWrap, setAddGiftWrap] = useState(true);
  const [addGreetingCard, setAddGreetingCard] = useState(true);
  const [giftMessage, setGiftMessage] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Icon name="gift-outline" size={80} color={colors.primary} />
            <Text variant="h4" style={styles.heroTitle}>
              Make it a Gift
            </Text>
            <Text
              variant="body"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
              style={styles.heroSubtitle}
            >
              Add a personal touch with gift wrapping and a custom message
            </Text>
          </View>

          <Card style={styles.optionsCard}>
            <Text variant="h6" style={styles.cardTitle}>
              Gift Options
            </Text>
            <Toggle
              label="Premium Gift Wrapping"
              value={addGiftWrap}
              onValueChange={setAddGiftWrap}
              description="Luxury box with ribbon - $15"
            />
            <View style={styles.divider} />
            <Toggle
              label="Greeting Card"
              value={addGreetingCard}
              onValueChange={setAddGreetingCard}
              description="Handwritten card - $5"
            />
          </Card>

          {addGreetingCard && (
            <Card style={styles.messageCard}>
              <Text variant="h6" style={styles.cardTitle}>
                Your Message
              </Text>
              <Input
                placeholder="Write your message..."
                value={giftMessage}
                onChangeText={setGiftMessage}
                containerStyle={styles.messageInput}
              />
              <Text
                variant="caption"
                color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              >
                {giftMessage.length}/250 characters
              </Text>
            </Card>
          )}

          <Card style={styles.recipientCard}>
            <Text variant="h6" style={styles.cardTitle}>
              Recipient Information
            </Text>
            <Input
              label="Recipient Email (Optional)"
              placeholder="recipient@example.com"
              value={recipientEmail}
              onChangeText={setRecipientEmail}
              keyboardType="email-address"
              containerStyle={styles.recipientInput}
            />
            <Text
              variant="caption"
              color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
            >
              We'll send them a notification when the gift is ready
            </Text>
          </Card>

          <View style={styles.previewSection}>
            <Text variant="h6" style={styles.previewTitle}>
              Gift Preview
            </Text>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
              }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text variant="body">Gift Wrapping</Text>
              <Text variant="body">{addGiftWrap ? '$15.00' : '$0.00'}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text variant="body">Greeting Card</Text>
              <Text variant="body">{addGreetingCard ? '$5.00' : '$0.00'}</Text>
            </View>
            <View
              style={[
                styles.divider,
                { backgroundColor: colors.border[isDark ? 'dark' : 'light'] },
              ]}
            />
            <View style={styles.totalRow}>
              <Text variant="h6">Total Gift Services</Text>
              <Text variant="h6" color={colors.primary}>
                ${(addGiftWrap ? 15 : 0) + (addGreetingCard ? 5 : 0)}.00
              </Text>
            </View>
          </View>

          <Button title="Add to Order" onPress={() => {}} fullWidth />
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
  optionsCard: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  messageCard: {
    marginBottom: spacing.lg,
  },
  messageInput: {
    marginBottom: spacing.sm,
  },
  recipientCard: {
    marginBottom: spacing.lg,
  },
  recipientInput: {
    marginBottom: spacing.sm,
  },
  previewSection: {
    marginBottom: spacing.lg,
  },
  previewTitle: {
    marginBottom: spacing.md,
  },
  previewImage: {
    width: '100%',
    height: 250,
    borderRadius: borderRadius.xl,
  },
  totalSection: {
    marginBottom: spacing.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
});


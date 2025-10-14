import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Card } from '@/components/molecules/Card';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const faqs = [
  {
    id: '1',
    question: 'How does the AI designer work?',
    answer:
      'Our AI designer uses advanced machine learning to generate unique jewelry designs based on your preferences for type, style, and custom descriptions.',
  },
  {
    id: '2',
    question: 'Can I customize existing designs?',
    answer:
      'Yes! You can remix and modify any design in your gallery or from the marketplace.',
  },
  {
    id: '3',
    question: 'How accurate is the AR try-on?',
    answer:
      'Our AR technology provides a realistic preview of how jewelry will look on you with 95% accuracy.',
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, debit cards, PayPal, and Apple Pay.',
  },
  {
    id: '5',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all products in original condition.',
  },
];

const helpCategories = [
  { id: '1', title: 'Getting Started', icon: 'rocket-outline' },
  { id: '2', title: 'Account & Security', icon: 'shield-checkmark-outline' },
  { id: '3', title: 'Orders & Shipping', icon: 'cube-outline' },
  { id: '4', title: 'Payments', icon: 'card-outline' },
  { id: '5', title: 'AR & Technology', icon: 'camera-outline' },
];

export const HelpCenterScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
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
        <Text variant="h5">Help Center</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for help..."
          />
        </View>

        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Browse by Topic
          </Text>
          <View style={styles.categoriesGrid}>
            {helpCategories.map(cat => (
              <Card key={cat.id} onPress={() => {}} style={styles.categoryCard}>
                <Icon name={cat.icon as any} size={32} color={colors.primary} />
                <Text variant="bodySmall" style={styles.categoryTitle}>
                  {cat.title}
                </Text>
              </Card>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Frequently Asked Questions
          </Text>
          {faqs.map(faq => (
            <Card
              key={faq.id}
              onPress={() => toggleFaq(faq.id)}
              style={styles.faqCard}
            >
              <View style={styles.faqHeader}>
                <Text variant="body" style={styles.faqQuestion}>
                  {faq.question}
                </Text>
                <Icon
                  name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                />
              </View>
              {expandedFaq === faq.id && (
                <Text
                  variant="bodySmall"
                  color={isDark ? colors.textDark.secondary : colors.text.secondary}
                  style={styles.faqAnswer}
                >
                  {faq.answer}
                </Text>
              )}
            </Card>
          ))}
        </View>

        <View style={[styles.section, styles.contactSection]}>
          <Text variant="h6" style={styles.sectionTitle}>
            Still Need Help?
          </Text>
          <Card onPress={() => {}} style={styles.contactCard}>
            <Icon name="mail-outline" size={24} color={colors.primary} />
            <View style={styles.contactInfo}>
              <Text variant="body" style={styles.contactTitle}>
                Email Support
              </Text>
              <Text
                variant="caption"
                color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              >
                support@glamora.com
              </Text>
            </View>
            <Icon name="chevron-forward" size={20} />
          </Card>

          <Card onPress={() => {}} style={styles.contactCard}>
            <Icon name="chatbubbles-outline" size={24} color={colors.primary} />
            <View style={styles.contactInfo}>
              <Text variant="body" style={styles.contactTitle}>
                Live Chat
              </Text>
              <Text
                variant="caption"
                color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              >
                Available 24/7
              </Text>
            </View>
            <Icon name="chevron-forward" size={20} />
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryCard: {
    width: '47%',
    alignItems: 'center',
    padding: spacing.lg,
  },
  categoryTitle: {
    marginTop: spacing.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
  faqCard: {
    marginBottom: spacing.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontWeight: '600',
    marginRight: spacing.md,
  },
  faqAnswer: {
    marginTop: spacing.md,
    lineHeight: 22,
  },
  contactSection: {
    marginBottom: spacing['2xl'],
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  contactInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  contactTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
});


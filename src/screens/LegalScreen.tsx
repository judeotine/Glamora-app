import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/molecules/Card';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const legalDocuments = [
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Our terms and conditions',
    icon: 'document-text-outline',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'How we handle your data',
    icon: 'lock-closed-outline',
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    description: 'Cookie usage information',
    icon: 'information-circle-outline',
  },
  {
    id: 'gdpr',
    title: 'GDPR Compliance',
    description: 'Your data rights',
    icon: 'shield-checkmark-outline',
  },
];

export const LegalScreen = () => {
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
        <Text variant="h5">Legal</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant="h6" style={styles.introTitle}>
            Legal Information
          </Text>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.introText}
          >
            Review our policies and legal documents to understand how Glamora operates.
          </Text>

          <View style={styles.documentsContainer}>
            {legalDocuments.map(doc => (
              <Card key={doc.id} onPress={() => {}} style={styles.documentCard}>
                <View style={styles.documentContent}>
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
                    <Icon name={doc.icon as any} size={24} color={colors.primary} />
                  </View>
                  <View style={styles.documentText}>
                    <Text variant="body" style={styles.documentTitle}>
                      {doc.title}
                    </Text>
                    <Text
                      variant="caption"
                      color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                    >
                      {doc.description}
                    </Text>
                  </View>
                  <Icon name="chevron-forward" size={20} />
                </View>
              </Card>
            ))}
          </View>

          <View style={styles.footer}>
            <Text
              variant="caption"
              color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              style={styles.footerText}
            >
              Last updated: January 2024
            </Text>
          </View>
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
  introTitle: {
    marginBottom: spacing.sm,
  },
  introText: {
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  documentsContainer: {
    gap: spacing.sm,
  },
  documentCard: {
    marginBottom: 0,
  },
  documentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  documentText: {
    flex: 1,
  },
  documentTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
  },
});


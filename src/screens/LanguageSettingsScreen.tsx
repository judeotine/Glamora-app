import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/molecules/Card';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { changeLanguage } from '@/services/i18n';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', isRTL: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

export const LanguageSettingsScreen = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleLanguageChange = async (code: string) => {
    setSelectedLanguage(code);
    await changeLanguage(code);
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
        <Text variant="h5">Language & Region</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.subtitle}
          >
            Choose your preferred language for the app
          </Text>

          <View style={styles.languageList}>
            {languages.map(lang => (
              <Card
                key={lang.code}
                onPress={() => handleLanguageChange(lang.code)}
                style={styles.languageCard}
              >
                <Text variant="h4" style={styles.flag}>
                  {lang.flag}
                </Text>
                <View style={styles.languageInfo}>
                  <Text variant="body" style={styles.languageName}>
                    {lang.name}
                  </Text>
                  <Text
                    variant="caption"
                    color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                  >
                    {lang.nativeName}
                  </Text>
                  {lang.isRTL && (
                    <Text
                      variant="caption"
                      color={colors.primary}
                      style={styles.rtlLabel}
                    >
                      RTL Support
                    </Text>
                  )}
                </View>
                {selectedLanguage === lang.code && (
                  <Icon name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </Card>
            ))}
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
  subtitle: {
    marginBottom: spacing.xl,
  },
  languageList: {
    gap: spacing.sm,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  flag: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  rtlLabel: {
    marginTop: spacing.xs / 2,
    fontWeight: '600',
  },
});


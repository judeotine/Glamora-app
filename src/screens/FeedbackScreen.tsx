import { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const feedbackTypes = ['Bug Report', 'Feature Request', 'General Feedback', 'Compliment'];

export const FeedbackScreen = () => {
  const [selectedType, setSelectedType] = useState('Bug Report');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }
    Alert.alert('Success', 'Thank you for your feedback!');
    setFeedback('');
    setEmail('');
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
        <Text variant="h5">Feedback & Bug Report</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.subtitle}
          >
            We'd love to hear from you! Share your thoughts, report bugs, or suggest new features.
          </Text>

          <View style={styles.typeSelector}>
            <Text variant="body" style={styles.label}>
              Feedback Type
            </Text>
            <View style={styles.typeButtons}>
              {feedbackTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor:
                        selectedType === type
                          ? colors.primary
                          : isDark
                          ? colors.cardDark
                          : colors.border.light,
                    },
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      color:
                        selectedType === type
                          ? colors.backgroundDark
                          : isDark
                          ? colors.textDark.primary
                          : colors.text.primary,
                      fontWeight: '600',
                    }}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text variant="body" style={styles.label}>
              Your Feedback
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: isDark ? colors.cardDark : colors.backgroundLight,
                  borderColor: colors.border[isDark ? 'dark' : 'light'],
                  color: isDark ? colors.textDark.primary : colors.text.primary,
                },
              ]}
              placeholder="Tell us what's on your mind..."
              placeholderTextColor={
                isDark ? colors.textDark.tertiary : colors.text.tertiary
              }
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text variant="body" style={styles.label}>
              Email (Optional)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? colors.cardDark : colors.backgroundLight,
                  borderColor: colors.border[isDark ? 'dark' : 'light'],
                  color: isDark ? colors.textDark.primary : colors.text.primary,
                },
              ]}
              placeholder="your.email@example.com"
              placeholderTextColor={
                isDark ? colors.textDark.tertiary : colors.text.tertiary
              }
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Button title="Submit Feedback" onPress={handleSubmit} fullWidth />
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
  typeSelector: {
    marginBottom: spacing.xl,
  },
  label: {
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  typeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  textArea: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    fontSize: 16,
    minHeight: 150,
  },
  input: {
    height: 48,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: 16,
  },
});


import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/molecules/Card';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export const TwoFactorAuthScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isEnabled, setIsEnabled] = useState(false);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      console.log('Verifying 2FA code:', fullCode);
      setIsEnabled(true);
    }
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
        <Text variant="h5">Two-Factor Authentication</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {!isEnabled ? (
          <>
            <View style={styles.iconContainer}>
              <Icon name="shield-checkmark-outline" size={80} color={colors.primary} />
            </View>

            <Text variant="h5" style={styles.title}>
              Secure Your Account
            </Text>
            <Text
              variant="body"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
              style={styles.description}
            >
              Add an extra layer of security with two-factor authentication
            </Text>

            <Card style={styles.qrCard}>
              <Text variant="body" style={styles.qrTitle}>
                Scan this QR code with your authenticator app
              </Text>
              <View style={styles.qrPlaceholder}>
                <Icon name="qr-code-outline" size={120} color={colors.primary} />
              </View>
              <Text
                variant="caption"
                color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                style={styles.qrHint}
              >
                Use Google Authenticator, Authy, or similar apps
              </Text>
            </Card>

            <Text variant="body" style={styles.codeLabel}>
              Enter verification code
            </Text>
            <View style={styles.codeInputContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.codeInput,
                    {
                      backgroundColor: isDark ? colors.cardDark : colors.cardLight,
                      borderColor: colors.border[isDark ? 'dark' : 'light'],
                      color: isDark ? colors.textDark.primary : colors.text.primary,
                    },
                  ]}
                  value={digit}
                  onChangeText={value => handleCodeChange(value, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>

            <Button
              title="Verify & Enable"
              onPress={handleVerify}
              fullWidth
              disabled={code.some(d => !d)}
              style={styles.verifyButton}
            />
          </>
        ) : (
          <>
            <View style={styles.successContainer}>
              <Icon name="checkmark-circle" size={100} color={colors.success} />
              <Text variant="h4" style={styles.successTitle}>
                2FA Enabled!
              </Text>
              <Text
                variant="body"
                color={isDark ? colors.textDark.secondary : colors.text.secondary}
                style={styles.successText}
              >
                Your account is now protected with two-factor authentication
              </Text>
            </View>

            <Button title="Done" onPress={() => {}} fullWidth />
          </>
        )}
      </View>
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
    flex: 1,
    padding: spacing.lg,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  qrCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  qrTitle: {
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  qrHint: {
    textAlign: 'center',
  },
  codeLabel: {
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  verifyButton: {
    marginTop: spacing.lg,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.success,
  },
  successText: {
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: spacing.xl,
  },
});


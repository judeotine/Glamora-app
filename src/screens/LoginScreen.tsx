import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { RootStackParamList } from '@/navigation/RootNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Main');
    }, 1500);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            {t('common.welcome')}
          </Text>
          <Text variant="body" color={isDark ? colors.textDark.secondary : colors.text.secondary}>
            Sign in to continue to Glamora
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label={t('auth.email')}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label={t('auth.password')}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text variant="bodySmall" color={colors.primary}>
              {t('auth.forgotPassword')}
            </Text>
          </TouchableOpacity>

          <Button
            title={t('auth.login')}
            onPress={handleLogin}
            loading={loading}
            fullWidth
            style={styles.loginButton}
          />

          <View style={styles.divider}>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: isDark ? colors.border.dark : colors.border.light },
              ]}
            />
            <Text variant="caption" color={isDark ? colors.textDark.tertiary : colors.text.tertiary}>
              OR
            </Text>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: isDark ? colors.border.dark : colors.border.light },
              ]}
            />
          </View>

          <Button
            title={t('auth.signInWithGoogle')}
            onPress={() => {}}
            variant="outline"
            fullWidth
          />
          <Button
            title={t('auth.signInWithApple')}
            onPress={() => {}}
            variant="outline"
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text variant="body" color={isDark ? colors.textDark.secondary : colors.text.secondary}>
            {t('auth.dontHaveAccount')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text variant="body" color={colors.primary} style={styles.link}>
              {t('auth.register')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: spacing['2xl'],
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.sm,
  },
  form: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  loginButton: {
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  link: {
    fontWeight: '700',
  },
});


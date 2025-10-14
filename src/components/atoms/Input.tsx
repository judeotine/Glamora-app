import { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, borderRadius, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}: InputProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: isDark ? colors.textDark.primary : colors.text.primary },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark
              ? colors.cardDark
              : colors.backgroundLight,
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.primary
              : colors.border[isDark ? 'dark' : 'light'],
            color: isDark ? colors.textDark.primary : colors.text.primary,
          },
          style,
        ]}
        placeholderTextColor={
          isDark ? colors.textDark.tertiary : colors.text.tertiary
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    height: 48,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: 16,
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});


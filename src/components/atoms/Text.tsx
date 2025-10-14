import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface TextProps extends RNTextProps {
  variant?: keyof typeof typography;
  color?: string;
}

export const Text = ({ variant = 'body', color, style, ...props }: TextProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const textColor =
    color || (isDark ? colors.textDark.primary : colors.text.primary);

  return (
    <RNText
      style={[typography[variant], { color: textColor }, style]}
      {...props}
    />
  );
};


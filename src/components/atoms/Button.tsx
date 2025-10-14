import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, borderRadius, spacing, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    const sizeStyles = {
      sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
      md: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
      lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
        ...shadows.md,
      },
      secondary: {
        backgroundColor: isDark
          ? colors.backgroundLight
          : colors.backgroundDark,
      },
      outline: {
        backgroundColor: colors.transparent,
        borderWidth: 2,
        borderColor: colors.primary,
      },
      ghost: {
        backgroundColor: colors.transparent,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.5 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles = {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
    };

    const variantStyles = {
      primary: { color: colors.backgroundDark },
      secondary: {
        color: isDark ? colors.backgroundDark : colors.text.inverse,
      },
      outline: { color: colors.primary },
      ghost: { color: colors.primary },
    };

    return {
      fontWeight: '700',
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' ? colors.backgroundDark : colors.primary
          }
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};


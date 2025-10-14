import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, borderRadius, spacing } from '@/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge = ({
  label,
  variant = 'primary',
  style,
  textStyle,
}: BadgeProps) => {
  const variantColors = {
    primary: colors.primary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: variantColors[variant] },
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.text.inverse,
    fontSize: 12,
    fontWeight: '700',
  },
});


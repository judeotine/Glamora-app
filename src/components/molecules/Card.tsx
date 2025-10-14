import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { ReactNode } from 'react';
import { colors, borderRadius, spacing, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
}

export const Card = ({ children, onPress, style, elevated = true }: CardProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.cardDark : colors.cardLight,
        },
        elevated && shadows.md,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
});


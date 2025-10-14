import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface ChipProps {
  label: string;
  onPress: () => void;
  selected?: boolean;
  style?: ViewStyle;
}

export const Chip = ({ label, onPress, selected = false, style }: ChipProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: selected
            ? colors.primary
            : isDark
            ? colors.cardDark
            : colors.border.light,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected
              ? colors.backgroundDark
              : isDark
              ? colors.textDark.primary
              : colors.text.primary,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});


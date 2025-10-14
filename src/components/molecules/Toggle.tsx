import { View, Switch, Text as RNText, StyleSheet } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface ToggleProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  description?: string;
}

export const Toggle = ({
  label,
  value,
  onValueChange,
  description,
}: ToggleProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text variant="body" style={styles.label}>
          {label}
        </Text>
        {description && (
          <Text
            variant="caption"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
          >
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.border[isDark ? 'dark' : 'light'],
          true: colors.primary,
        }}
        thumbColor={colors.cardLight}
        ios_backgroundColor={colors.border[isDark ? 'dark' : 'light']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  label: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
});


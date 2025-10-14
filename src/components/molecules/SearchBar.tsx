import { View, TextInput, StyleSheet } from 'react-native';
import { Icon } from '@/components/atoms/Icon';
import { colors, borderRadius, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChangeText,
}: SearchBarProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.cardDark : colors.backgroundLight,
          borderColor: colors.border[isDark ? 'dark' : 'light'],
        },
      ]}
    >
      <Icon name="search-outline" size={20} />
      <TextInput
        style={[
          styles.input,
          {
            color: isDark ? colors.textDark.primary : colors.text.primary,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={
          isDark ? colors.textDark.tertiary : colors.text.tertiary
        }
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
  },
});


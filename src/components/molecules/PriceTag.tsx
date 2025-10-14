import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface PriceTagProps {
  price: number;
  currency?: string;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceTag = ({
  price,
  currency = 'USD',
  originalPrice,
  size = 'md',
}: PriceTagProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const formatPrice = (amount: number) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      AED: 'د.إ',
      SAR: '﷼',
    };
    return `${symbols[currency] || '$'}${amount.toLocaleString()}`;
  };

  const sizeStyles = {
    sm: { fontSize: 16 },
    md: { fontSize: 20 },
    lg: { fontSize: 28 },
  };

  return (
    <View style={styles.container}>
      <Text
        variant="h4"
        style={[
          { color: colors.primary, fontWeight: '700' },
          sizeStyles[size],
        ]}
      >
        {formatPrice(price)}
      </Text>
      {originalPrice && originalPrice > price && (
        <Text
          variant="bodySmall"
          style={[
            styles.originalPrice,
            {
              color: isDark ? colors.textDark.tertiary : colors.text.tertiary,
            },
          ]}
        >
          {formatPrice(originalPrice)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
});


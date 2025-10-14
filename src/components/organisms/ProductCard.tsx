import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { PriceTag } from '@/components/molecules/PriceTag';
import { StarRating } from '@/components/molecules/StarRating';
import { colors, borderRadius, spacing, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - spacing.lg * 3) / 2;

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating?: number;
  isFavorite?: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export const ProductCard = ({
  name,
  price,
  imageUrl,
  rating = 0,
  isFavorite = false,
  onPress,
  onFavoritePress,
}: ProductCardProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.cardDark : colors.cardLight,
        },
        shadows.md,
      ]}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        <TouchableOpacity
          onPress={onFavoritePress}
          style={styles.favoriteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text variant="bodySmall" numberOfLines={2} style={styles.name}>
          {name}
        </Text>
        {rating > 0 && <StarRating rating={rating} size={14} />}
        <PriceTag price={price} size="sm" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: cardWidth * 1.2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.cardLight,
    borderRadius: borderRadius.full,
    padding: spacing.xs,
  },
  content: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  name: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
});


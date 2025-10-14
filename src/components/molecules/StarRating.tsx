import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@/components/atoms/Icon';
import { colors, spacing } from '@/theme';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  onRate,
  readonly = true,
  size = 20,
}: StarRatingProps) => {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {stars.map(star => {
        const isFilled = star <= rating;
        const StarComponent = readonly ? View : TouchableOpacity;

        return (
          <StarComponent
            key={star}
            onPress={() => !readonly && onRate?.(star)}
            style={styles.star}
          >
            <Icon
              name={isFilled ? 'star' : 'star-outline'}
              size={size}
              color={colors.primary}
            />
          </StarComponent>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: spacing.xs,
  },
});


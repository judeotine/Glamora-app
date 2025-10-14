import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { ImageCarousel } from '@/components/organisms/ImageCarousel';
import { PriceTag } from '@/components/molecules/PriceTag';
import { StarRating } from '@/components/molecules/StarRating';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');

const mockProduct = {
  id: '1',
  name: 'Celestial Diamond Necklace',
  description: 'Exquisite 18K white gold necklace featuring a brilliant-cut diamond centerpiece surrounded by smaller diamonds in a celestial pattern.',
  price: 2499,
  images: [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800',
  ],
  material: '18K White Gold',
  gemstone: 'Diamond (0.5ct)',
  rating: 4.8,
  reviews: 127,
  inStock: true,
};

export const ProductDetailScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
        },
      ]}
      edges={['top']}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.headerButton}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageCarousel images={mockProduct.images} height={screenWidth} />

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text variant="h3" style={styles.title}>
              {mockProduct.name}
            </Text>
            <View style={styles.ratingRow}>
              <StarRating rating={mockProduct.rating} size={16} />
              <Text
                variant="bodySmall"
                color={isDark ? colors.textDark.secondary : colors.text.secondary}
                style={styles.reviewCount}
              >
                ({mockProduct.reviews} reviews)
              </Text>
            </View>
            <PriceTag price={mockProduct.price} size="lg" />
          </View>

          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              Description
            </Text>
            <Text
              variant="body"
              color={isDark ? colors.textDark.secondary : colors.text.secondary}
            >
              {mockProduct.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              Specifications
            </Text>
            <View style={styles.specRow}>
              <Text variant="body" color={isDark ? colors.textDark.tertiary : colors.text.tertiary}>
                Material
              </Text>
              <Text variant="body" style={styles.specValue}>
                {mockProduct.material}
              </Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="body" color={isDark ? colors.textDark.tertiary : colors.text.tertiary}>
                Gemstone
              </Text>
              <Text variant="body" style={styles.specValue}>
                {mockProduct.gemstone}
              </Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="body" color={isDark ? colors.textDark.tertiary : colors.text.tertiary}>
                Availability
              </Text>
              <Badge
                label={mockProduct.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                variant={mockProduct.inStock ? 'success' : 'error'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              Try it on
            </Text>
            <Button
              title="AR Try-On"
              onPress={() => {}}
              variant="outline"
              fullWidth
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: isDark ? colors.cardDark : colors.cardLight,
            borderTopColor: colors.border[isDark ? 'dark' : 'light'],
          },
          shadows.xl,
        ]}
      >
        <Button
          title="Add to Cart"
          onPress={() => {}}
          fullWidth
          style={styles.addToCartButton}
        />
        <Button
          title="Customize"
          onPress={() => {}}
          variant="secondary"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  content: {
    padding: spacing.lg,
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  reviewCount: {
    marginLeft: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  specValue: {
    fontWeight: '600',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    gap: spacing.md,
  },
  addToCartButton: {
    marginBottom: spacing.sm,
  },
});


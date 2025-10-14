import { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Chip } from '@/components/molecules/Chip';
import { PriceTag } from '@/components/molecules/PriceTag';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - spacing.lg * 3) / 2;

const categories = ['All', 'Necklaces', 'Bracelets', 'Earrings', 'Rings'];
const priceRanges = ['All', 'Under $500', '$500-$1000', '$1000-$2500', '$2500+'];

const mockProducts = [
  {
    id: '1',
    name: 'Diamond Solitaire',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    category: 'Rings',
  },
  {
    id: '2',
    name: 'Pearl Necklace',
    price: 799,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    category: 'Necklaces',
  },
];

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const renderProduct = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.productCard,
        {
          backgroundColor: isDark ? colors.cardDark : colors.cardLight,
        },
        shadows.md,
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text variant="bodySmall" numberOfLines={2} style={styles.productName}>
          {item.name}
        </Text>
        <PriceTag price={item.price} size="sm" />
      </View>
    </TouchableOpacity>
  );

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
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search jewelry..."
        />
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: isDark ? colors.cardDark : colors.cardLight,
            },
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Icon name="options-outline" size={24} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text variant="body" style={styles.filterTitle}>
              Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipRow}>
                {categories.map(cat => (
                  <Chip
                    key={cat}
                    label={cat}
                    selected={selectedCategory === cat}
                    onPress={() => setSelectedCategory(cat)}
                    style={styles.filterChip}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text variant="body" style={styles.filterTitle}>
              Price Range
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipRow}>
                {priceRanges.map(range => (
                  <Chip
                    key={range}
                    label={range}
                    selected={selectedPriceRange === range}
                    onPress={() => setSelectedPriceRange(range)}
                    style={styles.filterChip}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      <FlatList
        data={mockProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  filtersContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  filterSection: {
    marginBottom: spacing.md,
  },
  filterTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterChip: {
    marginRight: 0,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  productCard: {
    width: cardWidth,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: cardWidth * 1.2,
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
});


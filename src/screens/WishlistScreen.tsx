import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { PriceTag } from '@/components/molecules/PriceTag';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { selectWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';

export const WishlistScreen = () => {
  const { t } = useTranslation();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const { items } = useSelector(selectWishlist);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? colors.cardDark : colors.cardLight,
        },
        shadows.md,
      ]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.info}>
          <Text variant="body" style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <PriceTag price={item.price} size="sm" />
        </View>
        <TouchableOpacity
          onPress={() => handleRemove(item.id)}
          style={styles.removeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="heart" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="heart-outline" size={80} color={colors.border.light} />
      <Text variant="h5" style={styles.emptyTitle}>
        Your Wishlist is Empty
      </Text>
      <Text
        variant="body"
        color={isDark ? colors.textDark.secondary : colors.text.secondary}
        style={styles.emptyText}
      >
        Save your favorite jewelry pieces here
      </Text>
      <Button title="Explore Designs" onPress={() => {}} style={styles.exploreButton} />
    </View>
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
        <Text variant="h5">{t('navigation.wishlist')}</Text>
        {items.length > 0 && (
          <Text variant="caption" color={isDark ? colors.textDark.secondary : colors.text.secondary}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </Text>
        )}
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  card: {
    flexDirection: 'row',
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontWeight: '600',
  },
  removeButton: {
    padding: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing['4xl'],
  },
  emptyTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    maxWidth: 250,
    marginBottom: spacing.lg,
  },
  exploreButton: {
    minWidth: 200,
  },
});


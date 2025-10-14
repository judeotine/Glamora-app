import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { PriceTag } from '@/components/molecules/PriceTag';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { selectCart, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';

export const CartScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const { items, total } = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.cartItem,
        {
          backgroundColor: isDark ? colors.cardDark : colors.cardLight,
        },
        shadows.md,
      ]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemInfo}>
        <Text variant="body" style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        {item.material && (
          <Text
            variant="caption"
            color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
          >
            {item.material}
          </Text>
        )}
        <PriceTag price={item.price} size="sm" />
        
        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            style={[
              styles.quantityButton,
              { backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight },
            ]}
          >
            <Icon name="remove" size={20} />
          </TouchableOpacity>
          <Text variant="body" style={styles.quantity}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            style={[
              styles.quantityButton,
              { backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight },
            ]}
          >
            <Icon name="add" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item.id))}
        style={styles.removeButton}
      >
        <Icon name="trash-outline" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="cart-outline" size={80} color={colors.border.light} />
      <Text variant="h5" style={styles.emptyTitle}>
        Your Cart is Empty
      </Text>
      <Text
        variant="body"
        color={isDark ? colors.textDark.secondary : colors.text.secondary}
        style={styles.emptyText}
      >
        Add some beautiful jewelry to your cart
      </Text>
      <Button title="Continue Shopping" onPress={() => {}} style={styles.shopButton} />
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
        <Text variant="h5">Shopping Cart</Text>
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

      {items.length > 0 && (
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
          <View style={styles.totalRow}>
            <Text variant="h6">Total</Text>
            <PriceTag price={total} size="lg" />
          </View>
          <Button
            title="Proceed to Checkout"
            onPress={() => {}}
            fullWidth
          />
        </View>
      )}
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
  cartItem: {
    flexDirection: 'row',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.md,
    gap: spacing.xs,
  },
  itemName: {
    fontWeight: '600',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontWeight: '700',
    minWidth: 30,
    textAlign: 'center',
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
    marginBottom: spacing.xl,
  },
  shopButton: {
    minWidth: 200,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    gap: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
});


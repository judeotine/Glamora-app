import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/molecules/Card';
import { PriceTag } from '@/components/molecules/PriceTag';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const mockOrders = [
  {
    id: '1',
    orderNumber: '#ORD-2024-001',
    status: 'delivered',
    items: 2,
    total: 3298,
    date: 'Jan 15, 2024',
  },
  {
    id: '2',
    orderNumber: '#ORD-2024-002',
    status: 'shipped',
    items: 1,
    total: 1899,
    date: 'Jan 20, 2024',
  },
  {
    id: '3',
    orderNumber: '#ORD-2024-003',
    status: 'processing',
    items: 3,
    total: 4599,
    date: 'Jan 22, 2024',
  },
];

export const OrderHistoryScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const getStatusVariant = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'info'> = {
      delivered: 'success',
      shipped: 'info',
      processing: 'warning',
    };
    return variants[status] || 'info';
  };

  const renderOrder = ({ item }: any) => (
    <Card onPress={() => {}} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text variant="body" style={styles.orderNumber}>
            {item.orderNumber}
          </Text>
          <Text
            variant="caption"
            color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
          >
            {item.date}
          </Text>
        </View>
        <Badge
          label={item.status.toUpperCase()}
          variant={getStatusVariant(item.status)}
        />
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Text
            variant="bodySmall"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
          >
            Items: {item.items}
          </Text>
        </View>
        <PriceTag price={item.total} size="md" />
      </View>

      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.actionLink}>
          <Text variant="bodySmall" color={colors.primary} style={styles.actionLinkText}>
            Track Order
          </Text>
          <Icon name="chevron-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </Card>
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
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text variant="h5">Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={mockOrders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
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
  orderCard: {
    marginBottom: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailRow: {
    flex: 1,
  },
  orderActions: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionLinkText: {
    fontWeight: '600',
  },
});


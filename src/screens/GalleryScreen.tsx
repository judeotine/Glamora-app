import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { selectDesigns } from '@/store/slices/designSlice';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - spacing.lg * 3) / 2;

export const GalleryScreen = () => {
  const { t } = useTranslation();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const { designs } = useSelector(selectDesigns);

  const renderDesignCard = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? colors.cardDark : colors.cardLight,
        },
        shadows.md,
      ]}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Badge label={item.type.toUpperCase()} variant="primary" style={styles.badge} />
        <Text variant="bodySmall" numberOfLines={1} style={styles.style}>
          {item.style}
        </Text>
        {item.isFavorite && (
          <Icon name="heart" size={16} color={colors.primary} style={styles.heartIcon} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="images-outline" size={80} color={colors.border.light} />
      <Text variant="h5" style={styles.emptyTitle}>
        No Designs Yet
      </Text>
      <Text
        variant="body"
        color={isDark ? colors.textDark.secondary : colors.text.secondary}
        style={styles.emptyText}
      >
        Start creating beautiful jewelry designs with AI
      </Text>
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
        <Text variant="h5">{t('navigation.gallery')}</Text>
        <TouchableOpacity>
          <Icon name="filter-outline" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={designs}
        renderItem={renderDesignCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
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
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: cardWidth * 1.2,
  },
  cardContent: {
    padding: spacing.md,
  },
  badge: {
    marginBottom: spacing.xs,
  },
  style: {
    fontWeight: '600',
  },
  heartIcon: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
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
  },
});


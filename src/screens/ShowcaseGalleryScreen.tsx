import { View, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = screenWidth / 3 - spacing.md;

const mockGalleryItems = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  image: `https://images.unsplash.com/photo-${1515562141207 + i}?w=400`,
  likes: Math.floor(Math.random() * 100),
  designer: `Designer ${i + 1}`,
}));

export const ShowcaseGalleryScreen = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const renderGridItem = ({ item }: any) => (
    <TouchableOpacity style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
      <View style={styles.gridOverlay}>
        <View style={styles.likesContainer}>
          <Icon name="heart" size={14} color={colors.text.inverse} />
          <Text variant="caption" style={styles.likesText}>
            {item.likes}
          </Text>
        </View>
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
        <Text variant="h5">Showcase Gallery</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setViewMode('grid')}>
            <Icon
              name="grid-outline"
              size={24}
              color={viewMode === 'grid' ? colors.primary : undefined}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setViewMode('list')}>
            <Icon
              name="list-outline"
              size={24}
              color={viewMode === 'list' ? colors.primary : undefined}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={mockGalleryItems}
        renderItem={renderGridItem}
        keyExtractor={item => item.id}
        numColumns={3}
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
  headerActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.sm,
  },
  gridItem: {
    width: itemWidth,
    height: itemWidth,
    margin: spacing.xs,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    padding: spacing.xs,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  likesText: {
    color: colors.text.inverse,
    fontWeight: '700',
  },
});


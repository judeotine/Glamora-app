import { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { SearchBar } from '@/components/molecules/SearchBar';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const mockDesigners = [
  {
    id: '1',
    name: 'Jewelry by Anya',
    followers: '12K',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Crafted by Leo',
    followers: '8K',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Artisan Gems',
    followers: '5K',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isFollowing: false,
  },
  {
    id: '4',
    name: 'Metal & Stone',
    followers: '3K',
    avatar: 'https://i.pravatar.cc/150?img=4',
    isFollowing: false,
  },
];

export const DesignerMarketplaceScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [designers, setDesigners] = useState(mockDesigners);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const toggleFollow = (id: string) => {
    setDesigners(prev =>
      prev.map(d =>
        d.id === id ? { ...d, isFollowing: !d.isFollowing } : d
      )
    );
  };

  const renderDesigner = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.designerCard,
        {
          backgroundColor: isDark ? colors.cardDark : colors.cardLight,
        },
      ]}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.designerInfo}>
        <Text variant="body" style={styles.designerName}>
          {item.name}
        </Text>
        <Text
          variant="caption"
          color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
        >
          {item.followers} followers
        </Text>
      </View>
      <Button
        title={item.isFollowing ? 'Following' : 'Follow'}
        onPress={() => toggleFollow(item.id)}
        variant={item.isFollowing ? 'outline' : 'primary'}
        size="sm"
      />
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
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text variant="h5">Artists</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Find artists"
        />
      </View>

      <FlatList
        data={designers}
        renderItem={renderDesigner}
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  designerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: spacing.md,
  },
  designerInfo: {
    flex: 1,
  },
  designerName: {
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
  },
});


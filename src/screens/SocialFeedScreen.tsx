import { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/atoms/Avatar';
import { Card } from '@/components/molecules/Card';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Emma Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content: 'Just received my custom necklace! Absolutely stunning! 💎',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600'],
    likes: 42,
    comments: 8,
    timestamp: '2h ago',
    isLiked: false,
  },
  {
    id: '2',
    user: {
      name: 'Designer Anya',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'New collection dropping this Friday! Which one is your favorite?',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600',
    ],
    likes: 156,
    comments: 23,
    timestamp: '5h ago',
    isLiked: true,
  },
];

export const SocialFeedScreen = () => {
  const [posts, setPosts] = useState(mockPosts);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const toggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const renderPost = ({ item }: any) => (
    <Card style={styles.postCard}>
      <View style={styles.postHeader}>
        <Avatar imageUrl={item.user.avatar} name={item.user.name} size={40} />
        <View style={styles.userInfo}>
          <Text variant="body" style={styles.userName}>
            {item.user.name}
          </Text>
          <Text
            variant="caption"
            color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
          >
            {item.timestamp}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={20} />
        </TouchableOpacity>
      </View>

      <Text variant="body" style={styles.postContent}>
        {item.content}
      </Text>

      {item.images && item.images.length > 0 && (
        <View style={styles.imagesContainer}>
          {item.images.map((img: string, idx: number) => (
            <Image
              key={idx}
              source={{ uri: img }}
              style={[
                styles.postImage,
                item.images.length === 1 && styles.postImageFull,
              ]}
              resizeMode="cover"
            />
          ))}
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
        >
          <Icon
            name={item.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={item.isLiked ? colors.primary : undefined}
          />
          <Text
            variant="bodySmall"
            color={item.isLiked ? colors.primary : undefined}
            style={styles.actionText}
          >
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chatbubble-outline" size={24} />
          <Text variant="bodySmall" style={styles.actionText}>
            {item.comments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-outline" size={24} />
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
      <View style={styles.headerBar}>
        <Text variant="h5">Social Feed</Text>
        <TouchableOpacity>
          <Icon name="add-circle-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  postCard: {
    marginBottom: spacing.lg,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  userName: {
    fontWeight: '700',
  },
  postContent: {
    marginBottom: spacing.md,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  postImage: {
    flex: 1,
    height: 200,
    borderRadius: borderRadius.lg,
  },
  postImageFull: {
    width: '100%',
  },
  postActions: {
    flexDirection: 'row',
    gap: spacing.xl,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionText: {
    fontWeight: '600',
  },
});


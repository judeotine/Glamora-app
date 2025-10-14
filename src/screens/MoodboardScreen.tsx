import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const mockImages = [
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
];

export const MoodboardScreen = () => {
  const [images, setImages] = useState(mockImages);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleAddImage = () => {
    console.log('Add image to moodboard');
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

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
        <Text variant="h5">Moodboard</Text>
        <TouchableOpacity onPress={handleAddImage}>
          <Icon name="add-circle-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.subtitle}
          >
            Collect inspiration for your next jewelry design
          </Text>

          <View style={styles.grid}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Icon name="close-circle" size={24} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={[
                styles.addImageCard,
                {
                  backgroundColor: isDark ? colors.cardDark : colors.cardLight,
                  borderColor: colors.border[isDark ? 'dark' : 'light'],
                },
              ]}
              onPress={handleAddImage}
            >
              <Icon name="add" size={40} color={colors.primary} />
              <Text variant="caption" color={colors.primary} style={styles.addText}>
                Add Image
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <Button title="Generate Design from Board" onPress={() => {}} fullWidth />
            <Button
              title="Share Moodboard"
              onPress={() => {}}
              variant="outline"
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
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
  content: {
    padding: spacing.lg,
  },
  subtitle: {
    marginBottom: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  imageContainer: {
    width: '47%',
    aspectRatio: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.lg,
  },
  removeButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.cardLight,
    borderRadius: 12,
  },
  addImageCard: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  actions: {
    gap: spacing.md,
  },
});


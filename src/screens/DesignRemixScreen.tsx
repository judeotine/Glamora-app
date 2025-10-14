import { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Chip } from '@/components/molecules/Chip';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const styles_list = ['Modern', 'Classic', 'Bohemian', 'Minimalist', 'Vintage', 'Art Deco'];
const materials = ['18K Gold', '14K Gold', 'Sterling Silver', 'Platinum', 'Rose Gold'];

export const DesignRemixScreen = () => {
  const [selectedStyle, setSelectedStyle] = useState('Modern');
  const [selectedMaterial, setSelectedMaterial] = useState('18K Gold');
  const [modifications, setModifications] = useState('');
  const { mode } = useTheme();
  const isDark = mode === 'dark';

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant="h5" style={styles.title}>
            Remix Design
          </Text>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.subtitle}
          >
            Customize this design to make it uniquely yours
          </Text>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
            }}
            style={styles.previewImage}
          />

          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              Change Style
            </Text>
            <View style={styles.chipGrid}>
              {styles_list.map(style => (
                <Chip
                  key={style}
                  label={style}
                  selected={selectedStyle === style}
                  onPress={() => setSelectedStyle(style)}
                  style={styles.styleChip}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              Change Material
            </Text>
            <View style={styles.chipGrid}>
              {materials.map(material => (
                <Chip
                  key={material}
                  label={material}
                  selected={selectedMaterial === material}
                  onPress={() => setSelectedMaterial(material)}
                  style={styles.styleChip}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              Additional Modifications
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: isDark ? colors.cardDark : colors.backgroundLight,
                  borderColor: colors.border[isDark ? 'dark' : 'light'],
                  color: isDark ? colors.textDark.primary : colors.text.primary,
                },
              ]}
              placeholder="Describe any other changes..."
              placeholderTextColor={
                isDark ? colors.textDark.tertiary : colors.text.tertiary
              }
              value={modifications}
              onChangeText={setModifications}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <Button title="Generate Remix" onPress={() => {}} fullWidth />
          <Button
            title="Save as New Design"
            onPress={() => {}}
            variant="outline"
            fullWidth
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginBottom: spacing.lg,
  },
  previewImage: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  styleChip: {
    marginRight: 0,
    marginBottom: 0,
  },
  textArea: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    fontSize: 16,
    minHeight: 100,
  },
  saveButton: {
    marginTop: spacing.md,
  },
});


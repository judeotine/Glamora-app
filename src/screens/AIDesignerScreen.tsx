import { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { Chip } from '@/components/molecules/Chip';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { setGenerating, addDesign } from '@/store/slices/designSlice';

const jewelryTypes = ['necklace', 'bracelet', 'earrings', 'ring'] as const;
const styles_list = ['Modern', 'Classic', 'Bohemian', 'Minimalist', 'Vintage', 'Art Deco'];

export const AIDesignerScreen = () => {
  const [selectedType, setSelectedType] = useState<typeof jewelryTypes[number] | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGeneratingLocal] = useState(false);

  const { t } = useTranslation();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const dispatch = useDispatch();

  const handleGenerate = async () => {
    if (!selectedType || !selectedStyle) return;

    setIsGeneratingLocal(true);
    dispatch(setGenerating(true));

    setTimeout(() => {
      const newDesign = {
        id: Date.now().toString(),
        type: selectedType,
        style: selectedStyle,
        description,
        imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
        createdAt: new Date().toISOString(),
        isFavorite: false,
      };
      dispatch(addDesign(newDesign));
      dispatch(setGenerating(false));
      setIsGeneratingLocal(false);
      
      setSelectedType(null);
      setSelectedStyle(null);
      setDescription('');
    }, 2000);
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
        <Text variant="h5">{t('aiDesigner.title')}</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              {t('aiDesigner.selectType')}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipContainer}
            >
              {jewelryTypes.map(type => (
                <Chip
                  key={type}
                  label={t(`aiDesigner.${type}`)}
                  selected={selectedType === type}
                  onPress={() => setSelectedType(type)}
                  style={styles.chip}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              {t('aiDesigner.chooseStyle')}
            </Text>
            <View style={styles.styleGrid}>
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
              {t('aiDesigner.refineDesign')}
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
              placeholder="Describe your ideal jewelry..."
              placeholderTextColor={
                isDark ? colors.textDark.tertiary : colors.text.tertiary
              }
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <Button
            title={isGenerating ? 'Generating...' : t('aiDesigner.generateDesign')}
            onPress={handleGenerate}
            disabled={!selectedType || !selectedStyle}
            loading={isGenerating}
            fullWidth
            style={styles.generateButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  chipContainer: {
    gap: spacing.sm,
  },
  chip: {
    marginRight: spacing.sm,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  styleChip: {
    marginBottom: spacing.sm,
  },
  textArea: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    fontSize: 16,
    minHeight: 112,
  },
  generateButton: {
    marginBottom: spacing.xl,
  },
});


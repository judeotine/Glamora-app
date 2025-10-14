import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');

const featuredDesigns = [
  {
    id: '1',
    title: 'Celestial Harmony',
    subtitle: 'A dance of stars and moon',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
  },
  {
    id: '2',
    title: "Ocean's Embrace",
    subtitle: 'Whispers of the deep',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
  },
  {
    id: '3',
    title: 'Mystic Bloom',
    subtitle: "Nature's hidden secrets",
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800',
  },
];

const seasonalCollections = [
  {
    id: '1',
    title: "Winter's Whisper",
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    isNew: true,
  },
  {
    id: '2',
    title: "Summer's Radiance",
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    isNew: false,
  },
  {
    id: '3',
    title: "Autumn's Embrace",
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600',
    isNew: false,
  },
];

export const HomeScreen = () => {
  const { t } = useTranslation();
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
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark
              ? `${colors.backgroundDark}CC`
              : `${colors.backgroundLight}CC`,
          },
        ]}
      >
        <View style={styles.placeholder} />
        <Text variant="h5">{t('home.title')}</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="person-circle-outline" size={32} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text variant="h3">Welcome, Amelia</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
        >
          {featuredDesigns.map(design => (
            <View key={design.id} style={styles.featuredCard}>
              <View style={[styles.featuredImageContainer, shadows.lg]}>
                <Image
                  source={{ uri: design.image }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.featuredInfo}>
                <Text variant="body" style={styles.featuredTitle}>
                  {design.title}
                </Text>
                <Text
                  variant="bodySmall"
                  color={isDark ? colors.textDark.secondary : colors.text.secondary}
                >
                  {design.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.aiDesignerSection}>
          <View
            style={[
              styles.aiDesignerCard,
              {
                backgroundColor: isDark ? colors.cardDark : colors.cardLight,
              },
              shadows.xl,
            ]}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
              }}
              style={styles.aiDesignerImage}
              resizeMode="cover"
            />
            <View style={styles.aiDesignerOverlay}>
              <View style={styles.aiDesignerContent}>
                <Icon name="sparkles" size={36} color={colors.primary} />
                <Text variant="h4" style={styles.aiDesignerTitle}>
                  {t('home.tryAIDesigner')}
                </Text>
                <Text
                  variant="body"
                  style={[
                    styles.aiDesignerSubtitle,
                    { color: colors.textDark.secondary },
                  ]}
                >
                  Craft your unique piece and unleash your creativity
                </Text>
                <Button
                  title="Start Designing"
                  onPress={() => {}}
                  style={styles.aiDesignerButton}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            {t('home.designOfTheDay')}
          </Text>
          <View
            style={[
              styles.designOfDayCard,
              {
                backgroundColor: isDark ? colors.cardDark : colors.cardLight,
              },
              shadows.md,
            ]}
          >
            <View style={styles.designOfDayContent}>
              <Text variant="body" style={styles.designOfDayTitle}>
                Enchanted Forest
              </Text>
              <Text
                variant="bodySmall"
                color={isDark ? colors.textDark.secondary : colors.text.secondary}
              >
                A touch of magic in every detail
              </Text>
            </View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
              }}
              style={styles.designOfDayImage}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            {t('home.seasonalCollections')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsContent}
          >
            {seasonalCollections.map(collection => (
              <View key={collection.id} style={styles.collectionCard}>
                <View style={styles.collectionImageContainer}>
                  <Image
                    source={{ uri: collection.image }}
                    style={styles.collectionImage}
                    resizeMode="cover"
                  />
                  <View style={styles.collectionGradient} />
                  {collection.isNew && (
                    <View style={styles.newBadge}>
                      <Text variant="caption" style={styles.newBadgeText}>
                        NEW
                      </Text>
                    </View>
                  )}
                  <View style={styles.collectionTitle}>
                    <Text variant="body" style={styles.collectionTitleText}>
                      {collection.title}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  placeholder: {
    width: 32,
  },
  profileButton: {
    width: 32,
    alignItems: 'flex-end',
  },
  greeting: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  carouselContent: {
    paddingLeft: spacing.lg,
    paddingBottom: spacing.lg,
  },
  featuredCard: {
    width: 256,
    marginRight: spacing.md,
  },
  featuredImageContainer: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    height: 320,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredInfo: {
    paddingTop: spacing.sm,
  },
  featuredTitle: {
    fontWeight: '600',
  },
  aiDesignerSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  aiDesignerCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    height: 240,
  },
  aiDesignerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  aiDesignerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiDesignerContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  aiDesignerTitle: {
    color: colors.text.inverse,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  aiDesignerSubtitle: {
    textAlign: 'center',
    marginTop: spacing.xs,
    maxWidth: 300,
  },
  aiDesignerButton: {
    marginTop: spacing.md,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  designOfDayCard: {
    flexDirection: 'row',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
  },
  designOfDayContent: {
    flex: 1,
  },
  designOfDayTitle: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  designOfDayImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
  },
  collectionsContent: {
    paddingBottom: spacing.sm,
  },
  collectionCard: {
    width: 192,
    marginRight: spacing.md,
  },
  collectionImageContainer: {
    position: 'relative',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    height: 256,
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  collectionGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
  },
  newBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: `${colors.primary}CC`,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  newBadgeText: {
    color: colors.backgroundDark,
    fontWeight: '700',
  },
  collectionTitle: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
  },
  collectionTitleText: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
});


import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { colors, spacing, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const milestones = [
  { year: '2020', title: 'Founded', description: 'Glamora was born from a passion for jewelry' },
  { year: '2021', title: 'AI Integration', description: 'Launched AI design technology' },
  { year: '2022', title: 'AR Launch', description: 'Introduced virtual try-on feature' },
  { year: '2024', title: 'Global Expansion', description: 'Serving customers worldwide' },
];

const values = [
  {
    icon: 'diamond-outline',
    title: 'Quality First',
    description: 'Only the finest materials and craftsmanship',
  },
  {
    icon: 'sparkles-outline',
    title: 'Innovation',
    description: 'Pushing boundaries with AI and AR',
  },
  {
    icon: 'heart-outline',
    title: 'Customer Love',
    description: 'Your satisfaction is our priority',
  },
];

export const AboutScreen = () => {
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
        <View style={styles.heroSection}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text variant="h2" style={styles.heroTitle}>
              Our Story
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.storyText}
          >
            Glamora was founded with a vision to revolutionize the jewelry industry by
            combining timeless elegance with cutting-edge technology. Our AI-powered
            platform empowers you to design, customize, and purchase unique jewelry
            pieces that reflect your personal style.
          </Text>

          <View style={styles.section}>
            <Text variant="h5" style={styles.sectionTitle}>
              Our Values
            </Text>
            {values.map((value, index) => (
              <View key={index} style={styles.valueCard}>
                <View
                  style={[
                    styles.valueIcon,
                    {
                      backgroundColor: `${colors.primary}20`,
                    },
                  ]}
                >
                  <Icon name={value.icon as any} size={32} color={colors.primary} />
                </View>
                <View style={styles.valueText}>
                  <Text variant="body" style={styles.valueTitle}>
                    {value.title}
                  </Text>
                  <Text
                    variant="bodySmall"
                    color={isDark ? colors.textDark.secondary : colors.text.secondary}
                  >
                    {value.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text variant="h5" style={styles.sectionTitle}>
              Our Journey
            </Text>
            {milestones.map((milestone, index) => (
              <View key={index} style={styles.milestoneItem}>
                <View style={styles.timelineDot} />
                {index < milestones.length - 1 && <View style={styles.timelineLine} />}
                <View style={styles.milestoneContent}>
                  <Text variant="h6" color={colors.primary}>
                    {milestone.year}
                  </Text>
                  <Text variant="body" style={styles.milestoneTitle}>
                    {milestone.title}
                  </Text>
                  <Text
                    variant="bodySmall"
                    color={isDark ? colors.textDark.secondary : colors.text.secondary}
                  >
                    {milestone.description}
                  </Text>
                </View>
              </View>
            ))}
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
  heroSection: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    color: colors.text.inverse,
  },
  content: {
    padding: spacing.lg,
  },
  storyText: {
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.lg,
  },
  valueCard: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  valueIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  valueText: {
    flex: 1,
    justifyContent: 'center',
  },
  valueTitle: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  milestoneItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
    marginTop: 4,
    zIndex: 1,
  },
  timelineLine: {
    position: 'absolute',
    left: 7,
    top: 20,
    bottom: -spacing.lg,
    width: 2,
    backgroundColor: colors.border.light,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontWeight: '700',
    marginVertical: spacing.xs,
  },
});


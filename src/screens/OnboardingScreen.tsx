import { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';
import { RootStackParamList } from '@/navigation/RootNavigator';

const { width: screenWidth } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const slides = [
  {
    id: 1,
    title: 'Design Your Dream Jewelry',
    subtitle: 'Create unique, personalized pieces with our AI-powered design tool',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
  },
  {
    id: 2,
    title: 'AI-Powered Design',
    subtitle: 'Transform your ideas into stunning jewelry with artificial intelligence',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
  },
  {
    id: 3,
    title: 'Try Before You Buy',
    subtitle: 'Experience your jewelry in AR before making a purchase',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800',
  },
];

export const OnboardingScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(index);
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('@glamora_onboarding_complete', 'true');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to save onboarding status:', error);
    }
  };

  const handleSkip = async () => {
    await handleGetStarted();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.backgroundDark
            : colors.backgroundLight,
        },
      ]}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={[styles.slide, { width: screenWidth }]}>
            <Image source={{ uri: slide.image }} style={styles.image} />
            <View style={styles.content}>
              <Text variant="h2" style={styles.title}>
                {slide.title}
              </Text>
              <Text
                variant="body"
                color={
                  isDark ? colors.textDark.secondary : colors.text.secondary
                }
                style={styles.subtitle}
              >
                {slide.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === activeIndex ? colors.primary : colors.border.light,
                width: index === activeIndex ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title={
            activeIndex === slides.length - 1
              ? t('onboarding.getStarted')
              : t('common.continue')
          }
          onPress={handleGetStarted}
          fullWidth
        />
        {activeIndex < slides.length - 1 && (
          <Button
            title={t('onboarding.skip')}
            onPress={handleSkip}
            variant="ghost"
            fullWidth
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  image: {
    width: screenWidth - spacing.xl * 2,
    height: 400,
    borderRadius: 24,
    marginHorizontal: spacing.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['2xl'],
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: '80%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
});


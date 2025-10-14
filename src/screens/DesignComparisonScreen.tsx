import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { PriceTag } from '@/components/molecules/PriceTag';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const mockDesigns = [
  {
    id: '1',
    type: 'Necklace',
    style: 'Modern',
    material: '18K White Gold',
    gemstone: 'Diamond',
    price: 2499,
    craftingTime: '2-3 weeks',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: '2',
    type: 'Necklace',
    style: 'Classic',
    material: '14K Yellow Gold',
    gemstone: 'Sapphire',
    price: 1899,
    craftingTime: '1-2 weeks',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
  },
];

export const DesignComparisonScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const renderSpec = (label: string, value1: string, value2: string) => (
    <View style={styles.specRow}>
      <Text
        variant="bodySmall"
        color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
        style={styles.specLabel}
      >
        {label}
      </Text>
      <Text variant="bodySmall" style={styles.specValue}>
        {value1}
      </Text>
      <Text variant="bodySmall" style={styles.specValue}>
        {value2}
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
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text variant="h5">Compare Designs</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imagesSection}>
          {mockDesigns.map(design => (
            <View key={design.id} style={styles.designColumn}>
              <Image source={{ uri: design.image }} style={styles.designImage} />
              <Badge label={design.style} variant="primary" />
            </View>
          ))}
        </View>

        <View style={styles.comparisonSection}>
          <Text variant="h6" style={styles.comparisonTitle}>
            Specifications
          </Text>
          
          {renderSpec('Type', mockDesigns[0].type, mockDesigns[1].type)}
          {renderSpec('Material', mockDesigns[0].material, mockDesigns[1].material)}
          {renderSpec('Gemstone', mockDesigns[0].gemstone, mockDesigns[1].gemstone)}
          {renderSpec(
            'Crafting Time',
            mockDesigns[0].craftingTime,
            mockDesigns[1].craftingTime
          )}

          <View style={styles.priceRow}>
            <Text
              variant="bodySmall"
              color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
              style={styles.specLabel}
            >
              Price
            </Text>
            <PriceTag price={mockDesigns[0].price} size="sm" />
            <PriceTag price={mockDesigns[1].price} size="sm" />
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Button title="Select First Design" onPress={() => {}} fullWidth />
          <Button title="Select Second Design" onPress={() => {}} variant="outline" fullWidth />
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
  imagesSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  designColumn: {
    flex: 1,
    alignItems: 'center',
  },
  designImage: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
  },
  comparisonSection: {
    padding: spacing.lg,
  },
  comparisonTitle: {
    marginBottom: spacing.lg,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  specLabel: {
    flex: 1,
  },
  specValue: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
  },
  actionsSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
});


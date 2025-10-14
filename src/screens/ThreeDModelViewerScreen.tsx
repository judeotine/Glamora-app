import { View, StyleSheet, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef } from 'react';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export const ThreeDModelViewerScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const rotationX = useRef(new Animated.Value(0)).current;
  const rotationY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        rotationY.setValue(gesture.dx);
        rotationX.setValue(gesture.dy);
      },
      onPanResponderRelease: () => {
        Animated.spring(rotationX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(rotationY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

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
        <Text variant="h5">3D Model Viewer</Text>
        <TouchableOpacity>
          <Icon name="share-outline" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.viewerContainer} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.model,
            {
              transform: [
                { rotateX: rotationX.interpolate({
                    inputRange: [-100, 100],
                    outputRange: ['-15deg', '15deg'],
                  })
                },
                { rotateY: rotationY.interpolate({
                    inputRange: [-100, 100],
                    outputRange: ['-15deg', '15deg'],
                  })
                },
              ],
            },
          ]}
        >
          <Icon name="diamond-outline" size={200} color={colors.primary} />
        </Animated.View>

        <View style={styles.hint}>
          <Icon name="hand-left-outline" size={24} color={colors.primary} />
          <Text
            variant="caption"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
          >
            Drag to rotate • Pinch to zoom
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="refresh-outline" size={24} />
            <Text variant="caption" style={styles.controlLabel}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="expand-outline" size={24} />
            <Text variant="caption" style={styles.controlLabel}>
              Fullscreen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="camera-outline" size={24} />
            <Text variant="caption" style={styles.controlLabel}>
              Screenshot
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.materialsSection}>
          <Text variant="body" style={styles.materialsTitle}>
            View Materials
          </Text>
          <View style={styles.materialButtons}>
            <Button title="Gold" onPress={() => {}} size="sm" />
            <Button title="Silver" onPress={() => {}} variant="outline" size="sm" />
            <Button title="Platinum" onPress={() => {}} variant="outline" size="sm" />
          </View>
        </View>

        <Button title="Customize This Design" onPress={() => {}} fullWidth />
      </View>
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
  viewerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  model: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  controls: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  controlLabel: {
    fontWeight: '600',
  },
  materialsSection: {
    gap: spacing.md,
  },
  materialsTitle: {
    fontWeight: '600',
  },
  materialButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});


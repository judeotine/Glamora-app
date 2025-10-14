import { View, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { colors, borderRadius } from '@/theme';

interface ProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
}

export const ProgressBar = ({
  progress,
  height = 8,
  color = colors.primary,
  backgroundColor = colors.border.light,
  animated = true,
}: ProgressBarProps) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedProgress, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, animated]);

  const progressWidth = animated
    ? animatedProgress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      })
    : `${progress}%`;

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.progress,
          {
            width: progressWidth,
            backgroundColor: color,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});


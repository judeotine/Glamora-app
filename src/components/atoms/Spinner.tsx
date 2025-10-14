import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '@/theme';

interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export const Spinner = ({ size = 'large', color = colors.primary }: SpinnerProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


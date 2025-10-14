import { View, Image, Text, StyleSheet } from 'react-native';
import { colors, borderRadius } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface AvatarProps {
  imageUrl?: string;
  name?: string;
  size?: number;
}

export const Avatar = ({ imageUrl, name, size = 40 }: AvatarProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const getInitials = () => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.primary,
        },
      ]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
          {getInitials()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: colors.backgroundDark,
    fontWeight: '700',
  },
});


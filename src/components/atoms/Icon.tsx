import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

export const Icon = ({ name, size = 24, color }: IconProps) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const defaultColor = color
    ? color
    : isDark
    ? colors.textDark.primary
    : colors.text.primary;

  return <Ionicons name={name} size={size} color={defaultColor} />;
};


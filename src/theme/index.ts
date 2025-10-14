export { colors } from './colors';
export { typography, fontFamilies, fontWeights, fontSizes } from './typography';
export { spacing } from './spacing';
export { shadows } from './shadows';
export { borderRadius } from './borderRadius';

export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
} as const;

export type Theme = typeof theme;


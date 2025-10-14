export const fontFamilies = {
  manrope: 'Manrope',
  plusJakartaSans: 'PlusJakartaSans',
  splineSans: 'SplineSans',
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 48,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const typography = {
  h1: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
  h2: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
  h3: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
  h4: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
  },
  h5: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
  },
  h6: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
  },
  body: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  },
  bodyLarge: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  },
  caption: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  },
  button: {
    fontFamily: fontFamilies.manrope,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
} as const;


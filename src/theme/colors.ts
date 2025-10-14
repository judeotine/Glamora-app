export const colors = {
  primary: '#ecab13',
  primaryLight: '#FFD700',
  primaryDark: '#D4AF37',
  
  backgroundLight: '#f8f7f6',
  backgroundDark: '#221c10',
  
  cardLight: '#ffffff',
  cardDark: '#2a2520',
  
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#ffffff',
  },
  
  textDark: {
    primary: '#ffffff',
    secondary: '#cccccc',
    tertiary: '#999999',
    inverse: '#1a1a1a',
  },
  
  border: {
    light: '#e0e0e0',
    dark: '#3a3530',
  },
  
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
  
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;


import { AccessibilityInfo, Platform } from 'react-native';

export const announceForAccessibility = (message: string) => {
  AccessibilityInfo.announceForAccessibility(message);
};

export const isScreenReaderEnabled = async (): Promise<boolean> => {
  return await AccessibilityInfo.isScreenReaderEnabled();
};

export const getAccessibilityLabel = (
  label: string,
  hint?: string
): { accessibilityLabel: string; accessibilityHint?: string } => {
  return {
    accessibilityLabel: label,
    ...(hint && { accessibilityHint: hint }),
  };
};

export const getButtonAccessibility = (
  label: string,
  disabled = false
): {
  accessibilityLabel: string;
  accessibilityRole: 'button';
  accessibilityState: { disabled: boolean };
} => {
  return {
    accessibilityLabel: label,
    accessibilityRole: 'button',
    accessibilityState: { disabled },
  };
};

export const getImageAccessibility = (
  description: string
): {
  accessible: boolean;
  accessibilityLabel: string;
  accessibilityRole: 'image';
} => {
  return {
    accessible: true,
    accessibilityLabel: description,
    accessibilityRole: 'image',
  };
};

export const getTextInputAccessibility = (
  label: string,
  required = false
): {
  accessibilityLabel: string;
  accessibilityHint: string;
  accessibilityRequired: boolean;
} => {
  return {
    accessibilityLabel: label,
    accessibilityHint: `Enter ${label.toLowerCase()}`,
    accessibilityRequired: required,
  };
};


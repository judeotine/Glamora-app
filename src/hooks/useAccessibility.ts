import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export const useAccessibility = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState(false);

  useEffect(() => {
    checkScreenReader();
    checkReduceMotion();

    const screenReaderSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsScreenReaderEnabled
    );

    const reduceMotionSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReduceMotionEnabled
    );

    return () => {
      screenReaderSubscription.remove();
      reduceMotionSubscription.remove();
    };
  }, []);

  const checkScreenReader = async () => {
    const enabled = await AccessibilityInfo.isScreenReaderEnabled();
    setIsScreenReaderEnabled(enabled);
  };

  const checkReduceMotion = async () => {
    const enabled = await AccessibilityInfo.isReduceMotionEnabled();
    setIsReduceMotionEnabled(enabled);
  };

  const announce = (message: string) => {
    AccessibilityInfo.announceForAccessibility(message);
  };

  return {
    isScreenReaderEnabled,
    isReduceMotionEnabled,
    announce,
  };
};


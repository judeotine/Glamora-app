import * as Device from 'expo-device';
import * as Crypto from 'expo-crypto';

export const isDeviceRooted = async (): Promise<boolean> => {
  if (Device.osName === 'Android') {
    return false;
  }
  return false;
};

export const generateSecureToken = async (): Promise<string> => {
  const randomBytes = await Crypto.getRandomBytesAsync(32);
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const hashData = async (data: string): Promise<string> => {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    data
  );
};

export const validateInput = (input: string, maxLength: number = 1000): boolean => {
  if (!input || input.length === 0) return false;
  if (input.length > maxLength) return false;
  
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
};


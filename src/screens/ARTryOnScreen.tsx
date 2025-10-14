import { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export const ARTryOnScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.front);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const requestPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      setIsCapturing(true);
      try {
        const photo = await cameraRef.current.takePictureAsync();
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        Alert.alert('Success', 'Photo saved to gallery!');
      } catch (error) {
        Alert.alert('Error', 'Failed to save photo');
      } finally {
        setIsCapturing(false);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight },
        ]}
      >
        <View style={styles.permissionContainer}>
          <Icon name="camera-outline" size={80} color={colors.primary} />
          <Text variant="h4" style={styles.permissionTitle}>
            Camera Access Required
          </Text>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.permissionText}
          >
            Allow Glamora to access your camera for AR try-on experience
          </Text>
          <Button
            title="Grant Permission"
            onPress={requestPermissions}
            style={styles.permissionButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight },
        ]}
      >
        <View style={styles.permissionContainer}>
          <Icon name="close-circle-outline" size={80} color={colors.error} />
          <Text variant="h4" style={styles.permissionTitle}>
            Camera Access Denied
          </Text>
          <Text
            variant="body"
            color={isDark ? colors.textDark.secondary : colors.text.secondary}
            style={styles.permissionText}
          >
            Please enable camera access in your device settings
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.overlay}>
          <SafeAreaView edges={['top']}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerButton}>
                <Icon name="close" size={28} color={colors.text.inverse} />
              </TouchableOpacity>
              <Text variant="h6" style={styles.headerTitle}>
                AR Try-On
              </Text>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() =>
                  setType(
                    type === CameraType.back ? CameraType.front : CameraType.back
                  )
                }
              >
                <Icon name="camera-reverse-outline" size={28} color={colors.text.inverse} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View style={styles.guideline}>
            <View style={styles.faceOutline} />
            <Text variant="caption" style={styles.guideText}>
              Position your face within the frame
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.controls}>
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="images-outline" size={32} color={colors.text.inverse} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
                disabled={isCapturing}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Icon name="share-outline" size={32} color={colors.text.inverse} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 22,
  },
  headerTitle: {
    color: colors.text.inverse,
  },
  guideline: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceOutline: {
    width: 280,
    height: 350,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 140,
    opacity: 0.6,
  },
  guideText: {
    color: colors.text.inverse,
    marginTop: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  footer: {
    paddingBottom: spacing.xl,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
  },
  controlButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.text.inverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: colors.backgroundDark,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  permissionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  permissionButton: {
    minWidth: 200,
  },
});


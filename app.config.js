export default {
  expo: {
    name: 'Glamora',
    slug: 'glamora',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    scheme: 'glamora',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#221c10',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/[your-project-id]',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.glamora.app',
      buildNumber: '1',
      infoPlist: {
        NSCameraUsageDescription: 'Glamora needs camera access for AR try-on and design photography',
        NSFaceIDUsageDescription: 'Glamora uses Face ID to secure your account',
        NSPhotoLibraryUsageDescription: 'Glamora needs access to save your jewelry designs',
        NSPhotoLibraryAddUsageDescription: 'Glamora needs access to save photos to your library',
      },
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#221c10',
      },
      package: 'com.glamora.app',
      versionCode: 1,
      permissions: [
        'CAMERA',
        'USE_BIOMETRIC',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'NOTIFICATIONS',
      ],
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-font',
      'expo-secure-store',
      [
        'expo-camera',
        {
          cameraPermission: 'Allow Glamora to access your camera for AR try-on',
        },
      ],
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          color: '#ecab13',
          sounds: ['./assets/sounds/notification.wav'],
        },
      ],
      'expo-localization',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
          android: {
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: 'your-project-id-here',
      },
    },
    owner: 'your-expo-username',
  },
};


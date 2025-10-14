export const config = {
  app: {
    name: 'Glamora',
    version: '1.0.0',
    bundleId: {
      ios: 'com.glamora.app',
      android: 'com.glamora.app',
    },
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',
    timeout: 30000,
  },
  features: {
    enableAR: true,
    enableSocialFeed: true,
    enableLiveEvents: true,
    enableSubscriptions: true,
  },
  limits: {
    freeDesignsPerMonth: 5,
    maxImagesPerPost: 5,
    maxMoodboardImages: 20,
  },
  links: {
    website: 'https://glamora.app',
    support: 'https://glamora.app/support',
    terms: 'https://glamora.app/terms',
    privacy: 'https://glamora.app/privacy',
  },
  social: {
    facebook: 'https://facebook.com/glamora',
    instagram: 'https://instagram.com/glamora',
    twitter: 'https://twitter.com/glamora',
  },
};

export default config;


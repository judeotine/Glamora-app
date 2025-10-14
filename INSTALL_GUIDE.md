# Glamora Installation Guide

Complete step-by-step guide to set up the Glamora development environment.

## Prerequisites

### Required Software
- **Node.js**: Version 18 or higher
- **npm** or **pnpm**: Latest version
- **Git**: Latest version
- **PostgreSQL**: Version 14 or higher
- **Expo CLI**: `npm install -g expo-cli`
- **EAS CLI**: `npm install -g eas-cli`

### Optional (for native development)
- **Xcode**: 14+ (macOS only, for iOS)
- **Android Studio**: Latest version (for Android)
- **Watchman**: For file watching (macOS/Linux)

### Accounts Needed
- Expo account (free)
- Apple Developer account ($99/year for iOS)
- Google Play Console account ($25 one-time for Android)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/judeotine/Glamora-app.git
cd Glamora-app
```

### 2. Frontend Setup

```bash
npm install
```

If you encounter disk space issues, try:
```bash
npm install --legacy-peer-deps
```

Or use npm instead of pnpm:
```bash
npm install
```

### 3. Configure Frontend Environment

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
API_BASE_URL=http://localhost:3000/api
SENTRY_DSN=your_sentry_dsn_here
```

### 4. Backend Setup

```bash
cd Glamora-app_backend
npm install
```

### 5. Configure Backend Environment

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/glamora"
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
```

### 6. Database Setup

Start PostgreSQL and create database:
```bash
psql -U postgres
CREATE DATABASE glamora;
\q
```

Run Prisma migrations:
```bash
cd Glamora-app_backend
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 7. Start Development Servers

**Backend** (Terminal 1):
```bash
cd Glamora-app_backend
npm run dev
```

Backend will start on `http://localhost:3000`

**Frontend** (Terminal 2):
```bash
cd Glamora-app
npm start
```

Expo DevTools will open. Press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Platform-Specific Setup

### iOS Setup (macOS only)

1. Install Xcode from App Store
2. Install Command Line Tools:
```bash
xcode-select --install
```

3. Install CocoaPods:
```bash
sudo gem install cocoapods
```

4. Run on iOS simulator:
```bash
npm run ios
```

### Android Setup

1. Install Android Studio
2. Configure Android SDK (Android 13 / API 33)
3. Create virtual device in AVD Manager
4. Set ANDROID_HOME environment variable:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

5. Run on Android emulator:
```bash
npm run android
```

## EAS Build Setup (for Production Builds)

1. Login to Expo:
```bash
eas login
```

2. Configure EAS:
```bash
eas build:configure
```

3. Build for iOS:
```bash
eas build --platform ios --profile production
```

4. Build for Android:
```bash
eas build --platform android --profile production
```

## Verification

### Check Frontend
- App loads without errors
- Can navigate between screens
- Onboarding flow works
- Theme switching works

### Check Backend
```bash
curl http://localhost:3000/health
```

Should return:
```json
{"status":"ok","timestamp":"..."}
```

### Test API Connection
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@glamora.com","password":"password123"}'
```

## Next Steps

1. ✅ Review README.md for feature overview
2. ✅ Check ARCHITECTURE.md for system design
3. ✅ Read CONTRIBUTING.md for development guidelines
4. ✅ Review API_DOCUMENTATION.md for API details
5. ✅ Check DEPLOYMENT.md for production deployment

## Common Installation Issues

See TROUBLESHOOTING.md for detailed solutions to common problems.

## Quick Start Commands

```bash
npm start                    # Start Expo dev server
npm run ios                 # Run on iOS
npm run android             # Run on Android
npm test                    # Run tests
npm run lint                # Lint code
npm run type-check          # Check TypeScript

cd Glamora-app_backend
npm run dev                 # Start backend server
npm run prisma:studio       # Open Prisma Studio
npm test                    # Run backend tests
```

## Support

- Email: dev@glamora.com
- Discord: discord.gg/glamora
- Docs: docs.glamora.app
- Issues: github.com/judeotine/Glamora-app/issues

## Success!

If you see the Glamora welcome screen on your device/simulator, you're all set!

Start by:
1. Creating an account
2. Exploring the AI designer
3. Trying AR try-on
4. Browsing the marketplace

Happy coding!


# Glamora - AI-Powered Jewelry Design Platform

A luxury jewelry design and marketplace app built with React Native (Expo) and Node.js.

## Features

- **AI Design Generation**: Create custom jewelry using AI
- **AR Try-On**: Virtual try-on experience with camera
- **E-Commerce**: Full shopping cart, orders, and payment integration
- **Social Feed**: Share designs and connect with designers
- **Multi-language**: Support for English, Arabic (RTL), and French
- **Dark Mode**: Beautiful dark theme support
- **Push Notifications**: Real-time updates for orders and designs

## Project Structure

This project is split into **two separate repositories**:

### Frontend (This Repository)
- **Location**: `C:\Users\Jude\OneDrive\Documents\Projects\Glamora-app`
- **React Native** with **Expo** for cross-platform mobile development
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **React Navigation** for routing
- **i18next** for internationalization
- **Reanimated 2** for smooth animations

### Backend (Separate Repository)
- **Location**: `C:\Users\Jude\OneDrive\Documents\Projects\Glamora_App_Backend`
- **Repository**: [Glamora_App_Backend](https://github.com/judeotine/Glamora_App_Backend)
- **Node.js** with **Express**
- **TypeScript** for type safety
- **Prisma ORM** with **PostgreSQL**
- **JWT** authentication
- **OpenAI** for AI design generation
- **Stripe** for payments
- **Cloudinary** for image storage

See [BACKEND_SETUP.md](BACKEND_SETUP.md) and [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for details.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- PostgreSQL 14+
- Expo CLI
- iOS Simulator or Android Emulator

### Quick Install

**Using installation scripts**:
```bash
./install.sh        # macOS/Linux
install.bat         # Windows
```

**Manual installation**:

1. Install frontend dependencies:
```bash
npm install
```

2. Clone and setup backend (separate repository):
```bash
cd C:\Users\Jude\OneDrive\Documents\Projects\Glamora_App_Backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

3. Set up frontend environment:
```bash
cp .env.example .env
```

4. Start development servers:

Terminal 1 (Backend):
```bash
cd C:\Users\Jude\OneDrive\Documents\Projects\Glamora_App_Backend
npm run dev
```

Terminal 2 (Frontend):
```bash
npm start
```

The API will be available at `http://localhost:3000`

## Screens

37+ fully implemented screens including:

- Onboarding & Authentication
- Home with Featured Designs
- AI Designer
- Gallery
- AR Try-On
- Product Details
- Shopping Cart
- Wishlist
- Orders & Tracking
- Notifications
- Profile & Settings
- Search & Filters
- Social Feed
- Live Events
- Help Center
- And many more...

## Testing

### Frontend Tests
```bash
npm test
npm run test:coverage
```

### Backend Tests
```bash
cd Glamora-app_backend
npm test
npm run test:coverage
```

## Building

### iOS
```bash
eas build --platform ios --profile production
```

### Android
```bash
eas build --platform android --profile production
```

## Deployment

### Frontend
Deployed using **EAS Build** and submitted to App Store & Google Play.

### Backend
Deploy using Docker or your preferred platform (Heroku, AWS, Google Cloud, etc.)

```bash
cd Glamora-app_backend
docker-compose up -d
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Security

- JWT authentication with refresh tokens
- Secure storage for sensitive data
- Rate limiting on API endpoints
- Input validation with Zod
- CORS protection
- Helmet.js security headers
- Biometric authentication
- Two-factor authentication
- GDPR compliant

## Documentation

- [INSTALL_GUIDE.md](INSTALL_GUIDE.md) - Detailed installation instructions
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [API_DOCUMENTATION.md](Glamora-app_backend/API_DOCUMENTATION.md) - API reference
- [FEATURES.md](FEATURES.md) - Feature documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Project overview

## Tech Stack

**Frontend**: React Native 0.74, Expo 51, TypeScript 5.3, Redux Toolkit, React Navigation, i18next

**Backend**: Node.js 20, Express 4, TypeScript 5.3, Prisma 5, PostgreSQL 15, JWT, Stripe

## Project Stats

- 37+ production-ready screens
- 20+ reusable components
- 8 API controllers
- 11 database models
- 30+ API endpoints
- 150+ files
- 15,000+ lines of code
- 3 languages supported
- 100% feature complete

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

MIT License - See [LICENSE](LICENSE) for details.

## Support
- GitHub Issues: https://github.com/judeotine/Glamora-app/issues
- Documentation: See docs folder




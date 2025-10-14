# Glamora Architecture Documentation

## System Overview

Glamora is a luxury jewelry design platform built with a modern mobile-first architecture using React Native (Expo) for the frontend and Node.js/TypeScript/Prisma for the backend.

## Architecture Principles

- **Atomic Design**: Component hierarchy (atoms → molecules → organisms)
- **Clean Architecture**: Clear separation of concerns
- **Type Safety**: TypeScript throughout the stack
- **API-First**: RESTful API design with clear contracts
- **Security-First**: Authentication, encryption, validation at every layer
- **Performance**: Lazy loading, caching, optimized images
- **Accessibility**: WCAG AA compliant, screen reader support
- **Internationalization**: Multi-language with RTL support

## Frontend Architecture

### Technology Stack
- **Framework**: React Native 0.74+ with Expo SDK 51
- **Language**: TypeScript 5.3+
- **State Management**: Redux Toolkit + React Query
- **Navigation**: React Navigation 6
- **Styling**: StyleSheet with theme system
- **Animations**: React Native Reanimated 2
- **i18n**: react-i18next
- **Forms**: React Hook Form + Zod validation

### Directory Structure

```
src/
├── components/          # Reusable components
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Composite components
│   └── organisms/      # Complex components
├── screens/            # Screen components (40+)
├── navigation/         # Navigation config
├── store/             # Redux store & slices
├── services/          # API clients & external services
├── hooks/             # Custom React hooks
├── utils/             # Helper functions
├── theme/             # Design tokens
├── types/             # TypeScript definitions
└── constants/         # App constants
```

### State Management

**Redux Toolkit Slices**:
- `authSlice`: User authentication & session
- `designSlice`: AI-generated designs
- `cartSlice`: Shopping cart state
- `wishlistSlice`: Saved items
- `notificationSlice`: Push notifications

**React Query**: Server state caching for API data

### Navigation Flow

```
RootNavigator (Stack)
├── Onboarding
├── Login
├── Register
└── Main (Bottom Tabs)
    ├── Home
    ├── AI Designer
    ├── Gallery
    ├── Wishlist
    └── Profile
```

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js 20+
- **Framework**: Express 4
- **Language**: TypeScript 5.3+
- **Database**: PostgreSQL 15
- **ORM**: Prisma 5
- **Authentication**: JWT with refresh tokens
- **Validation**: Zod schemas
- **AI**: OpenAI API
- **Payments**: Stripe
- **Storage**: Cloudinary

### Directory Structure

```
src/
├── controllers/       # Request handlers
├── services/         # Business logic
├── middleware/       # Express middleware
├── routes/           # API routes
├── validators/       # Zod validation schemas
├── utils/            # Helper functions
└── types/            # TypeScript types
```

### Database Schema

**Core Models**:
- User: Authentication & profile
- Design: AI-generated designs
- Product: Marketplace items
- Order: Purchase transactions
- Cart/Wishlist: Shopping features
- Post/Comment/Like: Social features
- Notification: Push notifications
- ARCalibration: AR try-on data

### API Architecture

**RESTful Endpoints**:
- `/api/auth/*`: Authentication
- `/api/designs/*`: AI designs
- `/api/products/*`: Product catalog
- `/api/cart/*`: Shopping cart
- `/api/orders/*`: Order management
- `/api/wishlist/*`: Wishlist
- `/api/notifications/*`: Notifications
- `/api/social/*`: Social features

**Response Format**:
```json
{
  "status": "success",
  "data": { ... },
  "pagination": { ... }
}
```

## Security Architecture

### Frontend Security
- Secure token storage (expo-secure-store)
- Biometric authentication
- Input validation
- XSS protection
- Root/jailbreak detection

### Backend Security
- JWT authentication with rotation
- Bcrypt password hashing
- Rate limiting per endpoint
- CORS configuration
- Helmet security headers
- Request validation (Zod)
- SQL injection protection (Prisma)

## Performance Optimization

### Frontend
- Hermes engine enabled
- Image optimization (expo-image)
- Lazy component loading
- React Query caching
- Memoization (useMemo, useCallback)
- Virtual lists (FlatList)

### Backend
- Database query optimization
- Connection pooling
- Response compression
- CDN for static assets
- Caching strategy

## Monitoring & Observability

- **Error Tracking**: Sentry
- **Analytics**: Custom analytics service
- **Logging**: Winston (backend)
- **Performance**: Custom metrics
- **Health Checks**: /health endpoint

## Deployment Architecture

### Frontend
- **Platform**: EAS Build
- **Distribution**: App Store + Google Play
- **Updates**: OTA updates via EAS Update
- **Environments**: Development, Staging, Production

### Backend
- **Container**: Docker
- **Orchestration**: Docker Compose / Kubernetes
- **Database**: Managed PostgreSQL
- **CI/CD**: GitHub Actions
- **Environments**: Staging, Production

## Data Flow

### User Authentication
1. User enters credentials
2. Frontend validates input
3. API authenticates with database
4. Returns JWT + refresh token
5. Tokens stored securely
6. Auto-refresh on expiration

### AI Design Generation
1. User selects type/style/description
2. Frontend sends request to API
3. Backend calls OpenAI API
4. Design saved to database
5. Response returned to frontend
6. Design added to Redux store

### Push Notifications
1. User action triggers event
2. Backend creates notification
3. Push service sends to device
4. Frontend receives and displays
5. User interaction tracked

## Scalability Considerations

- Horizontal scaling for API servers
- Database read replicas
- CDN for media assets
- Queue system for heavy operations
- Microservices ready architecture

## Testing Strategy

- **Unit Tests**: Jest (90%+ coverage target)
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Detox for critical paths
- **Performance Tests**: Load testing
- **Security Tests**: Penetration testing

## Future Enhancements

- GraphQL API layer
- Real-time features with WebSockets
- ML model for jewelry recommendations
- Blockchain integration for authenticity
- Web version (React web)


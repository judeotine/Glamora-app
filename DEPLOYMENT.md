# Glamora Deployment Guide

## Prerequisites

- EAS CLI installed (`npm install -g eas-cli`)
- Expo account
- Apple Developer account (for iOS)
- Google Play Developer account (for Android)
- PostgreSQL database (production)
- Environment variables configured

## Frontend Deployment

### 1. Setup EAS

```bash
eas login
eas build:configure
```

### 2. Build for Production

**iOS:**
```bash
eas build --platform ios --profile production
```

**Android:**
```bash
eas build --platform android --profile production
```

### 3. Submit to App Stores

**iOS:**
```bash
eas submit --platform ios
```

**Android:**
```bash
eas submit --platform android
```

### 4. OTA Updates

```bash
eas update --branch production
```

## Backend Deployment

### Option 1: Docker Deployment

1. Build the Docker image:
```bash
cd Glamora-app_backend
docker build -t glamora-api .
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

### Option 2: Platform-Specific

#### Heroku

```bash
heroku create glamora-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
heroku run npx prisma migrate deploy
```

#### AWS/GCP/Azure

1. Set up a PostgreSQL database
2. Configure environment variables
3. Deploy using your preferred method (EC2, App Engine, etc.)
4. Run migrations: `npx prisma migrate deploy`

## Environment Variables

### Frontend (.env)
```
API_BASE_URL=https://api.glamora.com
SENTRY_DSN=your_sentry_dsn
```

### Backend (.env)
```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your_production_secret
OPENAI_API_KEY=your_key
STRIPE_SECRET_KEY=your_key
```

## Database Migrations

```bash
npx prisma migrate deploy
```

## Health Checks

- Frontend: Check Expo status dashboard
- Backend: `GET /health`
- Database: `SELECT 1`

## Monitoring

- Sentry for error tracking
- Server logs for API monitoring
- Analytics dashboard for user metrics

## Rollback

**Frontend:**
```bash
eas update --branch production --message "Rollback"
```

**Backend:**
- Redeploy previous version
- Rollback database if needed

## Security Checklist

- [ ] SSL/TLS certificates configured
- [ ] Environment variables secured
- [ ] Database encrypted at rest
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] API keys rotated regularly
- [ ] Backup strategy in place

## Post-Deployment

1. Verify all features work
2. Check error tracking
3. Monitor performance
4. Test critical user flows
5. Verify push notifications
6. Test payment flow

## Support

For deployment issues, contact the team or check the documentation.


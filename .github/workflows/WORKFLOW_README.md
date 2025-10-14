# GitHub Actions Workflows

## Frontend Workflows

### ci.yml
**Trigger**: Push or PR to main/develop branches

**Steps**:
1. Checkout code
2. Setup Node.js 20
3. Install dependencies
4. Run ESLint
5. Run TypeScript check
6. Run tests with coverage
7. Upload coverage to Codecov

### build.yml
**Trigger**: Push to main or version tags

**Jobs**:
- **build-ios**: Creates iOS production build with EAS
- **build-android**: Creates Android production build with EAS

**Requirements**:
- EXPO_TOKEN secret must be configured in GitHub repository settings

## Backend Workflows

Location: `Glamora-app_backend/.github/workflows/`

### ci.yml
**Trigger**: Push or PR to main/develop branches

**Steps**:
1. Checkout code
2. Setup Node.js 20
3. Start PostgreSQL test database
4. Install dependencies
5. Run ESLint
6. Run TypeScript build
7. Setup database with Prisma
8. Run tests with coverage
9. Upload coverage to Codecov

### deploy.yml
**Trigger**: Push to main or manual workflow dispatch

**Jobs**:
- **deploy-staging**: Deploy to staging environment
- **deploy-production**: Deploy to production (only on main branch)

**Steps**:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Build TypeScript
5. Run database migrations
6. Deploy application

## Required GitHub Secrets

### Frontend Repository
- `EXPO_TOKEN` - Expo authentication token (get from expo.dev)
- `CODECOV_TOKEN` - Codecov upload token (optional)

### Backend Repository
- `DATABASE_URL` - Production database connection string
- `JWT_SECRET` - Production JWT secret
- `JWT_REFRESH_SECRET` - Production refresh token secret
- `OPENAI_API_KEY` - OpenAI API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## Setting Up Secrets

1. Go to repository Settings
2. Navigate to Secrets and variables > Actions
3. Click "New repository secret"
4. Add each required secret

## Running Workflows Manually

### Frontend Build
```bash
gh workflow run build.yml
```

### Backend Deployment
```bash
gh workflow run deploy.yml
```

## Monitoring Workflows

- View workflow runs in GitHub Actions tab
- Check logs for any failures
- Review test coverage reports
- Monitor build times

## Troubleshooting

### Build Failures
- Check logs in GitHub Actions tab
- Verify all secrets are set correctly
- Ensure EAS project is configured
- Check node_modules caching

### Test Failures
- Run tests locally first
- Check for environment-specific issues
- Review test logs
- Ensure database is properly configured

### Deployment Failures
- Verify DATABASE_URL is correct
- Check all environment variables are set
- Ensure migrations can run
- Review deployment logs

## Best Practices

1. Always run tests locally before pushing
2. Use semantic versioning for releases
3. Tag releases for production builds
4. Monitor workflow run times
5. Keep dependencies updated
6. Review security alerts

## Workflow Status Badges

Add to README.md:
```markdown
![CI](https://github.com/judeotine/Glamora-app/workflows/CI/badge.svg)
![Build](https://github.com/judeotine/Glamora-app/workflows/Build/badge.svg)
```

## Continuous Deployment

Workflows are configured for:
- Automated testing on every commit
- Production builds on main branch
- Automated deployments (when configured)
- Coverage reporting
- Security scanning

## Future Enhancements

Consider adding:
- Automated screenshot generation
- Performance benchmarking
- Security scanning (Snyk, Dependabot)
- Automated changelog generation
- Slack notifications
- Deploy previews for PRs


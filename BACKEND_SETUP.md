# Backend Repository Setup

## Repository Location

The Glamora backend is maintained in a **separate repository**:

**Location**: `C:\Users\Jude\OneDrive\Documents\Projects\Glamora_App_Backend`  
**Repository**: [Glamora_App_Backend](https://github.com/judeotine/Glamora_App_Backend)

---

## Quick Setup

```bash
cd C:\Users\Jude\OneDrive\Documents\Projects\Glamora_App_Backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

---

## Environment Configuration

Create a `.env` file with:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://postgres:password@localhost:5432/glamora?schema=public"

JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_REFRESH_EXPIRES_IN=30d

OPENAI_API_KEY=sk-your-openai-api-key
STRIPE_SECRET_KEY=sk_test_your-stripe-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Running the Backend

### Development Mode
```bash
cd C:\Users\Jude\OneDrive\Documents\Projects\Glamora_App_Backend
npm run dev
```

Server will start on `http://localhost:3000`

### Production Mode
```bash
npm run build
npm start
```

---

## Database Management

### Generate Prisma Client
```bash
npx prisma generate
```

### Run Migrations
```bash
npx prisma migrate dev
```

### Seed Database
```bash
npx prisma db seed
```

### Open Prisma Studio
```bash
npx prisma studio
```

---

## Testing

```bash
npm test
npm run test:coverage
```

---

## API Documentation

Full API documentation is available in the backend repository:
`C:\Users\Jude\OneDrive\Documents\Projects\Glamora_App_Backend\API_DOCUMENTATION.md`

---

## Deployment

### Using Docker
```bash
cd C:\Users\Jude\OneDrive\Documents\Projects\Glamora_App_Backend
docker-compose up -d
```

### Manual Deployment
See `DEPLOYMENT.md` in the backend repository for detailed instructions.

---

## Common Commands

```bash
npm run dev          # Start development server
npm test             # Run tests
npm run lint         # Lint code
npm run build        # Build for production
npm start            # Start production server
npx prisma studio    # Open database GUI
npx prisma migrate   # Run migrations
```

---

## Connecting Frontend to Backend

In your frontend `.env` file:
```env
API_BASE_URL=http://localhost:3000/api
```

Make sure the backend is running before starting the frontend.

---

## Repository Structure

```
Glamora_App_Backend/
├── src/
│   ├── controllers/     # 9 API controllers
│   ├── routes/          # 9 route files
│   ├── services/        # Business logic
│   ├── middleware/      # Auth, error handling, etc.
│   ├── validators/      # Input validation
│   └── utils/           # Utilities
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── migrations/      # Migration files
│   └── seed.ts          # Seed data
├── tests/               # Test files
├── .github/             # CI/CD workflows
└── docs/                # Additional documentation
```

---

## Tech Stack

- **Node.js** 20+
- **Express** 4.18
- **TypeScript** 5.3
- **Prisma** 5.8 + PostgreSQL 15
- **OpenAI** for AI generation
- **Stripe** for payments
- **JWT** for authentication
- **Winston** for logging
- **Zod** for validation

---

## Support

For backend-specific issues, see:
- `API_DOCUMENTATION.md` in backend repo
- `README.md` in backend repo
- GitHub Issues in backend repo

For frontend integration issues, see the main Glamora-app repository.

---

## Notes

- Backend runs on port 3000 by default
- Frontend expects backend at `http://localhost:3000/api`
- Ensure PostgreSQL is running before starting backend
- All API keys must be configured in `.env` before first run


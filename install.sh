#!/bin/bash

echo "Glamora Installation Script"
echo "================================"
echo ""

echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "Frontend dependencies installed successfully"
else
    echo "Frontend installation failed"
    exit 1
fi

echo ""
echo "Installing backend dependencies..."
cd Glamora-app_backend
npm install

if [ $? -eq 0 ]; then
    echo "Backend dependencies installed successfully"
else
    echo "Backend installation failed"
    exit 1
fi

echo ""
echo "Setting up database..."
npx prisma generate
npx prisma migrate dev --name init

if [ $? -eq 0 ]; then
    echo "Database setup complete"
    npx prisma db seed
else
    echo "Database setup failed"
    echo "Make sure PostgreSQL is running"
    exit 1
fi

cd ..

echo ""
echo "Installation complete!"
echo ""
echo "Next steps:"
echo "1. Configure your .env files (see .env.example)"
echo "2. Start backend: cd Glamora-app_backend && npm run dev"
echo "3. Start frontend: npm start"
echo ""
echo "Happy coding!"

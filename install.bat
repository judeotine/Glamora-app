@echo off
echo Glamora Installation Script
echo ================================
echo.

echo Installing frontend dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo Frontend dependencies installed successfully
) else (
    echo Frontend installation failed
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd Glamora-app_backend
call npm install

if %ERRORLEVEL% EQU 0 (
    echo Backend dependencies installed successfully
) else (
    echo Backend installation failed
    exit /b 1
)

echo.
echo Setting up database...
call npx prisma generate
call npx prisma migrate dev --name init

if %ERRORLEVEL% EQU 0 (
    echo Database setup complete
    call npx prisma db seed
) else (
    echo Database setup failed
    echo Make sure PostgreSQL is running
    exit /b 1
)

cd ..

echo.
echo Installation complete!
echo.
echo Next steps:
echo 1. Configure your .env files (see .env.example)
echo 2. Start backend: cd Glamora-app_backend ^&^& npm run dev
echo 3. Start frontend: npm start
echo.
echo Happy coding!
pause

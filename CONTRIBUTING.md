# Contributing to Glamora

Thank you for your interest in contributing to Glamora! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Glamora-app.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m 'Add some feature'`
7. Push to the branch: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Expo CLI
- iOS Simulator or Android Emulator

### Installation
```bash
npm install
cd Glamora-app_backend && npm install
```

### Running Locally
```bash
npm start
cd Glamora-app_backend && npm run dev
```

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` to check for issues
- Run `npm run format` to auto-fix formatting

## Testing

- Write tests for all new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

```bash
npm test
npm run test:coverage
```

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add AR try-on calibration screen`

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update documentation for any API changes
3. The PR will be merged once you have approval from maintainers
4. Ensure CI/CD checks pass

## Reporting Bugs

- Use the GitHub Issues tracker
- Include detailed steps to reproduce
- Include screenshots if applicable
- Specify device/platform information

## Feature Requests

- Open an issue with the "enhancement" label
- Provide clear description of the feature
- Explain the use case and benefits

## Questions?

Feel free to open an issue for any questions about contributing!


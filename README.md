# Rick and Morty Character Comparison

Built with Next.js, React, and TypeScript that allows users to select two Rick and Morty characters and compare their shared episodes.

## Prerequisites

- Node.js 22.19.0

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rick-and-morty-nextjs-challenge
```

2. Install dependencies:
```bash
npm install
```

## Development

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Available Scripts

#### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server

#### Code Quality
- `npm run lint` - Run ESLint with automatic fixes
- `npm run lint:check` - Check linting without fixes
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changes

#### Testing
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Development Workflow

### Before Making Changes

Always run these commands before starting development:

```bash
npm run lint:check    # Verify no linting errors
npm test             # Verify all tests pass
npm run build        # Verify application builds successfully
```

### Before Committing

Run the complete quality check pipeline:

```bash
npm run format       # Auto-fix formatting
npm run lint         # Auto-fix linting issues
npm test             # Verify tests pass
npm run build        # Verify build works
```

## Architecture

### Technology Stack

- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: CSS Modules with custom design system
- **State Management**: 
  - TanStack Query (Server state)
  - Zustand (Client state with localStorage persistence)
- **API**: Rick and Morty REST API
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── features/          # Feature-specific components
│   ├── providers/         # Context providers
│   └── ui/               # Reusable UI components
├── constants/             # Application constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and validations
├── models/               # TypeScript interfaces and types
├── services/             # API services and endpoints
├── stores/               # Zustand state stores
└── styles/               # Global CSS and design system

tests/
├── __mocks__/            # Test mocks and fixtures
├── components/           # Component tests
├── hooks/               # Hook tests
├── lib/                 # Utility function tests
├── services/            # API service tests
└── setup.ts             # Test configuration
```

## CI/CD Pipeline

### Automated Workflow

The project includes a complete CI/CD pipeline using GitHub Actions:

### Pipeline Configuration

The CI/CD pipeline is configured in `.github/workflows/ci-cd.yml` and includes:

- Node.js 22.19.0 environment
- Automatic Vercel deployment
- Coverage reporting

### Required Secrets

For automatic deployment, configure these GitHub repository secrets:

- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Organization ID from Vercel
- `VERCEL_PROJECT_ID` - Project ID from Vercel

## API Integration

### Rick and Morty API

The application integrates with the Rick and Morty API:

- **Base URL**: https://rickandmortyapi.com/api
- **Endpoints**: Characters and Episodes
# TeachMe-node

Node.js backend implementation for the TeachMe app - designed to run inside Android assets as an alternative to the Flutter implementation.

## Overview

This is a Node.js version of the TeachMe application, built to be bundled within an Android app's assets folder. It provides the same core functionality as the Flutter version but uses Node.js runtime embedded in Android.

## Features

- **Offline-first Architecture**: Works without internet connection
- **Clean Architecture**: Separation of concerns with domain, data, and presentation layers
- **CRUD Operations**: Full create, read, update, delete functionality
- **Search & Filter**: Advanced search capabilities
- **Favorites**: Mark and manage favorite items
- **Theme Support**: Light/dark theme switching
- **Embedded Runtime**: Runs inside Android via Node.js mobile runtime

## Tech Stack

- **Runtime**: Node.js (embedded in Android)
- **Framework**: Express.js / Fastify
- **Database**: SQLite (via better-sqlite3 or sql.js)
- **State Management**: Redux / Zustand / Context API
- **Architecture**: Clean Architecture

## Project Structure

```
TeachMe-node/
├── src/
│   ├── core/           # Core utilities, constants, types
│   ├── domain/         # Business logic, entities, repositories interfaces
│   ├── data/           # Data sources, repository implementations, models
│   ├── presentation/   # Controllers, routes, middleware
│   └── index.js        # Application entry point
├── database/
│   ├── migrations/     # Database migration scripts
│   └── seeds/          # Initial data seeds
├── config/             # Configuration files
├── tests/              # Test files
├── package.json
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Android Studio (for Android integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/zaidzeki/TeachMe-node.git
cd TeachMe-node

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Android Integration

1. Build the Node.js bundle:
```bash
npm run build:android
```

2. Copy the bundle to your Android app's assets folder:
```bash
cp dist/bundle.js ../YourAndroidApp/app/src/main/assets/
```

3. Use a Node.js mobile runtime library like:
   - [nodejs-mobile](https://github.com/janeasystems/nodejs-mobile)
   - [J2V8](https://github.com/eclipsesource/J2V8)

## Development Roadmap

- [ ] Project setup and configuration
- [ ] Database schema design and migrations
- [ ] Domain layer implementation (entities, use cases)
- [ ] Data layer implementation (repositories, data sources)
- [ ] API routes and controllers
- [ ] Authentication and authorization
- [ ] Search and filter functionality
- [ ] Favorites feature
- [ ] Theme management
- [ ] Android integration testing
- [ ] Performance optimization
- [ ] Documentation

## License

MIT

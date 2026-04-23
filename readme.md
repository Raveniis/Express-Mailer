# Initial Setup

# Project

This project is a Node.js application.

## Requirements

- Node.js installed
- npm installed

## Installation

Install dependencies:

```bash
npm install
```

## Environment Setup

This project uses two environment files:

- `.env` → production
- `.env.development` → development

Start by copying the example file:

```bash
cp .env.example .env
```

For development:

```bash
cp .env.example .env.development
```

Then adjust values as needed for each environment.

## Available Scripts

### Start development server

Runs the app in development mode:

```bash
npm run dev
```

Use this command to run the app using the production environment:

```bash
npm run dev:production
```

### Build the project

Creates a production build:

```bash
npm run build
```

### Start production server

Builds and then starts the application:

```bash
npm run start
```

## Notes

Make sure your environment variables are properly configured before running the app in production.

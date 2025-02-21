# Node.js Backend Project

This is a Node.js backend project using Express.js and MongoDB.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration.

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Testing

Run tests:

```bash
npm test
```

## Project Structure

```
backend/
├── src/
│   ├── index.js          # Main application entry
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
├── tests/               # Test files
├── .env.example         # Example environment variables
├── .env                 # Environment variables (create this)
└── package.json         # Project dependencies and scripts
```

## API Endpoints

- `GET /`: Welcome message
- More endpoints coming soon...

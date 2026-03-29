# Movie Explorer — Frontend

A frontend app for browsing movies, actors, directors, and genres with backend-driven filtering.

## Tech Stack

- **Framework/Library:** React (TypeScript)
- **UI Library:** Bootstrap

## Run with Docker

**Using Docker Compose**

```bash
docker compose up --build
```

**Using Docker Image**

```bash
docker build -t movie-ui .
docker run -p 8080:80 movie-ui
```

App will be at `http://127.0.0.1:8080`. Requires the backend API at `http://127.0.0.1:8000`.

## Local Development

### 1. Setup

```bash
npm install
```

### 2. Lint

```bash
npm run lint
```

## 3. Tests

```bash
npm test
```

### 4. Development Server

```bash
npm run dev
```

App runs at `http://127.0.0.1:5173`. Requires the backend API at `http://127.0.0.1:8000`.

### 5. Build

Runs type-checking, linting, and bundles the app:

```bash
npm run build
```

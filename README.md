# Movie Explorer — Frontend

## 1. Setup

```bash
npm install
```

## 2. Development

```bash
npm run dev
```

App runs at `http://localhost:5173`. Requires the backend API at `http://127.0.0.1:8000`.

## 3. Lint

```bash
npm run lint
```

## 4. Tests

```bash
npm test
```

## 5. Build

Runs type-checking, linting, and bundles the app:

```bash
npm run build
```

## 6. Docker

```bash
docker build -t movie-ui .
docker run -p 8080:80 movie-ui
```

Or use Docker Compose:

```bash
docker compose up --build
```

App will be at `http://localhost:8080`.

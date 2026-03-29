# Movie Explorer — Frontend

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

App runs at `http://localhost:5173`. Requires the backend API at `http://127.0.0.1:8000`.

## Build

Runs type-checking, linting, and bundles the app:

```bash
npm run build
```

## Tests

```bash
npm test
```

## Docker

```bash
docker build -t movie-ui .
docker run -p 3000:80 movie-ui
```

Or use Docker Compose from the repo root:

```bash
docker compose up --build
```
"# movie-explorer-ui" 

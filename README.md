# Cam Hack 2024 Website

## Running a development server

```bash
bun install
bun run dev
```

## Building a production version

```bash
bun run build
```

## Docker Setup

### Using Docker Compose

#### Development Mode
```bash
docker-compose up camhack-dev
```
This will start a development server with hot reloading on http://localhost:5173

#### Production Mode
```bash
docker-compose up camhack
```
This will build and run the production version on http://localhost:3000

### Using Docker directly

#### Build the image
```bash
docker build -t camhack .
```

#### Run the container
```bash
docker run -p 3000:3000 camhack
```

The application will be available at http://localhost:3000

# DJ Aggregator

A full-stack app that searches for DJ profiles across Spotify and YouTube, aggregating artist info, albums, and latest videos into a single view.

---

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, TypeScript
- **Backend:** Express.js 5, TypeScript, Redis (caching), Prisma, Axios
- **Infrastructure:** PostgreSQL 15 + Redis 7 via Docker

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Spotify Developer credentials
- YouTube Data API v3 key

---

## Backend Setup

The backend requires PostgreSQL and Redis running via Docker, then the Express server started separately.

### 1. Start infrastructure (Docker)

From the **project root** (where `docker-compose.yml` lives):

```bash
docker compose up -d
```

This starts:
- **PostgreSQL 15** on `localhost:5432` (db: `djdb`, user: `postgres`, password: `postgres`)
- **Redis 7** on `localhost:6379`

To stop them:

```bash
docker compose down
```

### 2. Configure environment variables

Create `backend/.env`:

```env
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/djdb"
REDIS_URL="redis://localhost:6379"
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
```

- Get Spotify credentials at [developer.spotify.com](https://developer.spotify.com/dashboard)
- Get a YouTube API key at [console.cloud.google.com](https://console.cloud.google.com/) (enable YouTube Data API v3)

### 3. Install dependencies

```bash
cd backend
npm install
```

### 4. Run the backend

```bash
npm run dev
```

The server starts at `http://localhost:3001`.

**Available endpoints:**
- `GET /health` — health check
- `GET /api/dj/search?name={djName}` — search for a DJ

---

## Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure frontend environment

Create `frontend/.env.local`:

```env
API_BASE_URL=http://localhost:3001
```

You can also copy the example file:

```bash
cp frontend/.env.example frontend/.env.local
```

### 3. Run the frontend

```bash
npm run dev
```

The app opens at `http://localhost:3000`.

> The frontend proxies `/api/*` requests to `API_BASE_URL`, so make sure the backend is running first.

---

## Running Everything Together

Open three terminal tabs:

```bash
# Tab 1 — infrastructure (project root)
docker compose up -d

# Tab 2 — backend
cd backend && npm run dev

# Tab 3 — frontend
cd frontend && npm run dev
```

Then visit `http://localhost:3000`, type a DJ name, and hit search.

---

## How It Works

1. You search for a DJ name in the frontend.
2. The backend queries **Spotify** (artist info + albums) and **YouTube** (channel + 6 latest videos) in parallel.
3. Results are cached in **Redis** for 1 hour so repeat searches are instant.
4. The frontend displays the aggregated profile: artist image, albums, and video thumbnails.

# Mini E‑commerce — Quick start

A minimal README for people who clone this repo and want to run the app locally and sign in as the seeded admin user.

Prerequisites
- Node.js 18+ and npm (for the frontend)
- Java 21 and Maven (or use the included Maven wrapper) to run the backend
 - PostgreSQL database (backend uses PostgreSQL for persistence)

Steps

1. Clone the repository:

```powershell
git clone <repo-url>
cd mini-ecommerce
```

2. Start the backend (from the repo root). On Windows with the included wrapper:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Or build and run the JAR:

```powershell
cd backend
.\mvnw.cmd package
java -jar target\mini-ecommerce-api-0.0.1-SNAPSHOT.jar
```

3. Start the frontend:

```powershell
cd ..\app
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Admin login (seeded)
- Email: admin@gmail.com
- Password: admin

Note: you mentioned you created a backend bean that seeds this admin user — make sure the backend is running so the seeded user is available. If the backend is using an in-memory database or the seed runs only once, re-run the backend build/start if the user is missing.

Environment
- NEXT_PUBLIC_API_BASE — optional. The frontend can use a proxy path or a full backend URL:
	- Use `/api` to route requests through the Next.js proxy (the app is configured to proxy `/api` to the backend in development).
    -NEXT_PUBLIC_API_BASE=/api
	- Or set a full backend URL, for example `http://localhost:8080`.

Examples:

```text
NEXT_PUBLIC_API_BASE=/api
# or
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

Backend datasource
- The backend uses PostgreSQL. Ensure a Postgres server is running and configure the datasource before starting the backend. You can set the connection in `backend/src/main/resources/application.properties` or via environment variables (for example: `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`).

Troubleshooting
- If login fails, verify the backend logs show the seeded admin creation and that the backend returned a cookie named `jwt` on login.
- If the UI looks broken or products are missing, ensure the backend is running and returning product pages (the frontend requests paginated data, default size 20).

If you want, I can also add a short script to start backend + frontend together or a CONTRIBUTING note describing the seeded admin bean location in the backend code.

Local env file
- Copy `app/.env.example` to `app/.env.local` and edit values for your environment. Do not commit `app/.env.local` — it should remain local to your machine.

Example `app/.env.local`
If you want to create `app/.env.local` manually, use this example content (safe defaults):

```text
NEXT_PUBLIC_API_BASE=http://localhost:8080
# Optional: base URL for Playwright tests when running from the frontend folder
# PLAYWRIGHT_BASE_URL=http://localhost:3000
```

Paste the block above into `app/.env.local` (or copy `app/.env.example`) and adjust values as needed.


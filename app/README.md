Mini e-commerce frontend

This folder contains a minimal Next.js (app router) + TypeScript + Tailwind scaffold wired to the existing backend.

How to run:

1. cd app
2. npm install
3. npm run dev

Environment:
- NEXT_PUBLIC_API_BASE (optional) - base URL for backend (default http://localhost:8080)

Notes:
- The frontend uses cookies for JWT (cookie name 'jwt').
- Many components use simple alert() for toasts; replace with a better UI as needed.

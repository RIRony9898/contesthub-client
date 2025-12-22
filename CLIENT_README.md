ContestHub — Client

This file documents the client-specific setup and required environment variables.

Local development

1. Install dependencies:

```bash
cd contesthub-client
npm install
```

2. Start dev server:

```bash
npm run dev
```

Required environment variables (create a `.env` file in `contesthub-client`):

- `VITE_API_BASE_URL` - API base URL (e.g. http://localhost:5000)
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` - Firebase configuration keys

Security note: Do not commit `.env` to Git; ensure `.gitignore` contains `.env`.

Notes:

- Configure `VITE_API_BASE_URL` to point to the server (e.g., `http://localhost:5000`).
- This client uses Firebase Auth for user sign-in and the backend for role and server-side operations.
- Stripe Checkout is used for payments; the checkout session is created by the server.

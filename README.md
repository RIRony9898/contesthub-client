# ContestHub (Client)

A React + Vite frontend for the ContestHub contest management platform.

## Features

- Browse and filter public contests with pagination
- Contest details with Stripe Checkout payment integration  
- Admin dashboard: manage users and contests
- Creator dashboard: create contests, view submissions, declare winners
- Leaderboard: view contest winners globally
- Dark/Light theme toggle
- Real-time data via TanStack Query
- SweetAlert2 confirmations for destructive actions

## Local Development

### 1. Install dependencies

```bash
cd contesthub-client
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your Firebase configuration:

```bash
cp .env.example .env
```

Edit `.env` with your actual Firebase keys (see `.env.example` for all required variables).

### 3. Start dev server

```bash
npm run dev
```

The app will run on `http://localhost:5173`.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL (default: `http://localhost:5000`) |
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_MEASUREMENT_ID` | Firebase measurement ID (optional) |

## Key Technologies

- **React 19** + Vite
- **React Router v7** for routing
- **TanStack Query v5** for data fetching and caching
- **React Hook Form** for form handling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **SweetAlert2** for confirmations and alerts
- **Stripe.js** for payment integration

## Build & Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Security Notes

- `.env` is not committed to Git (see `.gitignore`). Each developer must create their own copy.
- Use `.env.example` as a template.
- Never commit actual Firebase keys or secrets to version control.

## Project Structure

```
src/
├── components/
│   ├── auth/              # Login, Register, PrivateRoute
│   ├── common/            # Navbar, Footer, Loader
│   ├── contestPage/       # Contest listing and cards
│   ├── dashboard/         # Admin and Creator dashboards
│   ├── details/           # Contest details and submit modal
│   ├── home/              # Home page sections
│   └── layout/            # Layout components
├── pages/
│   ├── Contest.jsx        # All contests page
│   ├── Details.jsx        # Contest details page
│   ├── Home.jsx
│   ├── Leaderboard.jsx    # Winners leaderboard
│   ├── Payment.jsx        # Stripe checkout
│   └── NotFound.jsx
├── routes/                # React Router configuration
├── hooks/                 # Custom hooks (useAuth, etc.)
├── utils/                 # Utilities (API calls, validation, etc.)
├── context/               # Context API setup
├── firebase/              # Firebase configuration
└── App.jsx               # Main App component
```

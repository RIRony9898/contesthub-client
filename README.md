# 🏆 ContestHub - Creative Contest Management Platform

[![Live Site](https://img.shields.io/badge/Live%20Site-ContestHub-blue?style=flat-square)](https://contesthub-client.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Live-green?style=flat-square)](https://contesthub-server.vercel.app)

A modern, fully-featured contest management platform built with React, Node.js, MongoDB, and Stripe. ContestHub empowers users to discover, participate in, and manage creative contests across various categories.

---

## 🎯 Key Features

### 🏠 General Features

1. **Fully Responsive Design** - Mobile, tablet, and desktop optimized UI with seamless experience across all devices
2. **Dark/Light Theme Toggle** - User preference saved to localStorage with smooth transitions
3. **Real-time Data Fetching** - TanStack Query for efficient caching and data synchronization
4. **Beautiful UI Components** - Tailwind CSS with custom animations using Framer Motion and AOS
5. **Secure Authentication** - Firebase authentication with JWT tokens for API security
6. **Payment Integration** - Stripe checkout for contest participation and registration fees
7. **Role-Based Access Control** - Three distinct roles (Admin, Creator, User) with specific permissions
8. **SweetAlert Notifications** - Elegant alerts for all CRUD operations and user interactions
9. **Form Validation** - React Hook Form with custom validation rules and error messaging
10. **Leaderboard Ranking** - Dynamic leaderboard showing top contest winners with prize statistics

### 🏠 Homepage

- **Dynamic Banner** - Eye-catching hero section with search functionality
- **Contest Search** - Search contests by type/category with backend filtering
- **Popular Contests Section** - Showcase 5+ trending contests sorted by participation count
- **Winner Advertisement** - Inspiring section displaying recent winners and prize achievements
- **Contest Cards** - Beautiful card design showing contest name, image, participants, and description

### 🔍 All Contests Page

- **Tab Filtering** - Filter contests by category (Image Design, Article Writing, Business Ideas, Gaming Reviews, Photography)
- **Admin-Approved Contests Only** - Display only contests verified by admins
- **Pagination** - 10 contests per page with navigation controls
- **Search & Filter Combination** - Advanced filtering by multiple criteria
- **Responsive Grid Layout** - Adapts from 1 to 3 columns based on screen size

### 🏅 Contest Details Page (Private Route)

- **Full Contest Information** - Name, image, description, task instructions, and deadline
- **Live Countdown Timer** - Real-time deadline counter with "Contest Ended" status
- **Participant Count** - Dynamic counter updating after successful payments
- **Prize Information** - Display prize money for winner
- **Winner Display** - Show winner name and photo after creator declares winner
- **Payment Integration** - Stripe checkout button (disabled after deadline)
- **Submit Task Modal** - Post-payment task submission with textarea and file links

### 👥 User Dashboard

1. **Overview Dashboard** - Statistics and quick actions
2. **My Participated Contests** - List of all contests user registered for with status
3. **My Winning Contests** - Showcase all contests won with prize money details
4. **My Profile** - Edit personal information, bio, address, and profile photo

### 🎨 Creator Dashboard

1. **Add Contest Page** - Form with name, image, description, price, prize money, task instructions, type, deadline
2. **Created Contests Page** - Table view with edit/delete options for pending contests
3. **Submitted Tasks Page** - View submissions and declare winner
4. **Edit Contest Page** - Update contest details before approval

### 🛡️ Admin Dashboard

1. **Manage Users Table** - View all users and change roles
2. **Manage Contests Table** - Confirm, reject, or delete contests
3. **Admin Statistics** - Dashboard overview with key metrics

### 📊 Leaderboard Page

- **Ranked User List** - Users sorted by number of wins
- **Win Statistics** - Display wins, total prize money, win rate
- **Medal Badges** - Visual distinction for top performers

---

## 🛠 Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **AOS** - Animate On Scroll library
- **React Router v7** - Client-side routing
- **React Hook Form** - Efficient form handling
- **TanStack Query v5** - Server state management
- **Axios** - HTTP client with interceptors
- **Firebase** - Authentication service
- **Stripe.js** - Payment processing
- **SweetAlert2** - Elegant alerts
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Backend

- **Node.js & Express** - Server framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication tokens
- **Cloudinary** - Image hosting and optimization
- **Stripe API** - Payment processing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

Required API Keys:

- Firebase project credentials
- Stripe API keys (public and secret)
- MongoDB connection string

---

## 💻 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/contesthub.git
cd contesthub
```

### 2. Setup Frontend

```bash
cd contesthub-client
npm install
cp .env.example .env
# Edit .env with your Firebase credentials
```

### 3. Setup Backend

```bash
cd ../contesthub-server
npm install
cp .env.example .env
# Edit .env with your MongoDB and Stripe credentials
```

---

## 🔐 Environment Variables

### Frontend (`contesthub-client/.env`)

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_BASE_URL=http://localhost:5000
```

### Backend (`contesthub-server/.env`)

```env
MONGODB_URI=your_mongodb_connection_string
DB_NAME=contesthub
JWT_SECRET=your_jwt_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 🚀 Running the Application

### Frontend Development

```bash
cd contesthub-client
npm run dev
```

Runs on `http://localhost:5173`

### Backend Development

```bash
cd contesthub-server
npm run dev
```

Runs on `http://localhost:5000`

---

## 📂 Project Structure

```
ContestHub/
├── contesthub-client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/              # Login, Register, PrivateRoute
│   │   │   ├── common/            # Navbar, Footer
│   │   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── contestPage/       # Contest listing
│   │   │   ├── details/           # Contest details
│   │   │   ├── home/              # Homepage sections
│   │   │   └── loader/            # Loading components
│   │   ├── pages/                 # Page components
│   │   ├── routes/                # Route definitions
│   │   ├── utils/                 # Utility functions
│   │   ├── context/               # React Context
│   │   ├── firebase/              # Firebase config
│   │   └── App.jsx                # Root component
│   ├── package.json
│   └── README.md
│
└── contesthub-server/
    ├── modules/
    │   ├── auth/                  # Authentication
    │   ├── admin/                 # Admin operations
    │   ├── creator/               # Creator operations
    │   ├── public/                # Public APIs
    │   ├── payments/              # Stripe integration
    │   └── submissions/           # Submissions
    ├── middlewares/               # Express middlewares
    ├── utils/                     # Helper functions
    ├── index.mjs                  # Entry point
    └── package.json
```

---

## 📊 Git Commit History

**Frontend**: 20+ meaningful commits ✅
**Backend**: 12+ meaningful commits ✅

---

## 🌐 Deployment

### Frontend (Vercel)

```bash
cd contesthub-client
npm run build
vercel
```

### Backend (Vercel/Render)

```bash
cd contesthub-server
vercel
```

---

**Built with ❤️ | Last Updated: December 2025**

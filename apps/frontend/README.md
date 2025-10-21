# HotelEase Frontend

Next.js frontend for HotelEase hotel management system.

## Features

- **Admin Panel**: Dashboard, room management, booking management, service requests
- **Guest Portal**: Room details, service requests, stay information
- **Authentication**: Role-based login (admin vs guest)
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Pages

### Admin Pages
- `/admin/login` - Admin login (username + password)
- `/admin/dashboard` - Admin dashboard with stats and quick actions
- `/admin/rooms` - Room management (CRUD operations)
- `/admin/bookings` - Booking management and check-in/out
- `/admin/services` - Service request management

### Guest Pages
- `/user/login` - Guest login (booking-id + phone)
- `/user/dashboard` - Guest dashboard with stay details
- `/user/services` - Service request creation and tracking

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.local .env.local
# Edit .env.local with your API URL
```

3. Start development server:
```bash
npm run dev
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **HTTP Client**: Axios
- **Authentication**: JWT with cookies
- **Icons**: Lucide React

## Authentication Flow

### Admin Login
1. Navigate to `/admin/login`
2. Enter username and password
3. Redirected to `/admin/dashboard` on success

### Guest Login
1. Navigate to `/user/login`
2. Enter booking ID and phone number
3. Redirected to `/user/dashboard` on success

## Component Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/         # Reusable components
│   └── ui/            # shadcn/ui components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and API client
└── types/             # TypeScript type definitions
```

## API Integration

The frontend communicates with the NestJS backend via:
- Base URL: `http://localhost:3001` (configurable via env)
- Authentication: JWT tokens stored in cookies
- Error handling: Automatic logout on 401 responses
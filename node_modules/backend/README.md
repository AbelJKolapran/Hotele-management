# HotelEase Backend API

NestJS backend for HotelEase hotel management system.

## Features

- **Authentication**: JWT-based auth for admin and user login
- **Room Management**: CRUD operations for rooms with availability tracking
- **Booking System**: Complete booking lifecycle management
- **Service Requests**: Room service request handling
- **Role-based Access**: Admin and user role separation

## API Endpoints

### Authentication
- `POST /auth/admin/login` - Admin login (username + password)
- `POST /auth/user/login` - User login (booking-id + phone)
- `POST /auth/admin/create` - Create new admin (admin only)
- `GET /auth/profile` - Get current user profile

### Rooms
- `GET /rooms` - Get all rooms
- `GET /rooms/stats` - Get room statistics
- `GET /rooms/available` - Get available rooms for date range
- `POST /rooms` - Create room (admin only)
- `PATCH /rooms/:id` - Update room (admin only)
- `DELETE /rooms/:id` - Delete room (admin only)

### Bookings
- `GET /bookings` - Get all bookings (admin only)
- `GET /bookings/stats` - Get booking statistics
- `POST /bookings` - Create booking (admin only)
- `PATCH /bookings/:id/check-in` - Check in guest (admin only)
- `PATCH /bookings/:id/check-out` - Check out guest (admin only)
- `PATCH /bookings/:id/complete` - Complete stay (admin only)

### Service Requests
- `GET /services` - Get all service requests (admin only)
- `GET /services/my-requests` - Get user's service requests
- `POST /services` - Create service request (user only)
- `PATCH /services/:id` - Update service request status (admin only)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your database URL and JWT secret
```

3. Set up database:
```bash
npm run db:push
npm run db:generate
npm run db:seed
```

4. Start development server:
```bash
npm run start:dev
```

## Database Schema

The application uses Prisma with PostgreSQL. Key entities:

- **Users**: Admin accounts with roles
- **Rooms**: Room information and status
- **Bookings**: Guest bookings with lifecycle tracking
- **RoomServiceRequests**: Service requests from guests
- **StayRatings**: Guest feedback system

## Authentication Flow

### Admin Login
1. POST `/auth/admin/login` with `{ username, password }`
2. Returns JWT token and user info
3. Use token in `Authorization: Bearer <token>` header

### User Login
1. POST `/auth/user/login` with `{ bookingId, phoneNumber }`
2. Returns JWT token and booking info
3. Use token in `Authorization: Bearer <token>` header

## Sample Data

The seed script creates:
- 3 admin users (manager, receptionist, staff) - password: `admin123`
- 6 rooms (Standard, Deluxe, Suite types)
- 2 sample bookings

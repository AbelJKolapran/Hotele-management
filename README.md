# HotelEase - Hotel Management System

A modern, full-stack hotel management system built with Next.js, NestJS, and PostgreSQL.

## 🏨 Features

### Admin Panel
- **Dashboard**: Real-time statistics and overview
- **Room Management**: Add, edit, delete rooms with types and status
- **Booking Management**: Create bookings, check-in/out, complete stays
- **Service Requests**: Manage guest service requests
- **User Management**: Admin account management

### Guest Portal
- **Room Details**: View stay information and room details
- **Service Requests**: Request room services (water, towels, cleaning, etc.)
- **Request Tracking**: Monitor service request status
- **Stay Rating**: Rate your stay experience

### Authentication
- **Admin Login**: Username + password authentication
- **Guest Login**: Booking ID + phone number authentication
- **Role-based Access**: Separate admin and guest interfaces
- **JWT Security**: Secure token-based authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd hotelease
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb hotelease

# Copy environment file
cp apps/backend/env.example apps/backend/.env

# Edit apps/backend/.env with your database URL:
# DATABASE_URL="postgresql://username:password@localhost:5432/hotelease?schema=public"
# JWT_SECRET="your-super-secret-jwt-key"
```

### 4. Backend Setup
```bash
cd apps/backend
npm install
npm run db:push
npm run db:generate
npm run db:seed
npm run start:dev
```

### 5. Frontend Setup
```bash
cd apps/frontend
npm install
cp env.local .env.local
# Edit .env.local: NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev
```

### 6. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🐳 Docker Deployment

### Quick Docker Setup
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d
```

### Access Docker Services
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Database**: localhost:5432

## 🔑 Demo Credentials

### Admin Login
- **Username**: manager, receptionist, or staff
- **Password**: admin123

### Guest Login
- Use any booking ID from the seeded data
- Phone number: +1234567890 or +1987654321

## 🏗️ Architecture

```
HotelEase/
├── apps/
│   ├── backend/          # NestJS API Server
│   │   ├── src/
│   │   │   ├── auth/     # Authentication module
│   │   │   ├── booking/  # Booking management
│   │   │   ├── room/     # Room management
│   │   │   ├── service/  # Service requests
│   │   │   └── rating/   # Stay ratings
│   │   └── prisma/       # Database schema & migrations
│   └── frontend/         # Next.js Web Application
│       ├── src/
│       │   ├── app/      # App Router pages
│       │   ├── components/ # UI components
│       │   ├── hooks/    # Custom React hooks
│       │   └── lib/      # Utilities & API client
├── prisma/
│   └── schema.prisma     # Database schema
└── docker-compose.yml    # Docker configuration
```

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: class-validator
- **Language**: TypeScript

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **HTTP Client**: Axios
- **Authentication**: JWT with cookies
- **Language**: TypeScript

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL 14
- **Environment**: Node.js 18

## 📊 Database Schema

### Core Entities
- **Users**: Admin accounts with roles
- **Rooms**: Room information and availability
- **Bookings**: Guest bookings and lifecycle
- **RoomServiceRequests**: Service requests from guests
- **StayRatings**: Guest feedback and ratings

### Key Features
- **Room Types**: Standard, Deluxe, Suite
- **Room Status**: Available, Occupied, Cleaning
- **Booking Status**: Active → Checked-in → Checked-out → Completed
- **Service Types**: Water, Towels, Cleaning, Maintenance, etc.
- **Rating System**: 1-5 star rating with feedback

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Role-based Access**: Admin vs Guest permissions
- **Input Validation**: Comprehensive validation
- **CORS Protection**: Configured for frontend
- **SQL Injection Prevention**: Prisma ORM protection

## 📱 API Endpoints

### Authentication
- `POST /auth/admin/login` - Admin login
- `POST /auth/user/login` - Guest login
- `GET /auth/profile` - Get user profile

### Rooms
- `GET /rooms` - Get all rooms
- `POST /rooms` - Create room (admin)
- `PATCH /rooms/:id` - Update room (admin)
- `DELETE /rooms/:id` - Delete room (admin)

### Bookings
- `GET /bookings` - Get all bookings (admin)
- `POST /bookings` - Create booking (admin)
- `PATCH /bookings/:id/check-in` - Check in guest
- `PATCH /bookings/:id/check-out` - Check out guest

### Services
- `GET /services` - Get all service requests (admin)
- `POST /services` - Create service request (guest)
- `PATCH /services/:id` - Update service request (admin)

### Ratings
- `POST /stay-ratings` - Create stay rating (guest)
- `GET /stay-ratings/stats` - Get rating statistics

## 🚀 Deployment

### Production Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables
- **Backend**: Database URL, JWT secret, port
- **Frontend**: API URL configuration
- **Database**: PostgreSQL connection settings

### Scaling Considerations
- **Horizontal Scaling**: Load balancer, multiple instances
- **Database**: Read replicas, connection pooling
- **Caching**: Redis for session storage
- **CDN**: Static asset delivery

## 🧪 Testing

### Backend Testing
```bash
cd apps/backend
npm run test
npm run test:e2e
```

### Frontend Testing
```bash
cd apps/frontend
npm run test
```

## 📈 Performance

### Optimization Features
- **Database Indexing**: Optimized queries
- **Image Optimization**: Next.js image optimization
- **Code Splitting**: Automatic code splitting
- **Caching**: HTTP caching headers
- **Compression**: Gzip compression

## 🔧 Development

### Available Scripts
```bash
# Root level
npm run dev          # Start both frontend and backend
npm run build        # Build both applications
npm run db:push      # Push database schema
npm run db:seed      # Seed database with sample data

# Backend
npm run dev:backend  # Start backend in development
npm run build:backend # Build backend
npm run db:generate  # Generate Prisma client

# Frontend
npm run dev:frontend # Start frontend in development
npm run build:frontend # Build frontend
```

### Code Structure
- **Modular Architecture**: Feature-based modules
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error handling
- **Logging**: Structured logging
- **Documentation**: Inline code documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review the API documentation
- Check the troubleshooting section
- Contact the development team

## 🎯 Roadmap

### Future Features
- [ ] Mobile app (React Native)
- [ ] Advanced reporting and analytics
- [ ] Integration with payment gateways
- [ ] Multi-language support
- [ ] Advanced room service management
- [ ] Guest communication system
- [ ] Inventory management
- [ ] Staff scheduling system

---

**Built with ❤️ for modern hotel management**

# HotelEase - Deployment Guide

Complete deployment guide for the HotelEase hotel management system.

## 🏗️ Architecture Overview

```
HotelEase/
├── apps/
│   ├── backend/          # NestJS API Server
│   └── frontend/         # Next.js Web Application
├── prisma/
│   └── schema.prisma     # Database Schema
└── docker-compose.yml    # Docker Configuration
```

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### 1. Clone and Setup
```bash
git clone <repository-url>
cd hotelease
npm install
```

### 2. Database Setup
```bash
# Install PostgreSQL and create database
createdb hotelease

# Copy environment file
cp apps/backend/env.example apps/backend/.env

# Edit apps/backend/.env with your database URL:
# DATABASE_URL="postgresql://username:password@localhost:5432/hotelease?schema=public"
# JWT_SECRET="your-super-secret-jwt-key"
# PORT=3001
```

### 3. Backend Setup
```bash
cd apps/backend
npm install
npm run db:push
npm run db:generate
npm run db:seed
npm run start:dev
```

### 4. Frontend Setup
```bash
cd apps/frontend
npm install
cp env.local .env.local
# Edit .env.local: NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432

## 🐳 Docker Deployment

### Docker Compose Setup
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: hotelease
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./apps/backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/hotelease?schema=public
      JWT_SECRET: your-super-secret-jwt-key-change-in-production
      PORT: 3001
    depends_on:
      - postgres
    command: >
      sh -c "npm run db:push && 
             npm run db:generate && 
             npm run db:seed && 
             npm run start:prod"

  frontend:
    build: ./apps/frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Docker Commands
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🌐 Production Deployment

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@host:5432/hotelease?schema=public"
JWT_SECRET="your-super-secure-jwt-secret-key"
JWT_EXPIRES_IN="24h"
PORT=3001
NODE_ENV="production"
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="https://your-api-domain.com"
```

### Production Build Commands

#### Backend
```bash
cd apps/backend
npm install --production
npm run build
npm run start:prod
```

#### Frontend
```bash
cd apps/frontend
npm install --production
npm run build
npm run start
```

### Database Migration (Production)
```bash
cd apps/backend
npm run db:migrate
```

## 🔧 Configuration

### Database Configuration
- **PostgreSQL**: Recommended for production
- **Connection Pool**: Configure in Prisma for high traffic
- **Backup**: Set up automated backups

### Security Configuration
- **JWT Secret**: Use strong, unique secret in production
- **CORS**: Configure allowed origins
- **Rate Limiting**: Implement API rate limiting
- **HTTPS**: Use SSL certificates

### Performance Optimization
- **Caching**: Implement Redis for session storage
- **CDN**: Use CDN for static assets
- **Database Indexing**: Optimize database queries
- **Image Optimization**: Compress and optimize images

## 📊 Monitoring & Logging

### Application Monitoring
- **Health Checks**: `/health` endpoint
- **Error Tracking**: Implement error monitoring
- **Performance Monitoring**: Track response times
- **Database Monitoring**: Monitor query performance

### Logging
- **Structured Logging**: Use JSON format
- **Log Levels**: Configure appropriate levels
- **Log Rotation**: Implement log rotation
- **Centralized Logging**: Use ELK stack or similar

## 🔐 Security Best Practices

### Authentication & Authorization
- **JWT Expiration**: Set appropriate expiration times
- **Password Hashing**: Use bcrypt with salt rounds
- **Role-based Access**: Implement proper RBAC
- **Session Management**: Secure session handling

### API Security
- **Input Validation**: Validate all inputs
- **SQL Injection**: Use parameterized queries
- **XSS Protection**: Sanitize user inputs
- **CSRF Protection**: Implement CSRF tokens

### Infrastructure Security
- **Firewall**: Configure proper firewall rules
- **SSL/TLS**: Use HTTPS everywhere
- **Secrets Management**: Use secure secret storage
- **Regular Updates**: Keep dependencies updated

## 🚀 Deployment Platforms

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd apps/frontend
vercel

# Configure environment variables in Vercel dashboard
```

### Railway (Backend)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy backend
cd apps/backend
railway login
railway init
railway up
```

### DigitalOcean App Platform
- **Frontend**: Static site deployment
- **Backend**: Container deployment
- **Database**: Managed PostgreSQL

### AWS Deployment
- **Frontend**: S3 + CloudFront
- **Backend**: ECS or Lambda
- **Database**: RDS PostgreSQL

## 📈 Scaling Considerations

### Horizontal Scaling
- **Load Balancer**: Use load balancer for multiple instances
- **Database Replication**: Set up read replicas
- **Caching Layer**: Implement Redis caching
- **CDN**: Use CDN for static assets

### Vertical Scaling
- **Resource Monitoring**: Monitor CPU, memory usage
- **Database Optimization**: Optimize queries and indexes
- **Connection Pooling**: Configure connection pools
- **Memory Management**: Optimize memory usage

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy HotelEase
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Add deployment commands
```

## 📞 Support & Maintenance

### Regular Maintenance
- **Security Updates**: Regular dependency updates
- **Database Maintenance**: Regular backups and optimization
- **Performance Monitoring**: Monitor and optimize performance
- **User Feedback**: Collect and act on user feedback

### Troubleshooting
- **Logs**: Check application and server logs
- **Database**: Monitor database performance
- **Network**: Check network connectivity
- **Dependencies**: Verify all dependencies are working

## 📋 Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Security headers configured
- [ ] Error monitoring set up
- [ ] Backup strategy implemented
- [ ] Performance monitoring configured
- [ ] Load testing completed
- [ ] Documentation updated
- [ ] Team training completed

## 🎯 Post-deployment Tasks

- [ ] Verify all features working
- [ ] Monitor application performance
- [ ] Check error logs
- [ ] Validate security measures
- [ ] Test backup and recovery
- [ ] Update monitoring dashboards
- [ ] Notify stakeholders
- [ ] Schedule regular maintenance

---

**Need Help?** Check the troubleshooting section or contact the development team.

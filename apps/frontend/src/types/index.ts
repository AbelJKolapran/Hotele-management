export interface User {
  id: string
  username: string
  role: 'STAFF' | 'RECEPTIONIST' | 'MANAGER'
}

export interface Room {
  id: string
  roomNumber: string
  roomType: 'STANDARD' | 'DELUXE' | 'SUITE'
  status: 'AVAILABLE' | 'OCCUPIED' | 'CLEANING'
  price: number
  description?: string
}

export interface Booking {
  id: string
  bookingId: string
  guestName: string
  guestEmail?: string
  phoneNumber: string
  roomId: string
  checkIn: string
  checkOut: string
  status: 'ACTIVE' | 'CHECKED_IN' | 'CHECKED_OUT' | 'COMPLETED' | 'CANCELLED'
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED'
  totalAmount: number
  specialRequests?: string
  checkedInAt?: string
  checkedOutAt?: string
  createdAt: string
  updatedAt: string
  room: Room
  createdBy?: User
}

export interface ServiceRequest {
  id: string
  bookingId: string
  requestType: 'WATER' | 'TOWEL' | 'PILLOW' | 'BLANKET' | 'CLEANING' | 'MAINTENANCE' | 'ROOM_SERVICE' | 'OTHER'
  description?: string
  status: 'PENDING' | 'COMPLETED'
  notes?: string
  requestedAt: string
  completedAt?: string
  booking: Booking
}

export interface StayRating {
  id: string
  bookingId: string
  rating: number
  feedback?: string
  createdAt: string
}

export interface AuthResponse {
  access_token: string
  user?: User
  booking?: Booking
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface UserLoginCredentials {
  bookingId: string
  phoneNumber: string
}

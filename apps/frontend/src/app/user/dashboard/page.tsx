'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'
import { ServiceRequest } from '@/types'

export default function UserDashboard() {
  const { booking, logout, isUser } = useAuth()
  const router = useRouter()
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isUser) {
      router.push('/user/login')
      return
    }

    fetchServiceRequests()
  }, [isUser, router])

  const fetchServiceRequests = async () => {
    try {
      const response = await api.get('/services/my-requests')
      setServiceRequests(response.data)
    } catch (error) {
      console.error('Failed to fetch service requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading your stay details...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking found</h2>
          <Button onClick={() => router.push('/user/login')}>
            Login Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">HotelEase</h1>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Guest Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {booking.guestName}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Stay</h2>
          <p className="mt-2 text-gray-600">Room {booking.room.roomNumber} - {booking.room.roomType}</p>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Stay Information</CardTitle>
              <CardDescription>Your booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Booking ID:</span>
                <span className="text-sm font-mono">{booking.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Room:</span>
                <span className="text-sm">{booking.room.roomNumber} ({booking.room.roomType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Check-in:</span>
                <span className="text-sm">{formatDate(booking.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Check-out:</span>
                <span className="text-sm">{formatDate(booking.checkOut)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.replace('_', ' ')}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Room Service</CardTitle>
              <CardDescription>Request services for your room</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => router.push('/user/services')}
                className="w-full"
              >
                Request Service
              </Button>
              <div className="mt-4 text-sm text-gray-600">
                <p>Available services:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Water & Refreshments</li>
                  <li>• Towels & Linens</li>
                  <li>• Room Cleaning</li>
                  <li>• Maintenance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Your Service Requests</CardTitle>
            <CardDescription>Track your room service requests</CardDescription>
          </CardHeader>
          <CardContent>
            {serviceRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🛎️</div>
                <p>No service requests yet</p>
                <p className="text-sm">Click "Request Service" to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{request.requestType.replace('_', ' ')}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      {request.description && (
                        <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Requested: {formatDate(request.requestedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

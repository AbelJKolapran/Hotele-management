'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'
import { Booking, Room } from '@/types'

export default function BookingManagement() {
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    phoneNumber: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  })

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    fetchData()
  }, [isAdmin, router])

  const fetchData = async () => {
    try {
      const [bookingsResponse, roomsResponse] = await Promise.all([
        api.get('/bookings'),
        api.get('/rooms'),
      ])
      setBookings(bookingsResponse.data)
      setRooms(roomsResponse.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/bookings', formData)
      setIsDialogOpen(false)
      resetForm()
      fetchData()
    } catch (error) {
      console.error('Failed to create booking:', error)
    }
  }

  const handleCheckIn = async (bookingId: string) => {
    try {
      await api.patch(`/bookings/${bookingId}/check-in`)
      fetchData()
    } catch (error) {
      console.error('Failed to check in:', error)
    }
  }

  const handleCheckOut = async (bookingId: string) => {
    try {
      await api.patch(`/bookings/${bookingId}/check-out`)
      fetchData()
    } catch (error) {
      console.error('Failed to check out:', error)
    }
  }

  const handleCompleteStay = async (bookingId: string) => {
    try {
      await api.patch(`/bookings/${bookingId}/complete`)
      fetchData()
    } catch (error) {
      console.error('Failed to complete stay:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      guestName: '',
      guestEmail: '',
      phoneNumber: '',
      roomId: '',
      checkIn: '',
      checkOut: '',
      specialRequests: '',
    })
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
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800'
      case 'CHECKED_IN':
        return 'bg-green-100 text-green-800'
      case 'CHECKED_OUT':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'REFUNDED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
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
              <Button
                variant="ghost"
                onClick={() => router.push('/admin/dashboard')}
                className="mr-4"
              >
                ← Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setIsDialogOpen(true)}>
                Create Booking
              </Button>
              <Button onClick={() => logout()} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{booking.guestName}</CardTitle>
                    <CardDescription>
                      Booking ID: {booking.bookingId} • Room {booking.room.roomNumber}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm">{booking.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm">{booking.guestEmail || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Check-in</p>
                    <p className="text-sm">{formatDate(booking.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Check-out</p>
                    <p className="text-sm">{formatDate(booking.checkOut)}</p>
                  </div>
                </div>
                
                {booking.specialRequests && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Special Requests</p>
                    <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold">
                    Total: ${booking.totalAmount}
                  </div>
                  <div className="flex space-x-2">
                    {booking.status === 'ACTIVE' && (
                      <Button
                        size="sm"
                        onClick={() => handleCheckIn(booking.id)}
                      >
                        Check In
                      </Button>
                    )}
                    {booking.status === 'CHECKED_IN' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCheckOut(booking.id)}
                      >
                        Check Out
                      </Button>
                    )}
                    {booking.status === 'CHECKED_OUT' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleCompleteStay(booking.id)}
                      >
                        Complete Stay
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">Create your first booking to get started</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create First Booking
            </Button>
          </div>
        )}
      </main>

      {/* Create Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
            <DialogDescription>
              Create a booking for a walk-in guest
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Guest Name</Label>
                <Input
                  id="guestName"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+1234567890"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guestEmail">Email (Optional)</Label>
              <Input
                id="guestEmail"
                type="email"
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomId">Room</Label>
              <Select
                id="roomId"
                value={formData.roomId}
                onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                required
              >
                <option value="">Select a room</option>
                {rooms
                  .filter(room => room.status === 'AVAILABLE')
                  .map((room) => (
                    <option key={room.id} value={room.id}>
                      Room {room.roomNumber} - {room.roomType} (${room.price}/night)
                    </option>
                  ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkIn">Check-in Date</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOut">Check-out Date</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Input
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Late check-in, vegetarian breakfast, etc."
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

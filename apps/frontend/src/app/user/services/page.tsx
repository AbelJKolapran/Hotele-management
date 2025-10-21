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
import { ServiceRequest } from '@/types'

export default function UserServices() {
  const { booking, logout, isUser } = useAuth()
  const router = useRouter()
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    requestType: 'WATER' as 'WATER' | 'TOWEL' | 'PILLOW' | 'BLANKET' | 'CLEANING' | 'MAINTENANCE' | 'ROOM_SERVICE' | 'OTHER',
    description: '',
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/services', formData)
      setIsDialogOpen(false)
      resetForm()
      fetchServiceRequests()
    } catch (error) {
      console.error('Failed to create service request:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      requestType: 'WATER',
      description: '',
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'WATER':
        return '💧'
      case 'TOWEL':
        return '🛁'
      case 'PILLOW':
        return '🛏️'
      case 'BLANKET':
        return '🛌'
      case 'CLEANING':
        return '🧹'
      case 'MAINTENANCE':
        return '🔧'
      case 'ROOM_SERVICE':
        return '🍽️'
      case 'OTHER':
        return '❓'
      default:
        return '🛎️'
    }
  }

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'WATER':
        return 'Water & Refreshments'
      case 'TOWEL':
        return 'Towels & Linens'
      case 'PILLOW':
        return 'Pillows'
      case 'BLANKET':
        return 'Blankets'
      case 'CLEANING':
        return 'Room Cleaning'
      case 'MAINTENANCE':
        return 'Maintenance'
      case 'ROOM_SERVICE':
        return 'Room Service'
      case 'OTHER':
        return 'Other'
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading service requests...</p>
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
              <Button
                variant="ghost"
                onClick={() => router.push('/user/dashboard')}
                className="mr-4"
              >
                ← Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Room Service</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Room {booking.room.roomNumber}
              </span>
              <Button onClick={() => logout()} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Request Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Request Service</CardTitle>
            <CardDescription>
              Request services for your room. Our staff will assist you promptly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Button onClick={() => setIsDialogOpen(true)} size="lg">
                <span className="mr-2">🛎️</span>
                Request Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Service Requests History */}
        <Card>
          <CardHeader>
            <CardTitle>Your Service Requests</CardTitle>
            <CardDescription>
              Track the status of your service requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {serviceRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛎️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No service requests yet</h3>
                <p className="text-gray-600 mb-4">Click "Request Service" to get started</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  Make Your First Request
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{getRequestTypeIcon(request.requestType)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {getRequestTypeLabel(request.requestType)}
                          </h3>
                          {request.description && (
                            <p className="text-gray-700 mt-1">{request.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Requested: {formatDate(request.requestedAt)}</span>
                            {request.completedAt && (
                              <span>Completed: {formatDate(request.completedAt)}</span>
                            )}
                          </div>
                          {request.notes && (
                            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <span className="font-medium">Staff Note:</span> {request.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Available Services</CardTitle>
            <CardDescription>
              Here are the services we can provide for your room
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">💧</span>
                <div>
                  <h4 className="font-medium">Water & Refreshments</h4>
                  <p className="text-sm text-gray-600">Bottled water, beverages, snacks</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🛁</span>
                <div>
                  <h4 className="font-medium">Towels & Linens</h4>
                  <p className="text-sm text-gray-600">Fresh towels, bed linens, bathrobes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🛏️</span>
                <div>
                  <h4 className="font-medium">Pillows & Blankets</h4>
                  <p className="text-sm text-gray-600">Extra pillows, blankets, comforters</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🧹</span>
                <div>
                  <h4 className="font-medium">Room Cleaning</h4>
                  <p className="text-sm text-gray-600">Housekeeping, room tidying</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🔧</span>
                <div>
                  <h4 className="font-medium">Maintenance</h4>
                  <p className="text-sm text-gray-600">Repairs, technical issues</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🍽️</span>
                <div>
                  <h4 className="font-medium">Room Service</h4>
                  <p className="text-sm text-gray-600">Food delivery, dining services</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Request Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Service</DialogTitle>
            <DialogDescription>
              Select the type of service you need for your room
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="requestType">Service Type</Label>
              <Select
                id="requestType"
                value={formData.requestType}
                onChange={(e) => setFormData({ ...formData, requestType: e.target.value as any })}
              >
                <option value="WATER">💧 Water & Refreshments</option>
                <option value="TOWEL">🛁 Towels & Linens</option>
                <option value="PILLOW">🛏️ Pillows</option>
                <option value="BLANKET">🛌 Blankets</option>
                <option value="CLEANING">🧹 Room Cleaning</option>
                <option value="MAINTENANCE">🔧 Maintenance</option>
                <option value="ROOM_SERVICE">🍽️ Room Service</option>
                <option value="OTHER">❓ Other</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Additional Details (Optional)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Any specific requirements or details..."
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

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

export default function ServiceManagement() {
  const { logout, isAdmin } = useAuth()
  const router = useRouter()
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<ServiceRequest | null>(null)
  const [formData, setFormData] = useState({
    status: 'PENDING' as 'PENDING' | 'COMPLETED',
    notes: '',
  })

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    fetchServiceRequests()
  }, [isAdmin, router])

  const fetchServiceRequests = async () => {
    try {
      const response = await api.get('/services')
      setServiceRequests(response.data)
    } catch (error) {
      console.error('Failed to fetch service requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingRequest) return

    try {
      await api.patch(`/services/${editingRequest.id}`, formData)
      setIsDialogOpen(false)
      setEditingRequest(null)
      resetForm()
      fetchServiceRequests()
    } catch (error) {
      console.error('Failed to update service request:', error)
    }
  }

  const handleEdit = (request: ServiceRequest) => {
    setEditingRequest(request)
    setFormData({
      status: request.status,
      notes: request.notes || '',
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      status: 'PENDING',
      notes: '',
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

  // Group requests by status
  const pendingRequests = serviceRequests.filter(req => req.status === 'PENDING')
  const completedRequests = serviceRequests.filter(req => req.status === 'COMPLETED')

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading service requests...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => logout()} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <div className="h-4 w-4 text-blue-600">🛎️</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{serviceRequests.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <div className="h-4 w-4 text-yellow-600">⏳</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <div className="h-4 w-4 text-green-600">✅</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedRequests.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Requests</h2>
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-gray-500">No pending requests</p>
                </CardContent>
              </Card>
            ) : (
              pendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getRequestTypeIcon(request.requestType)}</div>
                        <div>
                          <h3 className="font-medium text-lg">
                            {request.requestType.replace('_', ' ')}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Room {request.booking.room.roomNumber} • {request.booking.guestName}
                          </p>
                          {request.description && (
                            <p className="text-sm text-gray-700 mt-1">{request.description}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Requested: {formatDate(request.requestedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleEdit(request)}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Completed Requests */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Requests</h2>
          <div className="space-y-4">
            {completedRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-500">No completed requests</p>
                </CardContent>
              </Card>
            ) : (
              completedRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getRequestTypeIcon(request.requestType)}</div>
                        <div>
                          <h3 className="font-medium text-lg">
                            {request.requestType.replace('_', ' ')}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Room {request.booking.room.roomNumber} • {request.booking.guestName}
                          </p>
                          {request.description && (
                            <p className="text-sm text-gray-700 mt-1">{request.description}</p>
                          )}
                          {request.notes && (
                            <p className="text-sm text-gray-700 mt-1">
                              <span className="font-medium">Notes:</span> {request.notes}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Requested: {formatDate(request.requestedAt)} • 
                            Completed: {request.completedAt ? formatDate(request.completedAt) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(request)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Update Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Service Request</DialogTitle>
            <DialogDescription>
              Update the status and add notes for this service request
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any notes about this request..."
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Update Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

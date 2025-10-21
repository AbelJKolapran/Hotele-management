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
import { Room } from '@/types'

export default function RoomManagement() {
  const { logout, isAdmin } = useAuth()
  const router = useRouter()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'STANDARD' as 'STANDARD' | 'DELUXE' | 'SUITE',
    status: 'AVAILABLE' as 'AVAILABLE' | 'OCCUPIED' | 'CLEANING',
    price: '',
    description: '',
  })

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    fetchRooms()
  }, [isAdmin, router])

  const fetchRooms = async () => {
    try {
      const response = await api.get('/rooms')
      setRooms(response.data)
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const roomData = {
        ...formData,
        price: parseFloat(formData.price),
      }

      if (editingRoom) {
        await api.patch(`/rooms/${editingRoom.id}`, roomData)
      } else {
        await api.post('/rooms', roomData)
      }

      setIsDialogOpen(false)
      setEditingRoom(null)
      resetForm()
      fetchRooms()
    } catch (error) {
      console.error('Failed to save room:', error)
    }
  }

  const handleEdit = (room: Room) => {
    setEditingRoom(room)
    setFormData({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      status: room.status,
      price: room.price.toString(),
      description: room.description || '',
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (roomId: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      try {
        await api.delete(`/rooms/${roomId}`)
        fetchRooms()
      } catch (error) {
        console.error('Failed to delete room:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      roomNumber: '',
      roomType: 'STANDARD',
      status: 'AVAILABLE',
      price: '',
      description: '',
    })
  }

  const openCreateDialog = () => {
    setEditingRoom(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800'
      case 'OCCUPIED':
        return 'bg-red-100 text-red-800'
      case 'CLEANING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'STANDARD':
        return 'bg-blue-100 text-blue-800'
      case 'DELUXE':
        return 'bg-purple-100 text-purple-800'
      case 'SUITE':
        return 'bg-gold-100 text-gold-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={openCreateDialog}>
                Add New Room
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Room {room.roomNumber}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(room)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(room.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Type:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(room.roomType)}`}>
                      {room.roomType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Price:</span>
                    <span className="text-sm font-semibold">${room.price}/night</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first room</p>
            <Button onClick={openCreateDialog}>
              Add First Room
            </Button>
          </div>
        )}
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </DialogTitle>
            <DialogDescription>
              {editingRoom ? 'Update room information' : 'Create a new room in the system'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                placeholder="e.g., 101"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Select
                id="roomType"
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value as any })}
              >
                <option value="STANDARD">Standard</option>
                <option value="DELUXE">Deluxe</option>
                <option value="SUITE">Suite</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
                <option value="CLEANING">Cleaning</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per Night ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="100.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Room description..."
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingRoom ? 'Update Room' : 'Create Room'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

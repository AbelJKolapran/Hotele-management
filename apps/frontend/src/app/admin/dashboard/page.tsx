'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'

interface DashboardStats {
  totalRooms: number
  availableRooms: number
  occupiedRooms: number
  cleaningRooms: number
  totalBookings: number
  activeBookings: number
  checkedInBookings: number
  completedBookings: number
  totalRequests: number
  pendingRequests: number
  completedRequests: number
}

export default function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    fetchDashboardStats()
  }, [isAdmin, router])

  const fetchDashboardStats = async () => {
    try {
      const [roomStats, bookingStats, serviceStats] = await Promise.all([
        api.get('/rooms/stats'),
        api.get('/bookings/stats'),
        api.get('/services/stats'),
      ])

      setStats({
        ...roomStats.data,
        ...bookingStats.data,
        ...serviceStats.data,
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.username} ({user?.role})
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
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-2 text-gray-600">Overview of hotel operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Room Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <div className="h-4 w-4 text-blue-600">🏨</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalRooms || 0}</div>
              <p className="text-xs text-muted-foreground">
                Available: {stats?.availableRooms || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
              <div className="h-4 w-4 text-red-600">🚫</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.occupiedRooms || 0}</div>
              <p className="text-xs text-muted-foreground">
                Cleaning: {stats?.cleaningRooms || 0}
              </p>
            </CardContent>
          </Card>

          {/* Booking Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <div className="h-4 w-4 text-green-600">📋</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalBookings || 0}</div>
              <p className="text-xs text-muted-foreground">
                Active: {stats?.activeBookings || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In</CardTitle>
              <div className="h-4 w-4 text-purple-600">✅</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.checkedInBookings || 0}</div>
              <p className="text-xs text-muted-foreground">
                Completed: {stats?.completedBookings || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Service Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Service Requests</CardTitle>
            <CardDescription>Room service request overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats?.pendingRequests || 0}</div>
                <div className="text-sm text-yellow-800">Pending</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats?.completedRequests || 0}</div>
                <div className="text-sm text-green-800">Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats?.totalRequests || 0}</div>
                <div className="text-sm text-blue-800">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => router.push('/admin/rooms')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <div className="text-2xl mb-2">🏨</div>
              <div>Manage Rooms</div>
            </Button>
            <Button 
              onClick={() => router.push('/admin/bookings')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <div className="text-2xl mb-2">📋</div>
              <div>Manage Bookings</div>
            </Button>
            <Button 
              onClick={() => router.push('/admin/services')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <div className="text-2xl mb-2">🛎️</div>
              <div>Service Requests</div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

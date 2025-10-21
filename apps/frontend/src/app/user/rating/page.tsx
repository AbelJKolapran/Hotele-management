'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'

export default function StayRating() {
  const { booking, logout, isUser } = useAuth()
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasRated, setHasRated] = useState(false)

  useEffect(() => {
    if (!isUser) {
      router.push('/user/login')
      return
    }

    checkExistingRating()
  }, [isUser, router])

  const checkExistingRating = async () => {
    try {
      const response = await api.get(`/bookings/${booking?.id}`)
      if (response.data.stayRating) {
        setHasRated(true)
        setRating(response.data.stayRating.rating)
        setFeedback(response.data.stayRating.feedback || '')
      }
    } catch (error) {
      console.error('Failed to check existing rating:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!booking || rating === 0) return

    setIsSubmitting(true)
    try {
      await api.post('/stay-ratings', {
        bookingId: booking.id,
        rating,
        feedback: feedback.trim() || undefined,
      })
      setHasRated(true)
    } catch (error) {
      console.error('Failed to submit rating:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
              <h1 className="text-2xl font-bold text-gray-900">Rate Your Stay</h1>
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
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stay Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Stay Summary</CardTitle>
            <CardDescription>Review your stay details before rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Room</p>
                <p className="text-lg font-semibold">Room {booking.room.roomNumber}</p>
                <p className="text-sm text-gray-600">{booking.room.roomType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Stay Duration</p>
                <p className="text-lg font-semibold">
                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Guest</p>
                <p className="text-lg font-semibold">{booking.guestName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-lg font-semibold">${booking.totalAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {hasRated ? 'Your Rating' : 'Rate Your Stay'}
            </CardTitle>
            <CardDescription>
              {hasRated 
                ? 'Thank you for your feedback! Your rating has been submitted.'
                : 'Help us improve by sharing your experience'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasRated ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">⭐</div>
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  {rating}/5
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                {feedback && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 italic">"{feedback}"</p>
                  </div>
                )}
                <Button
                  onClick={() => router.push('/user/dashboard')}
                  className="mt-6"
                >
                  Back to Dashboard
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating */}
                <div className="space-y-2">
                  <Label>Overall Rating</Label>
                  <div className="flex space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className={`text-4xl transition-colors ${
                          i < rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {rating === 0 && 'Click a star to rate'}
                    {rating === 1 && 'Poor - We need to improve'}
                    {rating === 2 && 'Fair - Below expectations'}
                    {rating === 3 && 'Good - Met expectations'}
                    {rating === 4 && 'Very Good - Exceeded expectations'}
                    {rating === 5 && 'Excellent - Outstanding experience'}
                  </p>
                </div>

                {/* Feedback */}
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback (Optional)</Label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about your experience, what you liked, or how we can improve..."
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/user/dashboard')}
                  >
                    Skip Rating
                  </Button>
                  <Button
                    type="submit"
                    disabled={rating === 0 || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Rating Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Rating Guidelines</CardTitle>
            <CardDescription>Help us understand your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-medium">1 Star - Poor</p>
                  <p className="text-sm text-gray-600">Significant issues that affected your stay</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐⭐</span>
                <div>
                  <p className="font-medium">2 Stars - Fair</p>
                  <p className="text-sm text-gray-600">Below expectations, room for improvement</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐⭐⭐</span>
                <div>
                  <p className="font-medium">3 Stars - Good</p>
                  <p className="text-sm text-gray-600">Met your expectations</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐⭐⭐⭐</span>
                <div>
                  <p className="font-medium">4 Stars - Very Good</p>
                  <p className="text-sm text-gray-600">Exceeded expectations</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                <div>
                  <p className="font-medium">5 Stars - Excellent</p>
                  <p className="text-sm text-gray-600">Outstanding experience, highly recommend</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

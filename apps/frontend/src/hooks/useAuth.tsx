'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { User, Booking, AuthResponse } from '@/types'

interface AuthContextType {
  user: User | null
  booking: Booking | null
  token: string | null
  login: (response: AuthResponse) => void
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  isUser: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [booking, setBooking] = useState<Booking | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = Cookies.get('token')
    const savedUser = Cookies.get('user')
    const savedBooking = Cookies.get('booking')

    if (savedToken) {
      setToken(savedToken)
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking))
    }
  }, [])

  const login = (response: AuthResponse) => {
    const { access_token, user: userData, booking: bookingData } = response
    
    setToken(access_token)
    Cookies.set('token', access_token, { expires: 7 })
    
    if (userData) {
      setUser(userData)
      Cookies.set('user', JSON.stringify(userData), { expires: 7 })
    }
    
    if (bookingData) {
      setBooking(bookingData)
      Cookies.set('booking', JSON.stringify(bookingData), { expires: 7 })
    }
  }

  const logout = () => {
    setUser(null)
    setBooking(null)
    setToken(null)
    Cookies.remove('token')
    Cookies.remove('user')
    Cookies.remove('booking')
  }

  const isAuthenticated = !!token
  const isAdmin = !!user
  const isUser = !!booking

  return (
    <AuthContext.Provider value={{
      user,
      booking,
      token,
      login,
      logout,
      isAuthenticated,
      isAdmin,
      isUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HotelEase</h1>
          <p className="text-gray-600">Hotel Management System</p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/admin/login"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            Admin Login
          </Link>
          
          <Link 
            href="/user/login"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            Guest Login
          </Link>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Choose your role to continue</p>
        </div>
      </div>
    </main>
  )
}
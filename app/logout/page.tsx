'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export default function LogoutConfirmation() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleCancel = () => {
    router.back()
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    // Simulate logout process
    setTimeout(() => {
      setIsLoggingOut(false)
      // In a real application, you would clear the user's session here
      localStorage.setItem('isLoggedIn', 'false')
      router.push('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Logout Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg font-medium">Are you sure you want to logout?</p>
            <div className="flex items-center justify-center text-yellow-600 bg-yellow-50 p-3 rounded-md">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p className="text-sm">Make sure to save any changes before logging out.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}


'use client'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function NavBar() {
  const { logout } = useAuth()

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            href="/"
            className="text-2xl font-bold text-white hover:text-blue-100 transition-colors"
          >
            FRESHTRACK
          </Link>
          <Button 
            variant="ghost"
            onClick={logout}
            className="flex items-center gap-2 text-white hover:text-blue-100 hover:bg-blue-700/50"
          >
            <LogOut className="h-4 w-4" />
            LOG OUT
          </Button>
        </div>
      </div>
    </header>
  )
}

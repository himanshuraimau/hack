import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

interface NavBarProps {
  showLogout?: boolean;
}

export default function NavBar({ showLogout = false }: NavBarProps) {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Freshtrack
            </Link>
          </div>
          {showLogout && (
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={logout}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                LOG OUT
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

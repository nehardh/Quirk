'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogIn, LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <Avatar className="w-8 h-8">
          <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
          <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
          {session.user?.name}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
          className="flex items-center space-x-1"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:block">Sign Out</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <ThemeToggle />
    <Button
      onClick={() => signIn()}
      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign In</span>
    </Button>
    </div>
  )
}
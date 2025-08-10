'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render placeholder to avoid hydration mismatch
    return (
      <div className="w-9 h-9 rounded-md bg-transparent" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-9 h-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-300 rotate-0 hover:rotate-12" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </Button>
  )
}

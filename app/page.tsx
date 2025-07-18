'use client'
import { useState, useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import CompanyCard from '@/components/CompanyCard'
import AuthButton from '@/components/AuthButton'
import { Code, Star, TrendingUp, Search } from 'lucide-react'
import companyData from '@/data/company_questions.json'

interface Question {
  id: string
  title: string
  url: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topics: string[]
}

export default function Home() {
  const [solvedQuestions, setSolvedQuestions] = useState<Record<string, Set<string>>>({})
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('leetcode-tracker-solved')
    if (saved) {
      const parsed = JSON.parse(saved)
      const converted: Record<string, Set<string>> = {}
      Object.keys(parsed).forEach(company => {
        converted[company] = new Set(parsed[company])
      })
      setSolvedQuestions(converted)
    }
  }, [])

  const getCompanyStats = (companyName: string, questions: Question[]) => {
    const solved = solvedQuestions[companyName] || new Set()
    const difficulties = { easy: 0, medium: 0, hard: 0 }

    questions.forEach(q => {
      const difficulty = q.difficulty.toLowerCase() as keyof typeof difficulties
      difficulties[difficulty]++
    })

    return {
      totalQuestions: questions.length,
      solvedQuestions: solved.size,
      difficulty: difficulties
    }
  }

  const filteredCompanies = Object.entries(companyData).filter(([company, questions]) => {
    const search = searchTerm.toLowerCase()
    return (
      company.toLowerCase().includes(search) ||
      (questions as Question[]).some(q => q.title.toLowerCase().includes(search))
    )
  })

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 relative">
      
      {/* Logo Section */}
      <div className="relative w-full sm:w-auto flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <Code className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">CodeTrail</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Track your preparation</p>
        </div>

        {/* Auth + Theme Toggle for Mobile */}
        <div className="absolute top-0 right-0 sm:hidden">
          <AuthButton />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search companies here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/90 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm backdrop-blur-md placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* Auth + Theme Toggle for Desktop */}
      <div className="hidden sm:block">
        <AuthButton />
      </div>
    </div>
  </div>
</header>




        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mb-4">
              Master Technical Round
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Track your progress on LeetCode questions asked by top tech companies. 
              Stay organized and ace your next interview.
            </p>

            <p className="text-md text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              <span className="bg-green-200 text-black px-1 rounded pr-2 mr-1">{'{'}</span>
              <span className="bg-blue-200 text-black px-2 rounded">
                Your progress will be stored locally in your browser. <br className="hidden sm:block" />
                Sign-in is optional and coming soon for syncing across devices. <br className="hidden sm:block" />
                In the mean time, have fun 😊!
              </span>
              <span className="bg-green-200 text-black px-1 rounded pl-2 ml-1">{'}'}</span>
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400 mt-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Company-specific questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Progress tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-blue-500" />
                <span>Difficulty categorization</span>
              </div>
            </div>
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(([companyName, questions]) => {
              const stats = getCompanyStats(companyName, questions as Question[])
              return (
                <CompanyCard
                  key={companyName}
                  name={companyName}
                  {...stats}
                />
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>© 2025 CodeTrail. Built with Next.js and Tailwind CSS.</p>
            </div>
          </div>
        </footer>
      </div>
    </SessionProvider>
  )
}

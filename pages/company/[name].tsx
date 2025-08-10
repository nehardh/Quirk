'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import QuestionCard from '@/components/QuestionCard'
import FilterBar from '@/components/FilterBar'
import ProgressBar from '@/components/ProgressBar'
import AuthButton from '@/components/AuthButton'
import { ArrowLeft, Building2, Trophy, Target, Clock } from 'lucide-react'
import companyData from '@/data/company_questions.json'

interface Question {
  id: string
  title: string
  url: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topics: string[]
}

export default function CompanyPage() {
  const router = useRouter()
  const { name } = router.query
  const companyName = name as string

  const [solvedQuestions, setSolvedQuestions] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const questions: Question[] = companyName
    ? (companyData[companyName.charAt(0).toUpperCase() + companyName.slice(1) as keyof typeof companyData] || []).map(q => ({
        ...q,
        difficulty: q.difficulty as 'Easy' | 'Medium' | 'Hard',
      }))
    : []

  useEffect(() => {
    if (!companyName) return
    const saved = localStorage.getItem('leetcode-tracker-solved')
    if (saved) {
      const parsed = JSON.parse(saved)
      const companyKey = companyName.charAt(0).toUpperCase() + companyName.slice(1)
      if (parsed[companyKey]) {
        setSolvedQuestions(new Set(parsed[companyKey]))
      }
    }
  }, [companyName])

  const toggleQuestion = (questionId: string) => {
    if (!companyName) return
    const newSolved = new Set(solvedQuestions)
    if (newSolved.has(questionId)) {
      newSolved.delete(questionId)
    } else {
      newSolved.add(questionId)
    }
    setSolvedQuestions(newSolved)

    const saved = localStorage.getItem('leetcode-tracker-solved')
    const parsed = saved ? JSON.parse(saved) : {}
    const companyKey = companyName.charAt(0).toUpperCase() + companyName.slice(1)
    parsed[companyKey] = Array.from(newSolved)
    localStorage.setItem('leetcode-tracker-solved', JSON.stringify(parsed))
  }

  const availableTopics = useMemo(() => {
    const topics = new Set<string>()
    questions.forEach(q => q.topics.forEach(topic => topics.add(topic)))
    return Array.from(topics).sort()
  }, [questions])

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty
      const matchesTopic = selectedTopic === 'all' || question.topics.includes(selectedTopic)
      const matchesStatus = selectedStatus === 'all' ||
        (selectedStatus === 'solved' && solvedQuestions.has(question.id)) ||
        (selectedStatus === 'unsolved' && !solvedQuestions.has(question.id))
      return matchesSearch && matchesDifficulty && matchesTopic && matchesStatus
    })
  }, [questions, searchTerm, selectedDifficulty, selectedTopic, selectedStatus, solvedQuestions])

  const stats = useMemo(() => {
    const difficulties = { easy: 0, medium: 0, hard: 0 }
    const solvedDifficulties = { easy: 0, medium: 0, hard: 0 }
    questions.forEach(q => {
      const difficulty = q.difficulty.toLowerCase() as keyof typeof difficulties
      difficulties[difficulty]++
      if (solvedQuestions.has(q.id)) {
        solvedDifficulties[difficulty]++
      }
    })
    return {
      total: questions.length,
      solved: solvedQuestions.size,
      difficulties,
      solvedDifficulties
    }
  }, [questions, solvedQuestions])

  const activeFiltersCount = [selectedDifficulty, selectedTopic, selectedStatus].filter(f => f !== 'all').length

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedDifficulty('all')
    setSelectedTopic('all')
    setSelectedStatus('all')
  }

  if (!companyName || !questions.length) {
    return (
      <SessionProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Company Not Found</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">The company you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      </SessionProvider>
    )
  }

  const displayCompanyName = companyName.charAt(0).toUpperCase() + companyName.slice(1)

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        
        {/* Header */}
        <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center ring-2 ring-blue-300/40 dark:ring-blue-700/40">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">{displayCompanyName}</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{questions.length} Questions</p>
                  </div>
                </div>
              </div>
              <AuthButton />
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressBar current={stats.solved} total={stats.total} />
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-500 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Easy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{stats.solvedDifficulties.easy}/{stats.difficulties.easy}</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-yellow-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Medium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">{stats.solvedDifficulties.medium}/{stats.difficulties.medium}</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-500 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Hard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{stats.solvedDifficulties.hard}/{stats.difficulties.hard}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Bar */}
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            availableTopics={availableTopics}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearFilters}
          />

          {/* Questions List */}
          <div className="mt-8 space-y-4">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                isChecked={solvedQuestions.has(question.id)}
                onToggle={toggleQuestion}
              />
            ))}
            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No questions match your current filters.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}

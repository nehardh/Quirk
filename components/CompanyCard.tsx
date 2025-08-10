'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ProgressBar from './ProgressBar'
import { ArrowRight, Building2 } from 'lucide-react'
import Link from 'next/link'

interface CompanyCardProps {
  name: string
  totalQuestions: number
  solvedQuestions: number
  difficulty: {
    easy: number
    medium: number
    hard: number
  }
}

export default function CompanyCard({
  name,
  totalQuestions,
  solvedQuestions,
  difficulty
}: CompanyCardProps) {
  const getCompanyColor = (company: string) => {
    const colors = {
      Amazon: 'from-orange-500 to-orange-600',
      Google: 'from-blue-500 to-blue-600',
      Microsoft: 'from-green-500 to-green-600',
      Meta: 'from-blue-600 to-blue-700',
      Apple: 'from-gray-700 to-gray-900',
      Netflix: 'from-red-500 to-red-600'
    }
    return colors[company as keyof typeof colors] || 'from-gray-500 to-gray-700'
  }

  const getCompanyIcon = (company: string) => {
    // Replace with actual SVG/logo for production
    return <Building2 className="w-7 h-7 text-white opacity-90" />
  }

  return (
    <Card className="group hover:shadow-lg dark:hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCompanyColor(
                name
              )} flex items-center justify-center shadow-sm`}
            >
              {getCompanyIcon(name)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {name}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {totalQuestions} Questions
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ProgressBar current={solvedQuestions} total={totalQuestions} />

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="text-green-600 dark:text-green-400 border-green-300/50 dark:border-green-800 bg-green-50/70 dark:bg-green-900/20"
          >
            Easy: {difficulty.easy}
          </Badge>
          <Badge
            variant="outline"
            className="text-yellow-600 dark:text-yellow-400 border-yellow-300/50 dark:border-yellow-800 bg-yellow-50/70 dark:bg-yellow-900/20"
          >
            Medium: {difficulty.medium}
          </Badge>
          <Badge
            variant="outline"
            className="text-red-600 dark:text-red-400 border-red-300/50 dark:border-red-800 bg-red-50/70 dark:bg-red-900/20"
          >
            Hard: {difficulty.hard}
          </Badge>
        </div>

        <Link href={`/company/${name.toLowerCase()}`} className="block">
          <Button
            className="w-full group-hover:bg-indigo-600 group-hover:text-white transition-all"
            size="lg"
            variant="secondary"
          >
            <span>View Questions</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

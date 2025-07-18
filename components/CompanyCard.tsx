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

export default function CompanyCard({ name, totalQuestions, solvedQuestions, difficulty }: CompanyCardProps) {
  const getCompanyColor = (company: string) => {
    const colors = {
      'Amazon': 'bg-orange-500',
      'Google': 'bg-blue-500',
      'Microsoft': 'bg-green-500',
      'Meta': 'bg-blue-600',
      'Apple': 'bg-gray-800',
      'Netflix': 'bg-red-500',
    }
    return colors[company as keyof typeof colors] || 'bg-gray-500'
  }

  const getCompanyIcon = (company: string) => {
    // In a real app, you'd use actual company logos
    return <Building2 className="w-8 h-8 text-white" />
  }

  return (
    <Card className="group hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl ${getCompanyColor(name)} flex items-center justify-center`}>
              {getCompanyIcon(name)}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{name}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{totalQuestions} Questions</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProgressBar current={solvedQuestions} total={totalQuestions} />
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            Easy: {difficulty.easy}
          </Badge>
          <Badge variant="outline" className="text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
            Medium: {difficulty.medium}
          </Badge>
          <Badge variant="outline" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            Hard: {difficulty.hard}
          </Badge>
        </div>

        <Link href={`/company/${name.toLowerCase()}`} className="block">
          <Button 
            className="w-full group-hover:bg-primary/90 transition-colors"
            size="lg"
          >
            <span>View Questions</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
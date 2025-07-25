'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, CheckCircle } from 'lucide-react'

interface Question {
  id: string
  title: string
  url: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topics: string[]
}

interface QuestionCardProps {
  question: Question
  isChecked: boolean
  onToggle: (id: string) => void
}

export default function QuestionCard({ question, isChecked, onToggle }: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800'
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
      case 'Hard':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
    }
  }

  return (
    <Card className={`group transition-all duration-200 hover:shadow-md dark:hover:shadow-lg ${
      isChecked 
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => onToggle(question.id)}
              className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-medium leading-snug ${
                isChecked 
                  ? 'text-green-900 dark:text-green-100 line-through' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {question.title}
              </h3>
              {isChecked && (
                <CheckCircle className="w-5 h-5 text-green-600 ml-2 flex-shrink-0" />
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge 
                variant="outline" 
                className={getDifficultyColor(question.difficulty)}
              >
                {question.difficulty}
              </Badge>
              {question.topics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {topic}
                </Badge>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              asChild
              className="group/btn hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 border-gray-200 dark:border-gray-600"
            >
              <a 
                href={question.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1"
              >
                <span>View Problem</span>
                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
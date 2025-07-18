'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-react'

interface FilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedDifficulty: string
  onDifficultyChange: (value: string) => void
  selectedTopic: string
  onTopicChange: (value: string) => void
  selectedStatus: string
  onStatusChange: (value: string) => void
  availableTopics: string[]
  activeFiltersCount: number
  onClearFilters: () => void
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedTopic,
  onTopicChange,
  selectedStatus,
  onStatusChange,
  availableTopics,
  activeFiltersCount,
  onClearFilters
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 space-y-4">
          {/* Search and Toggle */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:block">Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:block">Clear</span>
              </Button>
            )}
          </div>

          {/* Expanded Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
                <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
                <Select value={selectedTopic} onValueChange={onTopicChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {availableTopics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <Select value={selectedStatus} onValueChange={onStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Questions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Questions</SelectItem>
                    <SelectItem value="solved">Solved</SelectItem>
                    <SelectItem value="unsolved">Unsolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
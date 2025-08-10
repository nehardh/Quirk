'use client'

import { useMemo } from 'react'

interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

export default function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  // Decide color dynamically based on completion
  const progressColor = useMemo(() => {
    if (percentage >= 75) return 'from-green-500 to-emerald-500'
    if (percentage >= 40) return 'from-yellow-500 to-amber-500'
    return 'from-red-500 to-pink-500'
  }, [percentage])

  return (
    <div className={`w-full ${className}`}>
      {/* Top Info */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wide">
          {current} / {total} solved
        </span>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-gray-200 dark:bg-gray-700/60 rounded-full h-2 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${progressColor} h-2 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

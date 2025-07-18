'use client'
interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

export default function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {current} / {total} solved
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
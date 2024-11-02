'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <div className="relative">
        <div className={`rounded-full border-4 border-gray-200 ${sizeClasses[size]}`}>
          <div className={`rounded-full border-4 border-black border-t-transparent animate-spin absolute top-[-4px] left-[-4px] ${sizeClasses[size]}`}></div>
        </div>
        <div className="mt-4 text-sm text-gray-500 text-center">加载中...</div>
      </div>
    </div>
  )
} 
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'testimonial' | 'project-grid' | 'blog-list';
}

export default function SkeletonLoader({ className, variant = 'blog-list' }: SkeletonLoaderProps) {
  if (variant === 'testimonial') {
    return (
      <div className={cn("w-full py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900", className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header skeleton */}
          <div className="text-center mb-16 space-y-4">
            <div className="h-12 bg-white/10 rounded-lg w-64 mx-auto animate-pulse" />
            <div className="h-6 bg-white/10 rounded-lg w-96 mx-auto animate-pulse" />
          </div>

          {/* Testimonial card skeleton */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 animate-pulse">
              <div className="space-y-6">
                {/* Quote icon */}
                <div className="h-12 w-12 bg-white/20 rounded-full mx-auto" />
                
                {/* Content lines */}
                <div className="space-y-3">
                  <div className="h-4 bg-white/20 rounded w-full" />
                  <div className="h-4 bg-white/20 rounded w-5/6 mx-auto" />
                  <div className="h-4 bg-white/20 rounded w-4/6 mx-auto" />
                </div>

                {/* Author info */}
                <div className="flex items-center justify-center space-x-4 pt-6">
                  <div className="h-16 w-16 bg-white/20 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded w-32" />
                    <div className="h-3 bg-white/20 rounded w-24" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-5 w-5 bg-white/20 rounded" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation buttons skeleton */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <div className="h-12 w-12 bg-white/10 rounded-full" />
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-2 w-2 bg-white/20 rounded-full" />
                ))}
              </div>
              <div className="h-12 w-12 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'project-grid') {
    return (
      <div className={cn("w-full py-16", className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header skeleton */}
          <div className="text-center mb-16 space-y-4 opacity-0 invisible">
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg w-[32rem] mx-auto animate-pulse" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 opacity-0 invisible animate-pulse"
                style={{ minHeight: '400px' }}
              >
                {/* Image skeleton */}
                <div className="relative h-64 bg-gray-700/50" />
                
                {/* Content skeleton */}
                <div className="p-6 space-y-4">
                  {/* Category badge */}
                  <div className="h-6 bg-gray-700/50 rounded-full w-24" />
                  
                  {/* Title */}
                  <div className="h-8 bg-gray-700/50 rounded w-full" />
                  
                  {/* Excerpt */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700/50 rounded w-full" />
                    <div className="h-4 bg-gray-700/50 rounded w-5/6" />
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-6 bg-gray-700/50 rounded-full w-16" />
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <div className="h-10 bg-gray-700/50 rounded-lg flex-1" />
                    <div className="h-10 bg-gray-700/50 rounded-lg w-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default: blog-list variant
  return (
    <div className={cn("w-full py-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(12)].map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-md opacity-0 invisible animate-pulse"
              style={{ minHeight: '450px' }}
            >
              {/* Image skeleton */}
              <div className="relative h-56 bg-gray-200" />
              
              {/* Content skeleton */}
              <div className="p-6 space-y-4">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-20" />
                  <div className="h-6 bg-gray-200 rounded-full w-24" />
                </div>
                
                {/* Title */}
                <div className="space-y-2">
                  <div className="h-7 bg-gray-200 rounded w-full" />
                  <div className="h-7 bg-gray-200 rounded w-4/5" />
                </div>
                
                {/* Excerpt */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>

                {/* Author info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                  <div className="h-10 w-10 bg-gray-200 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


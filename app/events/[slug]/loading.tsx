import { Skeleton } from '@/components/ui/skeleton'

export default function EventLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Event Header Skeleton */}
      <div className="mb-8 flex flex-col items-center gap-5">
        <Skeleton className="h-6 w-24 mb-2" /> {/* Badge */}
        <Skeleton className="h-12 w-2/3 mb-2" /> {/* Title */}
        <Skeleton className="h-6 w-1/2 mb-2" /> {/* Summary */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-1 h-3 w-16" />
          </div>
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <Skeleton className="mb-10 aspect-[21/9] w-full rounded-xl" />

      {/* Main Content Skeleton */}
      <div className="mx-auto max-w-3xl">
        {/* Section Navigation Skeleton */}
        <div className="mb-8 flex gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Overview Section Skeleton */}
        <div className="mb-10">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-5/6 mb-2" />
          <Skeleton className="h-5 w-4/6 mb-2" />
          <Skeleton className="h-20 w-full rounded-lg mt-4" /> {/* Alert/Details */}
        </div>

        {/* Key Topics Table Skeleton */}
        <div className="mb-10">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            ))}
          </div>
        </div>

        {/* Speakers Skeleton */}
        <div className="mb-10">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Notes Skeleton */}
        <div className="mb-10">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
} 
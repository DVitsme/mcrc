import { Skeleton } from "@/components/ui/skeleton"

export function UsersTableSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-9 w-[200px]" />
      </div>
      <div className="rounded-md border">
        <div className="h-12 border-b px-4 flex items-center">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between border-b last:border-0">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
import { Skeleton } from '@/components/ui/skeleton';

export default function EventsLoading() {
  return (
    <section className="bg-muted/60 py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="relative mx-auto flex max-w-screen-xl flex-col gap-20 lg:flex-row">
          <header className="top-10 flex h-fit flex-col items-center gap-5 text-center lg:sticky lg:max-w-80 lg:items-start lg:gap-8 lg:text-left">
            <Skeleton className="h-14 w-14 rounded-full mb-2" />
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-6 w-64 mb-2" />
            <Skeleton className="h-1 w-24 mb-2" />
            <div className="flex flex-wrap items-center justify-center gap-2 lg:flex-col lg:items-start lg:gap-2 mt-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </header>
          <div className="grid gap-4 md:grid-cols-2 flex-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="group relative isolate h-80 rounded-lg bg-background overflow-hidden"
              >
                <Skeleton className="absolute inset-0 size-full rounded-lg" />
                <div className="z-10 flex h-full flex-col justify-between p-6 relative">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
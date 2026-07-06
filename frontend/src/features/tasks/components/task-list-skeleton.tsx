import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function TaskListSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className='overflow-hidden shadow-sm'>
          {/* Banner Skeleton */}
          <div className='bg-muted/50 px-6 py-4 flex items-center justify-between border-b border-border/50'>
            <Skeleton className='h-6 w-1/3' />
          </div>
          {/* Body Skeleton */}
          <CardContent className='p-6'>
            <div className='grid grid-cols-[auto_1fr] gap-x-6 gap-y-4'>
              <Skeleton className='h-5 w-5 rounded-full' />
              <Skeleton className='h-4 w-32' />

              <Skeleton className='h-5 w-5 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
              </div>

              <Skeleton className='h-5 w-5 rounded-full' />
              <Skeleton className='h-4 w-64' />
            </div>
            <div className='mt-6 flex items-center justify-end border-t border-border/50 pt-4'>
              <Skeleton className='h-9 w-28' />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

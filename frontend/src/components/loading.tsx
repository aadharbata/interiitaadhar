import { Skeleton } from "@/components/ui/skeleton"

export default function Loading({ items = 1 }: { items?: number }) {
  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="border-none rounded-lg">
          <div className="flex items-center justify-between p-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className="px-4 pb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%] mt-2" />
            <Skeleton className="h-4 w-[75%] mt-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
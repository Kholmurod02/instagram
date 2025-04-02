import { useGetHistoryQuery } from '@/entities/story-homepage/story-homepage'
import History from '@/features/history/history'
import { Skeleton } from '@/shared/ui/skeleton'
import { useState } from 'react'

const HistoryHomepage = () => {
  const {data: stories, error, isLoading} = useGetHistoryQuery(undefined);
  const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null);

  if (isLoading) return (
    <div className="md:py-0 py-3 flex gap-5 shrink-0">
      {[...Array(7)].map((_, index) => (
        <div key={index} className='flex flex-col justify-center items-center'>
          <div className='shrink-0 w-16 h-16 rounded-full p-[1px] border-2 border-transparent'>
            <div className='w-full h-full rounded-full p-[2px]'>
              <Skeleton className="w-full h-full rounded-full" />
            </div>
          </div>
          <Skeleton className="w-12 h-3 mt-1 rounded-full" />
        </div>
      ))}
    </div>
  )
  
  if (error) return <div className='w-full text-center'>Error loading stories</div>;
  if (!stories || stories.length === 0) return <div>No stories available</div>;

  const handleAllStoriesViewed = (userId: string) => {
    const currentIndex = stories.findIndex(s => s.userId === userId);
    if (currentIndex < stories.length - 1) {
      setCurrentUserIndex(currentIndex + 1);
    } else {
      setCurrentUserIndex(null);
    }
  }

  return (
    <div className="md:py-0 py-3 flex gap-5 shrink-0">
      {stories.map((story, index) => (
        <History 
          key={story.userId} 
          story={story}
          isActive={index === currentUserIndex}
          onAllStoriesViewed={() => handleAllStoriesViewed(story.userId)}
        />
      ))}
    </div>
  )
}

export default HistoryHomepage
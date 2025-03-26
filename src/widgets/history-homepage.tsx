import { useGetHistoryQuery } from '@/entities/story-homepage/story-homepage'
import History from '@/features/history/history'
import { Skeleton } from '@/shared/ui/skeleton'

const HistoryHomepage = () => {
	
	const {data: stories, error, isLoading} = useGetHistoryQuery(undefined);

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
	if (error) return <div>Error loading stories</div>;
	if (!stories || stories.length === 0) return <div>No stories available</div>;

  return (
	<>
		 <div className="md:py-0 py-3 flex gap-5 shrink-0">
			{
				stories.map((story) => (
					<History key={story.userId} story={story} />	
				))
			}
		</div>
	</>
  )
}

export default HistoryHomepage
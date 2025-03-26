import { useGetHistoryQuery } from '@/entities/story-homepage/story-homepage'
import History from '@/features/history/history'

const HistoryHomepage = () => {
	
	const {data: stories, error, isLoading} = useGetHistoryQuery(undefined);

	if (isLoading) return <div>Loading stories...</div>;
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
import { useGetPostsHomepageQuery } from '@/entities/posts-homepage/post-homepage'
import PostUsersHomepage from '@/features/posts-users-homepage/post-users-homepage'
import { Skeleton } from '@/shared/ui/skeleton'

const PostsHomepage = () => {
	const { data, error, isLoading } = useGetPostsHomepageQuery(undefined)
	if(isLoading) if (isLoading) return (
		<div className='py-3 flex flex-col gap-5'>
		  <div className='flex items-center justify-between'>
			 <div className='flex gap-3 items-center'>
				<div className='shrink-0 w-10 h-10 rounded-full p-[1px] border-2 border-transparent'>
				  <div className='w-full h-full rounded-full p-[2px]'>
					 <Skeleton className='w-full h-full rounded-full' />
				  </div>
				</div>
				<div className='flex flex-col gap-1'>
				  <Skeleton className='w-28 h-4 rounded-full' />
				  <Skeleton className='w-40 h-3 rounded-full' />
				</div>
			 </div>
			 <Skeleton className='w-6 h-6 rounded-full' />
		  </div>
	 
		  <div className='flex items-center justify-center'>
			 <Skeleton className='w-full h-64 rounded-lg my-3' />
		  </div>
	 
		  <div className='flex items-center justify-between'>
			 <div className='flex gap-3'>
				{[...Array(3)].map((_, i) => (
				  <Skeleton key={i} className='w-6 h-6 rounded-full' />
				))}
			 </div>
			 <Skeleton className='w-6 h-6 rounded-full' />
		  </div>
	 
		  <div className='py-2 border-b mb-3 flex flex-col gap-1 border-b-gray-800'>
			 <Skeleton className='w-32 h-3 rounded-full' />
			 <Skeleton className='w-40 h-3 rounded-full' />
			 <Skeleton className='w-20 h-3 rounded-full' />
			 <Skeleton className='w-28 h-3 rounded-full' />
		  </div>
		</div>
	 );
	 
	if(error) return <div>Error loading posts</div>

  return (
	 <div className='md:w-[80%] m-auto md:mt-5'>
		{
			data.data?.map((post) => (
				<PostUsersHomepage key={post.postId} data={post} />
			))
		}
	 </div>
  )
}

export default PostsHomepage
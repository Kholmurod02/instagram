import { useGetUsersHomepageQuery } from '@/entities/users-homepage/users-homepage'
import RecomendedUsers from '@/features/recomended-user-homepage/recomended-users'
import { Skeleton } from '@/shared/ui/skeleton'

const RecomendedUserHomepage = () => {
	const { data, error, isLoading } = useGetUsersHomepageQuery(undefined)

	if (isLoading) return (
		<div className="py-3 text-white">
		  {[...Array(4)].map((_, index) => (
			 <div key={index} className="flex justify-between items-center py-3">
				<div className="flex gap-3 items-center">
				  <div className="w-12 h-12 rounded-full p-[1px] border-2 border-transparent">
					 <div className="w-full h-full rounded-full p-[2px]">
						<Skeleton className="w-full h-full rounded-full" />
					 </div>
				  </div>
				  <div>
					 <Skeleton className="w-24 h-4 mb-1 rounded" />
					 <Skeleton className="w-32 h-3 rounded" />
				  </div>
				</div>
				<Skeleton className="w-16 h-6 rounded" />
			 </div>
		  ))}
		</div>
	 );
	 
	if (error) return <div className='py-5 text-center'>Error loading users</div>
	if (!data || data.length === 0) return <div className='text-center'>No users found</div>

	return (
		<div>
			{data.data.slice(0,5)?.map((user) => (
				<RecomendedUsers key={user.id} data={user} />
			))}
		</div>
	)
}

export default RecomendedUserHomepage

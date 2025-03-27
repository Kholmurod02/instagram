import { useGetUsersHomepageQuery } from '@/entities/users-homepage/users-homepage'
import RecomendedUsers from '@/features/recomended-user-homepage/recomended-users'

const RecomendedUserHomepage = () => {
	const { data, error, isLoading } = useGetUsersHomepageQuery(undefined)
	console.log(data);
	

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error loading users</div>
	if (!data || data.length === 0) return <div>No users found</div>

	return (
		<div>
			{data.data.slice(0,5)?.map((user) => (
				<RecomendedUsers key={user.id} data={user} />
			))}
		</div>
	)
}

export default RecomendedUserHomepage

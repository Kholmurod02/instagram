import { useGetMyProfileQuery } from '@/app/store/profileSlice/profileSlice'
import { Skeleton } from '@/shared/ui/skeleton'

const AboutMe = () => {
	const { data, error, isLoading } = useGetMyProfileQuery(undefined)

	if (isLoading)
		return (
			<div className='flex items-center gap-3 py-3'>
				<Skeleton className='w-12 h-12 rounded-full' />
				<div>
					<Skeleton className='w-32 h-5 mb-1' />
					<Skeleton className='w-24 h-4' />
				</div>
			</div>
		)
	if (error)return <div className='py-5 text-center'>Error loading</div>

	const profile = data?.data
	if (!profile) {
		return <h1>No profile data available</h1>
	}

	return (
		<div className='py-3 text-white'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-3 items-center'>
					<div className='w-12 h-12 rounded-full p-[1px] border-2 cursor-pointer border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500'>
						<div className='w-full h-full rounded-full bg-white p-[2px]'>
							<img
								src={`https://instagram-api.softclub.tj/images/${profile.image}`}
								alt='Profile'
								className='w-full h-full object-cover rounded-full'
							/>
						</div>
					</div>
					<div>
						<h2>{profile.userName || 'Unknown User'}</h2>
						<p className='text-gray-300 text-sm'>{data.data?.firstName}</p>
					</div>
				</div>
				<div>
					<button className='text-blue-500 text-sm hover:text-white cursor-pointer'>
						Switch
					</button>
				</div>
			</div>
		</div>
	)
}

export default AboutMe

import { useGetMyProfileQuery, useGetMyStoriesQuery } from '@/app/store/profileSlice/profileSlice'
import { Skeleton } from '@/shared/ui/skeleton'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { StoryModal } from './StoriesModal'

const AboutMe = () => {
	const { data, error, isLoading } = useGetMyProfileQuery(undefined)
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()
	const { data: StoryData } = useGetMyStoriesQuery(undefined)

	const handleClick = () => {
		navigate('/profile')
	}

	if (isLoading)
		return (
			<div className='loading-bar-container'>
			<div className='loading-bar'></div>
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
					<div onClick={()=> setOpen(true)} className='w-12 h-12 rounded-full p-[1px] border-2 cursor-pointer border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500'>
						<div className='w-full h-full rounded-full bg-white p-[2px]'>
							<img
								src={`https://instagram-api.softclub.tj/images/${profile.image}`}
								alt='Profile'
								className='w-full h-full object-cover rounded-full'
							/>
						</div>
					</div>
					<div onClick={handleClick} className='cursor-pointer'>
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
			<StoryModal storyData={StoryData} open={open} setOpen={setOpen} />
		</div>
	)
}

export default AboutMe

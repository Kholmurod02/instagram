/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetPostsHomepageQuery } from '@/entities/posts-homepage/post-homepage'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import { useState } from 'react'
import { Link } from 'react-router'

// Define the type for followState
interface FollowState {
	[userId: string]: boolean // Assuming userId is a string and the value is a boolean indicating if the user is followed
}

const UserclickModalHomepage = () => {
	const [open, setOpen] = useState(false)
	const { data, error, isLoading } = useGetPostsHomepageQuery(undefined)
	const [followState, setFollowState] = useState<FollowState>({})

	const handleFollowClick = (userId: string | number) => {
		setFollowState(prev => ({
			...prev,
			[userId]: !prev[userId], // Toggle follow state for the user
		}))
	}

	if (error) return <div>Error loading data</div>
	if (!data || data.length === 0) return <div>No data available</div>
	if (isLoading)
		return (
			<div className='flex justify-center items-center h-full text-white font-semibold'>
				Loading...
			</div>
		)

	return (
		<>
			<div className='flex justify-between'>
				<h2 className='text-gray-300'>Recommended for you</h2>
				<p
					className='hover:text-gray-400 cursor-pointer'
					onClick={() => setOpen(true)}
				>
					All
				</p>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='max-h-[90vh] overflow-hidden'>
					<DialogHeader>
						<DialogTitle>Recommendations</DialogTitle>
					</DialogHeader>
					<div
						className='overflow-y-auto max-h-[calc(90vh-100px)]'
						style={{
							scrollbarWidth: 'none',
							msOverflowStyle: 'none',
						}}
					>
						{data && (
							<ul>
								{data.data.map((user: any) => (
									<li key={user.postId} className='py-3'>
										<div className='flex items-center justify-between gap-2'>
											<div className='flex items-center gap-2'>
												<div className='w-12 h-12 rounded-full p-[1px] border-2 border-transparent cursor-pointer'>
													<div className='w-full h-full rounded-full bg-white p-[2px]'>
														<img
															className='rounded-full w-full h-full object-cover'
															src={`https://instagram-api.softclub.tj/images/${user.userImage}`}
															alt=''
														/>
													</div>
												</div>
												<div>
													<Link to={`/profile/${user.userId}`}>
														<h3>{user.userName}</h3>
														<p className='text-[13px] text-gray-300'>
															{user.fullName}
														</p>
													</Link>
												</div>
											</div>
											<button
												onClick={() => handleFollowClick(user.userId)}
												className={`font-semibold text-sm cursor-pointer transition-colors duration-200 ${
													followState[user.userId]
														? 'text-red-500 hover:text-white'
														: 'text-blue-500 hover:text-white'
												}`}
											>
												{followState[user.userId] ? 'Unfollow' : 'Follow'}
											</button>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default UserclickModalHomepage

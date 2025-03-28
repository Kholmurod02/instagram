import { useGetPostsHomepageQuery } from '@/entities/posts-homepage/post-homepage'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import { useState } from 'react'

const UserclickModalHomepage = () => {
	const [open, setOpen] = useState(false)
	const { data, error, isLoading } = useGetPostsHomepageQuery(undefined)

	if (error)
		return (
			<div></div>
		)
	if (!data || data.length === 0) return <div></div>
	if (isLoading)
		return (
			<div className='flex justify-center items-center h-full text-white font-semibold'>
				Loading...
			</div>
		)

	return (
		<>
			<div className='flex justify-between'>
				<h2 className='text-gray-300'>Recomendate for you</h2>
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
						<DialogTitle>Recomendations</DialogTitle>
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
								{data.data.map(user => (
									<li key={user.id} className='py-3'>
										<div className='flex items-center justify-between gap-2'>
											<div className='flex items-center gap-2'>
												<div className='w-12 h-12 rounded-full p-[1px] border-2 border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500'>
													<div className='w-full h-full rounded-full bg-white p-[2px]'>
														<img
															className='rounded-full w-full h-full object-cover'
															src={`https://instagram-api.softclub.tj/images/${user.avatar}`}
															alt=''
														/>
													</div>
												</div>
												<div>
													<h3>{user.userName}</h3>
													<p className='text-[13px] text-gray-300'>
														{user.fullName}
													</p>
												</div>
											</div>
											<button className='text-blue-500 font-semibold text-sm hover:text-white cursor-pointer'>
												Follow
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

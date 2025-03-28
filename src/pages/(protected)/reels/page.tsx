import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { Skeleton } from '@/shared/ui/skeleton'
import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from 'lucide-react'
import {
	useFollowingMutation,
	useGetReelsQuery,
	useLikeReelMutation,
} from '@/entities/reels/reels'

export default function ReelsPage() {
	const [activeVideo, setActiveVideo] = useState<number | null>(null)
	const videoRefs = useRef<HTMLVideoElement[]>([])
	const { data: reels, error, isLoading } = useGetReelsQuery('')
	const [followUser] = useFollowingMutation()
	const [pausedVideo, setPausedVideo] = useState<number | null>(null)
	const [liked, setLiked] = useState<{ [key: string]: boolean }>({})
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isMuted, setIsMuted] = useState(	)
	const [openedCommentDialog, setOpenedCommentDialog] = useState<number | null>(
		null
	)
	const [likeReel] = useLikeReelMutation()

	useEffect(() => {
		if (isLoading || error) {
			return
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (!reels?.data) return
			if (e.key === 'ArrowDown') {
				setCurrentIndex(prev => Math.min(reels.data.length - 1, prev + 1))
			}
			if (e.key === 'ArrowUp') {
				setCurrentIndex(prev => Math.max(prev - 1, 0))
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [reels?.data, isLoading, error])

	useEffect(() => {
		if (!reels?.data || currentIndex === null) return
		const video = videoRefs.current[currentIndex]

		videoRefs.current.forEach((vid, i) => {
			if (vid && i !== currentIndex) {
				vid.pause()
			}
		})

		if (video) {
			video.scrollIntoView({ behavior: 'smooth', block: 'center' })
			video.play()
			setActiveVideo(currentIndex)
			setPausedVideo(null)
		}
	}, [currentIndex, reels?.data])

	if (isLoading)
		return (
			<div className='flex'>
				<div className='flex ml-[300px] mt-[10px] flex-col m-auto items-center justify-center space-y-3'>
					<Skeleton className=' w-[400px] h-[80vh] rounded-xl' />
					<div className='flex items-center space-x-4'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-[250px]' />
							<Skeleton className='h-4 w-[200px]' />
						</div>
					</div>
				</div>
				<div className='mt-[300px] ml-[20px]'>
					<Skeleton className='h-12 w-12 rounded-full mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[20px]' />
				</div>
			</div>
		)

	const handlePlayPause = (index: number) => {
		const video = videoRefs.current[index]
		if (!video) return

		if (video.paused) {
			videoRefs.current.forEach((vid, i) => {
				if (vid && i !== index) vid.pause()
			})
			video.play()
			setActiveVideo(index)
			setPausedVideo(null)
		} else {
			video.pause()
			setPausedVideo(index)
			setActiveVideo(null)
		}
	}

	const handleLikeClick = (reelId: string) => {
		setLiked(prev => ({ ...prev, [reelId]: !prev[reelId] }))
		likeReel(reelId)
	}

	const toggleMute = () => {
		setIsMuted(prev => !prev)
		videoRefs.current.forEach(video => {
			if (video) video.muted = !isMuted
		})
	}

	return (
		<div className='w-[600px] ml-[50%] m-auto bg-green flex justify-center h-[60vh] items-center absolute top-0 right-[470px]'>
			<Carousel
				opts={{ align: 'start' }}
				orientation='vertical'
				className='ml-[10px] w-[600px] m-auto h-[60vh]'
			>
				<CarouselContent className='mt-1 w-[650px] h-[90vh]'>
					{reels?.data?.map((reel: any, index: any) => (
						<CarouselItem key={index} className='md:basis-1/2'>
							<button
								onClick={toggleMute}
								className='w-10 h-10 relative top-[100px] left-[28rem] z-20 rounded-full bg-black text-white flex items-center justify-center'
							>
								{isMuted ? '🔇' : '🔊'}
							</button>
							<div className='p-1 w-[560px] m-auto flex justify-center z-10'>
								<Card className='text-center bg-transparent z-10 border-none w-[600px] h-[90vh] mt-[10px] flex justify-center items-center'>
									<CardContent className='relative w-full z-10 h-full'>
										<div className='w-full h-full flex justify-center'>
											<div className='flex z-10'>
												<div className='w-full z-10 h-full flex justify-center'>
													<div className='relative z-10'>
														<div className='absolute inset-0 w-[450px] h-[600px] bg-black opacity-40 z-1 rounded-lg blur-lg'></div>

														<video
															ref={el => {
																if (el) videoRefs.current[index] = el
															}}
															autoPlay
															loop
															playsInline
															className='relative w-[500px] h-[700px] cursor-pointer z-1 transition-all duration-300 rounded-lg'
															onClick={() => handlePlayPause(index)}
															muted={
																pausedVideo !== null && pausedVideo !== index
															}
														>
															<source
																src={`https://instagram-api.softclub.tj/images/${reel.images}`}
																type='video/mp4'
																className='w-[100%] h-[100px]'
															/>
															Your browser does not support the video tag.
														</video>
														{pausedVideo === index && (
															<div className='absolute inset-0 flex items-center justify-center z-20 opacity-100 transition-opacity duration-100 ease-in-out'>
																<button
																	onClick={() => handlePlayPause(index)}
																	className='rounded-full transition-transform duration-300 scale-95 hover:scale-105'
																>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		width='50'
																		height='50'
																		viewBox='0 0 24 24'
																		fill='white'
																		stroke='currentColor'
																		strokeWidth='2'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		className='lucide w-20 h-20 text-white opacity-80 p-7 rounded-full bg-black'
																	>
																		<polygon points='6 3 20 12 6 21 6 3' />
																	</svg>
																</button>
															</div>
														)}
														<div className='flex items-center space-x-3 text-white absolute bottom-[-30px] left-[70px] z-30'>
															<img
																src={`https://instagram-api.softclub.tj/images/${reel.userImage}`}
																className='rounded-full w-12 h-12 border-2 border-white'
																alt='User'
															/>
															<div>
																<h1 className='text-lg font-semibold ml-[10px] pr-[20px]'>
																	{reel.userName}
																</h1>
																<h1 className='text-lg font-semibold ml-[10px] pr-[40px]'>
																	{reel.datePublished.split('T')[0].split('Z')}
																</h1>
															</div>
															<button
																onClick={() => followUser(reel.userId)}
																className={`text-sm font-medium text-white px-5 py-3 rounded-md bg-transparent shadow-md border-gray-400 border`}
															>
																{reel.isSubscriber
																	? 'Вы Подписаны'
																	: 'Подписаться'}
															</button>
														</div>
													</div>
												</div>
											</div>
											<div className='absolute bottom-[-40px] z-10 right-5 flex flex-col items-center space-y-4'>
												<div className='flex flex-col items-center'>
													<Heart
														className={`w-6 h-6 ${
															reel.postLike
																? 'text-red-500 fill-amber-700'
																: 'text-white'
														}`}
														onClick={() => handleLikeClick(reel.postId)}
													/>
													<h1>{reel.postLikeCount}</h1>
												</div>
												<div className='flex flex-col items-center'>
													<MessageCircle
														className='w-6 h-6'
														onClick={() => setOpenedCommentDialog(index)}
													/>
													<h1>{reel.commentCount}</h1>
												</div>
												<div className='flex flex-col items-center'>
													<Send className='w-76h-76' />
												</div>
												<div className='flex flex-col items-center'>
													<Bookmark className='w-76h-76' />
												</div>
												<div className='flex flex-col items-center'>
													<Ellipsis className='w-76h-76' />
												</div>
												<div className='bg-violet-600 rounded-full'>
													<img
														src={`https://instagram-api.softclub.tj/images/${reel.userImage}`}
														className='rounded-full w-[40px] h-[42px]'
														alt=''
													/>
												</div>
											</div>
										</div>
									</CardContent>
									<div className='flex flex-col items-center relative z-20 left-[400px]'>
										{openedCommentDialog === index && (
											<div className='absolute bottom-12 right-0 w-[200px] bg-white text-black p-3 rounded shadow-lg z-50'>
												<h2 className='font-semibold mb-2'>
													Напишите комментарий
												</h2>
												<textarea
													className='w-full border p-1 rounded text-sm'
													rows={2}
													placeholder='Ваш комментарий...'
												></textarea>
												<div className='flex justify-end mt-2 space-x-2'>
													<button
														onClick={() => setOpenedCommentDialog(null)}
														className='text-sm px-2 py-1 bg-gray-500 text-white rounded'
													>
														Закрыть
													</button>
													<button
														onClick={() => setOpenedCommentDialog(null)}
														className='text-sm px-2 py-1 bg-blue-500 text-white rounded'
													>
														Отправить
													</button>
												</div>
											</div>
										)}
									</div>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}

import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { Skeleton } from '@/shared/ui/skeleton'
import {
	Bookmark,
	Ellipsis,
	Heart,
	MessageCircle,
	Send,
	Volume2Icon,
	VolumeOff,
	X,
} from 'lucide-react'
import {
	useCommentPostMutation,
	useFollowingMutation,
	useGetReelsQuery,
	useLikeReelMutation,
	useViewMutation,
} from '@/entities/reels/reels'
import { Button } from '@/shared/ui/button-from-homepage'
import { Input } from '@/shared/ui/input'
import { format } from 'date-fns'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'

export default function ReelsPage() {
	const [activeVideo, setActiveVideo] = useState<number | null>(null)
	const videoRefs = useRef<HTMLVideoElement[]>([])
	const { data: reels, error, isLoading } = useGetReelsQuery('')
	const [followUser] = useFollowingMutation()
	const [pausedVideo, setPausedVideo] = useState<number | null>(null)
	const [liked, setLiked] = useState<{ [key: string]: boolean }>({})
	const [currentIndex, setCurrentIndex] = useState(0)
	const [postNameComment, setPostNameComment] = useState<string>('')
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [idx, setIdx] = useState(null)
	const [openedCommentDialog, setOpenedCommentDialog] = useState<number | null>(
		null
	)
	const [viewReels] = useViewMutation()
	const [likeReel] = useLikeReelMutation()
	const [commentAddReel] = useCommentPostMutation()

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
			<div className='flex items-center'>
				<div className='flex ml-[290px] mt-[10px]  flex-col m-auto items-center justify-center space-y-3'>
					<Skeleton className='w-[400px] h-[80vh] rounded-xl' />
					<div className='flex items-center mt-[10px] space-x-4 '>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-[250px]' />
							<Skeleton className='h-4 w-[200px]' />
						</div>
					</div>
				</div>
				<div className='mt-[150px] ml-[20px]'>
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
				if (vid && i !== index) {
					vid.pause()
				}
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
		setIsMuted(prev => {
			const newMuted = !prev
			videoRefs.current.forEach(video => {
				if (video) video.muted = newMuted
			})
			return newMuted
		})
	}

	function postComment() {
		commentAddReel({ postId: idx, comment: postNameComment })
	}

	return (
		<div className='lg:w-[600px] md:w-[400px] ml-[50%]  m-auto bg-green flex justify-center h-[60vh] items-center absolute top-0 right-[-100px] lg:right-[470px]'>
			<Carousel
				opts={{ align: 'start' }}
				orientation='vertical'
				className='ml-[10px] lg:w-[600px] md:w-[400px] m-auto h-[60vh]'
			>
				<CarouselContent className='mt-[45px] w-[650px] h-[90vh]'>
					{reels?.data?.map((reel: any, index: number) => (
						<CarouselItem key={index} className='md:basis-1/2m mt-'>
							<button
								onClick={toggleMute}
								className='w-10 h-10 relative top-[100px] left-[28rem] z-20 rounded-full bg-black text-white flex items-center justify-center'
							>
								{isMuted ? (
									<VolumeOff className='cursor-pointer' />
								) : (
									<Volume2Icon className='cursor-pointer' />
								)}
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
																	{format(
																		new Date(reel.datePublished),
																		'dd MMM yyyy'
																	)}
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
											<div className='absolute bottom-[-40px] z-10 lg:right-5 flex flex-col items-center space-y-4'>
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
														onClick={() => {
															setOpenedCommentDialog(index), setIdx(reel.postId)
														}}
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
														className='rounded-full w-[40px] h-[40px]'
														alt=''
													/>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{openedCommentDialog === currentIndex && (
					<div className='absolute bottom-12 right-[-350px] w-[320px] bg-[#262626] text-white p-4 rounded-xl shadow-lg border border-gray-700 z-50'>
						<div className='flex justify-between items-center border-b border-gray-600 pb-2'>
							<h2 className='font-semibold text-lg'>
								{reels.data[currentIndex]?.comments?.length || 0} Комментариев
							</h2>
							<button
								onClick={() => setOpenedCommentDialog(null)}
								className='text-gray-400 hover:text-white'
							>
								<X />
							</button>
						</div>
						<div
							className='max-h-[300px] overflow-y-scroll overflow-x-hidden space-y-4 mt-2'
							style={{
								scrollbarWidth: 'none',
								msOverflowStyle: 'none',
							}}
						>
							{reels.data[currentIndex]?.comments?.map(
								(comment: any, commentIndex: number) => (
									<div
										key={commentIndex}
										className='flex items-start  space-x-2'
									>
										<img
											src={`https://instagram-api.softclub.tj/images/${comment.userImage}`}
											className='w-10 h-10 rounded-full'
											alt={comment.userName}
										/>
										<div>
											<p className='text-sm'>
												<span className='font-semibold'>
													{comment.userName || 'user123'}
												</span>{' '}
												{comment.comment || 'Какой классный пост! 😊'}
											</p>
											<div className='text-xs text-gray-400 flex items-center space-x-2'>
												<span>
													{comment.dateCommented.split('T')[0].split('Z')}
												</span>
												<button className='text-blue-400'>Ответить</button>
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<Button variant='outline'>...</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogFooter>
														<AlertDialogCancel
															className='text-red-500 w-full block border-red-500 border-[1px] bg-transparent'
														>
															Удалит
														</AlertDialogCancel>
															<AlertDialogCancel>Отменит</AlertDialogCancel>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</div>
										</div>
									</div>
								)
							)}
						</div>
						<div className='flex items-center border-t border-gray-600 mt-3 pt-2'>
							<div className='flex w-full'>
								<Input
									value={postNameComment}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setPostNameComment(e.target.value)
									}
									type='text'
									placeholder='Добавьте комментарий...'
									className='w-full bg-transparent border-white border-[1px] text-white outline-none p-2'
								/>
								<button className='text-gray-400 pl-[10px] hover:text-white'>
									😊
								</button>
							</div>
							<Button
								variant={'secondary'}
								className='text-blue-500 font-semibold ml-2'
								onClick={postComment}
							>
								Отправить
							</Button>
						</div>
					</div>
				)}
			</Carousel>
		</div>
	)
}

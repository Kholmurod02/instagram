import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button-from-homepage'
import { Card, CardContent } from '@/shared/ui/card-from-homepage'
import { ProfileSettingsModal } from '@/widgets/profile-settings-modal'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
	ChevronLeft,
	ChevronRight,
	Send,
	Volume2Icon,
	VolumeXIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Like from '../component/Like'
import Save from '../component/saved'
import ShareModal from '../component/shere'

const PostUsersHomepage = ({ data }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [open, setOpen] = useState(false)
	const [isMuted, setIsMuted] = useState(true)
	const [timeAgo, setTimeAgo] = useState('')
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const totalSlides = data.images.length
	const [likeCount, setLikeCount] = useState(data.postLikeCount)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const updateTimeAgo = () => {
		setTimeAgo(
			formatDistanceToNow(new Date(data.datePublished), {
				addSuffix: true,
				locale: ru,
			})
		)
	}

	const handleLikeChange = (isLiked: boolean, newLikesCount: number) => {
		setLikeCount(newLikesCount)
	}

	useEffect(() => {
		updateTimeAgo()
		const interval = setInterval(updateTimeAgo, 60000)
		return () => clearInterval(interval)
	}, [data.datePublished])

	const nextSlide = () => {
		setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1))
	}

	const prevSlide = () => {
		setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))
	}

	const toggleMute = () => {
		setIsMuted(prev => !prev)
	}

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play()
			} else {
				videoRef.current.pause()
			}
		}
	}

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.muted = isMuted
		}
	}, [isMuted, currentIndex])

	if (!data) return null

	const currentImage = data.images[currentIndex]
	const isVideo = currentImage?.slice(-3).toLowerCase().includes('mp4')

	return (
		<div className='mb-6 max-w-[750px] mx-auto'>
			<div className='flex items-center justify-between'>
				<div className='flex gap-3 items-center'>
					<div className='w-10 h-10 rounded-full p-[1px] border-2 border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500'>
						<div className='w-full h-full rounded-full bg-white p-[2px]'>
							<img
								src={`https://instagram-api.softclub.tj/images/${data.userImage}`}
								alt='Profile'
								className='w-full h-full object-cover rounded-full'
							/>
						</div>
					</div>
					<div>
						<Link to={`/profile/${data.userId}`}>
							<h5 className='text-sm font-bold'>
								{data.userName}{' '}
								<span className='font-normal text-gray-400'>• {timeAgo}</span>
							</h5>
							<p className='text-gray-300 text-[13px]'>{data.content}</p>
						</Link>
					</div>
				</div>
				<ProfileSettingsModal open={open} setOpen={setOpen} />
				<div onClick={() => setOpen(true)}>
					<svg
						aria-label='Дополнительно'
						className='x1lliihq x1n2onr6 x5n08af cursor-pointer'
						fill='currentColor'
						height='24'
						role='img'
						viewBox='0 0 24 24'
						width='24'
					>
						<title>Дополнительно</title>
						<circle cx='12' cy='12' r='1.5'></circle>
						<circle cx='6' cy='12' r='1.5'></circle>
						<circle cx='18' cy='12' r='1.5'></circle>
					</svg>
				</div>
			</div>

			<div className='flex items-center justify-center mt-3'>
				<Card className='relative w-full overflow-hidden rounded-lg border-0 text-white'>
					<CardContent className='p-0'>
						<div className='relative w-full aspect-square'>
							{isVideo ? (
								<div className='relative h-full'>
									<video
										onClick={togglePlayPause}
										ref={videoRef}
										autoPlay
										muted={isMuted}
										loop
										className='w-full h-full object-cover'
									>
										<source
											src={`https://instagram-api.softclub.tj/images/${currentImage}`}
											type='video/mp4'
										/>
									</video>
									<div
										onClick={toggleMute}
										className='absolute bottom-3 right-4 bg-gray-600 rounded-full p-2 hover:bg-gray-600/70 transition'
									>
										{isMuted ? (
											<VolumeXIcon className='h-4 w-4' />
										) : (
											<Volume2Icon className='h-4 w-4' />
										)}
									</div>
								</div>
							) : (
								<img
									className='w-full h-full object-cover'
									src={`https://instagram-api.softclub.tj/images/${currentImage}`}
									alt={`Post content ${currentIndex + 1}`}
								/>
							)}

							{totalSlides > 1 && (
								<>
									<Button
										variant='ghost'
										size='icon'
										className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50'
										onClick={prevSlide}
									>
										<ChevronLeft className='h-6 w-6' />
									</Button>
									<Button
										variant='ghost'
										size='icon'
										className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50'
										onClick={nextSlide}
									>
										<ChevronRight className='h-6 w-6' />
									</Button>
								</>
							)}
						</div>

						{totalSlides > 1 && (
							<div className='flex justify-center gap-1.5 py-3'>
								{Array.from({ length: totalSlides }).map((_, index) => (
									<button
										key={index}
										className={cn(
											'h-1.5 w-1.5 rounded-full transition-all',
											currentIndex === index ? 'bg-white w-2.5' : 'bg-white/40'
										)}
										onClick={() => setCurrentIndex(index)}
									/>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			<div className='flex items-center justify-between mt-3 px-2'>
				<div className='flex gap-3'>
					<Like
						postId={data?.postId}
						initialLiked={false}
						initialLikes={data.postLikeCount}
						onLikeChange={handleLikeChange}
					/>

					<button className='p-1'>
						<svg
							aria-label='Комментировать'
							className='x1lliihq x1n2onr6 x5n08af'
							fill='currentColor'
							height='24'
							role='img'
							viewBox='0 0 24 24'
							width='24'
						>
							<path
								d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
								fill='none'
								stroke='currentColor'
								strokeLinejoin='round'
								strokeWidth='2'
							></path>
						</svg>
					</button>

					<Send className='h-9 w-6' onClick={() => setIsModalOpen(true)} />
					<ShareModal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
					/>
				</div>

				<Save postId={data.id} initialSaved={data.saved} />
			</div>

			<div className='px-2 mt-2'>
				<div className='flex items-center gap-2'>
					<span className='font-semibold text-sm'>
						{likeCount} отметок "Нравится"
					</span>
				</div>

				<div className='mt-1'>
					<span className='font-semibold text-sm'>{data.userName}</span>
					<span className='text-sm ml-2'>{data.content}</span>
				</div>

				<button className='text-gray-400 text-xs mt-1'>
					Посмотреть все комментарии ({data.commentCount})
				</button>
			</div>
		</div>
	)
}

export default PostUsersHomepage

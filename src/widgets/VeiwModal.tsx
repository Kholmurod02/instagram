import Like from '@/features/component/Like'
import { Bookmark, MessageCircle, MoreHorizontal, Send, Volume2Icon, VolumeOff, X } from 'lucide-react'
import { useRef, useState } from 'react'

export default function InstagramModal({
	open,
	setOpen,
	post,
}: {
	open: boolean
	setOpen: (open: boolean) => void
	post: any
}) {
	const [isMuted, setIsMuted] = useState(true)
	const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
	const mutedVideo = () => {
		setIsMuted(!isMuted)
		videoRefs.current.forEach((video) => {
			if (video) video.muted = isMuted
		})
	}

	return (
		<>
			{open && (
				<div
					onClick={(e) => {
						
						if (e.target === e.currentTarget) {
							setOpen(false)
						}
					}}
					className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'
				>
					<button
						onClick={() => setOpen(false)}
						className='absolute top-4 right-4 text-white cursor-pointer'
					>
						<X size={24} />
					</button>

					<div className='flex flex-col md:flex-row w-full max-w-6xl h-[90vh] bg-black'>
						
						<div className='relative flex-1 bg-black flex items-center justify-center min-h-[50vh] md:min-h-full'>
							<div className='w-full h-full flex items-center justify-center'>
								{post?.images?.map((img: string, index: number) =>
									img.toLowerCase().endsWith('.mp4') ? (
										<div key={post.id} className='relative w-[70%] h-[100%] left-[18%]'>
											<video
												key={index}
												autoPlay
												loop
												muted={isMuted}
												ref={(el) => (videoRefs.current[index] = el)}
												className='max-h-full max-w-full object-contain'
											>
												<source 
													src={`https://instagram-api.softclub.tj/images/${img}`}
													type='video/mp4'
												/>
											</video>
											<button onClick={mutedVideo} className='bg-[#202020] absolute rounded-full p-[10px] z-50 right-60 cursor-pointer bottom-0'>
												{isMuted ? (
													<VolumeOff className='text-[#fff]' size={15} />
												) : (
													<Volume2Icon className='text-[#fff]' size={15} />
												)}
											</button>
										</div>
									) : (
										<img
											key={index}
											src={`https://instagram-api.softclub.tj/images/${img}`}
											alt='Пост контент'
											className='max-h-full max-w-full object-contain'
										/>
									)
								)}
							</div>
						</div>

						<div className='flex flex-col w-full md:w-[350px] bg-black text-white border-l border-gray-800'>
							<div className='flex items-center p-4 border-b border-gray-800'>
								<div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]'>
									<div className='w-full h-full rounded-full overflow-hidden'>
										<img
											src={`https://instagram-api.softclub.tj/images/${post.userImage}`}
											alt='Аватар пользователя'
											className='w-full h-full object-cover'
										/>
									</div>
								</div>
								<div className='ml-3 flex-1'>
									<span className='font-semibold'>{post.userName}</span>
									<span className='text-sm text-gray-400 block'>
										Оригинальное аудио
									</span>
								</div>
								<button>
									<MoreHorizontal size={20} />
								</button>
							</div>

							
							<div className='flex-1 overflow-y-auto p-4'>
								<div className='flex'>
									<div className='w-8 h-8 rounded-full overflow-hidden'>
										<img
											src={`https://instagram-api.softclub.tj/images/${post.userImage}`}
											alt='Аватар пользователя'
											className='w-full h-full object-cover'
										/>
									</div>
									<div className='ml-3'>
										<div>
											<span className='font-semibold'>{post.userName}</span>
											<span className='ml-2'>
												{post?.description || 'Описание поста'}
											</span>
										</div>
										<div className='mt-1 text-xs text-gray-400 flex items-center'>
											<span>3 дн.</span>
											<span className='mx-1'>•</span>
											<button className='text-gray-400'>
												Показать перевод
											</button>
										</div>
									</div>
								</div>
							</div>

							
							<div className='border-t border-gray-800 p-4 flex justify-between'>
								<div className='flex space-x-4 cursor-pointer'>
									<Like postId={post.postId} initialLiked={post.liked} initialLikes={post.likes} />
									<button>
										<MessageCircle size={24} />
									</button>
									<button>
										<Send size={24} />
									</button>
								</div>
								<button>
									<Bookmark size={24} />
								</button>
							</div>

							{/* Лайки и дата */}
							<div className='px-4 pb-2 font-semibold'>
								{post.postLikeCount} отметок "Нравится"
							</div>
							<div className='px-4 pb-2 text-xs text-gray-400'>
								3 дней назад
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { Skeleton } from '@/shared/ui/skeleton'
import {
	Bookmark,
	Delete,
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
	useDeleteCommentMutation,
	useFavoRiteMutation,
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
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import Like from '@/features/component/Like'
import { Link } from 'react-router'
import EmojiList from '@/features/component/emoji'

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
	const [idxComment, setIdxComment] = useState<null>(null)
	const [save, setSave] = useState<null | string | number | boolean>()
	const [deletComment] = useDeleteCommentMutation()
	const [viewReels] = useViewMutation()
	const [favorite] = useFavoRiteMutation()
	const [likeReel] = useLikeReelMutation()
	const [commentAddReel] = useCommentPostMutation()
	const [cnt, setCnt] = useState<number>(0)
	const [style, setStyle] = useState(false)
	const [activeId, setActiveId] = useState<boolean | number | string | null>(
		null
	)
	const emojis = [
		'😀',
		'😂',
		'😎',
		'😍',
		'🤔',
		'😜',
		'😇',
		'😢',
		'😡',
		'😏',
		'😊',
		'😆',
		'😅',
		'😳',
		'😱',
		'🥳',
		'🤩',
		'😜',
		'😴',
		'🤯',
		'😈',
		'👻',
		'💀',
		'👹',
		'🧛‍♂️',
		'🧟‍♂️',
		'👀',
		'🦸‍♀️',
		'💪',
		'✌️',
		'🤞',
		'🙏',
		'🦾',
		'🤖',
		'👽',
		'🛸',
		'🚀',
		'🛶',
		'⛷️',
		'🏂',
		'🏌️‍♂️',
		'⛸️',
		'🏇',
		'🚴‍♀️',
		'🚶‍♂️',
		'🤸‍♀️',
		'🏋️‍♂️',
		'🏆',
		'🥇',
		'🥈',
		'🥉',
		'🏅',
		'⚽',
		'🏀',
		'🏈',
		'⚾',
		'🎾',
		'🏐',
		'🏉',
		'🎱',
		'🏓',
		'🏸',
		'🥏',
		'🏒',
		'🏑',
		'🥍',
		'🏹',
		'🎯',
		'🎮',
		'🕹️',
		'🎲',
		'🎰',
		'🎭',
		'🎤',
		'🎧',
		'🎼',
		'🎷',
		'🎺',
		'🎸',
		'🎻',
		'🥁',
		'🎬',
		'📸',
		'📷',
		'📹',
		'📺',
		'📞',
		'📱',
		'📲',
		'💻',
		'🖥️',
		'🖨️',
		'⌨️',
		'🖱️',
		'🖲️',
		'💡',
		'🔦',
		'🏮',
		'🎇',
		'🎆',
		'🧨',
		'🎈',
		'🎉',
		'🎊',
		'🎁',
		'🎗️',
		'🏷️',
		'💌',
		'📨',
		'📩',
		'📪',
		'📫',
		'📬',
		'📯',
		'📜',
		'📃',
		'📄',
		'📰',
		'🗞️',
		'📑',
		'🔖',
		'🏷️',
		'📎',
		'🖇️',
		'📐',
		'📏',
		'📝',
		'✏️',
		'🖊️',
		'🖋️',
		'🖌️',
		'🖍️',
		'🗒️',
		'📓',
		'📔',
		'📕',
		'📖',
		'📗',
		'📘',
		'📙',
		'📚',
		'📒',
		'📃',
		'📄',
		'🗂️',
		'📑',
		'🗃️',
		'🗄️',
		'📦',
		'📬',
		'📥',
		'📤',
		'📪',
		'📫',
		'📬',
		'📧',
		'📨',
		'💼',
		'👜',
		'👝',

		'🍏',
		'🍎',
		'🍐',
		'🍊',
		'🍋',
		'🍌',
		'🍉',
		'🍇',
		'🍓',
		'🍈',
		'🍒',
		'🍑',
		'🍍',
		'🥥',
		'🥝',
		'🍅',
		'🍆',
		'🥒',
		'🌶️',
		'🥬',
		'🥦',
		'🍄',
		'🌰',
		'🥜',
		'🍪',
		'🍩',
		'🍫',
		'🍬',
		'🍭',
		'🍮',
		'🍯',
		'🥧',
		'🍰',
		'🍓',
		'🍪',
		'🍿',
		'🥛',
		'🍹',
		'🍸',
		'🍷',
		'🥂',
		'🍺',
		'🍻',
		'🥃',
		'🍽️',
		'🍴',
		'🥄',
		'🥣',
		'🍚',
		'🍘',
		'🍜',
		'🍲',
		'🍛',
		'🍝',
		'🍠',
		'🥒',
		'🥔',
		'🍠',
		'🥧',
		'🍢',
		'🍙',
		'🥟',
		'🍱',
		'🍛',
		'🍗',
		'🍖',
		'🥩',
		'🍤',
		'🥓',
		'🍕',
		'🌮',
		'🌯',
		'🍔',
		'🍟',
		'🍣',
		'🍤',
		'🥪',
		'🥗',
		'🍛',
		'🍚',
		'🍜',
		'🥠',
		'🍚',
		'🍘',
		'🍡',
		'🍦',
	]
	const [search, setSearch] = useState<string>('')
	const [emoji, setEmoji] = useState<boolean>(false)
	const [sendGet, setSendGet] = useState([
		{
			id: 1,
			name: 'Hasan',
			img: 'data:image/jpeg;base64,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',
		},
		{
			id: 2,
			name: 'Ismoil',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRErfPBqQuKfhGayEFkykjCVNdiXcQqIbJClg&s',
		},
		{
			id: 3,
			name: 'Murod',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpq7QSVppatZIZiJibypczsTu1FDCDw0oSSA&s',
		},
		{
			id: 4,
			name: 'Umar',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSA1JDcahNtIChAZ-Ymf-ejJ_aAjatHUcdGw&s',
		},
		{
			id: 5,
			name: 'Abubakr',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp66Ec7PdpT_U8EEtNmgd2ufCdTjcSdsGchg&s',
		},
		{
			id: 6,
			name: 'Wuayb',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwjGbch-tmbYGlBdUmxsqOF_ybn1-TIPZ9iw&s',
		},
	])
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
					<Skeleton className='h-12 w-12 rounded-full mb-[15px]' />
					<Skeleton className='h-3 w-12  mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[15px]' />
					<Skeleton className='h-3 w-12  mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[15px]' />
					<Skeleton className='h-3 w-12  mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[15px]' />
					<Skeleton className='h-3 w-12  mb-[40px]' />
					<Skeleton className='h-12 w-12 rounded-full mt-[60px]' />
				</div>
			</div>
		)

	console.log(favorite)

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
				<CarouselContent className='mt-[45px] md:w-[650px] w-full h-[90vh]'>
					{reels?.data?.map((reel: any, index: number) => (
						<CarouselItem key={index} className='md:basis-1/2m mt-'>
							<button
								onClick={toggleMute}
								className='w-10 h-10 relative top-[100px] left-[28rem] z-20 rounded-full bg-gray-700 opacity-[0.6] hover:bg-gray-500 text-white flex items-center justify-center'
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
															<div className='absolute inset-0 flex  items-center justify-center z-20 opacity-100 transition-opacity duration-100 ease-in-out'>
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
														<div className='flex items-center space-x-3 text-white absolute bottom-[-50px] left-[70px] z-30'>
															<Link to={`/profile/${reel.userId}`}>
																<img
																	src={`https://instagram-api.softclub.tj/images/${reel.userImage}`}
																	className='rounded-full w-12 h-12 border-2 border-white'
																	alt='User'
																/>
															</Link>
															<div>
																<h1 className='text-lg font-semibold ml-[10px] pr-[20px]'>
																	<Link to={`/profile/${reel.userId}`}>
																		{reel.userName.length > 10
																			? reel.userName.slice(0, 10) + '...'
																			: reel.userName}
																	</Link>
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
														className={`w-6 hover:text-[#ffffff4f] h-6 ${
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
														className='w-6 h-6 hover:text-[#ffffff4f]'
														onClick={() => {
															setOpenedCommentDialog(index),
																setIdxComment(reel.userId),
																setIdx(reel.postId)
														}}
													/>
													<h1>{reel.commentCount}</h1>
												</div>
												<div className='flex flex-col items-center'>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<button>
																<Send className='hover:text-[#ffffff4f]' />
															</button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<div className='flex justify-between text-center items-center'>
																<h1 className='text-center'>Поделиться</h1>
																<AlertDialogCancel className='border-none'>
																	<X />
																</AlertDialogCancel>
															</div>
															<div>
																<Input
																	placeholder='Search'
																	onChange={el => setSearch(el.target.value)}
																/>
																<div
																	className='flex gap-[40px] flex-wrap mt-[30px]  overflow-y-scroll overflow-x-hidden'
																	style={{
																		scrollbarWidth: 'none',
																		msOverflowStyle: 'none',
																	}}
																>
																	{sendGet
																		?.filter(el =>
																			el.name
																				.toLocaleLowerCase()
																				.trim()
																				.includes(
																					search.toLocaleLowerCase().trim()
																				)
																		)
																		.map(el => {
																			return (
																				<div key={el.id} className=''>
																					<div
																						className={`w-[60px] text-center `}
																						onClick={() => {
																							setStyle(prev => !prev),
																								setActiveId(el.id)
																						}}
																					>
																						<img
																							className={`w-15 h-15 flex flex-col items-center justify-center rounded-full ${
																								el.id == activeId && style
																									? 'border-3 border-blue-500 rounded-full '
																									: 'border-none'
																							}`}
																							src={el.img}
																							alt=''
																						/>
																						<h1>{el.name}</h1>
																					</div>
																				</div>
																			)
																		})}
																</div>
															</div>
															{style ? (
																<AlertDialogCancel className='bg-blue-500'>
																	Отправить
																</AlertDialogCancel>
															) : (
																''
															)}
														</AlertDialogContent>
													</AlertDialog>
												</div>
												<div className='flex flex-col items-center'>
													<Bookmark
														className={` hover:text-[#ffffff4f]  ${
															save ? 'text-white fill-amber-50' : ''
														}`}
														onClick={() => {
															setSave(prev => !prev)
															favorite(reel.postId)
														}}
													/>
												</div>
												<div className='flex flex-col items-center'>
													<Ellipsis className='w-76h-76' />
												</div>
												<div className='bg-violet-600 rounded-full'>
													<Link to={`/profile/${reel.userId}`}>
														<img
															src={`https://instagram-api.softclub.tj/images/${reel.userImage}`}
															className='rounded-full w-[40px] h-[40px]'
															alt=''
														/>
													</Link>
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
					<>
						{emoji && (
							<div
								className='p-4 max-w-[200px] h-[250px] ml-[200px] absolute top-[30px] right-[-400px] bg-black/50 z-[100] rounded-md overflow-x-auto overflow-y-auto flex-wrap backdrop-blur-md'
								style={{
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
								}}
							>
								<div className='grid grid-cols-10 gap-10'>
									{emojis.map((emoji, index) => (
										<div key={index} className='text-2xl '>
											<button
												onClick={() =>
													setPostNameComment(postNameComment.concat(emoji))
												}
											>
												{emoji}
											</button>
										</div>
									))}
								</div>
							</div>
						)}
						<div className='absolute bottom-12 right-[-420px] w-[400px] bg-[#262626] text-white p-4 rounded-xl shadow-lg border border-gray-700 z-50'>
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
													{comment.comment || 'Какой классный пост! '}
												</p>
												<div className='text-xs text-gray-400 flex items-center space-x-2'>
													<span>
														{format(
															new Date(comment.dateCommented),
															'dd MMM yyy'
														)}
													</span>
													<button className='text-blue-400'>Ответить</button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button variant='ghost'>...</Button>
														</AlertDialogTrigger>
														<AlertDialogContent className=''>
															<div className='flex flex-wrap '>
																<AlertDialogFooter>
																	<AlertDialogCancel
																		className='text-red-500 w-[200px] flex items-center border-red-500 border-[1px] bg-transparent'
																		onClick={() =>
																			deletComment(comment.postCommentId)
																		}
																	>
																		Удалит <Delete className='mt-[5px]' />
																	</AlertDialogCancel>
																	<AlertDialogCancel className='w-[200px] ml-[35px]'>
																		Отменит
																	</AlertDialogCancel>
																</AlertDialogFooter>
															</div>
														</AlertDialogContent>
													</AlertDialog>
													<Like />
												</div>
											</div>
										</div>
									)
								)}
							</div>

							<div className='flex items-center border-t border-gray-600 mt-3 pt-2'>
								<div className='flex w-full rounded-md items-center bg-transparent border-white border-[1px] p-[5px_10px] text-white outline-none'>
									{
										(reels?.data
											?.filter((value: any) => value.userId == idxComment)
											.map((el: any) => {
												return (
													<div key={el.id}>
														<img
															src={`https://instagram-api.softclub.tj/images/${el.userImage}`}
															className='w-15 h-10 rounded-full'
															alt=''
														/>
													</div>
												)
											}))[0]
									}
									<Input
										value={postNameComment}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setPostNameComment(e.target.value)
										}
										type='text'
										placeholder='Добавьте комментарий...'
										className='text-white  border-none ml-[10px] w-[200px] overflow-x-auto overflow-y-auto focus-visible:ring-0 focus-visible:outline-none'
									/>
									<div></div>

									<button
										className='text-gray-400 pl-[10px] hover:text-white'
										onClick={() => setEmoji(prev => !prev)}
									>
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
					</>
				)}
			</Carousel>
		</div>
	)
}

import Like from '@/features/component/Like'
import Comment from '@/features/component/comment'
import Save from '@/features/component/saved'
import ShareModal from '@/features/component/shere'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from '@/shared/ui/dialog'
import { MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

// @ts-ignore
interface Post {
	id: string
	url: string
	type: 'image' | 'video'
	likes: number
	caption?: string
	createdAt: string
	user?: {
		username: string
		avatarUrl?: string
	}
	comments?: { username: string; text: string }[]
	saved?: boolean
}

export function InstagramDialog({
	children,
	post,
}: {
	children: React.ReactNode
	post: any
}) {
	const [_comment, _setComment] = useState('')

	useEffect(() => {
		const style = document.createElement('style')
		style.innerHTML = `
			::-webkit-scrollbar {
				width: 8px;
			}
			::-webkit-scrollbar-track {
				background: transparent;
			}
			::-webkit-scrollbar-thumb {
				background: rgba(255, 255, 255, 0.2);
				border-radius: 4px;
			}
		`
		document.head.appendChild(style)
		return () => {
			document.head.removeChild(style)
		}
	}, [])

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			{post && (
				<DialogContent
					className='p-0 w-[96.5%] lg:w-[75vw] !max-w-[1200px] gap-0 overflow-hidden'
					style={{ backgroundColor: 'black' }}
				>
					<DialogTitle className='text-white text-lg font-bold px-4 pt-4'>
						Posted by {post.user?.username || 'User'}
					</DialogTitle>

					<div className='grid grid-cols-2 md:grid-cols-2 h-[70vh] lg:h-[90vh]'>
						<div className='flex items-center justify-center bg-black'>
							{post.type === 'video' ? (
								<video
									src={post.url}
									className='object-contain w-full h-[600px]'
									autoPlay
									muted
									loop
								/>
							) : (
								<img
									src={post.url}
									alt='Post'
									className='h-[500px] w-full object-contain'
								/>
							)}
						</div>

						<div
							className='flex flex-col h-full'
							style={{
								overflowY: 'auto',
								scrollbarWidth: 'thin',
								scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
								backgroundColor: 'black',
							}}
						>
							<div className='flex items-center justify-between p-3 border-b'>
								<div className='flex items-center gap-3'>
									<Avatar>
										<div className=''>
											<NavLink to={`/profile/${post.userId}`}>Profile</NavLink>
										</div>
										<AvatarFallback>
											{post.user?.username?.slice(0, 2).toUpperCase() || '??'}
										</AvatarFallback>
									</Avatar>

									<div>
										<div className='font-semibold text-sm'>
											{post.user?.username || ' '}
										</div>
									</div>
								</div>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setIsMoreOptionsOpen(true)}
								>
									<MoreHorizontal className='h-5 w-5' />
								</Button>
								<Dialog
									open={isMoreOptionsOpen}
									onOpenChange={setIsMoreOptionsOpen}
								>
									<DialogContent className='p-0 w-[480px] h-[340px] bg-[#262626] rounded-xl shadow-xl'>
										<div className='flex flex-col text-white text-[20px] font-sans'>
											<button className='text-red-500 py-3 border-b border-[black]-700 hover:bg-gray-800'>
												Report
											</button>
											<button className='py-3 border-b border-[black]-700 hover:bg-[black]-800'>
												Share to...
											</button>
											<button className='py-3 border-b border-[black]-700 hover:bg-[black]-800'>
												Copy link
											</button>
											<button className='py-3 border-b border-[black]-700 hover:bg-[black]-800'>
												Embed
											</button>
											<button className='py-3 border-b border-[black]-700 hover:bg-[black]-800'>
												About this account
											</button>
											<button
												className='py-3 hover:bg-gray-800 rounded-b-xl'
												onClick={() => setIsMoreOptionsOpen(false)}
											>
												Cancel
											</button>
										</div>
									</DialogContent>
								</Dialog>
							</div>

							<div
								className='flex-1 overflow-y-auto p-3 space-y-3'
								style={{
									scrollbarWidth: 'thin',
									scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
									backgroundColor: 'black',
								}}
							>
								<div className='h-[1px] w-full bg-border my-2'></div>

								{post?.comments && post?.comments?.length > 0 ? (
									post?.comments?.map(
										(c: {
											postCommentId: string
											userName: string
											comment: string
											dateCommented: string
											userImage?: string
										}) => (
											<div key={c.postCommentId}>
												<NavLink to={`/profile/${(c as any).userId}`}>

													<CommentItem
														username={c.userName}
														comment={c.comment}
														timeAgo={new Date(c.dateCommented).toLocaleString()}
														avatar={`https://instagram-api.softclub.tj/images/${
															c.userImage || ''
														}`}
													/>
												</NavLink>
											</div>
										)
									)
								) : (
									<p className='text-sm text-muted-foreground'>
										No comments yet.
									</p>
								)}
							</div>

							<div className='p-3 border-t border-b'>
								<div className='flex justify-between '>
									<div className='flex gap-5'>
										{/* <div className=""> */}
										<Like
											postId={post.id}
											initialLiked={false}
											initialLikes={post.likes}
											// size={33}
										/>
										{/* </div> */}

										<MessageCircle className='h-9 w-8' />

										<Send
											className='h-9 w-8'
											onClick={() => setIsModalOpen(true)}
										/>
										<ShareModal
											isOpen={isModalOpen}
											onClose={() => setIsModalOpen(false)}
										/>
									</div>

									<Save postId={post.id} initialSaved={post.saved} />
								</div>
								<div className='mt-2'>
									<p className='text-sm font-semibold'>{post.likes} likes</p>
								</div>
							</div>

							<div className='p-3 flex items-center gap-2'>
								<Comment postId={post.id} initialComments={post.comment} />
							</div>
						</div>
					</div>
				</DialogContent>
			)}
		</Dialog>
	)
}

function CommentItem({
	username = '',
	comment = '',
	timeAgo = '',
	avatar = '',
}: {
	username: string
	comment: string
	timeAgo: string
	avatar?: string
}) {
	return (
		<div className='flex gap-2 items-start'>
			<Avatar>
				<AvatarImage src={avatar || '/placeholder.svg'} alt={username} />
				<AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
			</Avatar>
			<div>
				<p className='text-sm'>
					<span className='font-semibold'>{username}</span> {comment}
				</p>
				<p className='text-xs text-muted-foreground'>{timeAgo}</p>
			</div>
		</div>
	)
}

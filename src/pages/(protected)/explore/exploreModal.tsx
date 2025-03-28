import { useState } from 'react'
import {
	Heart,
	MessageCircle,
	Send,
	Bookmark,
	MoreHorizontal,
	Smile,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog'

import Like from '@/features/component/Like'
import Comment from '@/features/component/comment'

interface Post {
	id: string
	mediaUrl: string
	likesCount: number
	likes: number
	liked: boolean
	commentsCount: number
	caption?: string
	createdAt: string
	user?: {
		username: string
		avatarUrl?: string
	}
}

export function InstagramDialog({
	children,
	post,
}: {
	children: React.ReactNode
	post: Post & { comments?: { username: string; text: string }[] }
}) {
	const [_comment, _setComment] = useState('')
	console.log(post)

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='p-0 w-[75vw] max-w-[1200px] !max-w-[1200px] gap-0 overflow-hidden'>
				<div className='grid grid-cols-1  md:grid-cols-2 h-[90vh] '>
					<div className='bg-black flex items-center justify-center'>
						<br />

						<img
							src={(post as unknown as { url: string }).url}
							alt='Instagram post'
							className='h-full w-full object-contain'
						/>
					</div>

					<div className='flex overflow-y-auto flex-col h-full'>
						<div className='flex items-center justify-between p-3 border-b'>
							<div className='flex items-center gap-3'>
								<Avatar>
									<AvatarImage
										src={`https://instagram-api.softclub.tj/images/${
											(post.user as { avatarUrl: string }).avatarUrl
										}`}
										alt={(post.user as { username: string }).username}
									/>
									<AvatarFallback>
										{post.user
											? post.user.username.slice(0, 2).toUpperCase()
											: '??'}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className='font-semibold text-sm'>
										{post.user ? post.user.username : ' '}
									</div>
								</div>
							</div>
							<Button variant='ghost' size='icon'>
								<MoreHorizontal className='h-5 w-5' />
							</Button>
						</div>

						<div className='flex-1 overflow-y-auto p-3 space-y-3'>
							<div className='h-[1px] w-full bg-border my-2'></div>

							{post.comments && post.comments.length > 0 ? (
								post.comments.map((c, index) => (
									<CommentItem
										key={index}
										username={c.userName}
										comment={c.comment}
										timeAgo='just now'
									/>
								))
							) : (
								<p className='text-sm text-muted-foreground'>
									No comments yet.
								</p>
							)}
						</div>

						<div className='p-3 border-t border-b'>
							<div className='flex justify-between'>
								<div className='flex gap-2'>
									<Like
										postId={post.id}
										initialLiked={post.liked}
										initialLikes={post.likes}
									/>
									<Button
										variant='ghost'
										size='icon'
										className='h-9 w-9 rounded-full'
									>
										<MessageCircle className='h-6 w-6' />
									</Button>
									<Button
										variant='ghost'
										size='icon'
										className='h-9 w-9 rounded-full'
									>
										<Send className='h-6 w-6' />
									</Button>
								</div>
								<Button
									variant='ghost'
									size='icon'
									className='h-9 w-9 rounded-full'
								>
									<Bookmark className='h-6 w-6' />
								</Button>
							</div>
							<div className='mt-2'>
								<p className='text-sm font-semibold'>{post.likesCount} likes</p>

								<p className='text-xs text-muted-foreground'></p>
							</div>
						</div>

						<div className='p-3 flex items-center gap-2'>
							<Button
								variant='ghost'
								size='icon'
								className='h-9 w-9 rounded-full'
							>
								<Smile className='h-6 w-6' />
							</Button>
						

							<Comment  postId ={post.id} initialComments={post.postCommentId}/>
						
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function CommentItem({
	username,
	comment,
	timeAgo,
	avatar,
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

function LikeButton({ initialLikes }: { initialLikes: number }) {
	const [likes, setLikes] = useState(initialLikes)
	const [liked, setLiked] = useState(false)

	return (
		<Button
			variant='ghost'
			size='icon'
			className='h-9 w-9 rounded-full'
			onClick={() => {
				setLiked(!liked)
				setLikes(liked ? likes - 1 : likes + 1)
			}}
		>
			<Heart
				className={`h-6 w-6 ${liked ? 'text-red-500' : 'text-gray-500'}`}
			/>
		</Button>
	)
}

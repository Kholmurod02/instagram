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
import { Input } from '@/shared/ui/input'
import { cn } from '../../../shared/lib/utils'

interface Post {
	id: string
	mediaUrl: string
	likesCount: number
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
	const [comment, setComment] = useState('')
	console.log(post)

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='max-w-5xl p-0 gap-0 overflow-hidden'>
				<div className='grid grid-cols-1 md:grid-cols-2 h-[80vh]'>
					<div className='bg-black flex items-center justify-center'>
						<br />

						<img
							src={`${post.url}`}
							alt='Instagram post'
							className='h-full w-full object-contain'
						/>
					</div>

					<div className='flex flex-col h-full'>
						<div className='flex items-center justify-between p-3 border-b'>
							<div className='flex items-center gap-3'>
								<Avatar>
									<AvatarImage
										src={`https://instagram-api.softclub.tj/images/${post.user.avatarUrl}`}
										alt={post.user.username}
									/>
									<AvatarFallback>
										{post.user.username?.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className='font-semibold text-sm'>
										{post.user.username}
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
									<LikeButton initialLikes={post.postLikeCount} />
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
								<p className='text-sm font-semibold'>
									{post.postLikeCount} likes
								</p>
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
							<Input
								placeholder='Add a comment...'
								className='flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0'
								value={comment}
								onChange={e => setComment(e.target.value)}
							/>
							<Button
								variant='ghost'
								size='sm'
								className={cn(
									'font-semibold',
									comment.length > 0 ? 'text-primary' : 'text-primary/50'
								)}
								disabled={comment.length === 0}
							>
								Post
							</Button>
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


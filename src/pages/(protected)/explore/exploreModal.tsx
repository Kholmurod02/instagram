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
import Save from '@/features/component/saved'
import { DialogTitle } from '@radix-ui/react-dialog'

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
  comments?: { username: string; text: string }[]
  saved?: boolean
}

export function InstagramDialog({
  children,
  post,
}: {
  children: React.ReactNode
  post: Post & { comments?: { username: string; text: string }[] }
}) {
  const [_comment, _setComment] = useState('')
  console.log('Post data:', post)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      {post && (
        <DialogContent className='p-0 w-[75vw] !max-w-[1200px] gap-0 overflow-hidden'>
          <DialogTitle>Просмотр поста</DialogTitle>

          <div className='grid grid-cols-1 md:grid-cols-2 h-[90vh]'>
            <div className='bg-black flex items-center justify-center'>
              {post.mediaType === 'video' ? (
                post.url ? (
                  <video src={post.url} controls className='h-full w-full object-contain' />
                ) : (
                  <p className='text-white'>Ошибка: нет видео</p>
                )
              ) : post.url ? (
                <img src={post.url} alt='Post' className='h-full w-full object-contain' />
              ) : (
                <p className='text-white'>Ошибка: нет изображения</p>
              )}
            </div>

            <div className='flex flex-col h-full overflow-y-auto'>
              <div className='flex items-center justify-between p-3 border-b'>
                <div className='flex items-center gap-3'>
                  <Avatar>
                    <AvatarImage
                      src={post.user?.avatarUrl ? `https://instagram-api.softclub.tj/images/${post.user.avatarUrl}` : '/placeholder.svg'}
                      alt={post.user?.username || '??'}
                    />
                    <AvatarFallback>{post.user?.username?.slice(0, 2).toUpperCase() || '??'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-semibold text-sm'>{post.user?.username || ' '}</div>
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
                    <CommentItem key={index} username={c.username} comment={c.text} timeAgo='just now' />
                  ))
                ) : (
                  <p className='text-sm text-muted-foreground'>No comments yet.</p>
                )}
              </div>

              <div className='p-3 border-t border-b'>
                <div className='flex justify-between'>
                  <div className='flex gap-2'>
                    <Like postId={post.id} initialLiked={post.liked} initialLikes={post.likes} />
                    <Button variant='ghost' size='icon' className='h-9 w-9 rounded-full'>
                      <MessageCircle className='h-6 w-6' />
                    </Button>
                    <Button variant='ghost' size='icon' className='h-9 w-9 rounded-full'>
                      <Send className='h-6 w-6' />
                    </Button>
                  </div>
                  <Button variant='ghost' size='icon' className='h-9 w-9 rounded-full'>
                    <Save postId={post.id} initialSaved={post.saved} />
                  </Button>
                </div>
                <div className='mt-2'>
                  <p className='text-sm font-semibold'>{post.likesCount} likes</p>
                </div>
              </div>

              <div className='p-3 flex items-center gap-2'>
                <Button variant='ghost' size='icon' className='h-9 w-9 rounded-full'>
                  <Smile className='h-6 w-6' />
                </Button>

                <Comment postId={post.id} initialComments={post.comments} />
              </div>
            </div>
          </div>
        </DialogContent>
      )}
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
      <Heart className={`h-6 w-6 ${liked ? 'text-red-500' : 'text-gray-500'}`} />
    </Button>
  )
}

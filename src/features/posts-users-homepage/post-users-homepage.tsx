import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button-from-homepage'
import { Card, CardContent } from '@/shared/ui/card-from-homepage'
import { ProfileSettingsModal } from '@/widgets/profile-settings-modal'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
	ChevronLeft,
	ChevronRight,
	MessageCircle,
	Send,
	Volume2Icon,
	VolumeXIcon
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Like from '../component/Like'
import Save from '../component/saved'
import ShareModal from '../component/shere'
import { InstagramDialogHome } from '@/pages/(protected)/explore/exploreModalHome'

interface PostData {
  postId: string
  userId: string
  userName: string
  userImage: string
  content: string
  datePublished: string
  images: string[]
  postLikeCount: number
  commentCount: number
  saved: boolean
}

const PostUsersHomepage = ({ data }: { data: PostData }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [timeAgo, setTimeAgo] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const totalSlides = data.images.length
  const [likeCount, setLikeCount] = useState(data.postLikeCount)
  const currentImage = data.images[currentIndex]
  const isVideo = currentImage?.toLowerCase().endsWith('.mp4')

  const updateTimeAgo = useCallback(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(data.datePublished), {
        addSuffix: true,
        locale: ru,
      })
    )
  }, [data.datePublished])

  const handleLikeChange = useCallback((isLiked: boolean, newLikesCount: number) => {
    setLikeCount(newLikesCount)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
    }
  }, [])

  useEffect(() => {
    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 60000)
    return () => clearInterval(interval)
  }, [updateTimeAgo])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted, currentIndex])

  if (!data) return null

  return (
    <div className='mb-6 max-w-[750px] mx-auto'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div className='flex gap-3 items-center'>
          <div className='w-10 h-10 rounded-full p-[1px] border-2 border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500'>
            <div className='w-full h-full rounded-full bg-white p-[2px]'>
              <img
                src={`https://instagram-api.softclub.tj/images/${data.userImage}`}
                alt={`${data.userName}'s profile`}
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
        <button 
          onClick={() => setOpen(true)}
          aria-label="More options"
          className="p-1"
        >
          <svg
            aria-hidden="true"
            className='x1lliihq x1n2onr6 x5n08af cursor-pointer'
            fill='currentColor'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <circle cx='12' cy='12' r='1.5'></circle>
            <circle cx='6' cy='12' r='1.5'></circle>
            <circle cx='18' cy='12' r='1.5'></circle>
          </svg>
        </button>
      </div>

      {/* Media Section */}
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
                    aria-label={`Video content from ${data.userName}`}
                  >
                    <source
                      src={`https://instagram-api.softclub.tj/images/${currentImage}`}
                      type='video/mp4'
                    />
                  </video>
                  <button
                    onClick={toggleMute}
                    className='absolute bottom-3 right-4 bg-gray-600 rounded-full p-2 hover:bg-gray-600/70 transition'
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <VolumeXIcon className='h-4 w-4' />
                    ) : (
                      <Volume2Icon className='h-4 w-4' />
                    )}
                  </button>
                </div>
              ) : (
                <img
                  className='w-full h-full object-cover'
                  src={`https://instagram-api.softclub.tj/images/${currentImage}`}
                  alt={`Post content ${currentIndex + 1} from ${data.userName}`}
                />
              )}

              {totalSlides > 1 && (
                <>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50'
                    onClick={prevSlide}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className='h-6 w-6' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50'
                    onClick={nextSlide}
                    aria-label="Next slide"
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
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions Section */}
      <div className='flex items-center justify-between mt-3 px-2'>
        <div className='flex gap-3'>
          <Like
            postId={data.postId}
            initialLiked={false}
            initialLikes={data.postLikeCount}
            onLikeChange={handleLikeChange}
          />

          <InstagramDialogHome post={data}>
            <button className='p-1' aria-label="View comments">
              <MessageCircle className='h-6 w-6' />
            </button>
          </InstagramDialogHome>

          <button 
            className='p-1'
            onClick={() => setIsModalOpen(true)}
            aria-label="Share post"
          >
            <Send className='h-6 w-6' />
          </button>
          
          <ShareModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        <Save postId={data.postId} initialSaved={data.saved} />
      </div>

      {/* Footer Section */}
      <div className='px-2 mt-3'>
        <div className='flex items-center gap-2'>
          <span className='text-sm'>Нравится: {likeCount}</span>	
        </div>

        <div className='mt-1'>
          <span className='font-semibold text-sm'>{data.userName}</span>
          <span className='text-sm ml-2'>{data.content}</span>
        </div>

		  <InstagramDialogHome post={data}>
			<button 
				className='text-gray-400 text-xs mt-1 cursor-pointer'
				aria-label="View all comments"
			>
				Посмотреть все комментарии ({data.commentCount})
			</button>
          </InstagramDialogHome>
       
      </div>
    </div>
  )
}

export default PostUsersHomepage
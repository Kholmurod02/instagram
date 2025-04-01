import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button-from-homepage'
import { Card, CardContent } from '@/shared/ui/card-from-homepage'
import { ProfileSettingsModal } from '@/widgets/profile-settings-modal'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Volume2Icon, VolumeXIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

const PostUsersHomepage = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [timeAgo, setTimeAgo] = useState('')
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const totalSlides = data.images.length

  const updateTimeAgo = () => {
    setTimeAgo(
      formatDistanceToNow(new Date(data.datePublished), {
        addSuffix: true,
        locale: ru,
      })
    )
  }

  useEffect(() => {
    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 60000)
    return () => clearInterval(interval)
  }, [data.datePublished])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
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
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full p-[1px] border-2 border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500">
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <img
                src={`https://instagram-api.softclub.tj/images/${data.userImage}`}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div>
            <Link to={`/profile/${data.userId}`}>
              <h5 className="text-sm font-bold">
                {data.userName}{' '}
                <span className="font-normal text-gray-400">• {timeAgo}</span>
              </h5>
              <p className="text-gray-300 text-[13px]">{data.content}</p>
            </Link>
          </div>
        </div>
        <ProfileSettingsModal open={open} setOpen={setOpen} />
        <div onClick={() => setOpen(true)}>
          <svg
            aria-label="Дополнительно"
            className="x1lliihq x1n2onr6 x5n08af cursor-pointer"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Дополнительно</title>
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-center mt-3">
        <Card className="relative w-full overflow-hidden rounded-lg border-0 text-white">
          <CardContent className="p-0">
            <div className="relative w-full aspect-square">
              {isVideo ? (
                <div className="relative h-full">
                  <video
                    onClick={togglePlayPause}
                    ref={videoRef}
                    autoPlay
                    muted={isMuted}
                    loop
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={`https://instagram-api.softclub.tj/images/${currentImage}`}
                      type="video/mp4"
                    />
                  </video>
                  <div
                    onClick={toggleMute}
                    className="absolute bottom-3 right-4 bg-gray-600 rounded-full p-2 hover:bg-gray-600/70 transition"
                  >
                    {isMuted ? (
                      <VolumeXIcon className="h-4 w-4" />
                    ) : (
                      <Volume2Icon className="h-4 w-4" />
                    )}
                  </div>
                </div>
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={`https://instagram-api.softclub.tj/images/${currentImage}`}
                  alt={`Post content ${currentIndex + 1}`}
                />
              )}

              {totalSlides > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            {totalSlides > 1 && (
              <div className="flex justify-center gap-1.5 py-3">
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

      <div className="flex items-center justify-between mt-3 px-2">
        <div className="flex gap-3">
          <button className="p-1">
            <svg
              aria-label="Нравится"
              className="x1lliihq x1n2onr6 xyb1xck"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          </button>

          <button className="p-1">
            <svg
              aria-label="Комментировать"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>

          <button className="p-1">
            <svg
              aria-label="Поделиться"
              className="x1lliihq x1n2onr6 xyb1xck"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
              ></line>
              <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg>
          </button>
        </div>

        <button className="p-1">
          <svg
            aria-label="Сохранить"
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
        </button>
      </div>

      <div className="px-2 mt-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">
            {data.postLikeCount} отметок "Нравится"
          </span>
        </div>

        <div className="mt-1">
          <span className="font-semibold text-sm">{data.userName}</span>
          <span className="text-sm ml-2">{data.content}</span>
        </div>

        <button className="text-gray-400 text-xs mt-1">
          Посмотреть все комментарии ({data.commentCount})
        </button>
      </div>
    </div>
  )
}

export default PostUsersHomepage
import { Dialog, DialogContent } from '@/shared/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Input } from '@/shared/ui/input'
import {
  Heart,
  Send,
  X,
  Volume2,
  Pause,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Play,
  VolumeOff,
} from 'lucide-react'
import { useRef, useState } from 'react'

interface StoryModalProps {
  open: boolean
  storyData: any
  setOpen: (open: boolean) => void
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface StoryVideo {
  id: number | string
  fileName: string
  postId: null
  createAt: string
  liked: boolean
  likedCount: number
}

export function StoryModal({ storyData, open, setOpen }: StoryModalProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]) // Массив для хранения ссылок на видео
  const [currentIndex, setCurrentIndex] = useState(0) // Состояние для текущего индекса видео
  const [isPlaying, setIsPlaying] = useState<boolean[]>(storyData.data?.stories.map(() => false))
  const [isMuted, setIsMuted] = useState<boolean[]>(storyData.data?.stories.map(() => false))

  // Функция для переключения на следующее видео
  const nextStory = () => {
    if (currentIndex < storyData.data?.stories.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Функция для переключения на предыдущее видео
  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Функция для проигрывания/паузы видео
  const togglePlay = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      const newIsPlaying = [...isPlaying]
      newIsPlaying[index] = !isPlaying[index]
      setIsPlaying(newIsPlaying)

      if (newIsPlaying[index]) {
        video.play()
      } else {
        video.pause()
      }
    }
  }

  // Функция для включения/выключения звука
  const toggleMute = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      const newIsMuted = [...isMuted]
      newIsMuted[index] = !isMuted[index]
      setIsMuted(newIsMuted)
      video.muted = newIsMuted[index]
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-full h-full sm:max-w-full sm:h-full p-0 border-none bg-transparent">
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          {/* Instagram logo */}
          <div className="absolute top-4 left-4 z-50">
            <h1 className="text-[#fff] font-bold text-[25px]">Instagram</h1>
          </div>

          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-50 text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6 cursor-pointer sm:h-8 sm:w-8" />
          </button>

          {/* Story container */}
          <div className="relative w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] h-[70vh] sm:h-[80vh] mx-auto">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-20">
              <div className="h-0.5 bg-gray-500 flex-1 overflow-hidden">
                <div className="h-full bg-white w-[60%]" />
              </div>
            </div>

            {/* Story header */}
            <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-20">
              <div className="flex items-center gap-2">
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-500">
                  <AvatarImage
                    src={`https://instagram-api.softclub.tj/images/${storyData.data?.userImage}`}
                    alt={storyData.data?.userImage}
                  />
                  <AvatarFallback>
                    {storyData.data?.userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <span className="text-xs sm:text-sm font-semibold">{storyData.data?.userName}</span>
                  <span className="text-xs text-gray-300 ml-2">2 hours ago</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                {/* Volume control */}
                <button onClick={() => toggleMute(currentIndex)} className="text-white">
                  {isMuted[currentIndex] ? (
                    <VolumeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
                {/* Play/Pause toggle */}
                <button onClick={() => togglePlay(currentIndex)} className="text-white">
                  {isPlaying[currentIndex] ? (
                    <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
                <button className="text-white">
                  <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Story content */}
            <div className="h-full w-full bg-black rounded-md overflow-hidden">
              {storyData.data?.stories.length > 0 && (
                <video
                  ref={(el) => {videoRefs.current[currentIndex] = el}} 
                  autoPlay
                  key={storyData.data?.stories[currentIndex].id}
                  className="w-full h-full object-contain"
                >
                  <source
                    src={`https://instagram-api.softclub.tj/images/${storyData.data?.stories[currentIndex].fileName}`}
                    type="video/mp4"
                  />
                </video>
              )}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevStory}
              className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1 text-white z-20"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={nextStory}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1 text-white z-20"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Story footer */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center px-4 z-20">
              <Input
                placeholder={`Ответьте ${storyData.data?.userName}...`}
                className="flex-1 bg-transparent border border-gray-500 text-white rounded-full py-1 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm"
              />
              <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-4">
                <button className="text-white">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button className="text-white">
                  <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

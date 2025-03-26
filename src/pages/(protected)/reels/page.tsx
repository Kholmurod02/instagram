import * as React from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from 'lucide-react'
import { useGetReelsQuery, useLikeReelMutation } from '@/entities/reels/reels'

export default function ReelsPage() {
  const [activeVideo, setActiveVideo] = React.useState<number | null>(null)
  const videoRefs = React.useRef<HTMLVideoElement[]>([])
  const { data: reels, error, isLoading } = useGetReelsQuery("")
  const [pausedVideo, setPausedVideo] = React.useState<number | null>(null)
  const [liked, setLiked] = React.useState<{ [key: string]: boolean }>({})

  const [likeReel] = useLikeReelMutation(); 

  if (isLoading) return <h1>Loading</h1>
  
  const handlePlayPause = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    if (video.paused) {
      videoRefs.current.forEach((vid, i) => {
        if (vid && i !== index) vid.pause()
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
    setLiked((prev) => ({ ...prev, [reelId]: !prev[reelId] }))
    likeReel(reelId);
  }

  return (
    <div className='w-[600px] ml-[50%] m-auto bg-green flex justify-center h-[60vh] items-center'>
      <Carousel opts={{ align: 'start' }} orientation='vertical' className='ml-[10px] w-[600px] m-auto h-[60vh]'>
        <CarouselContent className='mt-1 w-[620px] h-[99vh]'>
          {reels?.data?.map((reel: any, index: any) => (
            <CarouselItem key={index} className='md:basis-1/2 '>
              <div className='p-1 w-[560px] m-auto flex justify-center'>
                <Card className='text-center bg-transparent border-none w-[600px] h-[90vh] mt-[10px] mb-[10px] flex justify-center items-center'>
                  <CardContent className='relative w-full h-full'>
                    <div className='w-full h-full flex justify-center'>
                      <div className='flex'>
                        <div className='w-full h-full flex justify-center'>
                          <div className='relative'>
                            <div className='absolute inset-0 w-[450px] h-[600px] bg-black opacity-40 z-1 rounded-lg blur-lg'></div>
                            <video
                              ref={el => {
                                if (el) videoRefs.current[index] = el;
                              }}
                              autoPlay loop playsInline 
                            
                              className='relative w-[500px] h-[700px] cursor-pointer z-1 transition-all duration-300 rounded-lg'
                              onClick={() => handlePlayPause(index)}
                            >
                              <source
                                src={`https://instagram-api.softclub.tj/images/${reel.images}`}
                                type='video/mp4'
                              />
                              Your browser does not support the video tag.
                            </video>
                            {pausedVideo === index && (
                              <div className='absolute inset-0 flex items-center justify-center z-0 duration-300'>
                                <button
                                  onClick={() => handlePlayPause(index)}
                                  className='rounded-full transition-transform duration-300 '
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide w-15 h-15 text-white ml-[23px] bg-black p-[20px] opacity-[0.6]  rounded-full">
                                    <polygon points="6 3 20 12 6 21 6 3" />
                                  </svg>
                                </button>
                              </div>
                            )}
                            <div className='flex items-center space-x-3 text-white absolute bottom-[-10px] left-[70px] z-30'>
                              <img src={"https://instagram-api.softclub.tj/images/" + reel.userImage} className='rounded-full w-12 h-12 border-2 border-white' alt="User" />
                                <h1 className='text-lg font-semibold ml-[10px] pr-[20px]'>{reel.userName}</h1>
                                <button className='text-sm font-medium text-white px-5 py-3 rounded-md bg-blue-500'>Подписаться</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='absolute bottom-[-30px] z-10 right-5 flex flex-col items-center space-y-4'>
                        <div className='flex flex-col items-center'>
                          <Heart
                            className={`w-6 h-6 ${reel.postLike ? "text-red-500 fill-amber-700" : "text-white"}`}
                            onClick={() => handleLikeClick(reel.postId)}
                          />
                          <h1>{reel.postLikeCount}</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                          <MessageCircle className='w-6 h-6' />
                          <h1>{reel.commentCount}</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                          <Send className='w-76h-76' />
                        </div>
                        <div className='flex flex-col items-center'>
                          <Bookmark className='w-76h-76' />
                        </div>
                        <div className='flex flex-col items-center'>
                          <Ellipsis className='w-76h-76' />
                        </div>
                        <div className=' bg-violet-600 rounded-full'>
                          <img src={"https://instagram-api.softclub.tj/images/" + reel.userImage} className='rounded-full w-[40px] h-[42px]' alt="" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

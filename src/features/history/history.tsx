import { StoryModalHomepage } from '@/widgets/story-modal-homepage'
import { useState, useEffect } from 'react'

const History = ({ story, isActive, onAllStoriesViewed }) => {
  const [open, setOpen] = useState(false)
  const hasStories = story?.stories?.length > 0

  // Открываем только при явной активации (клике или автоматическом переходе)
  useEffect(() => {
    if (isActive && hasStories) {
      setOpen(true)
    }
  }, [isActive, hasStories])

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div 
        onClick={handleClick} 
        className={`cursor-pointer shrink-0 w-16 h-16 rounded-full p-[1px] border-2 ${
          hasStories 
            ? 'border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500' 
            : 'border-gray-300'
        }`}
      >
        <div className='w-full h-full rounded-full bg-white p-[2px]'>
          <img
            className='rounded-full w-full h-full object-cover'
            src={`https://instagram-api.softclub.tj/images/${story.userImage}`}
            alt={story.userName}
          />
        </div>
      </div>
      <p className='text-[12px] text-center py-1'>{story.userName}</p>
      
      {hasStories && (
        <StoryModalHomepage
          open={open}
          setOpen={setOpen}
          storyDataHome={story.stories}
          userName={story.userName}
          userImage={story.userImage}
          onAllStoriesViewed={onAllStoriesViewed}
        />
      )}
    </div>
  )
}

export default History
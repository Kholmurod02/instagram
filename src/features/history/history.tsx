import { StoryModalHomepage } from '@/widgets/story-modal-homepage'
import { useState, useEffect } from 'react'

const History = ({ story, isActive, onAllStoriesViewed }) => {
  const [open, setOpen] = useState(false)
  const [isView, setIsView] = useState(false)
  const hasStories = story.stories.length > 0

  useEffect(() => {
    if (isActive && hasStories) {
      setOpen(true)
    }
  }, [isActive, hasStories])

  const handleClick = () => {
    setOpen(true)
    setIsView(true)
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div 
        onClick={handleClick} 
        className={`cursor-pointer shrink-0 w-16 h-16 rounded-full p-[1px] border-2 ${
          hasStories && isView 
            ? 'border-gray-300'
            : 'border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500' 
        }`}
      >
        <div className='w-full h-full rounded-full bg-white p-[2px]'>
          {story.userImage ? (
            <img
              className='rounded-full w-full h-full object-cover'
              src={`https://instagram-api.softclub.tj/images/${story.userImage}`}
              alt={story.userName}
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-600">
                {story.userName.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
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
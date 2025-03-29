import { StoryModal } from '@/widgets/StoriesModal'
import { useState } from 'react'

const History = ({story}) => {
	const [open, setOpen] = useState(false)
	
	return (
		<div className='flex flex-col justify-center items-center'> 
		<div onClick={()=> setOpen(true)} className='shrink-0  w-16 h-16 rounded-full p-[1px] border-2 text-white border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500'>
			<div className='w-full h-full rounded-full bg-white p-[2px]'>
				<img className='rounded-full w-full h-full object-cover' src={`https://instagram-api.softclub.tj/images/${story.userImage}`} alt={story.userName} /> 
			</div>
		</div>
			<p className='text-[12px] text-center py-1'>{story.userName}</p>
			<StoryModal open={open} setOpen={setOpen} storyData={story.stories} />
		</div>
	)
}

export default History

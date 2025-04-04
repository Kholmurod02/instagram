import { Heart, MessageCircle } from 'lucide-react'
import ReelsIcon from '../shared/icons/Reels-icon'

type ReelsDivProps = {
	img: string
	likes: number
	comments: number | string
}
const ReelsDiv3: React.FC<ReelsDivProps> = ({ img, likes, comments }) => {
	return (
		<div className='relative group cursor-pointer overflow-hidden'>
			<aside className='lg:w-[300px] relative h-[150px] lg:h-[300px]'>
				{img.slice(-3).toLowerCase().includes('mp4') ? (
					<div className='relative'>
						<div className='absolute font-bold top-2 z-50 right-2'>
					<ReelsIcon/>
						</div>
					<video
						src=''
						autoPlay
						muted
						className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
					>
						<source src={img} />
					</video>
					</div>
				) : (
					<img
						src={img}
						className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
						alt=''
					/>
				)}
			</aside>

			<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
				<div className='flex gap-[20px] items-center'>
					<div className='flex gap-[10px] items-center'>
						<Heart className='text-[#fff]' size={25} />
						<p className='text-[#fff] font-bold'>{likes}</p>
					</div>
					<div className='flex gap-[10px] items-center'>
						<MessageCircle className='text-[#fff]' size={25} />
						<p className='text-[#fff] font-bold'>{comments}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReelsDiv3

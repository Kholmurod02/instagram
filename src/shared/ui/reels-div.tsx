import { Heart, MessageCircle } from 'lucide-react'

type ReelsDivProps = {
	img: string
	likes : number
	comments : object
}
const ReelsDiv: React.FC<ReelsDivProps> = ({ img , likes , comments }) => {
	return (
		<div className='relative group cursor-pointer overflow-hidden'>
			<aside className='lg:w-[300px] h-[150px] lg:h-[500px]'>
				<img
					src={img}
					className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
					alt=''
				/>
			</aside>

			<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
				<div className='flex gap-[20px] items-center'>
					<div className='flex gap-[10px] items-center'>
						<Heart className='text-[#fff]' size={25} />
						<p className='text-[#fff] font-bold'>{likes}</p>
					</div>
					<div className='flex gap-[10px] items-center'>
						<MessageCircle className='text-[#fff]' size={25} />
						<p className='text-[#fff] font-bold'>{comments.length}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReelsDiv

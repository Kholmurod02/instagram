import { Plus } from 'lucide-react'

const StoryCircle = () => {
	return (
		<div>
			<div className='cursor-pointer'>
				<div className='w-[100px] h-[100px] border-[#4a4a4a] border-2 p-[10px] rounded-full flex items-center justify-center bg-[#121212] text-[#fff] font-bold'>
					<Plus className='text-[#fff] font-bold' size={52} />
				</div>
				<p className='text-[#fff] font-bold text-center py-[5px]'>New</p>
			</div>
		</div>
	)
}

export default StoryCircle

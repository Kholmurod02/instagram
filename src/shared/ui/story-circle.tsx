import { Plus } from 'lucide-react'

const StoryCircle = () => {
	return (
		<div>
			<div className='cursor-pointer'>
				<div className='lg:w-[75px] lg:h-[75px] w-[50px] h-[50px] border-[#4a4a4a] border-2 p-[10px] rounded-full flex items-center justify-center bg-[#121212] text-[#fff] font-bold'>
					<Plus className='text-[#fff] font-bold' size={42} />
				</div>
				<p className='text-[#fff]  lg:font-bold text-center lg:text-[16px] text-[12px] py-[5px]'>New</p>
			</div>
		</div>
	)
}

export default StoryCircle

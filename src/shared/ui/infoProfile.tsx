import { Link } from 'lucide-react'
const InfoProfile = () => {
	return (
		<div>
			<div className=''>
				<p className='text-[#fff] text-[12px] font-bold lg:text-[20px]'>
					daster
				</p>
				<p className='text-[#fff] text-[12px] lg:text-[20px]'>
					My youtube chanel
				</p>
				<div className='flex gap-[10px] items-center'>
					<Link className='text-[gray] ' size={20} />
					<p className='text-blue-500 text-[20px] cursor-pointer'>
						www.example.gmail.com
					</p>
				</div>
			</div>
		</div>
	)
}

export default InfoProfile

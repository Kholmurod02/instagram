import { Link, SettingsIcon } from 'lucide-react'

const HeaderSectionProfile = () => {
	return (
		<div>
			<aside className='flex flex-col gap-[20px]'>
				<div className='flex gap-[10px] items-center'>
					<p className='text-[#fff] text-[20px] '>daster_011_</p>
					<div className='flex gap-[10px] items-center'>
						<button className='px-[10px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
							Edit Profile
						</button>
						<button className='px-[10px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
							View archive
						</button>
						<SettingsIcon className='text-[#fff] cursor-pointer' size={32} />
					</div>
				</div>
				<div className='flex gap-[40px] items-center '>
					<p className='text-[gray] text-[18px]'>
						<span className='text-[#fff]'>12 </span>posts
					</p>
					<p className='text-[gray] text-[18px]'>
						<span className='text-[#fff]'>34 </span>followers
					</p>
					<p className='text-[gray] text-[18px]'>
						<span className='text-[#fff]'>359 </span>following
					</p>
				</div>
				<div className=''>
					<p className='text-[#fff] text-[20px]'>daster</p>
					<p className='text-[#fff] text-[20px]'>My youtube chanel</p>
					<div className='flex gap-[10px] items-center'>
						<Link className='text-[gray] ' size={20} />
						<p className='text-blue-500 text-[20px] cursor-pointer'>
							www.example.gmail.com
						</p>
					</div>
				</div>
			</aside>
		</div>
	)
}
export default HeaderSectionProfile

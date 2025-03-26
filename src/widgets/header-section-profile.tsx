import { Button } from '@/shared/ui/button'
import InfoFollowers from '@/shared/ui/infoFollowers'
import InfoProfile from '@/shared/ui/infoProfile'
import { SettingsIcon } from 'lucide-react'

const HeaderSectionProfile = () => {
	return (
		<div>
			<aside className='flex flex-col gap-[20px]'>
				<div className='flex gap-[10px] items-start lg:items-center flex-col lg:flex-row'>
					<p className='text-[#fff] text-[20px]'>daster_011_</p>
					<div className='flex gap-[10px] items-center'>
						<Button className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
							Edit Profile
						</Button>
						<Button className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
							View archive
						</Button>
						<SettingsIcon
							className='text-[#fff] lg:block hidden cursor-pointer'
							size={32}
						/>
					</div>
				</div>
				<div className='lg:block hidden'>
					<InfoFollowers />
				</div>
				<div className='lg:block hidden'>
					<InfoProfile />
				</div>
			</aside>
		</div>
	)
}
export default HeaderSectionProfile

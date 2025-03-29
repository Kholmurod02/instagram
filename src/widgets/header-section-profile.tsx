import { Button } from '@/shared/ui/button'
import InfoFollowers from '@/shared/ui/infoFollowers'
import InfoProfile from '@/shared/ui/infoProfile'
import { SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { ProfileSettingsModal } from './profile-settings-modal'
import ProfileEditModal from './profile-edit-modal'
// import ProfileEditModal from './profile-edit-modal'
const HeaderSectionProfile = ({
	userName,
	posts,
	followers,
	following,
	firstName,
	about,
}: {
	userName: string
	posts: string
	followers: string
	following: string
	firstName: string
	about: string
}) => {
	const [openS, setOpenS] = useState<boolean>(false)
	const [openE,setOpenE] = useState<boolean>(false)
	return (
		<div>
			<aside className='flex flex-col gap-[20px]'>
				<div className='flex gap-[10px] items-start lg:items-center flex-col lg:flex-row'>
					<p className='text-[#fff]  text-[25px]'>{userName}</p>
					<div className='flex gap-[10px] items-center'>
						<Button onClick={() => setOpenE(true)} className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
							Edit Profile
						</Button>
						<Button className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
							View archive
						</Button>
						<SettingsIcon
							onClick={() => setOpenS(true)}
							className='text-[#fff] lg:block hidden cursor-pointer'
							size={32}
						/>
					</div>
				</div>
				<div className='lg:block hidden'>
					<InfoFollowers
						posts={posts}
						followers={followers}
						following={following}
					/>
				</div>
				<div className='lg:block hidden'>
					<InfoProfile firstName={firstName} about={about} />
				</div>
			</aside>
			<ProfileSettingsModal open={openS} setOpen={setOpenS} />
			<ProfileEditModal openE={openE} setOpenE={setOpenE}/>
		</div>
	)
}
export default HeaderSectionProfile

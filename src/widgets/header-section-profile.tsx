import { Button } from '@/shared/ui/button'
import InfoFollowers from '@/shared/ui/infoFollowers'
import InfoProfile from '@/shared/ui/infoProfile'
import { MoreHorizontal, SettingsIcon, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { ProfileSettingsModal } from './profile-settings-modal'
import ProfileEditModal from './profile-edit-modal'
import {
	useFollowByUserIdMutation,
	useGetProfileByIdQuery,
} from '@/app/store/profileSlice/profileSlice'
import { skipToken } from '@reduxjs/toolkit/query/react'
const HeaderSectionProfile = ({
	userName,
	posts,
	followers,
	following,
	firstName,
	about,
	routId,
}: {
	userName: string
	posts: string
	followers: string
	following: string
	firstName: string
	about: string
	routId: string | undefined
}) => {
	const [openS, setOpenS] = useState<boolean>(false)
	const [openE, setOpenE] = useState<boolean>(false)
	const [FollowByUserId] = useFollowByUserIdMutation()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data, refetch } = useGetProfileByIdQuery(routId ? routId : skipToken)
	async function followingF(routID: string | undefined) {
		if (!routID) {
			console.error('routID is undefined or null')
			return
		}
		try {
			await FollowByUserId(routID)
			refetch()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<aside className='flex flex-col gap-[20px]'>
				<div className='flex gap-[20px] items-start lg:items-center flex-col lg:flex-row'>
					<p className='text-[#fff]  text-[25px]'>{userName}</p>
					{routId ? (
						<div className='flex gap-[20px] items-center'>
							<Button
								onClick={() => followingF(routId)}
								className='px-[30px] py-[5px] bg-blue-500  text-[#fff] rounded-md cursor-pointer'
							>
								Subscribe
							</Button>
							<Button className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
								Send Message
							</Button>
							<Button
								onClick={() => setOpenE(true)}
								className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'
							>
								<UserPlus className='text-[#fff]' size={25} />
							</Button>
							<MoreHorizontal size={25} />
						</div>
					) : (
						<div className='flex gap-[10px] items-center'>
							<Button
								onClick={() => setOpenE(true)}
								className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'
							>
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
					)}
				</div>
				<div className='lg:block hidden'>
					<InfoFollowers
						posts={posts}
						followers={followers}
						following={following}
						routId={routId}
					/>
				</div>
				<div className='lg:block hidden'>
					<InfoProfile firstName={firstName} about={about} />
				</div>
			</aside>
			<ProfileSettingsModal open={openS} setOpen={setOpenS} />
			<ProfileEditModal openE={openE} setOpenE={setOpenE} />
		</div>
	)
}
export default HeaderSectionProfile

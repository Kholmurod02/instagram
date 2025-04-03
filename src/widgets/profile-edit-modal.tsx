import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'
import { Camera, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import {
	useEditProfileMutation,
	useGetMyProfileQuery,
} from '@/app/store/profileSlice/profileSlice'
import ProfilePhotoModal from './profile-photo-modal'
const token = localStorage.getItem('decodeToken')
const decodeToken = token ? JSON.parse(token) : {}
export default function ProfileEditModal({
	openE,
	setOpenE,
}: {
	openE: boolean
	setOpenE: (open: boolean) => void
}) {
	const maxBioLength = 150
	const { data, error, isLoading , refetch } = useGetMyProfileQuery(undefined)
	const [EditProfile] = useEditProfileMutation()
	const [bio, setBio] = useState<string>('')
	// const [select, setSelect] = useState<string>('')
	const [open, setOpen] = useState<boolean>(false)
	useEffect(() => {
		setBio(data?.data?.about)
	}, [data])
	if (error) return <p>Error</p>
	if (isLoading) return <p>Loading...</p>

	async function handleEdit() {
		const updateUser = {
			about: bio,
			gender: 0,
		}
		try {
			await EditProfile(updateUser).unwrap()
			refetch()
			setOpenE(false)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Dialog.Root open={openE} onOpenChange={setOpenE}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0' />
				<Dialog.Content className='fixed w-[80%] right-0 top-0 border-l-2 bg-black text-white flex flex-col h-[100vh] z-50'>
					<header className=' text-center border-b border-gray-800 relative'>
						<h1 className='text-lg font-medium'>Edit Profile</h1>
						<Dialog.Close asChild>
							<X
								className='absolute right-4 top-4 text-white cursor-pointer'
								size={28}
							/>
						</Dialog.Close>
					</header>

					<div className='flex-1 px-4 py-4 max-w-xl mx-auto w-full overflow-y-auto'>
						<div className='space-y-6 w-full'>
							{/* Profile Picture */}
							<div className='bg-gray-900 rounded-md p-3 flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<Avatar className='h-12 w-12 border border-gray-700'>
										<AvatarImage
											src={`https://instagram-api.softclub.tj/images/${data.data?.image}`}
											alt='Profile'
										/>
										<AvatarFallback>
											<Camera className='h-5 w-5 text-gray-400' />
										</AvatarFallback>
									</Avatar>
									<div>
										<p className='font-medium text-sm'>{decodeToken.name}</p>
										<p className='text-gray-400 text-xs'>{decodeToken.name}</p>
									</div>
								</div>
								<Button
									onClick={() => setOpen(true)}
									className='bg-blue-500 cursor-pointer hover:bg-blue-600 text-white text-xs px-3 py-1'
								>
									New Photo
								</Button>
							</div>

							{/* Website */}
							<div className='space-y-2'>
								<Label htmlFor='website' className='text-xs font-medium'>
									Website
								</Label>
								<Input
									id='website'
									defaultValue='www.youtube.com/@user_011'
									className='bg-gray-900 border-gray-700 text-white text-sm py-1'
								/>
							</div>

							{/* Bio */}
							<div className='space-y-2'>
								<Label htmlFor='bio' className='text-xs font-medium'>
									Bio
								</Label>
								<Textarea
									id='bio'
									value={bio}
									onChange={e => setBio(e.target.value)}
									className='bg-gray-900 border-gray-700 text-white text-sm min-h-[60px] max-h-[120px] resize-none'
									maxLength={maxBioLength}
								/>
								<p className='text-xs text-gray-400 text-right'>
									{bio?.length} / {maxBioLength}
								</p>
							</div>

							{/* Gender */}
							<div className='space-y-2'>
								<Label htmlFor='gender' className='text-xs font-medium'>
									Gender
								</Label>
								<Select defaultValue='prefer-not-to-say'>
									<SelectTrigger className='bg-gray-900 border-gray-700 text-white text-sm'>
										<SelectValue placeholder='Prefer not to say' />
									</SelectTrigger>
									<SelectContent className='bg-gray-900 border-gray-700 text-white text-sm'>
										<SelectItem value='male'>Male</SelectItem>
										<SelectItem value='female'>Female</SelectItem>
										<SelectItem value='prefer-not-to-say'>
											Prefer not to say
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Submit Button */}
							<Button
								onClick={handleEdit}
								className='w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm py-2'
							>
								Submit
							</Button>
						</div>
					</div>

					{/* Footer */}
					<footer className='border-t border-gray-800 py-3 px-4 text-center text-xs text-gray-400'>
						<p>© 2025 Instagram from SoftClub</p>
					</footer>
				</Dialog.Content>
			</Dialog.Portal>
			<ProfilePhotoModal open={open} setOpen={setOpen} />
		</Dialog.Root>
	)
}

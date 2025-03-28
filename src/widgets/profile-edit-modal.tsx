import { useState } from 'react'
import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Switch } from '@/shared/ui/switch'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'
import { Camera, X } from 'lucide-react'
import { Dialog } from '@radix-ui/react-dialog'

export default function ProfileEditModal({
	openE,
	setOpenE,
}: {
	openE: boolean
	setOpenE: (open: boolean) => void
}) {
	const [bio, setBio] = useState('My youtube channel')
	const maxBioLength = 150

	return (
		<Dialog open={openE} onOpenChange={setOpenE}>
			<div className='fixed w-[80%] right-0 top-0 border-l-[2px]   bg-black text-white flex flex-col min-h-screen z-[100]'>
				<header className='py-4 text-center border-b border-gray-800'>
					<h1 className='text-xl font-medium'>Edit Profile</h1>
				</header>
					<X
						className='text-[#fff] cursor-pointer'
						size={32}
						onClick={() => setOpenE(false)}
					/>

				<div className='flex-1 overflow-y-scroll px-4 py-6 max-w-2xl mx-auto w-full'>
					<div className='space-y-8 w-full'>
						{/* Profile Picture Section */}
						<div className='bg-gray-900 rounded-lg p-4 flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<Avatar className='h-14 w-14 border border-gray-700'>
									<AvatarImage
										src='/placeholder.svg?height=56&width=56'
										alt='Profile'
									/>
									<AvatarFallback>
										<Camera className='h-6 w-6 text-gray-400' />
									</AvatarFallback>
								</Avatar>
								<div>
									<p className='font-medium'>user_011</p>
									<p className='text-gray-400 text-sm'>username</p>
								</div>
							</div>
							<Button
								variant='primary'
								size='sm'
								className='bg-blue-500 hover:bg-blue-600 text-white'
							>
								New Photo
							</Button>
						</div>

						{/* Website Section */}
						<div className='space-y-2'>
							<Label htmlFor='website' className='text-sm font-medium'>
								Website
							</Label>
							<Input
								id='website'
								defaultValue='www.youtube.com/@user_011'
								className='bg-gray-900 border-gray-700 text-white'
							/>
							<p className='text-xs text-gray-400'>
								Links can only be changed in the mobile version. Switch to the
								Instagram app and tap "Edit Profile".
							</p>
						</div>

						{/* Bio Section */}
						<div className='space-y-2'>
							<Label htmlFor='bio' className='text-sm font-medium'>
								Bio
							</Label>
							<div className='relative'>
								<Textarea
									id='bio'
									value={bio}
									onChange={e => setBio(e.target.value)}
									className='bg-gray-900 border-gray-700 text-white resize-none min-h-[80px]'
									maxLength={maxBioLength}
								/>
								<span className='absolute bottom-2 right-2 text-xs text-gray-400'>
									{bio.length} / {maxBioLength}
								</span>
							</div>
						</div>

						{/* Gender Section */}
						<div className='space-y-2'>
							<Label htmlFor='gender' className='text-sm font-medium'>
								Gender
							</Label>
							<Select defaultValue='prefer-not-to-say'>
								<SelectTrigger className='bg-gray-900 border-gray-700 text-white'>
									<SelectValue placeholder='Prefer not to say' />
								</SelectTrigger>
								<SelectContent className='bg-gray-900 border-gray-700 text-white'>
									<SelectItem value='male'>Male</SelectItem>
									<SelectItem value='female'>Female</SelectItem>
									<SelectItem value='custom'>Custom</SelectItem>
									<SelectItem value='prefer-not-to-say'>
										Prefer not to say
									</SelectItem>
								</SelectContent>
							</Select>
							<p className='text-xs text-gray-400'>
								This information won't be shown on your public profile.
							</p>
						</div>

						{/* Account Recommendations Section */}
						<div className='bg-gray-900 rounded-lg p-4 space-y-4'>
							<div className='flex items-center justify-between'>
								<div>
									<h3 className='font-medium'>
										Show account recommendations on profiles
									</h3>
									<p className='text-xs text-gray-400 mt-1'>
										Choose if people can see similar recommended accounts on
										your profile, and if your account can be recommended on
										other profiles.
									</p>
								</div>
								<Switch />
							</div>
						</div>

						<div className='text-xs text-gray-400'>
							Some information like your name, bio, and links are visible to
							everyone.
							<Link to='#' className='text-blue-400 ml-1'>
								See what profile information is public
							</Link>
						</div>
					</div>
				</div>

				<footer className='mt-auto'>
					<div className='p-4'>
						<Button className='w-full bg-blue-500 hover:bg-blue-600 text-white'>
							Submit
						</Button>
					</div>

					<div className='border-t border-gray-800 py-4 px-4'>
						<div className='flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-400'>
							<Link to='#'>Meta</Link>
							<Link to='#'>About</Link>
							<Link to='#'>Blog</Link>
							<Link to='#'>Jobs</Link>
							<Link to='#'>Help</Link>
							<Link to='#'>API</Link>
							<Link to='#'>Privacy</Link>
							<Link to='#'>Terms</Link>
							<Link to='#'>Locations</Link>
							<Link to='#'>Instagram Lite</Link>
							<Link to='#'>Threads</Link>
						</div>
						<div className='mt-4 text-center text-xs text-gray-400'>
							<p>© 2025 Instagram from Meta</p>
						</div>
					</div>
				</footer>
			</div>
		</Dialog>
	)
}

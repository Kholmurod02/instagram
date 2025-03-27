import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

interface StoryCircleProps {
	imageUrl?: string
	username?: string
	isViewed?: boolean
	onClick?: () => void
}

export default function StoriesCircle({
	imageUrl = '/placeholder.svg?height=100&width=100',
	username = 'user',
	isViewed = false,
	onClick,
}: StoryCircleProps) {
	return (
		<div className='flex flex-col items-center gap-1' onClick={onClick}>
			<div
				className={`rounded-full p-[2px] ${
					isViewed
						? 'bg-gray-300'
						: 'bg-gradient-to-tr from-yellow-400 to-pink-600'
				}`}
			>
				<Avatar className='w-[70px] h-[70px] border-2 border-white cursor-pointer'>
					<AvatarImage src={imageUrl} alt={username} />
					<AvatarFallback>
						{username.substring(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</div>
			<span className='text-[#fff]  lg:font-bold text-center lg:text-[16px] text-[12px]'>
				{username}
			</span>
		</div>
	)
}

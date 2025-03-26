import PostIcon from '@/shared/icons/post-icon'
import ReelsIcon from '@/shared/icons/Reels-icon'
import SavedIcon from '@/shared/icons/saved-icon'
import TaggedIcon from '@/shared/icons/tagged-icon'
import InfoFollowers from '@/shared/ui/infoFollowers'
import InfoProfile from '@/shared/ui/infoProfile'
import ReelsDiv from '@/shared/ui/reels-div'
import StoryCircle from '@/shared/ui/story-circle'
import HeaderSectionProfile from '@/widgets/header-section-profile'
import ReelsContainer from '@/widgets/reels-container'
import StorySection from '@/widgets/section-story'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

export default function ProfileByNamePage() {
	return (
		<div className='lg:ml-[100px] ml-0 overflow-hidden max-w-[900px] w-full py-[50px]'>
			<section className='flex w-[90%] m-auto gap-[20px] lg:gap-[100px] items-center'>
				<Avatar>
					<AvatarImage
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mQ4m3Wa3ejCjc_ou5MpeHrd9Xe-rDg5-7A&s'
						className='lg:w-[200px] w-[100px] h-[100px] lg:h-[200px] rounded-full'
						alt='Profile Image'
					/>
					<AvatarFallback>SC</AvatarFallback>
				</Avatar>
				<HeaderSectionProfile /> 
			</section>
			<div className='lg:hidden w-[90%] m-auto block'>
				<InfoProfile />
			</div>
			<StorySection>
				<StoryCircle />
			</StorySection>
			<div className='lg:hidden block'>
				<InfoFollowers />
			</div>
			<Tabs className='border-t-[1px] border-[gray] py-[10px]'>
				<TabsList className='flex justify-center gap-[50px]'>
					<TabsTrigger 
						value='Tabs1'
						className='flex cursor-pointer gap-[10px] items-center'
					>
						<PostIcon />
						<p className='text-[#fff] lg:block hidden'>Posts</p>
					</TabsTrigger>
					<TabsTrigger
						value='Tabs1'
						className='flex cursor-pointer gap-[10px] items-center'
					>
						<ReelsIcon />
						<p className='text-[#fff] lg:block hidden'>Reels</p>
					</TabsTrigger>
					<TabsTrigger
						value='Tabs1'
						className='flex cursor-pointer gap-[10px] items-center'
					>
						<SavedIcon />
						<p className='text-[#fff] lg:block hidden'>Saved</p>
					</TabsTrigger>
					<TabsTrigger
						value='Tabs1'
						className='flex cursor-pointer gap-[10px] items-center'
					>
						<TaggedIcon />
						<p className='text-[#fff] lg:block hidden'>Tagged</p>
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<ReelsContainer>
				<ReelsDiv img='https://media4.giphy.com/media/8t6ef4FCRAAOgS2EnQ/giphy.gif?cid=6c09b952alimog7hjq2kzudoxrgtqtmmswlg6b3zfwwnh88p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g' />
				<ReelsDiv img='https://media4.giphy.com/media/8t6ef4FCRAAOgS2EnQ/giphy.gif?cid=6c09b952alimog7hjq2kzudoxrgtqtmmswlg6b3zfwwnh88p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g' />
				<ReelsDiv img='https://media4.giphy.com/media/8t6ef4FCRAAOgS2EnQ/giphy.gif?cid=6c09b952alimog7hjq2kzudoxrgtqtmmswlg6b3zfwwnh88p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g' />
			</ReelsContainer>
		</div>
	)
}

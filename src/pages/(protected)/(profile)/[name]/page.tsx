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
import { useGetMyProfileQuery } from '@/app/store/profileSlice/profileSlice'
import { useGetMyPostsQuery } from '@/app/store/profileSlice/profileSlice'

export default function ProfileByNamePage() {
	const {
		data: profileData,
		error: profileError,
		isLoading: profileLoading,
	} = useGetMyProfileQuery(undefined)
	const {
		data: postsData,
		error: postsError,
		isLoading: postsLoading,
	} = useGetMyPostsQuery(undefined)
	if (profileError) return <p className=''>Error</p>
	if (profileLoading) return <p className=''>Loading...</p>
	if (postsError) return <p className=''>Error</p>
	if (postsLoading) return <p className=''>Loading...</p>
	console.log('====================================')
	console.log('====================================')

	// localStorage.setItem(
	// 	'token',
	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5ZjU1YzRmOC1jNDUzLTQzNWQtYmM1My01YTc3ZWYwY2ZkY2QiLCJuYW1lIjoic3RyaW5nIiwiZW1haWwiOiJzdHJpbmciLCJzdWIiOiI1MTU1OTk1Yi1jMTNhLTQ4MWQtOGY3OS04NTAyNDEzOTEyYmEucG5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc0Mjk3MjA3MywiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.rNjERoK0oiCLfyd8Zn2wRUmVOwkJUlfPRB76z4Q5I9E'
	// )
	return (
		<div className='lg:ml-[50px] ml-0 overflow-hidden max-w-[900px] w-full py-[50px]'>
			<section className='flex w-[90%] m-auto gap-[20px] lg:gap-[100px] items-center'>
				<Avatar>
					<AvatarImage
						src={`https://instagram-api.softclub.tj/images/${profileData.data.image}`}
						className='lg:w-[200px] w-[100px] h-[100px] lg:h-[200px] rounded-full'
						alt='Profile Image'
					/>
					<AvatarFallback>SC</AvatarFallback>
				</Avatar>
				<HeaderSectionProfile
					userName={profileData.data?.userName}
					posts={profileData.data?.postCount}
					followers={profileData.data?.subscribersCount}
					following={profileData.data?.subscriptionsCount}
					firstName={profileData.data?.firstName}
					about={profileData.data?.about}
				/>
			</section>
			<div className='lg:hidden w-[90%] m-auto block'>
				<InfoProfile
					firstName={profileData.data?.firstName}
					about={profileData.data?.about}
				/>
			</div>
			<StorySection>
				<StoryCircle />
			</StorySection>
			<div className='lg:hidden block'>
				<InfoFollowers
					posts={profileData.data?.postCount}
					followers={profileData.data?.subscribersCount}
					following={profileData.data?.subscriptionsCount}
				/>
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
				{postsData.map((post : string) => (
					<ReelsDiv
						img={`https://instagram-api.softclub.tj/images/${post.images[0]}`}
					/>
				))}
			</ReelsContainer>
		</div>
	)
}

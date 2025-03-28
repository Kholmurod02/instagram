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
import {
	useGetFavoritePostsQuery,
	useGetMyProfileQuery,
} from '@/app/store/profileSlice/profileSlice'
import { useGetMyPostsQuery } from '@/app/store/profileSlice/profileSlice'
import { useGetMyStoriesQuery } from '@/app/store/profileSlice/profileSlice'
import { useState } from 'react'
import { StoryModal } from '@/widgets/StoriesModal'
import ReelsDiv2 from '@/shared/ui/ReelsDiv2'

export default function ProfileByNamePage() {
	const [isViewed, setIsViewed] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [OpenPosts, setOpenPosts] = useState<boolean>(true)
	const [OpenSave, setOpenSave] = useState<boolean>(false)
	const [OpenReels, setOpenReels] = useState<boolean>(false)
	function clickOpenModal() {
		setIsViewed(true)
		setOpenModal(true)
	}
	function clickOpenPosts() {
		setOpenPosts(true)
		setOpenSave(false)
		setOpenReels(false)
	}
	function clickOpenSaved() {
		setOpenPosts(false)
		setOpenReels(false)
		setOpenSave(true)
	}
	function clickOpenReels() {
		setOpenPosts(false)
		setOpenSave(false)
		setOpenReels(true)
	}
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
	const {
		data: StoryData,
		error: StoryError,
		isLoading: StoryLoading,
	} = useGetMyStoriesQuery(undefined)
	const {
		data: FavoriteData,
		error: FavoriteError,
		isLoading: FavoriteLoading,
	} = useGetFavoritePostsQuery(undefined)

	if (profileError) return <p className=''>Profile Error</p>
	if (profileLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	if (postsError) return <p className=''>Error Posts</p>
	if (postsLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	if (StoryError) return <p className=''>Story Error</p>
	if (StoryLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	if (FavoriteError) return <p className=''>FavoritePosts Error</p>
	if (FavoriteLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	return (
		<div className='lg:ml-[50px] ml-0 overflow-hidden max-w-[900px] m-auto w-full py-[50px]'>
			<section className='flex w-[90%] m-auto gap-[0px] lg:gap-[100px] items-center'>
				<div
					className={`rounded-full lg:w-[200px] lg:h-[202px] w-[100px] h-[100px] cursor-pointer p-[2px] ${
						isViewed
							? 'bg-gray-500'
							: 'bg-gradient-to-tr from-yellow-400 to-pink-600'
					}`}
				>
					<Avatar onClick={clickOpenModal}>
						<AvatarImage
							src={`https://instagram-api.softclub.tj/images/${profileData.data.image}`}
							className='lg:w-[200px] p-[3px] w-[100px] h-[100px] lg:h-[200px] rounded-full'
							alt='Profile Image'
						/>
						<AvatarFallback>
							<AvatarImage
								src='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
								className='lg:w-[200px] p-[3px] w-[100px] h-[100px] lg:h-[200px] rounded-full'
								alt='Profile Image'
							/>
						</AvatarFallback>
					</Avatar>
				</div>
				<StoryModal
					open={openModal}
					setOpen={setOpenModal}
					storyData={StoryData}
				/>
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
			<div className='hidden lg:flex gap-[20px] items-center'>
				<StorySection>
					<StoryCircle />
				</StorySection>
			</div>
			<div className='lg:hidden block'>
				<InfoFollowers
					posts={profileData.data?.postCount}
					followers={profileData.data?.subscribersCount}
					following={profileData.data?.subscriptionsCount}
				/>
			</div>
			<Tabs className='border-t-[1px] relative border-[gray] py-[10px]'>
				<TabsList className='flex justify-center gap-[50px]'>
					<TabsTrigger
						value='Tabs1'
						onClick={clickOpenPosts}
						className={`flex cursor-pointer gap-[10px] items-center ${
							OpenPosts
								? 'border-t-[2px] relative z-20 pt-[20px] top-[-10px] border-white font-bold'
								: 'text-[#fff]'
						}`}
					>
						<PostIcon />
						<p className='text-[#fff] lg:block hidden'>Posts</p>
					</TabsTrigger>
					<TabsTrigger
						value='Tabs1'
						onClick={clickOpenReels}
						className={`flex cursor-pointer gap-[10px] items-center ${
							OpenReels
								? 'border-t-[2px] relative z-20 pt-[20px] top-[-10px] border-white font-bold'
								: 'text-[#fff]'
						}`}
					>
						<ReelsIcon />
						<p className='text-[#fff] lg:block hidden'>Reels</p>
					</TabsTrigger>
					<TabsTrigger
						value='Tabs1'
						onClick={clickOpenSaved}
						className={`flex cursor-pointer gap-[10px] items-center ${
							OpenSave
								? 'border-t-[2px] relative z-20 pt-[20px] top-[-10px] border-white font-bold'
								: 'text-[#fff]'
						}`}
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
			{OpenPosts && (
				<ReelsContainer>
					{postsData.map(
						(post: {
							commentCount: string | number
							images: unknown[]
							postLikeCount: number
							comments: object
							id: number | string
						}) => (
							<ReelsDiv
								img={`https://instagram-api.softclub.tj/images/${post.images[0]}`}
								likes={post.postLikeCount}
								comments={post.commentCount}
								key={post.id}
							/>
						)
					)}
				</ReelsContainer>
			)}
			{OpenReels && (
				<ReelsContainer>
					{postsData.map(
						(reels: {
							commentCount: string | number
							images: unknown[]
							postLikeCount: number
							comments: object
							id: number | string
						}) => (
							<ReelsDiv2
								img={`https://instagram-api.softclub.tj/images/${reels.images[0]}`}
								likes={reels.postLikeCount}
								comments={reels.commentCount}
								key={reels.id}
							/>
						)
					)}
				</ReelsContainer>
			)}
			{OpenSave && (
				<ReelsContainer>
					{FavoriteData.data.map(
						(favorite: {
							images: unknown[]
							postLikeCount: number
							commentCount: number | string
						}) => (
							<ReelsDiv
								img={`https://instagram-api.softclub.tj/images/${favorite.images[0]}`}
								likes={favorite.postLikeCount}
								comments={favorite.commentCount}
							/>
						)
					)}
				</ReelsContainer>
			)}
		</div>
	)
}

// import ForgetPassword from '@/pages/(auth)/forget-password/page'
import LoginPage from '@/pages/(auth)/login/page'
import RegistrationPage from '@/pages/(auth)/registration/page'
import HomePage from '@/pages/(protected)/(home)/page'
import ProfileByNamePage from '@/pages/(protected)/(profile)/[name]/page'
import DefaulChatPage from '@/pages/(protected)/chats/(defaul-chat)/page'
// import ChatByIdPage from '@/pages/(protected)/chats/[id]/page'
import LayoutChats from '@/pages/(protected)/chats/layout'
import ExplorePage from '@/pages/(protected)/explore/page'
import Layout from '@/pages/(protected)/layout'

import SettingsSidebar from '@/widgets/settingsSideBar'
import Help from "@/pages/(protected)/settings/(more-info-and-support)/help/page"
import Comments from "@/pages/(protected)/settings/(how-others-can-interact-with-you)/comments/page"
import Hiddenwords from "@/pages/(protected)/settings/(how-others-can-interact-with-you)/hidden-words/page"
import Messagesandstoriesreplies from "@/pages/(protected)/settings/(how-others-can-interact-with-you)/messages-and-story-replies/messages-and-story-replies"
import Archivinganddownloading from "@/pages/(protected)/settings/(your-app-and-media)/archiving-and-downloading/page"
import Accountstatus from "@/pages/(protected)/settings/(for-professionals)/(account-status)/page"
import Accounttypeandtools from "@/pages/(protected)/settings/(for-professionals)/account-type-and-tools/page"
import Restrictedaccounts from '@/pages/(protected)/settings/(how-others-can-interact-with-you)/restricted-accounts/page'
import { BrowserRouter, Route, Routes } from 'react-router'
import Websitepermissions from '@/pages/(protected)/settings/(your-app-and-media)/website-permissions/page'
import Contentpreferences from '@/pages/(protected)/settings/(what-you-see)/content-preferences/page'
import Hidestoryandlive from '@/pages/(protected)/settings/(who-can-see-your-content)/hide-story-and-live/page'
import Closefriends from '@/pages/(protected)/settings/(who-can-see-your-content)/close-friends/page'
import Blocked from '@/pages/(protected)/settings/(who-can-see-your-content)/blocked/page'
import Subscriptions from '@/pages/(protected)/settings/(what-you-see)/subscriptions/page'
import Likecount from '@/pages/(protected)/settings/(what-you-see)/like-count/page'
import Mutedaccounts from '@/pages/(protected)/settings/(what-you-see)/muted-accounts/page'
import Sharingandreuse from '@/pages/(protected)/settings/(how-others-can-interact-with-you)/sharing-and-reuse/page'
import Tagsandmentions from '@/pages/(protected)/settings/(how-others-can-interact-with-you)/tags-and-mentions/page'
import Accountprivacy from "@/pages/(protected)/settings/(who-can-see-your-content)/account-privacy/page"

export default function Router() {
	return <BrowserRouter>
		<Routes>
			<Route path="login" element={<LoginPage />} />
			<Route path='registration' element={<RegistrationPage />} />
			{/* <Route path='forget' element={<ForgetPassword />} /> */}
			<Route element={<Layout />} >
				<Route path='/' element={<HomePage />} />
				<Route path="explore" element={<ExplorePage />} />
				<Route path="chats" element={<LayoutChats />} >
					<Route index element={<DefaulChatPage />} />
					{/* <Route path=":id" element={<ChatByIdPage />} /> */}
				</Route>
				<Route path=':name' element={<ProfileByNamePage />} />
				<Route element={<SettingsSidebar/>}>
				<Route path='settings' element={<SettingsSidebar />} />
				<Route path='help' element={<Help />} />
				<Route path='comments' element={<Comments />} />
				<Route path='hidden_words' element={<Hiddenwords />} />
				<Route path='messages_and_story_replies' element={<Messagesandstoriesreplies />} />
				<Route path='archiving_and_downloading' element={<Archivinganddownloading />} />
				<Route path='account_status' element={<Accountstatus />} />
				<Route path='account_type_and_tools' element={<Accounttypeandtools />} />
				<Route path='restricted_accounts' element={<Restrictedaccounts />} />
				<Route path='website_permissions' element={<Websitepermissions />} />
				<Route path='content_preferences' element={<Contentpreferences />} />
				<Route path='hide_story_and_live' element={<Hidestoryandlive />} />
				<Route path='close_friends' element={<Closefriends />} />
				<Route path='blocked_accounts' element={<Blocked />} />
				<Route path='subscriptions' element={<Subscriptions />} />
				<Route path='like_count' element={<Likecount />} />
				<Route path='muted_accounts' element={<Mutedaccounts />} />
				<Route path='sharing_and_reuse' element={<Sharingandreuse />} />
				<Route path='tags_and_mentions' element={<Tagsandmentions />} />
				<Route path='account_privacy' element={<Accountprivacy />} />
				</Route>
				<Route />
			</Route>
		</Routes>
	</BrowserRouter>
}
=======
import ReelsPage from '@/pages/(protected)/reels/page'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import logo from '../../assets/logo.svg'
import logo2 from '../../assets/logo2.svg'

const LazyLoginPage = lazy(() => Promise.resolve({ default: LoginPage }));
const LazyRegistrationPage = lazy(() => Promise.resolve({ default: RegistrationPage }));
const LazyHomePage = lazy(() => Promise.resolve({ default: HomePage }));
const LazyProfileByNamePage = lazy(() => Promise.resolve({ default: ProfileByNamePage }));
const LazyDefaulChatPage = lazy(() => Promise.resolve({ default: DefaulChatPage }));
const LazyChatByIdPage = lazy(() => Promise.resolve({ default: ChatByIdPage }));
const LazyLayoutChats = lazy(() => Promise.resolve({ default: LayoutChats }));
const LazyExplorePage = lazy(() => Promise.resolve({ default: ExplorePage }));
const LazyLayout = lazy(() => Promise.resolve({ default: Layout }));
const LazyReelsPage = lazy(() => Promise.resolve({ default: ReelsPage }));

export default function Router() {
	return (
		<BrowserRouter>
			<Suspense
				fallback={
					<div className="flex flex-col justify-between h-screen items-center">
					  <div className="flex-1 flex justify-center items-center">
						 <img src={logo2} alt=""  className='w-full h-20'  />
					  </div>
					  <div className="pb-5 flex flex-col justify-center items-center gap-1">
						 <h2>from</h2>
						 <img src={logo} alt="" className='w-[60%]' />
					  </div>
					</div>
				 }				 
			>
				<Routes>
					<Route path='login' element={<LazyLoginPage />} />
					<Route path='registration' element={<LazyRegistrationPage />} />
					<Route element={<LazyLayout children={undefined} />}>
						<Route path='/' element={<LazyHomePage />} />
						<Route path='explore' element={<LazyExplorePage />} />
						<Route path='reels' element={<LazyReelsPage />} />
						<Route path='chats' element={<LazyLayoutChats />}>
							<Route index element={<LazyDefaulChatPage />} />
							<Route path=':id' element={<LazyChatByIdPage />} />
						</Route>
						<Route path='profile' element={<LazyProfileByNamePage />} />
						<Route path='profile/:id' element={<LazyProfileByNamePage />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}


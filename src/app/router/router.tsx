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
import { BrowserRouter, Route, Routes } from 'react-router'

export default function Router() {
	return <BrowserRouter>
		<Routes>
			<Route path="login" element={<LoginPage />} />
			<Route path='registration' element={<RegistrationPage />} />
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
				</Route>
				<Route />
			</Route>
		</Routes>
	</BrowserRouter>
}
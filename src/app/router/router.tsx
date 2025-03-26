import LoginPage from '@/pages/(auth)/login/page'
import RegistrationPage from '@/pages/(auth)/registration/page'
import HomePage from '@/pages/(protected)/(home)/page'
import ProfileByNamePage from '@/pages/(protected)/(profile)/[name]/page'
import DefaulChatPage from '@/pages/(protected)/chats/(defaul-chat)/page'
import { ChatByIdPage } from '@/pages/(protected)/chats/[id]/page'
import LayoutChats from '@/pages/(protected)/chats/layout'
import ExplorePage from '@/pages/(protected)/explore/page'
import Layout from '@/pages/(protected)/layout'
import ReelsPage from '@/pages/(protected)/reels/page'
import { BrowserRouter, Route, Routes } from 'react-router'

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='login' element={<LoginPage />} />
				<Route path='registration' element={<RegistrationPage />} />
				<Route element={<Layout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='explore' element={<ExplorePage />} />
					<Route path='chats' element={<LayoutChats />}>
						<Route index element={<DefaulChatPage />} />
						<Route path=':id' element={<ChatByIdPage />} />
					</Route>
					<Route path=':name' element={<ProfileByNamePage />} />
					<Route />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

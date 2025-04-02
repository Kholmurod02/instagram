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
import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import logo from '../../assets/logo.svg'

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
					<div className="flex justify-center items-center h-screen">
						<img src={logo} alt="" />
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

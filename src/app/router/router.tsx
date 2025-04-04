import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import logo from '../../assets/logo.svg'
import logo2 from '../../assets/download.png'
import { ChatByIdPage } from '@/pages/(protected)/chats/[id]/page'

// Lazy load all pages
const LazyLoginPage = lazy(() => import('@/pages/(auth)/login/page'))
const LazyRegistrationPage = lazy(() => import('@/pages/(auth)/registration/page'))
const LazyHomePage = lazy(() => import('@/pages/(protected)/(home)/page'))
const LazyProfileByNamePage = lazy(() => import('@/pages/(protected)/(profile)/[name]/page'))
const LazyDefaulChatPage = lazy(() => import('@/pages/(protected)/chats/(defaul-chat)/page'))
const LazyLayoutChats = lazy(() => import('@/pages/(protected)/chats/layout'))
const LazyExplorePage = lazy(() => import('@/pages/(protected)/explore/page'))
const LazyReelsPage = lazy(() => import('@/pages/(protected)/reels/page'))
const LazyLayout = lazy(() => import('@/pages/(protected)/layout'))

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex flex-col justify-between h-screen items-center">
            <div className="flex-1 flex justify-center items-center">
              <img src={logo2} alt="" className='w-full h-20' />
            </div>
            <div className="pb-5 flex flex-col justify-center items-center gap-1">
              <h2>from</h2>
              <img   src={logo} alt="" className='w-[60%]' />
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="login" element={<LazyLoginPage />} />
          <Route path='registration' element={<LazyRegistrationPage />} />

          <Route element={<LazyLayout />}>
            <Route path='/' element={<LazyHomePage />} />
            <Route path="explore" element={<LazyExplorePage />} />
            <Route path="reels" element={<LazyReelsPage />} />

            <Route path="chats" element={<LazyLayoutChats />}>
              <Route index element={<LazyDefaulChatPage />} />
              <Route path=":id" element={<ChatByIdPage />} />
            </Route>

            <Route path='profile' element={<LazyProfileByNamePage />} />
 						<Route path='profile/:id' element={<LazyProfileByNamePage />} />
            
            <Route path=':name' element={<LazyProfileByNamePage />} />

               </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
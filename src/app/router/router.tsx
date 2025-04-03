import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import logo from '../../assets/logo.svg'
import logo2 from '../../assets/logo2.svg'
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
const LazySettingsSidebar = lazy(() => import('@/widgets/settingsSideBar'))
const LazyHelp = lazy(() => import("@/pages/(protected)/settings/(more-info-and-support)/help/page"))
const LazyComments = lazy(() => import("@/pages/(protected)/settings/(how-others-can-interact-with-you)/comments/page"))
const LazyHiddenwords = lazy(() => import("@/pages/(protected)/settings/(how-others-can-interact-with-you)/hidden-words/page"))
const LazyMessagesandstoriesreplies = lazy(() => import("@/pages/(protected)/settings/(how-others-can-interact-with-you)/messages-and-story-replies/messages-and-story-replies"))
const LazyArchivinganddownloading = lazy(() => import("@/pages/(protected)/settings/(your-app-and-media)/archiving-and-downloading/page"))
const LazyAccountstatus = lazy(() => import("@/pages/(protected)/settings/(for-professionals)/(account-status)/page"))
const LazyAccounttypeandtools = lazy(() => import("@/pages/(protected)/settings/(for-professionals)/account-type-and-tools/page"))
const LazyRestrictedaccounts = lazy(() => import('@/pages/(protected)/settings/(how-others-can-interact-with-you)/restricted-accounts/page'))
const LazyWebsitepermissions = lazy(() => import('@/pages/(protected)/settings/(your-app-and-media)/website-permissions/page'))
const LazyContentpreferences = lazy(() => import('@/pages/(protected)/settings/(what-you-see)/content-preferences/page'))
const LazyHidestoryandlive = lazy(() => import('@/pages/(protected)/settings/(who-can-see-your-content)/hide-story-and-live/page'))
const LazyClosefriends = lazy(() => import('@/pages/(protected)/settings/(who-can-see-your-content)/close-friends/page'))
const LazyBlocked = lazy(() => import('@/pages/(protected)/settings/(who-can-see-your-content)/blocked/page'))
const LazySubscriptions = lazy(() => import('@/pages/(protected)/settings/(what-you-see)/subscriptions/page'))
const LazyLikecount = lazy(() => import('@/pages/(protected)/settings/(what-you-see)/like-count/page'))
const LazyMutedaccounts = lazy(() => import('@/pages/(protected)/settings/(what-you-see)/muted-accounts/page'))
const LazySharingandreuse = lazy(() => import('@/pages/(protected)/settings/(how-others-can-interact-with-you)/sharing-and-reuse/page'))
const LazyTagsandmentions = lazy(() => import('@/pages/(protected)/settings/(how-others-can-interact-with-you)/tags-and-mentions/page'))
const LazyAccountprivacy = lazy(() => import("@/pages/(protected)/settings/(who-can-see-your-content)/account-privacy/page"))

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
              <img src={logo} alt="" className='w-[60%]' />
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
            
            <Route path=':name' element={<LazyProfileByNamePage />} />
            
            <Route path='settings' element={<LazySettingsSidebar />}>
              <Route path='help' element={<LazyHelp />} />
              <Route path='comments' element={<LazyComments />} />
              <Route path='hidden_words' element={<LazyHiddenwords />} />
              <Route path='messages_and_story_replies' element={<LazyMessagesandstoriesreplies />} />
              <Route path='archiving_and_downloading' element={<LazyArchivinganddownloading />} />
              <Route path='account_status' element={<LazyAccountstatus />} />
              <Route path='account_type_and_tools' element={<LazyAccounttypeandtools />} />
              <Route path='restricted_accounts' element={<LazyRestrictedaccounts />} />
              <Route path='website_permissions' element={<LazyWebsitepermissions />} />
              <Route path='content_preferences' element={<LazyContentpreferences />} />
              <Route path='hide_story_and_live' element={<LazyHidestoryandlive />} />
              <Route path='close_friends' element={<LazyClosefriends />} />
              <Route path='blocked_accounts' element={<LazyBlocked />} />
              <Route path='subscriptions' element={<LazySubscriptions />} />
              <Route path='like_count' element={<LazyLikecount />} />
              <Route path='muted_accounts' element={<LazyMutedaccounts />} />
              <Route path='sharing_and_reuse' element={<LazySharingandreuse />} />
              <Route path='tags_and_mentions' element={<LazyTagsandmentions />} />
              <Route path='account_privacy' element={<LazyAccountprivacy />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
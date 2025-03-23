import History from '@/features/history/history'
import AboutMe from '@/widgets/about-me-homepage'
import HistoryHomepage from '@/widgets/history-homepage'
import RecomendedUserHomepage from '@/widgets/recomended-user-homepage'
import RecomendedUsers from '@/features/recomended-user-homepage/recomended-users'
import PostsHomepage from '@/widgets/posts-homepage'
import PostUsersHomepage from '@/features/posts-users-homepage/post-users-homepage'

export default function HomePage(){
  return <>
    <main className="flex-1 items-center transition-all duration-300 justify-center border-2">
        <div className='w-full pl-10 flex justify-center gap-10'>
          <div className='w-[50%] border-2'>
            <div className='w-full flex gap-5 py-4 overflow-x-auto overflow-y-hidden' style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none", 
              }}>
              <HistoryHomepage>
                {/*здесь массив истории будет рендерится */}
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
                <History />
              </HistoryHomepage>
            </div>

            <PostsHomepage>
              <PostUsersHomepage />
            </PostsHomepage>
          </div>
          <div className='w-[35%] h-[600px] border-2'>
              <AboutMe />
              <div className='flex justify-between'>
                <h2 className='text-gray-300'>Recomendate for you</h2>
                <p className='hover:text-gray-400 cursor-pointer'>All</p>
              </div>    
              <RecomendedUserHomepage>
                <RecomendedUsers />
                <RecomendedUsers />
                <RecomendedUsers />
                <RecomendedUsers />
                <RecomendedUsers />
              </RecomendedUserHomepage>
              <div className='w-[75%] py-3'>
                <ul className='flex flex-wrap text-[12px] text-gray-500'>
                  <li className="hover:underline">&nbsp;Информация •</li>
                  <li className="hover:underline">&nbsp;Помощь •</li>
                  <li className="hover:underline">&nbsp;Пресса •</li>
                  <li className="hover:underline">&nbsp;API •</li>
                  <li className="hover:underline">&nbsp;Вакансии •</li>
                  <li className="hover:underline">&nbsp;Конфиденциальность •</li>
                  <li className="hover:underline">&nbsp;Условия •</li>
                  <li className="hover:underline">&nbsp;Места •</li>
                  <li className="hover:underline">&nbsp;Язык •</li>
                  <li className="hover:underline">&nbsp;Meta Verifed</li>
                </ul>

                <p className='text-gray-500 py-4 text-[14px]'>© 2025 Instagram from Meta</p>
              </div>
          </div>
        </div>
      </main> 

      <footer className="text-gray-300 py-10 px-6 text-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mb-4">
          <p className="hover:underline">Meta</p>
          <p className="hover:underline">Информация</p>
          <p className="hover:underline">Блог</p>
          <p className="hover:underline">Вакансии</p>
          <p className="hover:underline">Помощь</p>
          <p className="hover:underline">API</p>
          <p className="hover:underline">Конфиденциальность</p>
          <p className="hover:underline">Условия</p>
          <p className="hover:underline">Места</p>
          <p className="hover:underline">Instagram Lite</p>
          <p className="hover:underline">Threads</p>
          <p className="hover:underline">Загрузка контактов и лица, не являющиеся пользователями</p>
          <p className="hover:underline">Meta Verified</p>
        </div>
        
        <div className="flex justify-center items-center gap-4">
          <div className="relative group">
            <select name="" id="" className='border-none outline-none w-[100px]'>
              <option value="">Русский</option>
              <option value="">Английский</option>
              <option value="">Таджикский</option>
            </select>
          </div>
          
          <span>© 2025 Instagram from Meta</span>
        </div>
      </div>
    </footer>
  </>
}
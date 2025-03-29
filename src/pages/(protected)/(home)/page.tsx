import AboutMe from '@/widgets/about-me-homepage'
import HistoryHomepage from '@/widgets/history-homepage'
import PostsHomepage from '@/widgets/posts-homepage'
import RecomendedUserHomepage from '@/widgets/recomended-user-homepage'
import UserclickModalHomepage from '@/widgets/userclick-modal-homepage'

export default function HomePage() {
	return (
		<>
			<main className='transition-all duration-300 ease-in-out'>
				<div className='md:w-[90%] w-full flex flex-col md:flex-row'>
					<div className='md:w-[50%] w-[90%] m-auto'>
						<div
							className='w-full max-w-[100vw] flex-nowrap flex py-4 overflow-x-auto overflow-y-hidden'
							style={{
								scrollbarWidth: 'none',
								msOverflowStyle: 'none',
							}}
						>
							<HistoryHomepage />
						</div>
						<PostsHomepage />
					</div>
					<div className='md:block hidden md:w-[45%] overflow-x-hidden lg:w-[35%] h-[600px]'>
						<AboutMe />
						<UserclickModalHomepage />
						<RecomendedUserHomepage />
						<div className='w-[75%] py-3'>
							<ul className='flex flex-wrap text-[12px] text-gray-500'>
								<li className='hover:underline'>&nbsp;Информация •</li>
								<li className='hover:underline'>&nbsp;Помощь •</li>
								<li className='hover:underline'>&nbsp;Пресса •</li>
								<li className='hover:underline'>&nbsp;API •</li>
								<li className='hover:underline'>&nbsp;Вакансии •</li>
								<li className='hover:underline'>&nbsp;Конфиденциальность •</li>
								<li className='hover:underline'>&nbsp;Условия •</li>
								<li className='hover:underline'>&nbsp;Места •</li>
								<li className='hover:underline'>&nbsp;Язык •</li>
								<li className='hover:underline'>&nbsp;Meta Verifed</li>
							</ul>

							<p className='text-gray-500 py-4 text-[14px]'>
								© 2025 Instagram from Softclub
							</p>
						</div>
					</div>
				</div>
			</main>

			<footer className='w-[100%] md:w-full text-gray-300 py-6 md:py-10 md:px-6 text-xs sm:text-sm'>
				<div className='max-w-6xl mx-auto'>
					{/* Ссылки - адаптивное отображение */}
					<div className='flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-4 mb-4'>
						<p className='hover:underline whitespace-nowrap'>Meta</p>
						<p className='hover:underline whitespace-nowrap'>Информация</p>
						<p className='hover:underline whitespace-nowrap'>Блог</p>
						<p className='hover:underline whitespace-nowrap'>Вакансии</p>
						<p className='hover:underline whitespace-nowrap'>Помощь</p>
						<p className='hover:underline whitespace-nowrap'>API</p>
						<p className='hover:underline whitespace-nowrap'>
							Конфиденциальность
						</p>

						{/* Эти элементы скрываются на маленьких экранах */}
						<p className='hidden sm:inline hover:underline whitespace-nowrap'>
							Условия
						</p>
						<p className='hidden sm:inline hover:underline whitespace-nowrap'>
							Места
						</p>
						<p className='hidden md:inline hover:underline whitespace-nowrap'>
							Instagram Lite
						</p>
						<p className='hidden md:inline hover:underline whitespace-nowrap'>
							Threads
						</p>

						{/* Длинный текст - адаптация */}
						<p className='hidden lg:inline hover:underline whitespace-nowrap'>
							Загрузка контактов и лица, не являющиеся пользователями
						</p>
						<p className='hidden md:inline hover:underline whitespace-nowrap'>
							Meta Verified
						</p>
					</div>

					{/* Нижняя часть с выбором языка */}
					<div className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4'>
						<div className='relative group'>
							<select
								name='language'
								id='language-select'
								className='border-none outline-none bg-transparent text-xs sm:text-sm w-[90px] sm:w-[100px]'
							>
								<option value='ru'>Русский</option>
								<option value='en'>Английский</option>
								<option value='tg'>Таджикский</option>
							</select>
						</div>

						<span className='text-xs sm:text-sm'>
							© 2025 Instagram from Softclub
						</span>
					</div>
				</div>
			</footer>
		</>
	)
}

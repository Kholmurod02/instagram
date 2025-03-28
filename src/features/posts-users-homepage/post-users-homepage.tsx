import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button-from-homepage'
import { Card, CardContent } from '@/shared/ui/card-from-homepage'
import { ProfileSettingsModal } from '@/widgets/profile-settings-modal'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const PostUsersHomepage = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [open, setOpen] = useState(false)
	const totalSlides = 3

	const nextSlide = () => {
		setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1))
	}

	const prevSlide = () => {
		setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))
	}

	return (
		<div>
			<div className='flex items-center justify-between'>
				<div className='flex gap-3 items-center'>
					<div className='w-10 h-10 rounded-full p-[1px] border-2 border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500'>
						<div className='w-full h-full rounded-full bg-white p-[2px]'>
							{/*Место для фото профилей*/}
						</div>
					</div>
					<div>
						<h5 className='text-sm font-bold'>
							test_profile{' '}
							<span className='font-normal text-gray-400'>• 1 day</span>
						</h5>
						<p className='text-gray-300 text-[13px]'>Test profile</p>
					</div>
				</div>
				<ProfileSettingsModal open={open} setOpen={setOpen} />
				<div onClick={() => setOpen(true)}>
					<svg
						aria-label='Дополнительно'
						className='x1lliihq x1n2onr6 x5n08af cursor-pointer'
						fill='currentColor'
						height='24'
						role='img'
						viewBox='0 0 24 24'
						width='24'
					>
						<title>Дополнительно</title>
						<circle cx='12' cy='12' r='1.5'></circle>
						<circle cx='6' cy='12' r='1.5'></circle>
						<circle cx='18' cy='12' r='1.5'></circle>
					</svg>
				</div>
			</div> 

			<div className='flex items-center justify-center'>
				<Card className='relative w-full my-3 overflow-hidden rounded-lg border-0 text-white'>
					<CardContent className='p-0'>
						<div className='relative aspect-[3/4] w-full'>
							{/* Image placeholder - you'll replace this with your actual images */}
							<div className='absolute inset-0 flex items-center justify-center bg-zinc-900'>
								<p className='text-zinc-500'>Image placeholder</p>
							</div>

							{/* Navigation arrows */}
							<Button
								variant='ghost'
								size='icon'
								className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50'
								onClick={prevSlide}
							>
								<ChevronLeft className='h-6 w-6' />
								<span className='sr-only'>Previous</span>
							</Button>

							<Button
								variant='ghost'
								size='icon'
								className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50'
								onClick={nextSlide}
							>
								<ChevronRight className='h-6 w-6' />
								<span className='sr-only'>Next</span>
							</Button>
						</div>

						{/* Navigation dots */}
						<div className='flex justify-center gap-1.5 py-3'>
							{Array.from({ length: totalSlides }).map((_, index) => (
								<button
									key={index}
									className={cn(
										'h-1.5 w-1.5 rounded-full transition-all',
										currentIndex === index ? 'bg-white w-2.5' : 'bg-white/40'
									)}
									onClick={() => setCurrentIndex(index)}
								>
									<span className='sr-only'>Go to slide {index + 1}</span>
								</button>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex gap-3'>
					<svg
						aria-label='Нравится'
						className='x1lliihq x1n2onr6 xyb1xck'
						fill='currentColor'
						height='24'
						role='img'
						viewBox='0 0 24 24'
						width='24'
					>
						<title>Нравится</title>
						<path d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z'></path>
					</svg>

					<svg
						aria-label='Комментировать'
						className='x1lliihq x1n2onr6 x5n08af'
						fill='currentColor'
						height='24'
						role='img'
						viewBox='0 0 24 24'
						width='24'
					>
						<title>Комментировать</title>
						<path
							d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
							fill='none'
							stroke='currentColor'
							stroke-linejoin='round'
							stroke-width='2'
						></path>
					</svg>

					<svg
						aria-label='Поделиться'
						className='x1lliihq x1n2onr6 xyb1xck'
						fill='currentColor'
						height='24'
						role='img'
						viewBox='0 0 24 24'
						width='24'
					>
						<title>Поделиться</title>
						<line
							fill='none'
							stroke='currentColor'
							stroke-linejoin='round'
							stroke-width='2'
							x1='22'
							x2='9.218'
							y1='3'
							y2='10.083'
						></line>
						<polygon
							fill='none'
							points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
							stroke='currentColor'
							stroke-linejoin='round'
							stroke-width='2'
						></polygon>
					</svg>
				</div>
				<svg
					aria-label='Сохранить'
					className='x1lliihq x1n2onr6 x5n08af'
					fill='currentColor'
					height='24'
					role='img'
					viewBox='0 0 24 24'
					width='24'
				>
					<title>Сохранить</title>
					<polygon
						fill='none'
						points='20 21 12 13.44 4 21 4 3 20 3 20 21'
						stroke='currentColor'
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
					></polygon>
				</svg>
			</div>
			<div className='py-2 border-b mb-3 flex flex-col gap-1 border-b-gray-800'>
				<h5 className='text-[13px]'>Нравится <span className='font-bold'>softclub.tj</span> и <span className='font-bold'>другим</span></h5>

				<p className='text-[14px]'><span className='font-bold'>test_user </span>Sempre espere o inesperado</p>

				<p className='text-[12px] font-bold'>Показать перевод</p>
				<p className='text-[13px] text-gray-400'>Посмотреть все публикации <span>(4)</span></p>
			</div>
		</div>
	)
}

export default PostUsersHomepage

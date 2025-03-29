/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Skeleton } from '@/shared/ui/skeleton'
import { ScrollArea } from '@/shared/ui/scroll-area'

type UserShortInfo = {
	id: string
	userName: string
	userPhoto: string
	fullname: string
	displayName?: string
	isLoading?: boolean
}

type Subscriber = {
	userShortInfo: UserShortInfo
}

type SubscribersModalProps = {
	open: boolean
	setOpen: (open: boolean) => void
	subscribers: Subscriber[] | undefined
}

export default function SubscribersModal({
	open,
	setOpen,
	subscribers,
}: SubscribersModalProps) {
	const [isLoading] = useState(false)
	const [search, setSearch] = useState<string>('')
	const [subscribesFilter, setSubscribesFilter] = useState(subscribers || [])

	useEffect(() => {
		setSubscribesFilter(
			subscribers?.filter(subscriber => {
				return (
					subscriber.userShortInfo.userName
						.toLowerCase()
						.includes(search.trim().toLowerCase()) ||
					subscriber.userShortInfo.fullname
						.toLowerCase()
						.includes(search.trim().toLowerCase())
				)
			}) || []
		)
	}, [search, subscribers])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-md bg-[#242424] text-white border-gray-800 p-0 gap-0'>
				<DialogHeader className='px-4 py-2 border-b border-gray-800 flex flex-row items-center justify-between'>
					<DialogTitle className='text-center flex-1'>Subscribers</DialogTitle>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setOpen(false)}
						className='absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full h-8 w-8'
					>
						<X className='h-4 w-4' />
					</Button>
				</DialogHeader>

				<div className='p-3'>
					<div className='relative'>
						<Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
						<Input
							value={search}
							onChange={e => setSearch(e.target.value)}
							placeholder='Search'
							className='pl-9 bg-gray-800 border-gray-700 text-white focus-visible:ring-gray-700'
						/>
					</div>
				</div>

				<ScrollArea className='h-[400px] px-3 pb-3'>
					{isLoading
						? Array(5)
								.fill(0)
								.map((_, i) => (
									<div
										key={i}
										className='flex items-center justify-between py-3'
									>
										<div className='flex items-center gap-3'>
											<Skeleton className='h-10 w-10 rounded-full' />
											<div className='space-y-2'>
												<Skeleton className='h-4 w-32' />
												<Skeleton className='h-3 w-24' />
											</div>
										</div>
										<Skeleton className='h-9 w-24 rounded-md' />
									</div>
								))
						: subscribesFilter.map(subscriber => {
								return (
									<div
										key={subscriber.userShortInfo.id}
										className='flex items-center justify-between py-3'
									>
										<div className='flex items-center gap-3'>
											<Avatar className='h-10 w-10 border border-gray-700'>
												<AvatarImage
													src={`https://instagram-api.softclub.tj/images/${subscriber.userShortInfo.userPhoto}`}
													alt={subscriber.userShortInfo.userName}
												/>
												<AvatarFallback className='bg-gray-800 text-gray-400'>
													{subscriber.userShortInfo.userName.slice(0, 2)}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className='flex flex-col items-center '>
													<span className='font-medium'>
														{subscriber.userShortInfo.userName}
													</span>
													<p className='font-[10px]'>
														{subscriber.userShortInfo.fullname}
													</p>
												</div>
												{subscriber.userShortInfo.displayName && (
													<p className='text-sm text-gray-400'>
														{subscriber.userShortInfo.displayName}
													</p>
												)}
											</div>
										</div>
										<div className='flex gap-2'>
											{subscriber.userShortInfo.isLoading ? (
												<Skeleton className='h-9 w-24 rounded-md' />
											) : (
												<Button
													variant='outline'
													size='sm'
													className='border-gray-700 text-white hover:bg-gray-800'
												>
													Remove
												</Button>
											)}
										</div>
									</div>
								)
						  })}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

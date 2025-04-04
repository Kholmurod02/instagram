import { Star, Users, BellOff, X, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Dialog, DialogContent } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { useUnFollowByUserIdMutation } from '@/app/store/profileSlice/profileSlice'

interface ProfileDialogProps {
	username: string
	avatarUrl: string
	open : boolean,
	setOpen : (open : boolean) => void
	userId : string | undefined
}

export function UnfollowDialog({
	open,
	setOpen,
	username = 'ab.durakhmon2794',
	avatarUrl = '/placeholder.svg?height=100&width=100',
	userId
}: ProfileDialogProps) {
	const [UnFollowByUserId] = useUnFollowByUserIdMutation()
	async function UnfollowUser () {
		if(!userId){
			return
		}
		try {
			const response = await UnFollowByUserId(userId)
			setOpen(false)
			localStorage.setItem('isFollow', JSON.stringify(response.data));
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-md p-0 gap-0 bg-zinc-900 text-white'>
				<div className='flex flex-col items-center pt-6 pb-4 border-b border-zinc-700'>
					<Button
						variant='ghost'
						size='icon'
						className='absolute right-2 top-2 text-white hover:bg-zinc-800 rounded-full'
						onClick={() => setOpen(false)}
					>
						<X className='h-5 w-5' />
					</Button>
					<Avatar className='h-16 w-16 mb-2'>
						<AvatarImage src={avatarUrl} alt={username} />
						<AvatarFallback>AB</AvatarFallback>
					</Avatar>
					<span className='text-white'>{username}</span>
				</div>

				<div className='flex flex-col w-full'>
					<Button
						variant='ghost'
						className='flex justify-between items-center py-4 px-4 h-auto text-white hover:bg-zinc-800'
					>
						<div className='flex items-center gap-3'>
							<Users className='h-5 w-5' />
							<span className='text-sm'>
								Добавьте пользователей в список близких друзей
							</span>
						</div>
						<div className='text-white bg-transparent border border-zinc-700 rounded-full p-1'>
							<Star className='h-4 w-4' />
						</div>
					</Button>

					<Button
						variant='ghost'
						className='flex justify-between items-center py-4 px-4 h-auto text-white hover:bg-zinc-800'
					>
						<div className='flex items-center gap-3'>
							<Star className='h-5 w-5' />
							<span className='text-sm'>Добавить в избранное</span>
						</div>
						<Star className='h-5 w-5 text-white' />
					</Button>

					<Button
						variant='ghost'
						className='flex justify-between items-center py-4 px-4 h-auto text-white hover:bg-zinc-800'
					>
						<div className='flex items-center gap-3'>
							<BellOff className='h-5 w-5' />
							<span className='text-sm'>Выключить уведомления</span>
						</div>
						<ChevronRight className='h-5 w-5 text-zinc-500' />
					</Button>

					<Button
						variant='ghost'
						className='flex justify-between items-center py-4 px-4 h-auto text-white hover:bg-zinc-800'
					>
						<div className='flex items-center gap-3'>
							<Users className='h-5 w-5' />
							<span className='text-sm'>Ограничить</span>
						</div>
						<ChevronRight className='h-5 w-5 text-zinc-500' />
					</Button>

					<Button
						variant='ghost'
						onClick={UnfollowUser}
						className='flex justify-between items-center py-4 px-4 h-auto hover:bg-zinc-800 text-red-500'
					>
						<span className='text-sm'>Отменить подписку</span>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

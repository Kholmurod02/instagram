import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog'

export function ProfileSettingsModal({
	open,
	setOpen,
}: {
	open: boolean
	setOpen: (open: boolean) => void
}) {
	const menuItems = [
		'Приложения и сайты',
		'QR-код',
		'Уведомления',
		'Настройки и конфиденциальность',
		'Meta Verified',
		'Родительский контроль',
		'Входы в аккаунт',
		'Выйти',
		'Отмена',
	]

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild></DialogTrigger>

			<DialogContent className='p-0 max-w-[400px] bg-[#262626] border-none text-white'>
				<div className='flex flex-col w-full'>
					{menuItems.map((item, index) => {
						if (item === 'Отмена') {
							return (
								<button
									key={index}
									onClick={() => setOpen(false)}
									className='py-4 px-4 text-center text-white font-semibold hover:bg-[#363636] transition-colors'
								>
									{item}
								</button>
							)
						}

						return (
							<button
								key={index}
								className={`py-4 px-4 cursor-pointer text-center hover:bg-[#363636] transition-colors ${
									item === 'Выйти' ? 'text-red-500 font-semibold' : ''
								} ${
									index !== menuItems.length - 1
										? 'border-b cursor-pointer border-[#363636]'
										: 'cursor-pointer'
								}`}
							>
								{item}
							</button>
						)
					})}
				</div>
			</DialogContent>
		</Dialog>
	)
}

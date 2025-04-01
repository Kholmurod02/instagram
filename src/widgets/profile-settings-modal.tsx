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

      <DialogContent className='p-0 w-[90vw] max-w-[400px] sm:w-full sm:max-w-[500px] md:max-w-[600px] bg-[#262626] border-none text-white rounded-lg'>
        <div className='flex flex-col w-full'>
          {menuItems.map((item, index) => {
            const isCancelButton = item === 'Отмена'
            const isLogoutButton = item === 'Выйти'
            const isNotLastItem = index !== menuItems.length - 1

            return (
              <button
                key={index}
                onClick={isCancelButton ? () => setOpen(false) : undefined}
                className={`
                  py-3 px-4 text-center 
                  ${isLogoutButton ? 'text-red-500 font-semibold' : 'text-white'}
                  ${isCancelButton ? 'font-semibold' : ''}
                  hover:bg-[#363636] transition-colors
                  ${isNotLastItem ? 'border-b border-[#363636]' : ''}
                  md:py-4 md:px-6
                `}
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
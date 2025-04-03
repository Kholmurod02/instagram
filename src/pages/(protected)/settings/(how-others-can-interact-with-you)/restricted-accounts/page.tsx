import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export default function RestrictedAccounts() {
  return (
    <>
      <div className='flex flex-col items-start justify-start px-4 md:px-8 lg:px-16'>
        <div className='flex'>
          <span className='mt-[20px] cursor-pointer mr-[20px]'>
          <Link to="/settings"><ArrowLeft/></Link>
          </span>
        <h1 className='text-4xl md:text-4xl mb-[40px]'>Аккаунты с ограничениями</h1>
        </div>
        <p className='text-sm text-gray-500 md:text-base'>
        Оградите себя от нежелательного внимания, не блокируя ваших знакомых и не отменяя подписку на них. Перейдя в их профиль, вы можете установить для них ограничения. Подробнее об этой функции
        </p>
        <p className='w-full m-auto'>Нет аккаунтов, которым вы ограничили доступ.</p>
      </div>
    </>
  )
}
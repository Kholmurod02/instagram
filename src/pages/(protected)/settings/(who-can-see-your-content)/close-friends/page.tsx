import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function PageCloseFriends() {
  return (
    <div className='flex flex-col items-start justify-start px-4 md:px-8 lg:px-16'>
      <div className='flex'>
        <span className='mt-[20px] cursor-pointer mr-[20px]'>
          <Link to="/settings"><ArrowLeft /></Link>
        </span>
        <h1 className='text-4xl md:text-4xl mb-[40px]'>Близкие друзья</h1>
      </div>
      <p className='text-sm text-gray-500 md:text-base'>
        Никому не будет отправлено уведомление, что вы изменили свой список близких друзей. Как это работает.
      </p>
      <input
        type="search"
        placeholder="Search..."
        className="mt-4 w-full max-w-sm px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>
  )
}
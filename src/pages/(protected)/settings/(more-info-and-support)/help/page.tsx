import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

export default function PageHelp() {
    return <>
        <div>
            <div className='flex items-center space-x-4'>
                <div className='m-[24px_10px_0px_100px]'>
                    <Link to="/settings" className="text-gray-500 hover:text-gray-700">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                </div>
                <div className='text-[45px] font-semibold mt-[20px]'>
                    Помощь
                </div>
            </div>
            <div className='ml-[100px] mt-6'>
                <p className='font-light text-lg flex justify-between items-center'>
                    Справочный центр
                    <ArrowRight className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </p>
                <p className='font-light text-lg flex justify-between items-center mt-3'>
                    Статус аккаунта
                    <ArrowRight className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </p>
                <p className='font-light text-lg flex justify-between items-center mt-3'>
                    Конфиденциальность и безопасность
                    <ArrowRight className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </p>
                <p className='font-light text-lg flex justify-between items-center mt-3'>
                    Запросы поддержки
                    <ArrowRight className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </p>
            </div>
        </div>
    </>
}
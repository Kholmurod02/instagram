import { useState } from "react"
import { MessagesSquare } from "lucide-react"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { useSearchUsersQuery } from "@/entities/search/search"
import { NavLink, useNavigate } from "react-router"
import { useCreateChatMutation } from "@/entities/chats/chat-api"

export default function DefaultChatPage() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { data } = useSearchUsersQuery(value)
  const [createChat]=useCreateChatMutation()

const handleChat=(id:string)=>{
 createChat(id)
 setOpen(false)
}




  return (
    <div className="flex flex-col items-center justify-center  min-h-[100vh] bg-black text-white p-24 w-[720px]">
      <div className="flex flex-col items-center gap-6 max-w-md text-center mb-10">
        <div className="rounded-full bg-black p-5 border-2 border-white/80 w-28 h-28 flex items-center justify-center 
                    hover:border-white hover:scale-[1.03] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <MessagesSquare className="w-14 h-14 text-white/90 hover:text-white transition-colors" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Ваши сообщения
        </h2>
        <p className="text-gray-400/90 text-lg leading-relaxed">
          Отправляйте личные фото и сообщения другу или группе
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-400 text-white rounded-full px-8 py-3 font-semibold
                          text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300
                          transform hover:-translate-y-0.5">
            Отправить сообщение
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 rounded-xl overflow-hidden">
          <DialogHeader className="border-b border-gray-800 px-6 py-4">
            <DialogTitle className="text-xl font-bold text-white">Новое сообщение</DialogTitle>
            <DialogDescription className="text-gray-400">
              Напишите сообщение для отправки
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 px-6 py-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="recipient" className="text-sm font-medium text-gray-300">
                Получатель
              </label>
              <Input
                id="recipient"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Имя или группа"
                className="bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 text-white"
              />
            </div>
            <div className="flex flex-col gap-3 overflow-hidden">
              {
                value == '' ? '' :
                  data?.data?.slice(0, 3).map((user) => {
                    return <>
                      {/* <NavLink to={`/chat/${chatId}`}> */}

                      <div key={user.id}
                       className='flex py-[8px] hover:bg-[#20272b] items-center gap-[20px] px-[20px]'
                       onClick={()=>handleChat(user.id)}
                       >
                        <img src={'https://instagram-api.softclub.tj/images/' + user.avatar} alt="" className='w-[45px] h-[45px]  rounded-[50%]' />
                        <div className='w-[75%]'>
                          <p className='text-[16px] tracking-[1px] font-semibold'>{user.userName}</p>
                          <p className='text-[12px]'>{user.fullName} • Подписчики: {user.subscribersCount} </p>
                        </div>
                      </div>

                      {/* </NavLink> */}
                    </>
                  })
              }
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  )
}
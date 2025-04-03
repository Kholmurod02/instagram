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

export default function DefaultChatPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-black text-white p-24 w-full">
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
              placeholder="Имя или группа"
              className="bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="message" className="text-sm font-medium text-gray-300">
              Сообщение
            </label>
            <textarea
              id="message"
              className="flex min-h-[120px] w-full rounded-md bg-gray-800 border border-gray-700 px-4 py-3 text-white
                        placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                        transition-colors resize-none"
              placeholder="Введите ваше сообщение..."
            />
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 bg-gray-900 border-t border-gray-800">
          <Button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-400 px-6 py-2 text-base font-medium
                      transition-colors duration-300"
          >
            Отправить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
  )
}
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
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-black text-white p-6 w-full">
      <div className="flex flex-col items-center gap-4 max-w-md text-center mb-8">
        <div className="rounded-full bg-black p-4 border-2 border-white w-24 h-24 flex items-center justify-center">
          <MessagesSquare className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold">Ваши сообщения</h2>
        <p className="text-gray-400">Отправляйте личные фото и сообщения другу или группе</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 font-medium">
            Отправить сообщение
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Новое сообщение</DialogTitle>
            <DialogDescription>Напишите сообщение для отправки</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="recipient" className="text-sm font-medium">
                Получатель
              </label>
              <Input id="recipient" placeholder="Имя или группа" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Сообщение
              </label>
              <textarea
                id="message"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Введите ваше сообщение..."
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Отправить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
"use client"

import { useState } from "react"
import { Edit, ChevronDown } from "lucide-react"
import { Avatar } from "@/shared/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import userImg from '@/assets/UserIcon.png'
import { Outlet } from "react-router"

// User data type
interface UserType {
  sendUserId: string
  sendUserName: string
  sendUserImage: string
  chatId: number
  receiveUserId: string
  receiveUserName: string
  receiveUserImage: string
}

export default function LayoutChats() {
  const [activeTab, setActiveTab] = useState("messages")

  // User data
  const userData: UserType = {
    sendUserId: "5a4ef730-cf5f-427e-af20-73c7cf601d3e",
    sendUserName: "murodbek",
    sendUserImage: "08591c0a-2e99-4b92-b342-c9fbda7c7d82.jpg",
    chatId: 257,
    receiveUserId: "9f55c4f8-c453-435d-bc53-5a77ef0cfdcd",
    receiveUserName: "string",
    receiveUserImage: "5155995b-c13a-481d-8f79-8502413912ba.png",
  }

  // Mock data for highlights
  const highlights = [
    {
      id: 1,
      title: "Заметка...",
      image: userImg,
    },
    {
      id: 2,
      title: "Ь7",
      image: userImg,
    },
    {
      id: 3,
      title: "Shahboz Sharipov",
      subtitle: "Фармона ждат дорем",
      image: userImg,
    },
  ]

  // Mock data for messages
  const mockMessages = [
    {
      id: 1,
      name: "Шариф Юсупов",
      message: "Шариф отправил(-а) вложение.",
      time: "1 ч.",
      avatar: userImg,
    },
    {
      id: 2,
      name: "Тую маъракакхо",
      message: "Бла ридм ай хандара",
      time: "4 ч.",
      avatar: userImg,
    },
    {
      id: 3,
      name: "Umarali Yusufov",
      message: "Вы отправили вложение.",
      time: "9 ч.",
      avatar: userImg,
    },
    {
      id: 3,
      name: "Umarali Yusufov",
      message: "Вы отправили вложение.",
      time: "9 ч.",
      avatar: userImg,
    },
    {
      id: 3,
      name: "Umarali Yusufov",
      message: "Вы отправили вложение.",
      time: "9 ч.",
      avatar: userImg,
    },
    {
      id: 3,
      name: "Umarali Yusufov",
      message: "Вы отправили вложение.",
      time: "9 ч.",
      avatar: userImg,
    },
  ]

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-[700px] h-full bg-black text-white border-r border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">khairulloev.01</h1>
            <ChevronDown className="h-5 w-5" />
          </div>
          <button className="p-2">
            <Edit className="h-6 w-6" />
          </button>
        </div>

      

        {/* Tabs and Messages */}
        <Tabs 
          defaultValue="messages" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="flex-1 flex flex-col w-full h-[calc(100%-200px)]"
        >
          <div className="border-b border-gray-800 w-full">
            <TabsList className="bg-transparent border-b-0 w-full flex justify-between px-4">
              <TabsTrigger
                value="messages"
                className="text-lg font-semibold data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:shadow-none pb-2"
              >
                Сообщения
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="bg-transparent text-lg font-semibold text-gray-400 hover:text-white"
              >
                Запросы
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Messages Tab Content */}
          <TabsContent value="messages" className="flex-1 overflow-y-auto mt-0 w-full">
            <div className="w-full  ">
              {mockMessages.map((message) => (
                <div key={message.id} className="flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors w-full">
                  <Avatar className="h-12 w-12 rounded-full">
                    <img
                      src={message.avatar}
                      alt={message.name}
                      className="h-full w-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{message.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {message.message} · {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab Content */}
          <TabsContent value="requests" className="flex-1 p-4 w-full">
            <p className="text-center text-gray-400">No requests yet</p>
          </TabsContent>
        </Tabs>
      </div>
      <Outlet className="flex-1"/>
    </div>
  )
}
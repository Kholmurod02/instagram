"use client"

import { useState, useEffect } from "react"
import { Edit, ChevronDown } from "lucide-react"
import { Avatar } from "@/shared/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import userImg from '@/assets/UserIcon.png'
import { Outlet, useLocation, useNavigate, useParams } from "react-router"

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
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // Tailwind's md breakpoint
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Sync selected chat with URL params
  useEffect(() => {
    if (params.id) {
      setSelectedChat(Number(params.id))
    } else {
      setSelectedChat(null)
    }
  }, [params.id])

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
  ]

  const handleSelectChat = (chatId: number) => {
    navigate(`/chats/${chatId}`) // Update URL when chat is selected
  }

  const handleBackToList = () => {
    navigate('/chats') // Navigate back to list view
  }

  // On mobile, if we're viewing a chat, show back button to return to list
  const showBackButton = isMobile && selectedChat !== null

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Left sidebar - always visible on desktop, conditionally on mobile */}
      <div className={`${showBackButton ? 'hidden' : 'flex'} md:flex flex-col w-[120%] md:w-[500px] h-full bg-black text-white border-r border-gray-800`}>
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
            </TabsList>
          </div>

          {/* Messages Tab Content */}
          <TabsContent value="messages" className="flex-1 overflow-y-auto mt-0 w-full">
            <div className="w-full">
              {mockMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors w-full cursor-pointer ${selectedChat === message.id ? 'bg-gray-800' : ''}`}
                  onClick={() => handleSelectChat(message.id)}
                >
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
        </Tabs>
      </div>

      {/* Right content area - full width on mobile when chat selected */}
      <div className={`${!selectedChat && isMobile ? 'hidden' : 'flex'} flex-1 flex-col h-full bg-black`}>
        {/* Back button for mobile */}
        {showBackButton && (
          <div className="md:hidden flex items-center p-4 border-b border-gray-800">
            <button 
              onClick={handleBackToList}
              className="flex items-center gap-2 text-white"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to messages
            </button>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  )
}
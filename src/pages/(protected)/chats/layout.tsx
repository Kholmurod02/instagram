"use client"

import { useState, useEffect } from "react"
import { Edit, ChevronDown } from "lucide-react"
import { Avatar } from "@/shared/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import userImg from '@/assets/UserIcon.png'
import { Outlet, useLocation, useNavigate, useParams } from "react-router"
import {  useGetChatsQuery } from "@/entities/chats/chat-api"
import {jwtDecode} from 'jwt-decode'
import { useGetProfileByIdQuery } from "@/app/store/profileSlice/profileSlice"
// import { any, any } from "zod"

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
  // const location = useLocation()
  const params = useParams()

  const { data, error, isLoading } = useGetChatsQuery()

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // Tailwind's md breakpoint
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])


  const [tokenId , setTokenId] = useState(null)
  const [userName , setUserName] = useState("")


  

  // Sync selected chat with URL params
  useEffect(() => {
    if (params.id) {
      setSelectedChat(Number(params.id))
    } else {
      setSelectedChat(null)
    }

  }, [params.id])

  // Mock data for messages

  

  useEffect(()=>{
    const accessToken = localStorage.getItem("access_token")
      setTokenId(jwtDecode(accessToken).sid)
      setUserName(jwtDecode(accessToken).name)
  },[])


  

  const handleSelectChat = (chatId: number) => {
    navigate(`/chats/${chatId}`) // Update URL when chat is selected
  }

  const handleBackToList = () => {
    navigate('/chats') // Navigate back to list view
  }

  // On mobile, if we're viewing a chat, show back button to return to list
  const showBackButton = isMobile && selectedChat !== null



  

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black">
    {/* Left sidebar - always visible on desktop, conditionally on mobile */}
    <div 
      className={`
        ${showBackButton ? 'hidden' : 'flex'} 
        md:flex flex-col w-full md:w-[400px] lg:w-[500px] 
        h-full bg-black text-white border-r border-gray-800
        transition-all duration-200 ease-in-out
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold truncate max-w-[180px]">
            {userName}
          </h1>
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
        </div>
        <button 
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Edit"
        >
          <Edit className="h-6 w-6" />
        </button>
      </div>
  
      {/* Tabs and Messages */}
      <Tabs
        defaultValue="messages"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col h-[calc(100%-64px)]"
      >
        {/* <div className="border-b border-gray-800">
          <TabsList className="bg-transparent w-full flex justify-between px-4">
            <TabsTrigger
              value="messages"
              className="
                text-lg font-semibold 
                data-[state=active]:border-b-2 
                data-[state=active]:border-white 
                data-[state=active]:rounded-none 
                data-[state=active]:shadow-none 
                pb-2 px-0 mx-4
              "
            >
              Сообщения
            </TabsTrigger>
          </TabsList>
        </div> */}
  
        {/* Messages Tab Content */}
        <TabsContent 
          value="messages" 
          className="flex-1  w-full"
        >
          <div className="w-full">
            {data?.data?.map((chat) => (
              <div
                key={chat.chatId}
                className={`
                  flex items-center gap-3 p-4 
                  hover:bg-gray-800/50 active:bg-gray-800
                  transition-colors w-full cursor-pointer 
                  ${selectedChat === chat.id ? 'bg-gray-800' : ''}
                `}
                onClick={() =>{ handleSelectChat(chat.chatId)}}
              >
                <Avatar className="h-12 w-12 flex-shrink-0 rounded-full">
                  <img
                    src={`https://instagram-api.softclub.tj/images/${
                      chat.sendUserId === tokenId 
                        ? chat?.receiveUserImage 
                        : chat.sendUserImage
                    }`}
                    alt={
                      chat.sendUserId === tokenId 
                        ? chat?.receiveUserName[0] 
                        : chat.sendUserName[0]
                    }
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">
                    {chat.sendUserId === tokenId 
                      ? chat?.receiveUserName 
                      : chat.sendUserName}
                  </h3>
                  
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  
    {/* Right content area - full width on mobile when chat selected */}
    <div 
      className={`
        ${!selectedChat && isMobile ? 'hidden' : 'flex'} 
        flex-1 flex-col h-full bg-black
        ${selectedChat ? 'fixed md:relative inset-0 z-10' : ''}
      `}
    >
      {/* Back button for mobile */}
      {showBackButton && (
        <div className="md:hidden flex items-center p-4 border-b border-gray-800">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-white hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
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
              className="h-5 w-5"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="sr-only md:not-sr-only">Back to messages</span>
          </button>
        </div>
      )}
      <Outlet />
    </div>
  </div>
  )
}
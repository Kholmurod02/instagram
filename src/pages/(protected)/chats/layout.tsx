"use client"

import { useState, useEffect } from "react"
import { Edit, ChevronDown } from "lucide-react"
import { Avatar } from "@/shared/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import userImg from '@/assets/UserIcon.png'
import { Outlet, useLocation, useNavigate, useParams } from "react-router"
import { useDeleteChatMutation, useGetChatsQuery } from "@/entities/chats/chat-api"
import { jwtDecode } from 'jwt-decode'
import { useGetProfileByIdQuery } from "@/app/store/profileSlice/profileSlice"
import DefaultChatPage from "./(defaul-chat)/page"
import { Dialog } from "@/shared/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Button } from "@/shared/ui/button"

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
  const params = useParams()

  const { data, error, isLoading } = useGetChatsQuery()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const [tokenId, setTokenId] = useState(null)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    if (params.id) {
      setSelectedChat(Number(params.id))
    } else {
      setSelectedChat(null)
    }
  }, [params.id])


  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      setTokenId(decoded.sid)
      setUserName(decoded.name)
    }
  }, [])

  const handleSelectChat = (chat: UserType) => {   
    console.log(chat);
     
    navigate(`/chats/${chat.chatId}`)
    localStorage.setItem("user",JSON.stringify(chat))
  }

  const handleBackToList = () => {
    navigate('/chats')
  }

  const [deleteChat] = useDeleteChatMutation()

  const showBackButton = isMobile && selectedChat !== null

  return (
    <div className="flex w-full   bg-black text-white">
      {/* Left sidebar - full width on mobile when no chat selected */}
      <div
        className={`
        ${selectedChat && isMobile ? 'hidden' : 'flex w-full'}
        md:flex md:w-96 lg:w-[30rem] h-[100vh] 
        flex-col bg-black border-r border-gray-800
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold truncate max-w-[180px]">
              {userName}
            </h1>
            <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400" />
          </div>
          <button
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Edit"
          >
            <Edit className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 flex flex-col md:w-full w-[385px] h-[calc(100%-64px)] overflow-y-auto">
          <div className="w-full overflow-scroll ">
            {isLoading ? (
              // Skeleton Loading State
              <div className="space-y-4 p-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="flex items-center gap-3 p-4">
                    <div className="h-12 w-12 rounded-full bg-gray-800 animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 rounded bg-gray-800 animate-pulse"></div>
                      <div className="h-3 w-1/2 rounded bg-gray-800 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center p-4 text-red-500">
                Error loading chats
              </div>
            ) : (
              data?.data?.toReversed().map((chat) => (
                <div className={`flex justify-between hover:bg-gray-800/50 active:bg-gray-700
                  transition-colors w-full cursor-pointer 
                  ${selectedChat === chat.chatId ? 'bg-grey-900' : ''}`}>
                  <div
                    key={chat.chatId}
                    className={`
                  flex items-center gap-3 p-4 
                 
                `}
                    onClick={() => handleSelectChat(chat)}
                  >
                    <Avatar className="h-12 w-12 flex-shrink-0 rounded-full border border-gray-600">
                      <img
                        src={`https://instagram-api.softclub.tj/images/${chat.sendUserId === tokenId
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
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = userImg
                        }}
                      />
                    </Avatar>
                    <div className="flex-1 flex justify-between min-w-0">
                      <h3 className="font-semibold truncate text-gray-100">
                        {chat.sendUserId === tokenId
                          ? chat?.receiveUserName
                          : chat.sendUserName}
                      </h3>
                    </div>

                  </div>
               <div className="flex justify-center">
               <Popover>
                    <PopoverTrigger>
                    <button>•••</button>
                    </PopoverTrigger>
                    <PopoverContent className="h-[70px] w-[170px]">
                      <Button
                        onClick={() => deleteChat(chat.chatId)}
                        className="bg-muted hover:bg-black text-red-500"
                      >
                        Delete This chat
                      </Button>
                    </PopoverContent>
                  </Popover>
               </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Right content area - full width on mobile when chat selected */}
      <div
        className={`
        ${!selectedChat && isMobile ? 'hidden' : 'flex w-full'}
        md:flex md:flex-1
        flex-col h-full bg-black
        ${selectedChat && isMobile ? 'fixed inset-0 z-10' : ''}
      `}
      >
        {/* Back button for mobile */}
        {showBackButton && (
          <div className="md:hidden flex items-center p-3 border-b border-gray-800 bg-black">
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
              <span className="text-sm">Back</span>
            </button>
          </div>
        )}
        <Outlet />
      </div>

    </div>
  )
}
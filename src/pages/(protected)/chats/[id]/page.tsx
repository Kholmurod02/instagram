import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Smile, Mic, ImageIcon, Sticker, Heart, ArrowLeft, MoreVertical, Phone, Video, SendHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useNavigate, useParams } from "react-router";
import { useDeleteMessageMutation, useGetChatByIdQuery, useSendMessageMutation } from "@/entities/chats/chat-api";
import { jwtDecode } from "jwt-decode";
import { Dialog } from "@/shared/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

const formSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }),
});

export function ChatByIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const allEmojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸",
    "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️",
    "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡",
    "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓",
    "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄",
    "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵",
    "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠",
    "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽",
    "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀",
    "😿", "😾", "🙈", "🙉", "🙊", "💋", "💌", "💘", "💝", "💖",
    "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️", "🧡", "💛",
    "💚", "💙", "💜", "🤎", "🖤", "🤍", "💯", "💢", "💥", "💫",
    "💦", "💨", "🕳️", "💣", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤",
    "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤏", "✌️", "🤞", "🤟",
    "🤘", "🤙", "👈", "👉", "👆", "👇", "☝️", "👍", "👎", "✊",
    "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️",
    "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃",
    "🧠", "🦷", "🦴", "👀", "👁️", "👅", "👄", "👶", "🧒", "👦",
    "👧", "🧑", "👨", "👩", "🧔", "🧓", "👴", "👵", "🙍", "🙎",
    "🙅", "🙆", "💁", "🙋", "🧏", "🙇", "🤦", "🤷", "👮", "🕵️",
    "💂", "🥷", "👷", "🤴", "👸", "👳", "👲", "🧕", "🤵", "👰",
    "🤰", "🤱", "👼", "🎅", "🤶", "🧙", "🧚", "🧛", "🧜", "🧝",
    "🧞", "🧟", "💆", "💇", "🚶", "🧍", "🧎", "🏃", "💃", "🕺",
    "🕴️", "👯", "🧖", "🧗", "🤺", "🏇", "⛷️", "🏂", "🏌️", "🏄",
    "🚣", "🏊", "⛹️", "🏋️", "🚴", "🚵", "🤸", "🤼", "🤽", "🤾",
    "🤹", "🧘", "🛀", "🛌", "🧑‍🤝‍🧑", "👭", "👫", "👬", "💏", "💑",
    "👪", "🗣️", "👤", "👥", "🫂", "👣", "🦰", "🦱", "🦳", "🦲",

  ];


  let [message, setMessage] = useState("")
  const [file, setFile] = useState("")
  const formData = new FormData()
  formData.append("ChatId", id)
  formData.append("MessageText", message)
  for (let i = 0; i < file.length; i++) {
    formData.append("file", file[i])

  }

  const [deleteMessage] = useDeleteMessageMutation()



  const { data, error, isLoading } = useGetChatByIdQuery(id, {
    skip: !id, // Не отправляем запрос, если id нет
  });

  const [sendMessage] = useSendMessageMutation()
  const handleBackToList = () => {
    navigate("/chats");
  };

  const [userName, setUserName] = useState("")

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    setUserName(jwtDecode(accessToken).name)
  }, [])


  function addSmile(el) {
    setMessage((message += el))
    console.log(message);

  }

  const handleSubmit = (e: string) => {
    e.preventDefault()
    sendMessage(formData)
    setMessage("")
    setFile("")
  }

  return (
    <div className="flex flex-col h-screen w-[120%] max-w-md mx-auto bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBackToList}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User Avatar" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-lg">Chat</h1>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full"><Phone className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="rounded-full"><Video className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5" /></Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1  overflow-y-auto p-4 space-y-4">
        {isLoading && <p>Загрузка...</p>}
        {error && <p className="text-red-500">Ошибка загрузки</p>}
        {data?.data
          ?.slice() 
          .sort((a, b) => new Date(a.sendMassageDate) - new Date(b.sendMassageDate)) // Sort by date
          .map((message) => (
            <div
              key={message.messageId}
              className={cn(
                "flex flex-col-reverse max-w-[80%]",
                message.userName === userName ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={`https://instagram-api.softclub.tj/images/${message.userImage}`}
                    alt={message.userName}
                  />
                  <AvatarFallback>{message.userName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="rounded-2xl px-4 py-2 bg-muted">
                  <Popover>
                    <PopoverTrigger>
                      {message.file && (
                        <img
                          src={`https://instagram-api.softclub.tj/images/${message.file}`}
                          alt="Attached file"
                          className="mt-2 rounded-lg max-w-xs"
                        />
                      )}
                      <p>{message.messageText}</p>
                    </PopoverTrigger>
                    <PopoverContent className="h-[70px] w-[200px]">
                      <Button
                        onClick={() => deleteMessage(message.messageId)}
                        className="bg-muted hover:bg-black text-red-500"
                      >
                        Delete This Message
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {format(new Date(message.sendMassageDate), "dd MMM yyyy, HH:mm")}
              </span>
            </div>
          ))}

      </div>

      {/* Message Input Form */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button
            type="button" variant="ghost" size="icon" className="rounded-full">
            <Popover>
              <PopoverTrigger> <Smile className="h-5 w-5" /></PopoverTrigger>
              <PopoverContent className="h-[200px] overflow-auto">
                {
                  allEmojis.map((e) => <span onClick={() => addSmile(e)} className="cursor-pointer">{e}</span>)
                }
              </PopoverContent>
            </Popover>

          </Button>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text" className="rounded-[10px] w-[250px] h-[35px] bg-muted" placeholder=" Напишите сообщение..." />
          <Button
            type="submit"
            className="bg-muted "
          ><SendHorizontal size={"34px"} className="h-5 w-5 text-white" /></Button>
          <div className="flex items-center gap-1">
            <Button type="button" variant="ghost" size="icon" className="rounded-full"><Mic className="h-5 w-5" /></Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-full relative">
              <ImageIcon className="h-5 w-5" />
              <input
                onChange={(e) => setFile(e.target.files)}
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-full"><Sticker className="h-5 w-5" /></Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-full"><Heart className="h-5 w-5" /></Button>
          </div>
        </form>

      </div>
    </div>
  );
}

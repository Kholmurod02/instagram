
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Smile, Mic, ImageIcon, Sticker, Heart, ArrowLeft, MoreVertical, Phone, Video } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { cn } from "@/shared/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { useNavigate } from "react-router"

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
})

type Message = {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: Date
}

export function ChatByIdPage() {

  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "First of all, speak your language properly",
      sender: "other",
      timestamp: new Date("2025-02-16T07:29:00"),
    },
    {
      id: "2",
      content: "我会说任何语言。",
      sender: "user",
      timestamp: new Date("2025-02-16T07:46:00"),
    },
    {
      id: "3",
      content: "You only know language's name",
      sender: "other",
      timestamp: new Date("2025-02-16T09:48:00"),
    },
    {
      id: "4",
      content: "不是",
      sender: "user",
      timestamp: new Date("2025-02-16T09:49:00"),
    },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: values.message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
    form.reset()
  }

  const handleBackToList = () => {
    navigate('/chats') // Navigate back to list view
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft
              onClick={handleBackToList}
            className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Omar Yusuf" />
              <AvatarFallback>OY</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-lg">Omar Yusuf</h1>
              <p className="text-xs text-muted-foreground">TJ/CN</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col max-w-[80%]",
              message.sender === "user" ? "ml-auto items-end" : "mr-auto items-start",
            )}
          >
            <div
              className={cn(
                "rounded-2xl px-4 py-2",
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              <p>{message.content}</p>
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {format(message.timestamp, "dd MMM yyyy, HH:mm")}
            </span>
          </div>
        ))}
      </div>

      {/* Message Input Form */}
      <div className="p-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <Smile className="h-5 w-5" />
            </Button>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Напишите сообщение..." className="rounded-full bg-muted" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Add this line to show validation errors */}
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="rounded-full">
                <Mic className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="rounded-full">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="rounded-full">
                <Sticker className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Smile, Mic, ImageIcon, Sticker, Heart, ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useNavigate, useParams } from "react-router";
import { useGetChatByIdQuery } from "@/entities/chats/chat-api";
import { jwtDecode } from "jwt-decode";

const formSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }),
});

export function ChatByIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useGetChatByIdQuery(id, {
    skip: !id, // Не отправляем запрос, если id нет
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.message.trim()) return;
    form.reset();
  }

  const handleBackToList = () => {
    navigate("/chats");
  };

    const [userName , setUserName] = useState("")
  
    useEffect(()=>{
      const accessToken = localStorage.getItem("access_token")
        setUserName(jwtDecode(accessToken).name)
    },[])

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
        {data?.data?.map((message) => (
          <div
            key={message.messageId}
            className={cn(
              "flex flex-col max-w-[80%]",
              message.userName === userName ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarImage src={`https://instagram-api.softclub.tj/images/${message.userImage}`} alt={message.userName} />
                <AvatarFallback>{message.userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="rounded-2xl px-4 py-2 bg-muted">
                <p>{message.messageText}</p>
                {message.file && (
                  <img
                    src={`https://instagram-api.softclub.tj/images/${message.file}`}
                    alt="Attached file"
                    className="mt-2 rounded-lg max-w-xs"
                  />
                )}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="rounded-full"><Mic className="h-5 w-5" /></Button>
              <Button type="button" variant="ghost" size="icon" className="rounded-full"><ImageIcon className="h-5 w-5" /></Button>
              <Button type="button" variant="ghost" size="icon" className="rounded-full"><Sticker className="h-5 w-5" /></Button>
              <Button type="button" variant="ghost" size="icon" className="rounded-full"><Heart className="h-5 w-5" /></Button>
            </div>
          </form> 
        </Form>
      </div>
    </div>
  );
}

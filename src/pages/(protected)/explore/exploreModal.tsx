"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { cn } from "../../../shared/lib/utils";

interface Post {
  id: string;
  mediaUrl: string;
  likesCount: number;
  commentsCount: number;
  caption?: string;
  createdAt: string;
  user?: {
    username: string;
    avatarUrl?: string;
  };
}

export function InstagramDialog({ children, post }: { 
  children: React.ReactNode;
  post: Post;
}) {
  const [comment, setComment] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 gap-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh]">
          {/* Left side - Post content */}
          <div className="bg-black flex items-center justify-center">
            <img
              src={post.mediaUrl}
              alt="Instagram post"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Right side - Comments */}
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.user?.avatarUrl || "/placeholder.svg"} alt={post.user?.username} />
                  <AvatarFallback>
                    {post.user?.username.slice(0, 2).toUpperCase() || "PO"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{post.user?.username || "username"}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            {/* Comments section */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {/* Original post caption */}
              {post.caption && (
                <CommentItem
                  username={post.user?.username || "username"}
                  comment={post.caption}
                  timeAgo={formatTimeAgo(post.createdAt)}
                  avatar={post.user?.avatarUrl}
                />
              )}

              {/* You would map through actual comments here */}
              {/* For now using placeholders */}
              <div className="h-[1px] w-full bg-border my-2"></div>
              <CommentItem
                username="user1"
                comment="This is a great post!"
                timeAgo="2d"
                likes={5}
                avatar="/placeholder.svg"
              />
              <CommentItem
                username="user2"
                comment="Nice picture!"
                timeAgo="1d"
                likes={3}
                avatar="/placeholder.svg"
              />
            </div>

            {/* Action buttons */}
            <div className="p-3 border-t border-b">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <LikeButton initialLikes={post.likesCount} />
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <MessageCircle className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Send className="h-6 w-6" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Bookmark className="h-6 w-6" />
                </Button>
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold">{post.likesCount} likes</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Comment input */}
            <div className="p-3 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Smile className="h-6 w-6" />
              </Button>
              <Input
                placeholder="Add a comment..."
                className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                className={cn("font-semibold", comment.length > 0 ? "text-primary" : "text-primary/50")}
                disabled={comment.length === 0}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to format date as time ago
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo`;
  return `${Math.floor(diffInSeconds / 31536000)}y`;
}
"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from "lucide-react";
import { useGetPostsQuery } from "../../../entities/post/postApi";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "../../../shared/lib/utils";

interface Post {
  postId: string;
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

export default function ExplorePage() {
  const { data: posts, isLoading, error } = useGetPostsQuery("");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  console.log("Posts:", posts);
console.log("Loading:", isLoading);
console.log("Error:", error);
console.log("keys:", posts.data);


  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading posts: {"message" in error ? error.message : "Unknown error"}
      </div>
    );
  }

console.log(posts,"data");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-[1400px] mx-auto px-2 mt-10">
      {posts?.data?.length ? (
        posts.data.map((post: Post, index: number) => (
          <InstagramDialog key={post.postId || index} post={post}>
            <div className="relative w-full group">
              <img
                src={"https://instagram-api.softclub.tj/images/"+post.images[0]}
                alt={`Post ${post.postId}`}
                className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-4 text-white text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.postLikeCount || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentCount
 || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </InstagramDialog>
        ))
      ) : (
        <p className="col-span-3 text-center py-10">No posts available</p>
      )}
    </div>
  );
}

function InstagramDialog({ children, post }: { children: React.ReactNode; post: Post }) {
  const [comment, setComment] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl p-0 gap-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh]">
          <div className="bg-black flex items-center justify-center">
            <img 
              src={post.mediaUrl} 
              alt="Instagram post" 
              className="h-full w-full object-contain" 
            />
          </div>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.user?.avatarUrl} alt={post.user?.username} />
                  <AvatarFallback>
                    {post.user?.username?.slice(0, 2).toUpperCase() || "PO"}
                  </AvatarFallback>
                </Avatar>
                <div className="font-semibold text-sm">{post.user?.username || "username"}</div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {post.caption && (
                <div className="flex gap-3 py-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.user?.avatarUrl} alt={post.user?.username} />
                    <AvatarFallback>
                      {post.user?.username?.slice(0, 2).toUpperCase() || "PO"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-1">
                      <span className="font-semibold text-sm">{post.user?.username || "username"}</span>
                      <span className="text-sm">{post.caption}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-b flex justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Send className="h-6 w-6" />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-3 flex items-center gap-2">
              <Button variant="ghost" size="icon">
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
                className={cn(
                  "font-semibold",
                  comment.length > 0 ? "text-primary" : "text-primary/50"
                )}
                disabled={!comment.length}
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
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { useGetPostsQuery } from "../../../entities/post/postApi";
import { Skeleton } from "@/shared/ui/skeleton";
import { InstagramDialog } from "./exploreModal";
import { useAddCommentMutation, useSavePostMutation } from "../../../entities/post/postApi";


export default function ExplorePage() {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, error, isFetching } = useGetPostsQuery(page);
  const [images, setImages] = useState<
    { id: string; url: string; likes: number; comments: number }[]
  >([]);
  const observerRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);
  const [_selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
const [savePost] = useSavePostMutation();
const [addComment] = useAddCommentMutation();



const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setCommentText(e.target.value);
};
const handleSavePost = async (postId: string) => {
  try {
    await savePost(postId);
  } catch (err) {
    console.error("Error saving post:", err);
  }
};

  useEffect(() => {
    if (posts?.data) {
      setImages((prev) => [
        ...prev,
        ...posts.data.map((post: any) => ({
          id: post.postId,
          url: `https://instagram-api.softclub.tj/images/${post.images[0]}`,
          likes: post.postLikeCount || 0,
          commentCount: post.commentCount || 0,
          comments: post.comments,
          caption: post.caption || "salom",
          createdAt: post.datePublished,
          user: {
            username: post.userName,
            avatarUrl: post.userImage,
          },
        })),
      ]);
      setHasMore(posts.data.length > 0);
    }
  }, [posts]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isFetching]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading posts: {error.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 lg:px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-[1400px] mx-auto px-2">
      {images.map((image, index) => {
  const isVideo = index % 5 === 2; // Every 3rd item is a video

  return (
    <InstagramDialog key={image.id} post={image}>
      <div
        className={`relative w-full cursor-pointer ${isVideo ? "row-span-2" : ""}`}
        onClick={() => setSelectedPost(image)}
      >
        {isVideo ? (
          <video
            src={image.url}
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-[900px] object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <img
            src={image.url}
            alt={`Explore ${image.id}`}
            className="w-full h-[450px] object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        )}
        {/* Overlay with likes and comments count */}
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-4 text-white text-sm font-medium">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{image.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{image.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </InstagramDialog>
  );
})}


        {(isLoading || isFetching) &&
          Array.from({ length: 6 }).map((_, index) => {
            const isTall = index % 5 === 2;
            return (
              <div
                key={`skeleton-${index}`}
                className={`relative w-full ${isTall ? "sm:row-span-2" : ""}`}
              >
                <Skeleton
                  className={`w-full ${
                    isTall ? "h-[500px] sm:h-[800px]" : "h-[300px] sm:h-[400px]"
                  }`}
                />
              </div>
            );
          })}
      </div>

      <div ref={observerRef} className="h-10" /> 

      {!hasMore && !isFetching && (
        <div className="py-8 text-center text-gray-500">No more posts to load</div>
      )}
    </div>
  );
}

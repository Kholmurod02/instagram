// "use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { useGetPostsQuery } from "../../../entities/post/postApi";

export default function ExplorePage() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<
    { id: string; url: string; likes: number; comments: number }[]
  >([]);
  const { data: posts, isLoading, error, isFetching } = useGetPostsQuery(page);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (posts?.data) {
      // Only add new posts if they don't already exist
      const newPosts = posts.data.filter(
        (post: any) => !images.some((img) => img.id === post.postId)
      ).map((post: any) => ({
        id: post.postId,
        url: `https://instagram-api.softclub.tj/images/${post.images[0]}`,
        likes: post.postLikeCount || 0,
        comments: post.commentCount || 0,
      }));

      setImages((prev) => [...prev, ...newPosts]);
      setHasMore(posts.data.length > 0);
    }
  }, [posts?.data]);

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
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    });

    if (lastImageRef.current) {
      observerRef.current.observe(lastImageRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, images]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading posts: {"message" in error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 lg:px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-[1400px] mx-auto px-2">
        {images.map((image, index) => {
          const isTall = index % 5 === 2;
          const isLastImage = index === images.length - 1;

          return (
            <div
              key={image.id}
              ref={isLastImage ? lastImageRef : null}
              className={`relative w-full ${isTall ? "sm:row-span-2" : ""}`}
            >
              <img
                src={image.url}
                alt={`Explore ${image.id}`}
                className={`w-full object-cover transition-transform duration-300 hover:scale-105 ${
                  isTall ? "h-[500px] sm:h-[800px]" : "h-[300px] sm:h-[400px]"
                }`}
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-4 text-white text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{image.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{image.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isFetching && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {!hasMore && !isFetching && (
        <div className="py-8 text-center text-gray-500">
          No more posts to load
        </div>
      )}
    </div>
  );
}